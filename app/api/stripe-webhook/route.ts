import Stripe from "stripe";
import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL =
  process.env.ADMIN_NOTIFICATION_EMAIL ?? "endalkx@gmail.com";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://habeshawi-marketplace.vercel.app";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Invalid webhook signature.";

    console.error("Stripe webhook signature error:", message);

    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const rentalId = session.metadata?.rentalId;
    const listingType = session.metadata?.listingType;

    if (!rentalId || listingType !== "housing") {
      console.log("Webhook does not contain a housing rental ID.");

      return NextResponse.json({
        received: true,
        eventType: event.type,
      });
    }

    const expiresAt = new Date(
      Date.now() + 90 * 24 * 60 * 60 * 1000
    ).toISOString();

    const { data: rental, error: updateError } = await supabaseAdmin
      .from("rentals")
      .update({
        payment_status: "paid",
        expires_at: expiresAt,
      })
      .eq("id", rentalId)
      .select("*")
      .single();

    if (updateError) {
      console.error("Supabase update error:", updateError);

      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    try {
      const title =
        rental.title ??
        rental.property_type ??
        "New rental listing";

      const location =
        rental.location ??
        rental.city ??
        rental.address ??
        "Location not provided";

      const price =
        rental.price ??
        rental.monthly_rent ??
        "Price not provided";

      const adminUrl = `${SITE_URL}/admin`;
      const editUrl = `${SITE_URL}/admin/edit/${rentalId}`;

      const { error: emailError } = await resend.emails.send({
        from: "Habeshawi Marketplace <onboarding@resend.dev>",
        to: ADMIN_EMAIL,
        subject: "New Paid Rental Waiting for Approval",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b;">
            <div style="background: #087531; padding: 24px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: white; font-size: 24px;">
                New Paid Rental
              </h1>
            </div>

            <div style="border: 1px solid #e2e8f0; border-top: 0; padding: 24px; border-radius: 0 0 12px 12px;">
              <p>A customer submitted and paid for a rental listing.</p>

              <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Title</td>
                  <td style="padding: 8px 0;">${escapeHtml(String(title))}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Location</td>
                  <td style="padding: 8px 0;">${escapeHtml(String(location))}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Price</td>
                  <td style="padding: 8px 0;">${escapeHtml(String(price))}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Payment</td>
                  <td style="padding: 8px 0; color: #087531; font-weight: bold;">
                    Paid
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Status</td>
                  <td style="padding: 8px 0;">Waiting for approval</td>
                </tr>
              </table>

              <a
                href="${editUrl}"
                style="display: inline-block; background: #087531; color: white; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: bold; margin-right: 8px;"
              >
                Review Rental
              </a>

              <a
                href="${adminUrl}"
                style="display: inline-block; background: #334155; color: white; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: bold;"
              >
                Open Admin
              </a>

              <p style="margin-top: 24px; color: #64748b; font-size: 13px;">
                Review the listing details and images before approving it.
              </p>
            </div>
          </div>
        `,
      });

      if (emailError) {
        console.error("Resend notification error:", emailError);
      } else {
        console.log("Admin notification email sent for rental:", rentalId);
      }
    } catch (emailError) {
      // Do not fail the Stripe webhook after payment was recorded.
      // Stripe could retry the webhook and send duplicate emails.
      console.error("Unable to send notification email:", emailError);
    }
  }

  return NextResponse.json({
    received: true,
    eventType: event.type,
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}