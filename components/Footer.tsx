import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#064d2b] text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-black text-yellow-400">
              ሐበሻዊ
            </h2>

            <p className="mt-2 text-xl font-bold">
              Habeshawi Rentals
            </p>

            <p className="mt-4 leading-7 text-green-100">
              Helping the Ethiopian and Eritrean community find
              rooms, apartments, houses and commercial properties
              across Washington DC, Maryland and Virginia.
            </p>

            <div className="mt-6 flex h-2 overflow-hidden rounded-full">
              <div className="w-1/3 bg-green-500" />
              <div className="w-1/3 bg-yellow-400" />
              <div className="w-1/3 bg-red-500" />
            </div>
          </div>

          {/* Rentals */}
          <div>
            <h3 className="text-xl font-bold text-yellow-300">
              Rentals
            </h3>

            <div className="mt-5 space-y-3">

              <Link href="/housing/rooms" className="block hover:text-yellow-300">
                🛏 Rooms
              </Link>

              <Link href="/housing/apartments" className="block hover:text-yellow-300">
                🏢 Apartments
              </Link>

              <Link href="/housing/houses" className="block hover:text-yellow-300">
                🏡 Houses
              </Link>

              <Link href="/housing/roommates" className="block hover:text-yellow-300">
                👥 Roommates
              </Link>

              <Link href="/housing" className="block hover:text-yellow-300">
                🏬 Commercial
              </Link>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-yellow-300">
              Quick Links
            </h3>

            <div className="mt-5 space-y-3">

              <Link href="/" className="block hover:text-yellow-300">
                Home
              </Link>

              <Link href="/housing" className="block hover:text-yellow-300">
                Browse Rentals
              </Link>

              <Link href="/post-ad" className="block hover:text-yellow-300">
                Post Rental
              </Link>

              <Link href="/pricing" className="block hover:text-yellow-300">
                Pricing
              </Link>

              <Link href="/my-listings" className="block hover:text-yellow-300">
                My Listings
              </Link>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold text-yellow-300">
              Contact
            </h3>

            <div className="mt-5 space-y-4">

              <p>☎ 240-391-8621</p>

              <p>✉ habeshawi2023@gmail.com</p>

              <p>
                📍 Washington DC
                <br />
                Maryland
                <br />
                Virginia
              </p>

              <div className="pt-2">
                <p className="font-semibold">Follow Us</p>

                <div className="mt-3 flex gap-4 text-2xl">
                  <span>📘</span>
                  <span>📸</span>
                  <span>💬</span>
                  <span>🎵</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-green-100">
          © {new Date().getFullYear()} Habeshawi Rentals. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}