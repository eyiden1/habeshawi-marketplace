"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type BusinessForm = {
  name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  email: string;
  website: string;
  facebook_url: string;
  instagram_url: string;
  telegram_url: string;
  whatsapp: string;
  specialties: string;
  monday_hours: string;
  tuesday_hours: string;
  wednesday_hours: string;
  thursday_hours: string;
  friday_hours: string;
  saturday_hours: string;
  sunday_hours: string;
  image_url: string;
  logo_url: string;
};

type BusinessRow = {
  id: string;
  user_id: string | null;
  name: string;
  category: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip_code: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  telegram_url: string | null;
  whatsapp: string | null;
  specialties: string[] | null;
  monday_hours: string | null;
  tuesday_hours: string | null;
  wednesday_hours: string | null;
  thursday_hours: string | null;
  friday_hours: string | null;
  saturday_hours: string | null;
  sunday_hours: string | null;
  image_url: string | null;
  logo_url: string | null;
  status: string | null;
};

const initialForm: BusinessForm = {
  name: "",
  category: "",
  description: "",
  address: "",
  city: "",
  state: "DC",
  zip_code: "",
  phone: "",
  email: "",
  website: "",
  facebook_url: "",
  instagram_url: "",
  telegram_url: "",
  whatsapp: "",
  specialties: "",
  monday_hours: "",
  tuesday_hours: "",
  wednesday_hours: "",
  thursday_hours: "",
  friday_hours: "",
  saturday_hours: "",
  sunday_hours: "",
  image_url: "",
  logo_url: "",
};

const categories = [
  "Restaurant",
  "Coffee Shop",
  "Grocery Store",
  "Retail Store",
  "Professional Services",
  "Tax Services",
  "Legal Services",
  "Immigration Services",
  "Real Estate",
  "Insurance",
  "Travel Agency",
  "Transportation",
  "Auto Services",
  "Home Services",
  "Beauty & Personal Care",
  "Health & Wellness",
  "Event Services",
  "Community Organization",
  "Religious Organization",
  "Other",
];

const states = [
  { value: "DC", label: "Washington, DC" },
  { value: "MD", label: "Maryland" },
  { value: "VA", label: "Virginia" },
  { value: "DE", label: "Delaware" },
  { value: "PA", label: "Pennsylvania" },
  { value: "WV", label: "West Virginia" },
  { value: "Other", label: "Other" },
];

function optionalText(value: string) {
  const trimmedValue = value.trim();
  return trimmedValue || null;
}

