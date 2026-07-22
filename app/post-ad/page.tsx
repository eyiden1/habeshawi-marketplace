"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function PostAdPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editLink, setEditLink] = useState("");
  const [createdRentalId, setCreatedRentalId] = useState("");
  const [copied, setCopied] = useState(false);

  async function copyEditLink() {
    if (!editLink) return;

    try {
      await navigator.clipboard.writeText(editLink);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert("Unable to copy the link. Please copy it manually.");
    }
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const bedroomsValue = formData.get("bedrooms");
    const bathroomsValue = formData.get("bathrooms");
    const availableDateValue = formData.get("available_date");

    const imageFiles = formData
      .getAll("photos")
      .filter(
        (file): file is File =>
          file instanceof File && file.size > 0
      );

    if (imageFiles.length === 0) {
      alert("Please upload at least one property photo.");
      setIsSubmitting(false);
      return;
    }

    if (imageFiles.length > 5) {
      alert("You can upload a maximum of 5 photos.");
      setIsSubmitting(false);
      return;
    }

    const imageUrls: string[] = [];

    for (const imageFile of imageFiles) {
      if (imageFile.size > 5 * 1024 * 1024) {
        alert(`${imageFile.name} must be 5 MB or smaller.`);
        setIsSubmitting(false);
        return;
      }

      const extension =
        imageFile.name.split(".").pop()?.toLowerCase() ?? "jpg";

      const filePath =
        `rentals/${crypto.randomUUID()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("housing-images")
        .upload(filePath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        alert(
          `Unable to upload ${imageFile.name}: ${uploadError.message}`
        );
        setIsSubmitting(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("housing-images")
        .getPublicUrl(filePath);

      imageUrls.push(publicUrlData.publicUrl);
    }

    const imageUrl = imageUrls[0];

    // Create a private token known only to the person posting.
    const editToken = crypto.randomUUID();

    const { data: rental, error } = await supabase
      .from("rentals")
      .insert({
        title: formData.get("title"),
        property_type: formData.get("property_type"),
        price: Number(formData.get("price")),
        location: formData.get("location"),

        bedrooms: bedroomsValue
          ? Number(bedroomsValue)
          : null,

        bathrooms: bathroomsValue
          ? Number(bathroomsValue)
          : null,

        available_date: availableDateValue || null,
        description: formData.get("description"),
        phone: formData.get("phone"),
        whatsapp: formData.get("whatsapp") || null,
        email: formData.get("email") || null,
        image_url: imageUrl,

        edit_token: editToken,
status: "draft",
payment_status: "unpaid",
      })
      .select("id")
      .single();

    if (error) {
      alert(`Unable to submit rental: ${error.message}`);
      setIsSubmitting(false);
      return;
    }

    if (!rental) {
      alert(
        "Rental was saved, but its ID could not be retrieved."
      );
      setIsSubmitting(false);
      return;
    }

    const rentalImages = imageUrls.map((url, index) => ({
      rental_id: rental.id,
      image_url: url,
      display_order: index + 1,
    }));

    const { error: imagesError } = await supabase
      .from("rental_images")
      .insert(rentalImages);

    if (imagesError) {
      alert(
        `Rental saved, but the photo records could not be saved: ${imagesError.message}`
      );
      setIsSubmitting(false);
      return;
    }

    const privateEditLink =
      `${window.location.origin}/post-ad/edit/${rental.id}` +
      `?token=${editToken}`;

    // Save the link in this browser as a backup.
    localStorage.setItem(
      `rental-edit-link-${rental.id}`,
      privateEditLink
    );

    setCreatedRentalId(rental.id);
    setEditLink(privateEditLink);
    setIsSubmitting(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (editLink && createdRentalId) {
    return (
      <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
          <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
            <h1 className="text-3xl font-bold text-[#064d2b]">
              Listing Created
            </h1>

            <p className="mt-3 text-slate-700">
              Your listing was saved. It will not appear publicly
              until payment and admin approval are completed.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 p-6">
            <h2 className="text-xl font-bold text-amber-900">
              Save Your Private Edit Link
            </h2>

            <p className="mt-2 text-sm text-amber-800">
              Anyone who has this link can edit the listing. Do not
              share it publicly.
            </p>

            <div className="mt-4 break-all rounded-lg border bg-white p-4 text-sm">
              {editLink}
            </div>

            <button
              type="button"
              onClick={copyEditLink}
              className="mt-4 rounded-lg border border-[#087531] px-5 py-3 font-semibold text-[#087531] hover:bg-green-50"
            >
              {copied ? "Link Copied" : "Copy Private Edit Link"}
            </button>
          </div>

          <div className="mt-8">
            <a
              href={`/pricing?rentalId=${createdRentalId}`}
              className="block rounded-lg bg-[#087531] px-6 py-4 text-center text-lg font-semibold text-white hover:bg-[#064d2b]"
            >
              Continue to Payment
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="text-4xl font-bold text-[#064d2b]">
          Post a Rental
        </h1>

        <p className="mt-3 text-slate-600">
          Add your apartment, house, room, or roommate listing.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid gap-5"
        >
          <input
            type="text"
            name="title"
            placeholder="Example: 2-bedroom apartment in Silver Spring"
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />

          <select
            name="property_type"
            required
            defaultValue=""
            className="rounded-lg border border-slate-300 px-4 py-3"
          >
            <option value="" disabled>
              Property type
            </option>

            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="room">Room</option>
            <option value="roommate">Roommate</option>
          </select>

          <input
            type="number"
            name="price"
            min="0"
            step="0.01"
            placeholder="Monthly rent"
            required
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            required
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <input
              type="number"
              name="bedrooms"
              min="0"
              placeholder="Bedrooms"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />

            <input
              type="number"
              name="bathrooms"
              min="0"
              step="0.5"
              placeholder="Bathrooms"
              className="rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="available_date"
              className="mb-2 block font-semibold text-slate-700"
            >
              Available Date
            </label>

            <input
              id="available_date"
              type="date"
              name="available_date"
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <input
            type="tel"
            name="whatsapp"
            placeholder="WhatsApp"
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <div>
            <h2 className="mb-3 text-lg font-semibold text-[#064d2b]">
              Amenities
            </h2>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="amenities"
                  value="parking"
                />
                Parking
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="amenities"
                  value="utilities-included"
                />
                Utilities Included
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="amenities"
                  value="wifi-included"
                />
                Wi-Fi Included
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="amenities"
                  value="laundry"
                />
                Laundry
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="amenities"
                  value="air-conditioning"
                />
                Air Conditioning
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="amenities"
                  value="pets-allowed"
                />
                Pets Allowed
              </label>
            </div>
          </div>

          <textarea
            name="description"
            placeholder="Description"
            rows={5}
            className="rounded-lg border border-slate-300 px-4 py-3"
          />

          <div>
            <label
              htmlFor="photos"
              className="mb-2 block font-semibold text-slate-700"
            >
              Property Photos
            </label>

            <input
              id="photos"
              type="file"
              name="photos"
              multiple
              required
              accept="image/*"
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />

            <p className="mt-2 text-sm text-slate-500">
              Upload 1 to 5 photos. Maximum 5 MB per photo.
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-[#087531] px-6 py-3 font-semibold text-white hover:bg-[#064d2b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Submitting Rental..."
              : "Submit Rental"}
          </button>
        </form>
      </div>
    </main>
  );
}