"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const categories = [
  "Cars",
  "Phones",
  "Electronics",
  "Furniture",
  "Restaurant Equipment",
  "Home Appliances",
  "Clothing",
  "Business Equipment",
  "Services",
  "Other",
];

const conditions = [
  "New",
  "Like New",
  "Good",
  "Fair",
  "For Parts",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export default function PostMarketplaceItemPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [createdListingId, setCreatedListingId] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    setErrorMessage("");

    if (!file) {
      setImageFile(null);

      if (preview) {
        URL.revokeObjectURL(preview);
      }

      setPreview("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setErrorMessage("The image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = String(formData.get("title") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();
    const description = String(
      formData.get("description") ?? ""
    ).trim();

    const priceText = String(formData.get("price") ?? "").trim();
    const condition = String(
      formData.get("condition") ?? ""
    ).trim();

    const city = String(formData.get("city") ?? "").trim();
    const state = String(formData.get("state") ?? "")
      .trim()
      .toUpperCase();

    const sellerName = String(
      formData.get("seller_name") ?? ""
    ).trim();

    const sellerEmail = String(
      formData.get("seller_email") ?? ""
    ).trim();

    const sellerPhone = String(
      formData.get("seller_phone") ?? ""
    ).trim();

    const price = Number(priceText);

    if (
      !title ||
      !category ||
      !description ||
      !priceText ||
      Number.isNaN(price) ||
      price < 0 ||
      !city ||
      !state ||
      !sellerName ||
      !sellerEmail ||
      !sellerPhone
    ) {
      setErrorMessage(
        "Please complete all required fields correctly."
      );

      setIsSubmitting(false);
      return;
    }

    if (!imageFile) {
      setErrorMessage("Please upload an image of the item.");
      setIsSubmitting(false);
      return;
    }

    if (imageFile.size > MAX_IMAGE_SIZE) {
      setErrorMessage("The image must be 5 MB or smaller.");
      setIsSubmitting(false);
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      setErrorMessage(
        `Unable to verify your account: ${userError.message}`
      );

      setIsSubmitting(false);
      return;
    }

    if (!user) {
      setErrorMessage(
        "You must sign in before posting a marketplace listing."
      );

      setIsSubmitting(false);
      return;
    }

    const fileExtension =
      imageFile.name.split(".").pop()?.toLowerCase() ?? "jpg";

    const filePath =
      `${user.id}/${crypto.randomUUID()}.${fileExtension}`;

    const { error: uploadError } = await supabase.storage
      .from("marketplace")
      .upload(filePath, imageFile, {
        cacheControl: "3600",
        upsert: false,
        contentType: imageFile.type,
      });

    if (uploadError) {
      setErrorMessage(
        `Unable to upload the image: ${uploadError.message}`
      );

      setIsSubmitting(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from("marketplace")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    const { data: listing, error: insertError } = await supabase
      .from("marketplace_listings")
      .insert({
        user_id: user.id,
        title,
        category,
        description,
        price,
        condition: condition || null,
        city,
        state,
        location: `${city}, ${state}`,
        seller_name: sellerName,
        seller_email: sellerEmail,
        seller_phone: sellerPhone,
        image_url: imageUrl,
        status: "pending",
        featured: false,
      })
      .select("id")
      .single();

    if (insertError) {
      await supabase.storage
        .from("marketplace")
        .remove([filePath]);

      setErrorMessage(
        `Unable to submit listing: ${insertError.message}`
      );

      setIsSubmitting(false);
      return;
    }

    if (!listing) {
      setErrorMessage(
        "The listing was saved, but its ID could not be retrieved."
      );

      setIsSubmitting(false);
      return;
    }

    form.reset();

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImageFile(null);
    setPreview("");
    setCreatedListingId(listing.id);
    setSubmitted(true);
    setIsSubmitting(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function postAnotherItem() {
    setSubmitted(false);
    setCreatedListingId("");
    setErrorMessage("");
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-7">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#087531] text-3xl font-black text-white">
              ✓
            </div>

            <h1 className="mt-5 text-3xl font-black text-[#064d2b]">
              Listing Submitted
            </h1>

            <p className="mt-3 leading-7 text-slate-700">
              Your item was submitted successfully. It will appear
              publicly in the Marketplace after administrator
              approval.
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={postAnotherItem}
              className="rounded-xl bg-[#087531] px-5 py-3 font-black text-white transition hover:bg-[#064d2b]"
            >
              Post Another Item
            </button>

            <Link
              href="/marketplace/my-listings"
              className="rounded-xl border border-[#087531] px-5 py-3 text-center font-black text-[#087531] transition hover:bg-green-50"
            >
              View My Listings
            </Link>

            <Link
              href="/marketplace"
              className="rounded-xl border border-slate-300 px-5 py-3 text-center font-black text-slate-700 transition hover:bg-slate-50 sm:col-span-2"
            >
              Return to Marketplace
            </Link>
          </div>

          {createdListingId ? (
            <p className="mt-6 text-center text-xs text-slate-400">
              Listing ID: {createdListingId}
            </p>
          ) : null}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/marketplace"
          className="font-bold text-[#087531] hover:underline"
        >
          ← Back to Marketplace
        </Link>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-10">
          <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black">
            Free Marketplace Listing
          </span>

          <h1 className="mt-4 text-4xl font-black text-[#064d2b]">
            Post an Item
          </h1>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            Sell cars, phones, furniture, restaurant equipment,
            electronics, services, and other items to the Habeshawi
            community.
          </p>

          {errorMessage ? (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 font-semibold text-red-800"
            >
              {errorMessage}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8">
            <section>
              <h2 className="text-2xl font-black text-slate-900">
                Item Information
              </h2>

              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <Field label="Item title" required>
                  <input
                    type="text"
                    name="title"
                    required
                    maxLength={150}
                    placeholder="Example: 2018 Toyota Camry"
                    className="input-style"
                  />
                </Field>

                <Field label="Category" required>
                  <select
                    name="category"
                    required
                    defaultValue=""
                    className="input-style"
                  >
                    <option value="" disabled>
                      Select category
                    </option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Price" required>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    step="0.01"
                    placeholder="500"
                    className="input-style"
                  />
                </Field>

                <Field label="Condition">
                  <select
                    name="condition"
                    defaultValue=""
                    className="input-style"
                  >
                    <option value="">Select condition</option>

                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-6">
                <Field label="Description" required>
                  <textarea
                    name="description"
                    required
                    rows={7}
                    maxLength={3000}
                    placeholder="Describe the item, condition, age, included accessories, and pickup details."
                    className="input-style resize-y"
                  />
                </Field>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-black text-slate-900">
                Item Image
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Upload one clear image. Maximum file size is 5 MB.
              </p>

              <div className="mt-5">
                <Field label="Upload image" required>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    required
                    onChange={handleImageChange}
                    className="input-style"
                  />
                </Field>

                {preview ? (
                  <div className="relative mt-5 h-72 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                    <Image
                      src={preview}
                      alt="Selected marketplace item preview"
                      fill
                      unoptimized
                      className="object-contain"
                    />
                  </div>
                ) : null}
              </div>
            </section>

            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-black text-slate-900">
                Location
              </h2>

              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <Field label="City" required>
                  <input
                    type="text"
                    name="city"
                    required
                    maxLength={100}
                    placeholder="Silver Spring"
                    className="input-style"
                  />
                </Field>

                <Field label="State" required>
                  <input
                    type="text"
                    name="state"
                    required
                    maxLength={2}
                    defaultValue="MD"
                    placeholder="MD"
                    className="input-style uppercase"
                  />
                </Field>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-black text-slate-900">
                Seller Information
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Buyers will use this information to contact you.
              </p>

              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <Field label="Seller name" required>
                  <input
                    type="text"
                    name="seller_name"
                    required
                    maxLength={120}
                    placeholder="Your name"
                    className="input-style"
                  />
                </Field>

                <Field label="Phone number" required>
                  <input
                    type="tel"
                    name="seller_phone"
                    required
                    maxLength={30}
                    placeholder="(301) 555-0123"
                    className="input-style"
                  />
                </Field>

                <Field label="Email address" required>
                  <input
                    type="email"
                    name="seller_email"
                    required
                    maxLength={200}
                    placeholder="seller@example.com"
                    className="input-style"
                  />
                </Field>
              </div>
            </section>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              Do not include passwords, banking information, Social
              Security numbers, verification codes, or other
              sensitive information in your listing.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-[#087531] px-6 py-4 text-lg font-black text-white transition hover:bg-[#064d2b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Uploading and Submitting..."
                : "Submit Listing for Review"}
            </button>
          </form>
        </section>
      </div>

      <style jsx>{`
        :global(.input-style) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid rgb(203 213 225);
          padding: 0.875rem 1rem;
          color: rgb(15 23 42);
          background-color: white;
          outline: none;
        }

        :global(.input-style:focus) {
          border-color: #087531;
          box-shadow: 0 0 0 3px rgb(8 117 49 / 0.15);
        }
      `}</style>
    </main>
  );
}

function Field({
  label,
  required = false,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 font-bold text-slate-800">
      <span>
        {label}

        {required ? (
          <span className="ml-1 text-red-600">*</span>
        ) : null}
      </span>

      {children}
    </label>
  );
}