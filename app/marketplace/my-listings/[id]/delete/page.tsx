import Link from "next/link";

type DeleteListingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DeleteListingPage({
  params,
}: DeleteListingPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto flex max-w-2xl items-center justify-center px-4 py-16">
        <div className="w-full rounded-2xl border border-red-200 bg-white p-6 text-center shadow-sm md:p-8">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
            🗑️
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Delete Listing
          </h1>

          <p className="mt-3 text-gray-600">
            Are you sure you want to delete listing #{id}?
          </p>

          <p className="mt-2 text-sm font-medium text-red-600">
            This action cannot be undone.
          </p>

          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-4 text-left">
            <p className="text-sm text-gray-500">Listing</p>

            <h2 className="mt-1 text-lg font-semibold text-gray-900">
              iPhone 15 Pro
            </h2>

            <p className="mt-1 font-bold text-green-700">$750</p>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/marketplace/my-listings"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="button"
              className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Yes, Delete Listing
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}