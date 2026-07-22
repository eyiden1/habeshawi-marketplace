import Image from "next/image";
import Link from "next/link";

export default async function ListingDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link
          href="/marketplace"
          className="mb-6 inline-block text-green-600 hover:underline"
        >
          ← Back to Marketplace
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="overflow-hidden rounded-xl bg-white shadow">
            <Image
              src="/phone1.jpg"
              alt="Listing"
              width={700}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <span className="rounded bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
              Electronics
            </span>

            <h1 className="mt-4 text-3xl font-bold">
              Sample Listing #{id}
            </h1>

            <p className="mt-4 text-4xl font-bold text-green-600">
              $750
            </p>

            <p className="mt-6 text-gray-700">
              This is a sample listing page. Once we connect Supabase,
              this page will automatically display the correct listing
              information, images, seller, and description.
            </p>

            <div className="mt-8 space-y-3">
              <div>
                <strong>Location:</strong> Silver Spring, MD
              </div>

              <div>
                <strong>Condition:</strong> Excellent
              </div>

              <div>
                <strong>Posted:</strong> Today
              </div>
            </div>

            <button className="mt-8 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700">
              Contact Seller
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}