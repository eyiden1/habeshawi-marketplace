import { createElement } from "react";
import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import { Resend } from "resend";

import { supabaseAdmin } from "@/lib/supabase-admin";
import ListingApprovedEmail from "@/components/emails/ListingApprovedEmail";
import ListingRejectedEmail from "@/components/emails/ListingRejectedEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://habeshawi-marketplace.vercel.app";

const EMAIL_FROM =
  process.env.RESEND_FROM_EMAIL ??
  "Habeshawi Marketplace <onboarding@resend.dev>";

type ListingStatus = "approved" | "rejected";

type RequestBody = {
  rentalId?: string;
  status?: ListingStatus;
  rejectionReason?: string;
};

export async function POST(request: NextRequest) {
  try {
    const authorization =
      request.headers.get("authorization");

    if (!authorization?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized request." },
        { status: 401 }
      );
    }

    const accessToken = authorization
      .replace("Bearer ", "")
      .trim();

    const {
      data: { user },
      error: authenticationError,
    } = await supabaseAdmin.auth.getUser(accessToken);

    if (authenticationError || !user) {
      return NextResponse.json(
        { error: "Invalid or expired login session." },
        { status: 401 }
      );
    }

    const body = (await request.json()) as RequestBody;

    const rentalId = body.rentalId?.trim();
    const status = body.status;
    const rejectionReason =
      body.rejectionReason?.trim() ?? "";

    if (!rentalId) {
      return NextResponse.json(
        { error: "Rental ID is required." },
        { status: 400 }
      );
    }

    if (
      status !== "approved" &&
      status !== "rejected"
    ) {
      return NextResponse.json(
        {
          error:
            'Status must be either "approved" or "rejected".',
        },
        { status: 400 }
      );
    }

    const { data: rental, error: rentalError } =
      await supabaseAdmin
        .from("rentals")
        .select("*")
        .eq("id", rentalId)
        .single();

    if (rentalError || !rental) {
      console.error(
        "Rental lookup error:",
        rentalError
      );

      return NextResponse.json(
        { error: "Rental listing was not found." },
        { status: 404 }
      );
    }

    if (
      status === "approved" &&
      rental.payment_status !== "paid"
    ) {
      return NextResponse.json(
        {
          error:
            "This listing cannot be approved because payment has not been completed.",
        },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();

    const updateData =
      status === "approved"
        ? {
            status: "approved",
            approved_at: now,
            reviewed_at: now,
            rejection_reason: null,
          }
        : {
            status: "rejected",
            reviewed_at: now,
            approved_at: null,
            rejection_reason:
              rejectionReason ||
              "The listing requires changes.",
          };

    const {
      data: updatedRental,
      error: updateError,
    } = await supabaseAdmin
      .from("rentals")
      .update(updateData)
      .eq("id", rentalId)
      .select("*")
      .single();

    if (updateError || !updatedRental) {
      console.error(
        "Rental status update error:",
        updateError
      );

      return NextResponse.json(
        {
          error:
            updateError?.message ??
            "The listing status could not be updated.",
        },
        { status: 500 }
      );
    }

    const customerEmail =
      updatedRental.email?.trim();

    if (!customerEmail) {
      return NextResponse.json({
        success: true,
        emailSent: false,
        message:
          "Listing status updated, but no customer email was available.",
        rental: updatedRental,
      });
    }

    const listingTitle =
      updatedRental.title ??
      updatedRental.property_type ??
      "Your rental listing";

    const listingLocation =
      updatedRental.location ??
      updatedRental.city ??
      updatedRental.address ??
      "Location not provided";

    const publicListingUrl =
      `${SITE_URL}/housing/${rentalId}`;

    let subject: string;
    let html: string;

    if (status === "approved") {
      subject =
        "Your Rental Listing Is Live – Habeshawi Marketplace";

      html = await render(
        createElement(ListingApprovedEmail, {
          title: String(listingTitle),
          location: String(listingLocation),
          listingUrl: publicListingUrl,
        })
      );
    } else {
      subject =
        "Rental Listing Review Update – Habeshawi Marketplace";

      html = await render(
        createElement(ListingRejectedEmail, {
          title: String(listingTitle),
          reason:
            updatedRental.rejection_reason ??
            rejectionReason ??
            "The listing requires changes.",
          siteUrl: SITE_URL,
        })
      );
    }

    const { error: emailError } =
      await resend.emails.send({
        from: EMAIL_FROM,
        to: customerEmail,
        subject,
        html,
      });

    if (emailError) {
      console.error(
        "Listing status email error:",
        emailError
      );

      return NextResponse.json(
        {
          success: true,
          emailSent: false,
          message:
            "Listing status was updated, but the customer email could not be sent.",
          emailError: emailError.message,
          rental: updatedRental,
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
      message:
        status === "approved"
          ? "Listing approved and customer notified."
          : "Listing rejected and customer notified.",
      rental: updatedRental,
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected server error.";

    console.error(
      "Status email route error:",
      error
    );

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
