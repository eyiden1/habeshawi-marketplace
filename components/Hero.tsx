export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#f3f4e9] via-white to-[#e8f3eb]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2">
        <div>
          <p className="text-3xl font-black text-[#064d2b]">
            The Ethiopian Community
          </p>

          <h2 className="mt-1 text-6xl font-black leading-none text-[#064d2b]">
            Marketplace
          </h2>

          <p className="mt-6 max-w-xl text-2xl leading-relaxed">
            Buy, Sell, Rent, Find Jobs, Connect and Grow with our Community
          </p>

          <div className="mt-8 flex max-w-3xl flex-col overflow-hidden rounded-xl border bg-white shadow-lg md:flex-row">
            <input
              className="min-w-0 flex-1 px-5 py-5 outline-none"
              placeholder="What are you looking for?"
            />

            <select className="border-t px-5 py-5 outline-none md:border-l md:border-t-0">
              <option>All Categories</option>
              <option>Marketplace</option>
              <option>Jobs</option>
              <option>Housing</option>
              <option>Services</option>
            </select>

            <input
              className="min-w-0 border-t px-5 py-5 outline-none md:border-l md:border-t-0"
              placeholder="Location"
            />

            <button className="m-2 rounded-lg bg-[#087531] px-8 py-3 font-bold text-white">
              Search
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-black text-[#064d2b]">10,000+</p>
              <p className="text-sm">Active Users</p>
            </div>

            <div>
              <p className="text-2xl font-black text-[#d4a600]">5,000+</p>
              <p className="text-sm">Listings</p>
            </div>

            <div>
              <p className="text-2xl font-black text-red-600">2,000+</p>
              <p className="text-sm">Jobs Posted</p>
            </div>

            <div>
              <p className="text-2xl font-black text-[#087531]">1,000+</p>
              <p className="text-sm">Businesses</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-[#064d2b] p-10 text-white shadow-2xl">
          <p className="text-5xl font-black text-yellow-400">ሐበሻዊ</p>
          <p className="mt-3 text-2xl font-bold">ONLINE</p>

          <div className="my-8 h-1 w-32 bg-yellow-400" />

          <p className="text-3xl font-bold leading-relaxed">
            One Marketplace.
            <br />
            Endless Opportunities.
          </p>

          <p className="mt-8 text-lg">
            Connecting Ethiopians across Washington, DC, Maryland and Virginia.
          </p>

          <div className="mt-10 flex h-5 overflow-hidden rounded-full">
            <div className="w-1/3 bg-green-600" />
            <div className="w-1/3 bg-yellow-400" />
            <div className="w-1/3 bg-red-600" />
          </div>
        </div>
      </div>
    </section>
  );
}