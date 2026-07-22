export default function JobsLoading() {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-12">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-64 rounded-3xl bg-green-900/20" />
        <div className="mt-8 h-32 rounded-2xl bg-white" />
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="h-80 rounded-2xl bg-white" />)}
        </div>
      </div>
    </main>
  );
}
