const listings = [
  {
    title: "Toyota Camry",
    location: "Silver Spring, MD",
    price: "$18,900",
    image: "/listings/car.jpg",
  },
  {
    title: "Arabic Majlis Floor Sofa",
    location: "Rockville, MD",
    price: "$750",
    image: "/listings/sofa.jpg",
  },
  {
    title: "iPhone 17 Pro Max",
    location: "Washington, DC",
    price: "$850",
    image: "/listings/iphone.jpg",
  },
  {
    title: "Restaurant Equipment",
    location: "Hyattsville, MD",
    price: "$2,500",
    image: "/listings/restaurant-equipment.jpg",
  },
];

export default function FeaturedListings() {
  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-3xl font-black text-[#064d2b]">
          Featured Listings
        </h2>

        <button className="font-bold text-[#087531]">
          View All
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {listings.map((listing) => (
          <article
            key={listing.title}
            className="relative overflow-hidden rounded-2xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={listing.image}
              alt={listing.title}
              className="h-52 w-full object-cover"
            />

            <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
              Featured
            </div>

            <div className="p-5">
              <h3 className="text-xl font-black">
                {listing.title}
              </h3>

              <div className="mt-3 flex items-end justify-between">
                <p className="text-sm text-slate-500">
                  {listing.location}
                </p>

                <p className="text-xl font-black text-[#087531]">
                  {listing.price}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}