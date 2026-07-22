"use client";

export default function JobsError({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-[#f7f8f5] px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-3xl border bg-white p-8 text-center shadow-lg">
        <h1 className="text-3xl font-black text-[#064d2b]">Unable to load jobs</h1>
        <p className="mt-3 text-slate-600">Please check your connection and try again.</p>
        <button type="button" onClick={reset} className="mt-6 rounded-xl bg-[#087531] px-6 py-3 font-bold text-white hover:bg-[#064d2b]">Try Again</button>
      </div>
    </main>
  );
}
