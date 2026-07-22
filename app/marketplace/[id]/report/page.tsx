import Link from "next/link";

type ReportListingPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ReportListingPage({
  params,
}: ReportListingPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-10">
        <Link
          href={`/marketplace/${id}`}
          className="font-medium text-green-700 hover:underline"
        >
          ← Back to Listing
        </Link>

        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
              🚩
            </div>

            <h1 className="mt-5 text-3xl font-bold text-gray-900">
              Report Listing
            </h1>

            <p className="mt-2 text-gray-600">
              Tell us why listing #{id} should be reviewed.
            </p>
          </div>

          <form className="space-y-6">
            <fieldset>
              <legend className="mb-3 font-semibold text-gray-900">
                What is wrong with this listing?
              </legend>

              <div className="space-y-3">
                {[
                  "Possible scam or fraud",
                  "Incorrect or misleading information",
                  "Prohibited or unsafe item",
                  "Duplicate listing",
                  "Seller is asking for advance payment",
                  "Spam or advertising",
                  "Other",
                ].map((reason) => (
                  <label
                    key={reason}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4 hover:border-green-400 hover:bg-green-50"
                  >
                    <input
                      type="radio"
                      name="reason"
                      value={reason}
                      required
                      className="h-4 w-4 accent-green-700"
                    />

                    <span className="font-medium text-gray-800">
                      {reason}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div>
              <label
                htmlFor="details"
                className="mb-2 block font-semibold text-gray-900"
              >
                Additional Details
              </label>

              <textarea
                id="details"
                name="details"
                rows={6}
                placeholder="Explain what happened or why this listing appears suspicious..."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
              <p className="text-sm leading-6 text-yellow-900">
                Do not include passwords, banking information, Social Security
                numbers, or other sensitive personal information.
              </p>
            </div>

            <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">
              <Link
                href={`/marketplace/${id}`}
                className="rounded-lg border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}