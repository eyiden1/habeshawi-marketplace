const categories = [
  { icon: "🛍️", name: "BUY", amharic: "ይግዙ" },
  { icon: "🏷️", name: "SELL", amharic: "ይሽጡ" },
  { icon: "🏠", name: "RENT", amharic: "ይከራዩ" },
  { icon: "💼", name: "JOBS", amharic: "ስራ" },
  { icon: "👥", name: "CONNECT", amharic: "ይገናኙ" },
  { icon: "📣", name: "PROMOTION", amharic: "ማስታወቂያ" },
  { icon: "🏢", name: "BUSINESSES", amharic: "ንግድ" },
  { icon: "📅", name: "EVENTS", amharic: "ዝግጅቶች" },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid gap-4 rounded-2xl border bg-white p-5 shadow-sm sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
        {categories.map((category) => (
          <button
            key={category.name}
            className="rounded-xl p-4 text-center transition hover:bg-green-50"
          >
            <div className="text-4xl">{category.icon}</div>
            <p className="mt-2 font-black text-[#064d2b]">{category.name}</p>
            <p className="font-semibold">{category.amharic}</p>
          </button>
        ))}
      </div>
    </section>
  );
}