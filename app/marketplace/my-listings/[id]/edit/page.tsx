import Link from "next/link";

type EditListingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditListingPage({
  params,
}: EditListingPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <Link
          href="/marketplace/my-listings"
          className="mb-6 inline-block font-medium text-green-700 hover:underline"
        >
          ← Back to My Listings
        </Link>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Edit Listing
            </h1>

            <p className="mt-2 text-gray-600">
              Update the information for listing #{id}.
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block font-semibold text-gray-800"
              >
                Listing Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                defaultValue="iPhone 15 Pro"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block font-semibold text-gray-800"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                defaultValue="electronics"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              >
                <option value="cars">Cars</option>
                <option value="electronics">Phones & Electronics</option>
                <option value="furniture">Furniture</option>
                <option value="restaurant-equipment">
                  Restaurant Equipment
                </option>
                <option value="services">Services</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="price"
                  className="mb-2 block font-semibold text-gray-800"
                >
                  Price
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  defaultValue="750"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label
                  htmlFor="condition"
                  className="mb-2 block font-semibold text-gray-800"
                >
                  Condition
                </label>

                <select
                  id="condition"
                  name="condition"
                  defaultValue="excellent"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
                >
                  <option value="new">New</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="location"
                className="mb-2 block font-semibold text-gray-800"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                defaultValue="Silver Spring, MD"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block font-semibold text-gray-800"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={6}
                defaultValue="iPhone 15 Pro in excellent condition. The phone is unlocked and works perfectly."
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/marketplace/my-listings"
                className="rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}