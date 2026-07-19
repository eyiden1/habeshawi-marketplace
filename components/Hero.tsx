import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#053b24] via-[#087531] to-[#0b5d35] text-white">
      {/* Decorative background shapes */}
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:py-24">
        {/* Left side */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
            <span aria-hidden="true">🏠</span>
            Ethiopian & Eritrean Community Rentals
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Find Your Next Home
          </h1>

          <p className="mt-3 text-3xl font-bold text-yellow-300 sm:text-4xl">
            የሚከራይ ቤት
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">
            Search rooms, apartments, houses, basements and roommates across
            Washington, DC, Maryland and Virginia.
          </p>

          {/* Rental search */}
          <form
            action="/housing"
            method="get"
            className="mt-8 grid overflow-hidden rounded-2xl bg-white p-2 text-slate-900 shadow-2xl md:grid-cols-[1.4fr_1fr_auto]"
          >
            <label className="sr-only" htmlFor="location">
              City or ZIP code
            </label>

            <input
              id="location"
              name="location"
              type="text"
              placeholder="City, ZIP code or neighborhood"
              className="min-w-0 rounded-xl px-5 py-4 outline-none placeholder:text-slate-400"
            />

            <label className="sr-only" htmlFor="propertyType">
              Property type
            </label>

            <select
              id="propertyType"
              name="type"
              defaultValue=""
              className="border-t border-slate-200 bg-white px-5 py-4 outline-none md:border-l md:border-t-0"
            >
              <option value="">All rental types</option>
              <option value="room">Rooms</option>
              <option value="apartment">Apartments</option>
              <option value="house">Houses</option>
              <option value="basement">Basements</option>
              <option value="roommate">Roommates</option>
              <option value="commercial">Commercial</option>
            </select>

            <button
              type="submit"
              className="m-1 rounded-xl bg-[#087531] px-7 py-4 font-bold text-white transition hover:bg-[#064d2b]"
            >
              Search Rentals
            </button>
          </form>

          {/* Quick locations */}
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold text-white/70">Popular:</span>

            <Link
              href="/housing?location=Silver+Spring"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold transition hover:bg-white/20"
            >
              Silver Spring
            </Link>

            <Link
              href="/housing?location=Washington+DC"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold transition hover:bg-white/20"
            >
              Washington, DC
            </Link>

            <Link
              href="/housing?location=Alexandria"
              className="rounded-full border border-white/20 bg-white/10 px-4 py-2 font-semibold transition hover:bg-white/20"
            >
              Alexandria
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
          <p className="text-5xl font-black text-yellow-300">ሐበሻዊ</p>

          <p className="mt-2 text-xl font-bold uppercase tracking-[0.2em] text-white/80">
            Rentals
          </p>

          <div className="my-7 h-1 w-28 rounded-full bg-yellow-300" />

          <h2 className="text-3xl font-black leading-tight">
            Have a property available?
          </h2>

          <p className="mt-4 leading-7 text-white/80">
            Post your room, apartment, house or commercial space and connect
            directly with renters in the community.
          </p>

          <Link
            href="/post-ad"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-6 py-4 font-black text-[#053b24] transition hover:bg-yellow-300"
          >
            <span aria-hidden="true">➕</span>
            Post a Rental
          </Link>

          <div className="mt-8 flex h-2 overflow-hidden rounded-full">
            <div className="w-1/3 bg-green-500" />
            <div className="w-1/3 bg-yellow-400" />
            <div className="w-1/3 bg-red-500" />
          </div>
        </div>
      </div>
    </section>
  );
}