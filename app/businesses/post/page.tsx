"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const categories = [
  "Restaurants & Catering",
  "Grocery & Retail",
  "Professional Services",
  "Accounting & Tax",
  "Legal Services",
  "Real Estate",
  "Healthcare",
  "Beauty & Personal Care",
  "Home Services",
  "Automotive",
  "Technology",
  "Transportation",
  "Education",
  "Entertainment",
  "Other",
];

export default function PostBusinessPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const city = String(formData.get("city") || "").trim();
    const state = String(formData.get("state") || "").trim();
    const zipCode = String(formData.get("zip_code") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const email = String(formData.get("email") || "").trim();

    if (
      !name ||
      !category ||
      !description ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !phone ||
      !email
    ) {
      setErrorMessage("Please complete all required fields.");
      setIsSubmitting(false);
      return;
    }

    const specialtiesText = String(
      formData.get("specialties") || "",
    ).trim();

    const specialties = specialtiesText
      ? specialtiesText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    const { error } = await supabase.from("businesses").insert({
      name,
      category,
      description,
      address,
      city,
      state,
      zip_code: zipCode,
      phone,
      email,
      website: String(formData.get("website") || "").trim() || null,

      facebook_url:
        String(formData.get("facebook_url") || "").trim() || null,
      instagram_url:
        String(formData.get("instagram_url") || "").trim() || null,
      telegram_url:
        String(formData.get("telegram_url") || "").trim() || null,
      whatsapp:
        String(formData.get("whatsapp") || "").trim() || null,

      specialties,

      monday_hours:
        String(formData.get("monday_hours") || "").trim() || null,
      tuesday_hours:
        String(formData.get("tuesday_hours") || "").trim() || null,
      wednesday_hours:
        String(formData.get("wednesday_hours") || "").trim() || null,
      thursday_hours:
        String(formData.get("thursday_hours") || "").trim() || null,
      friday_hours:
        String(formData.get("friday_hours") || "").trim() || null,
      saturday_hours:
        String(formData.get("saturday_hours") || "").trim() || null,
      sunday_hours:
        String(formData.get("sunday_hours") || "").trim() || null,

      status: "pending",
      featured: false,
    });

    if (error) {
      setErrorMessage(`Unable to submit business: ${error.message}`);
      setIsSubmitting(false);
      return;
    }

    form.reset();
    setSubmitted(true);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border bg-white p-8 shadow-lg md:p-10">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-7">
            <div className="text-4xl">✓</div>

            <h1 className="mt-4 text-3xl font-black text-[#064d2b]">
              Business Submitted for Review
            </h1>

            <p className="mt-3 leading-7 text-slate-700">
              Thank you. Your business has been submitted successfully. It will
              appear in the Habeshawi Business Directory after administrator
              approval.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#087531] px-5 py-3 font-bold text-white hover:bg-[#064d2b]"
            >
              Submit Another Business
            </button>

            <Link
              href="/businesses"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#087531] px-5 py-3 font-bold text-[#087531] hover:bg-green-50"
            >
              Return to Businesses
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/businesses"
          className="font-bold text-[#087531] hover:text-[#064d2b]"
        >
          ← Back to Businesses
        </Link>

        <section className="mt-6 rounded-3xl border bg-white p-6 shadow-lg md:p-10">
          <div className="border-b pb-6">
            <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black">
              Free Business Listing
            </span>

            <h1 className="mt-4 text-4xl font-black text-[#064d2b]">
              Add Your Business
            </h1>

            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Add your Ethiopian, Eritrean, or community-serving business to
              the Habeshawi Marketplace directory. Every submission is reviewed
              before publication.
            </p>
          </div>

          {errorMessage && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 font-semibold text-red-800">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-8">
            <section>
              <h2 className="text-2xl font-black text-slate-900">
                Business information
              </h2>

              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <Field label="Business name" required>
                  <input
                    name="name"
                    required
                    placeholder="Example: Habesha Restaurant"
                    className="input-style"
                  />
                </Field>

                <Field label="Category" required>
                  <select name="category" required className="input-style">
                    <option value="">Select category</option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-6">
                <Field label="Business description" required>
                  <textarea
                    name="description"
                    required
                    rows={7}
                    placeholder="Describe your business, products, services, and what makes it special."
                    className="input-style resize-y"
                  />
                </Field>
              </div>

              <div className="mt-6">
                <Field label="Services and specialties">
                  <textarea
                    name="specialties"
                    rows={5}
                    placeholder={
                      "Enter one service per line.\nExample: Ethiopian catering\nTraditional coffee ceremony\nWedding catering"
                    }
                    className="input-style resize-y"
                  />
                </Field>
              </div>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-2xl font-black text-slate-900">
                Address and contact
              </h2>

              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <Field label="Street address" required>
                    <input
                      name="address"
                      required
                      placeholder="123 Main Street"
                      className="input-style"
                    />
                  </Field>
                </div>

                <Field label="City" required>
                  <input
                    name="city"
                    required
                    placeholder="Silver Spring"
                    className="input-style"
                  />
                </Field>

                <Field label="State" required>
                  <input
                    name="state"
                    required
                    defaultValue="MD"
                    placeholder="MD"
                    className="input-style"
                  />
                </Field>

                <Field label="ZIP code" required>
                  <input
                    name="zip_code"
                    required
                    placeholder="20910"
                    className="input-style"
                  />
                </Field>

                <Field label="Phone number" required>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(301) 555-0123"
                    className="input-style"
                  />
                </Field>

                <Field label="Email address" required>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="business@example.com"
                    className="input-style"
                  />
                </Field>

                <Field label="Website">
                  <input
                    type="url"
                    name="website"
                    placeholder="https://example.com"
                    className="input-style"
                  />
                </Field>
              </div>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-2xl font-black text-slate-900">
                Social media
              </h2>

              <div className="mt-5 grid gap-6 md:grid-cols-2">
                <Field label="Facebook page">
                  <input
                    type="url"
                    name="facebook_url"
                    placeholder="https://facebook.com/yourbusiness"
                    className="input-style"
                  />
                </Field>

                <Field label="Instagram page">
                  <input
                    type="url"
                    name="instagram_url"
                    placeholder="https://instagram.com/yourbusiness"
                    className="input-style"
                  />
                </Field>

                <Field label="Telegram">
                  <input
                    type="url"
                    name="telegram_url"
                    placeholder="https://t.me/yourbusiness"
                    className="input-style"
                  />
                </Field>

                <Field label="WhatsApp number">
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="+1 301 555 0123"
                    className="input-style"
                  />
                </Field>
              </div>
            </section>

            <section className="border-t pt-8">
              <h2 className="text-2xl font-black text-slate-900">
                Business hours
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Enter hours such as 9:00 AM – 6:00 PM or Closed.
              </p>

              <div className="mt-5 grid gap-6 md:grid-cols-2">
                {[
                  ["Monday", "monday_hours"],
                  ["Tuesday", "tuesday_hours"],
                  ["Wednesday", "wednesday_hours"],
                  ["Thursday", "thursday_hours"],
                  ["Friday", "friday_hours"],
                  ["Saturday", "saturday_hours"],
                  ["Sunday", "sunday_hours"],
                ].map(([day, name]) => (
                  <Field key={name} label={day}>
                    <input
                      name={name}
                      placeholder="9:00 AM – 6:00 PM"
                      className="input-style"
                    />
                  </Field>
                ))}
              </div>
            </section>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              By submitting this form, you confirm that you are authorized to
              provide this business information and that the information is
              accurate.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-[#087531] px-6 py-4 text-lg font-black text-white transition hover:bg-[#064d2b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Submitting…"
                : "Submit Business for Review"}
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
          outline: none;
          transition:
            border-color 150ms,
            box-shadow 150ms;
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
        {required && <span className="ml-1 text-red-600">*</span>}
      </span>

      {children}
    </label>
  );
}