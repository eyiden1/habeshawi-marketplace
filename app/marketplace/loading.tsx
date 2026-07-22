export default function MarketplaceLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="animate-pulse">
          <div className="h-5 w-40 rounded bg-gray-200" />

          <div className="mt-6 h-10 w-72 rounded bg-gray-200" />

          <div className="mt-3 h-5 w-full max-w-xl rounded bg-gray-200" />

          <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row">
            <div className="h-12 flex-1 rounded-lg bg-gray-200" />
            <div className="h-12 w-full rounded-lg bg-gray-200 sm:w-32" />
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
              >
                <div className="h-56 w-full bg-gray-200" />

                <div className="p-5">
                  <div className="h-4 w-32 rounded bg-gray-200" />

                  <div className="mt-4 h-7 w-48 rounded bg-gray-200" />

                  <div className="mt-4 h-8 w-28 rounded bg-gray-200" />

                  <div className="mt-4 h-4 w-40 rounded bg-gray-200" />

                  <div className="mt-6 h-11 w-full rounded-lg bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center font-medium text-gray-500">
          Loading marketplace listings...
        </p>
      </div>
    </main>
  );
}