function normalizeUrl(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  if (
    trimmedValue.startsWith("/") ||
    trimmedValue.startsWith("http://") ||
    trimmedValue.startsWith("https://")
  ) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

function convertBusinessToForm(business: BusinessRow): BusinessForm {
  return {
    name: business.name ?? "",
    category: business.category ?? "",
    description: business.description ?? "",
    address: business.address ?? "",
    city: business.city ?? "",
    state: business.state ?? "DC",
    zip_code: business.zip_code ?? "",
    phone: business.phone ?? "",
    email: business.email ?? "",
    website: business.website ?? "",
    facebook_url: business.facebook_url ?? "",
    instagram_url: business.instagram_url ?? "",
    telegram_url: business.telegram_url ?? "",
    whatsapp: business.whatsapp ?? "",
    specialties: business.specialties?.join(", ") ?? "",
    monday_hours: business.monday_hours ?? "",
    tuesday_hours: business.tuesday_hours ?? "",
    wednesday_hours: business.wednesday_hours ?? "",
    thursday_hours: business.thursday_hours ?? "",
    friday_hours: business.friday_hours ?? "",
    saturday_hours: business.saturday_hours ?? "",
    sunday_hours: business.sunday_hours ?? "",
    image_url: business.image_url ?? "",
    logo_url: business.logo_url ?? "",
  };
}

export default function EditBusinessPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const businessId =
    typeof params.id === "string"
      ? params.id
      : Array.isArray(params.id)
        ? params.id[0]
        : "";

  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<BusinessForm>(initialForm);
  const [currentStatus, setCurrentStatus] = useState<string>("pending");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadBusiness() {
      setLoading(true);
      setErrorMessage("");

      if (!businessId) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const {
        data: { user: currentUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (!isMounted) {
        return;
      }

      if (userError) {
        setErrorMessage(userError.message);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("businesses")
        .select(
          `
            id,
            user_id,
            name,
            category,
            description,
            address,
            city,
            state,
            zip_code,
            phone,
            email,
            website,
            facebook_url,
            instagram_url,
            telegram_url,
            whatsapp,
            specialties,
            monday_hours,
            tuesday_hours,
            wednesday_hours,
            thursday_hours,
            friday_hours,
            saturday_hours,
            sunday_hours,
            image_url,
            logo_url,
            status
          `,
        )
        .eq("id", businessId)
        .eq("user_id", currentUser.id)
        .maybeSingle();

      if (!isMounted) {
        return;
      }

      if (error) {
        console.error("Unable to load business:", error);
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      if (!data) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const business = data as BusinessRow;

      setForm(convertBusinessToForm(business));
      setCurrentStatus(business.status ?? "pending");
      setLoading(false);
    }

    loadBusiness();

    return () => {
      isMounted = false;
    };
  }, [businessId]);

  function updateField<K extends keyof BusinessForm>(
    field: K,
    value: BusinessForm[K],
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (!user) {
      setErrorMessage("You must be signed in to edit this business.");
      return;
    }

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.description.trim() ||
      !form.address.trim() ||
      !form.city.trim() ||
      !form.state.trim()
    ) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    const specialties = form.specialties
      .split(",")
      .map((specialty) => specialty.trim())
      .filter(Boolean);

    setSaving(true);

    const { error } = await supabase
      .from("businesses")
      .update({
        name: form.name.trim(),
        category: form.category.trim(),
        description: form.description.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        zip_code: optionalText(form.zip_code),
        phone: optionalText(form.phone),
        email: optionalText(form.email),
        website: normalizeUrl(form.website),
        facebook_url: normalizeUrl(form.facebook_url),
        instagram_url: normalizeUrl(form.instagram_url),
        telegram_url: normalizeUrl(form.telegram_url),
        whatsapp: optionalText(form.whatsapp),
        specialties,
        monday_hours: optionalText(form.monday_hours),
        tuesday_hours: optionalText(form.tuesday_hours),
        wednesday_hours: optionalText(form.wednesday_hours),
        thursday_hours: optionalText(form.thursday_hours),
        friday_hours: optionalText(form.friday_hours),
        saturday_hours: optionalText(form.saturday_hours),
        sunday_hours: optionalText(form.sunday_hours),
        image_url: normalizeUrl(form.image_url),
        logo_url: normalizeUrl(form.logo_url),
        status: "pending",
        featured: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", businessId)
      .eq("user_id", user.id);

    if (error) {
      console.error("Unable to update business:", error);
      setErrorMessage(error.message);
      setSaving(false);
      return;
    }

    setCurrentStatus("pending");
    setSuccessMessage(
      "Your business was updated successfully and returned to pending review.",
    );
    setSaving(false);

    window.setTimeout(() => {
      router.push("/businesses/my-businesses");
      router.refresh();
    }, 1800);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <section className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto h-11 w-11 animate-spin rounded-full border-4 border-slate-200 border-t-[#087531]" />

            <p className="mt-5 font-bold text-slate-700">
              Loading business information...
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <section className="rounded-3xl border border-amber-200 bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🔒</div>

            <h1 className="mt-5 text-3xl font-black text-slate-950">
              Sign in to edit your business
            </h1>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
              Only the account that submitted this business can edit it.
            </p>

            <Link
              href={`/signin?redirect=/businesses/edit/${businessId}`}
              className="mt-7 inline-flex rounded-xl bg-[#087531] px-7 py-3 font-black text-white transition hover:bg-[#064d2b]"
            >
              Sign In
            </Link>
          </section>
        </div>
      </main>
    );
  }

  if (notFound) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <section className="rounded-3xl border border-red-200 bg-white p-10 text-center shadow-sm">
            <div className="text-5xl">🏢</div>

            <h1 className="mt-5 text-3xl font-black text-slate-950">
              Business not found
            </h1>

            <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
              This business does not exist, or it does not belong to your
              account.
            </p>

            <Link
              href="/businesses/my-businesses"
              className="mt-7 inline-flex rounded-xl bg-[#087531] px-7 py-3 font-black text-white transition hover:bg-[#064d2b]"
            >
              Return to My Businesses
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/businesses/my-businesses"
          className="inline-flex font-bold text-[#064d2b] hover:underline"
        >
          ← Back to My Businesses
        </Link>

        <section className="mt-6 rounded-3xl bg-[#064d2b] px-6 py-10 text-white shadow-lg sm:px-10">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-yellow-300">
            Business Owner Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-black sm:text-5xl">
            Edit Business
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-green-50">
            Update your business information, contact details, operating
            hours, specialties, and images.
          </p>

          <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm leading-6">
            Current status:{" "}
            <span className="font-black capitalize">{currentStatus}</span>.
            Saving changes will return the business to pending review.
          </div>
        </section>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {errorMessage ? (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-900"
            >
              <p className="font-black">Unable to save changes</p>
              <p className="mt-1">{errorMessage}</p>
            </div>
          ) : null}

          {successMessage ? (
            <div
              role="status"
              className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-900"
            >
              <p className="font-black">Business updated</p>
              <p className="mt-1">{successMessage}</p>
            </div>
          ) : null}

          <FormSection
            title="Business Information"
            description="Update the main information customers see."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Business name"
                required
                className="md:col-span-2"
              >
                <input
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    updateField("name", event.target.value)
                  }
                  required
                  maxLength={150}
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Business category" required>
                <select
                  value={form.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  required
                  className={inputClasses}
                >
                  <option value="">Select a category</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Owner account">
                <input
                  type="text"
                  value={user.email ?? "Signed-in user"}
                  disabled
                  className={`${inputClasses} cursor-not-allowed bg-slate-100 text-slate-500`}
                />
              </FormField>

              <FormField
                label="Business description"
                required
                className="md:col-span-2"
              >
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  required
                  rows={7}
                  maxLength={3000}
                  className={inputClasses}
                />
              </FormField>

              <FormField
                label="Services and specialties"
                className="md:col-span-2"
                hint="Separate each item with a comma."
              >
                <input
                  type="text"
                  value={form.specialties}
                  onChange={(event) =>
                    updateField("specialties", event.target.value)
                  }
                  className={inputClasses}
                />
              </FormField>
            </div>
          </FormSection>

          <FormSection
            title="Business Location"
            description="Update the physical business address."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Street address"
                required
                className="md:col-span-2"
              >
                <input
                  type="text"
                  value={form.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                  required
                  className={inputClasses}
                />
              </FormField>

              <FormField label="City" required>
                <input
                  type="text"
                  value={form.city}
                  onChange={(event) =>
                    updateField("city", event.target.value)
                  }
                  required
                  className={inputClasses}
                />
              </FormField>

              <FormField label="State" required>
                <select
                  value={form.state}
                  onChange={(event) =>
                    updateField("state", event.target.value)
                  }
                  required
                  className={inputClasses}
                >
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="ZIP code">
                <input
                  type="text"
                  value={form.zip_code}
                  onChange={(event) =>
                    updateField("zip_code", event.target.value)
                  }
                  maxLength={10}
                  className={inputClasses}
                />
              </FormField>
            </div>
          </FormSection>

          <FormSection
            title="Contact Information"
            description="Update the ways customers contact your business."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <FormField label="Business phone">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    updateField("phone", event.target.value)
                  }
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Business email">
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Website" className="md:col-span-2">
                <input
                  type="text"
                  value={form.website}
                  onChange={(event) =>
                    updateField("website", event.target.value)
                  }
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Facebook URL">
                <input
                  type="text"
                  value={form.facebook_url}
                  onChange={(event) =>
                    updateField("facebook_url", event.target.value)
                  }
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Instagram URL">
                <input
                  type="text"
                  value={form.instagram_url}
                  onChange={(event) =>
                    updateField("instagram_url", event.target.value)
                  }
                  className={inputClasses}
                />
              </FormField>

              <FormField label="Telegram URL">
                <input
                  type="text"
                  value={form.telegram_url}
                  onChange={(event) =>
                    updateField("telegram_url", event.target.value)
                  }
                  className={inputClasses}
                />
              </FormField>

              <FormField label="WhatsApp number">
                <input
                  type="tel"
                  value={form.whatsapp}
                  onChange={(event) =>
                    updateField("whatsapp", event.target.value)
                  }
                  className={inputClasses}
                />
              </FormField>
            </div>
          </FormSection>

          <FormSection
            title="Business Hours"
            description="Use formats such as 9:00 AM – 8:00 PM, Open 24 Hours, or Closed."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <HoursField
                label="Monday"
                value={form.monday_hours}
                onChange={(value) =>
                  updateField("monday_hours", value)
                }
              />

              <HoursField
                label="Tuesday"
                value={form.tuesday_hours}
                onChange={(value) =>
                  updateField("tuesday_hours", value)
                }
              />

              <HoursField
                label="Wednesday"
                value={form.wednesday_hours}
                onChange={(value) =>
                  updateField("wednesday_hours", value)
                }
              />

              <HoursField
                label="Thursday"
                value={form.thursday_hours}
                onChange={(value) =>
                  updateField("thursday_hours", value)
                }
              />

              <HoursField
                label="Friday"
                value={form.friday_hours}
                onChange={(value) =>
                  updateField("friday_hours", value)
                }
              />

              <HoursField
                label="Saturday"
                value={form.saturday_hours}
                onChange={(value) =>
                  updateField("saturday_hours", value)
                }
              />

              <HoursField
                label="Sunday"
                value={form.sunday_hours}
                onChange={(value) =>
                  updateField("sunday_hours", value)
                }
              />
            </div>
          </FormSection>

          <FormSection
            title="Business Images"
            description="Update the logo and business cover image."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Logo image URL"
                hint="You may also use a local path such as /business/logo.jpg."
              >
                <input
                  type="text"
                  value={form.logo_url}
                  onChange={(event) =>
                    updateField("logo_url", event.target.value)
                  }
                  className={inputClasses}
                />
              </FormField>

              <FormField
                label="Cover image URL"
                hint="You may also use a local path such as /business/store.jpg."
              >
                <input
                  type="text"
                  value={form.image_url}
                  onChange={(event) =>
                    updateField("image_url", event.target.value)
                  }
                  className={inputClasses}
                />
              </FormField>
            </div>
          </FormSection>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <h2 className="font-black text-amber-950">
                Approval notice
              </h2>

              <p className="mt-2 text-sm leading-6 text-amber-900">
                After saving, the business status will change to pending so an
                administrator can review the updated information.
              </p>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/businesses/my-businesses"
                className="rounded-xl border border-slate-300 px-7 py-3 text-center font-black text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#087531] px-8 py-3 font-black text-white transition hover:bg-[#064d2b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving Changes..." : "Save Business Changes"}
              </button>
            </div>
          </section>
        </form>
      </div>
    </main>
  );
}

const inputClasses =
  "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#087531] focus:ring-2 focus:ring-green-100";

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="border-b border-slate-200 pb-5">
        <h2 className="text-2xl font-black text-slate-950">{title}</h2>
        <p className="mt-2 leading-7 text-slate-600">{description}</p>
      </div>

      <div className="mt-6">{children}</div>
    </section>
  );
}

function FormField({
  label,
  required = false,
  hint,
  className = "",
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="font-black text-slate-800">
        {label}
        {required ? <span className="ml-1 text-red-600">*</span> : null}
      </span>

      {children}

      {hint ? (
        <span className="mt-2 block text-sm text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
}

function HoursField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <FormField label={label}>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="9:00 AM – 8:00 PM"
        className={inputClasses}
      />
    </FormField>
  );
}