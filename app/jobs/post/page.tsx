"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const categories = [
  "Restaurant & Hospitality",
  "Driving & Delivery",
  "Cleaning",
  "Retail & Grocery",
  "Healthcare",
  "Information Technology",
  "Office & Administration",
  "Accounting & Finance",
  "Construction",
  "Security",
  "Childcare & Home Care",
  "Education",
  "Other",
];

const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
];

export default function PostJobPage() {
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

    const title = String(formData.get("title") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const employmentType = String(
      formData.get("employment_type") || "",
    ).trim();
    const location = String(formData.get("location") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const contactName = String(formData.get("contact_name") || "").trim();
    const contactEmail = String(formData.get("contact_email") || "").trim();

    if (
      !title ||
      !company ||
      !category ||
      !employmentType ||
      !location ||
      !description ||
      !contactName ||
      !contactEmail
    ) {
      setErrorMessage("Please complete all required fields.");
      setIsSubmitting(false);
      return;
    }

    const requirementsText = String(
      formData.get("requirements") || "",
    ).trim();

    const requirements = requirementsText
      ? requirementsText
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    const { error } = await supabase.from("jobs").insert({
      title,
      company,
      category,
      employment_type: employmentType,
      location,
      pay: String(formData.get("pay") || "").trim() || null,
      description,
      requirements,
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone:
        String(formData.get("contact_phone") || "").trim() || null,
      apply_url: String(formData.get("apply_url") || "").trim() || null,
      status: "pending",
    });

    if (error) {
      setErrorMessage(`Unable to submit job: ${error.message}`);
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
              Job Submitted for Review
            </h1>
            <p className="mt-3 leading-7 text-slate-700">
              Thank you for supporting the community. Your job was submitted
              successfully and will appear on the Jobs page after admin
              approval.
            </p>
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#087531] px-5 py-3 font-bold text-white hover:bg-[#064d2b]"
            >
              Post Another Job
            </button>
            <Link
              href="/jobs"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-[#087531] px-5 py-3 font-bold text-[#087531] hover:bg-green-50"
            >
              Return to Jobs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/jobs"
          className="font-bold text-[#087531] hover:text-[#064d2b]"
        >
          ← Back to Jobs
        </Link>

        <section className="mt-6 rounded-3xl border bg-white p-6 shadow-lg md:p-10">
          <div className="border-b pb-6">
            <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black">
              Free Community Posting
            </span>
            <h1 className="mt-4 text-4xl font-black text-[#064d2b]">
              Post a Job
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Share an opening with Ethiopian, Eritrean, and DMV community
              members. Posting is free, and every job is reviewed before it is
              published.
            </p>
          </div>

          {errorMessage && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 font-semibold text-red-800">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Job title" required>
                <input
                  name="title"
                  required
                  placeholder="Example: Restaurant Server"
                  className="input-style"
                />
              </Field>

              <Field label="Business or employer name" required>
                <input
                  name="company"
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

              <Field label="Employment type" required>
                <select
                  name="employment_type"
                  required
                  className="input-style"
                >
                  <option value="">Select employment type</option>
                  {employmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Location" required>
                <input
                  name="location"
                  required
                  placeholder="Example: Silver Spring, MD"
                  className="input-style"
                />
              </Field>

              <Field label="Salary or pay rate">
                <input
                  name="pay"
                  placeholder="Example: $20/hour or $55,000/year"
                  className="input-style"
                />
              </Field>
            </div>

            <Field label="Job description" required>
              <textarea
                name="description"
                required
                rows={7}
                placeholder="Describe the job duties, schedule, and important details."
                className="input-style resize-y"
              />
            </Field>

            <Field label="Requirements">
              <textarea
                name="requirements"
                rows={5}
                placeholder={
                  "Enter one requirement per line.\nExample: Weekend availability\nCustomer service experience"
                }
                className="input-style resize-y"
              />
            </Field>

            <div className="grid gap-6 border-t pt-7 md:grid-cols-2">
              <Field label="Contact name" required>
                <input
                  name="contact_name"
                  required
                  placeholder="Hiring manager name"
                  className="input-style"
                />
              </Field>

              <Field label="Contact email" required>
                <input
                  type="email"
                  name="contact_email"
                  required
                  placeholder="jobs@example.com"
                  className="input-style"
                />
              </Field>

              <Field label="Contact phone">
                <input
                  type="tel"
                  name="contact_phone"
                  placeholder="(301) 555-0123"
                  className="input-style"
                />
              </Field>

              <Field label="Application website">
                <input
                  type="url"
                  name="apply_url"
                  placeholder="https://example.com/apply"
                  className="input-style"
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
              By submitting, you confirm that this is a legitimate job opening.
              Do not request application fees, gift cards, banking passwords, or
              unnecessary Social Security information.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-[#087531] px-6 py-4 text-lg font-black text-white transition hover:bg-[#064d2b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Submitting…" : "Submit Job for Review"}
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
          transition: border-color 150ms, box-shadow 150ms;
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
