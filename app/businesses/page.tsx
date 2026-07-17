export default function BusinessesPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black text-[#064d2b]">
          Businesses
        </h1>

        <p className="mt-4 text-xl text-slate-600">
          Discover Ethiopian-owned businesses in the DMV area.
        </p>

        <div className="mt-10 rounded-2xl border bg-white p-8 shadow">
          <p className="text-lg font-semibold">
            Business directory coming soon
          </p>

          <p className="mt-3 text-slate-600">
            Users will be able to browse restaurants, stores, transportation,
            real estate, tax services, legal services, and other local
            businesses.
          </p>
        </div>
      </div>
    </main>
  );
}