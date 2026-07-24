import Link from "next/link";
import Image from "next/image";

import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

import { getBusinesses } from "@/lib/businesses/queries";

export default async function FeaturedBusinesses() {
  const businesses = await getBusinesses();
  const featured = businesses.slice(0, 4);

  return (
    <Section tone="white">
      <SectionHeader
        eyebrow="Support Local"
        title="Featured Businesses"
        description="Discover trusted businesses serving the Habesha community throughout the DMV."
        amharic="የተመረጡ ንግዶች"
        actionHref="/businesses"
        actionLabel="Explore Businesses"
      />

      {featured.length === 0 ? (
        <Card
          padding="lg"
          className="border-dashed bg-slate-50 text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
            🏪
          </div>

          <h3 className="mt-5 text-2xl font-black text-slate-900">
            No Businesses Yet
          </h3>

          <p className="mt-3 text-slate-600">
            Businesses will appear here after approval.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((business) => (
            <Link
              key={business.id}
              href={`/businesses/${business.id}`}
              className="group block h-full"
            >
              <Card hover padding="none" className="h-full overflow-hidden">
                <div className="relative h-48 bg-slate-100">
                  <Image
                    src={
                      business.coverImageUrl ||
                      "/business/default-business.jpg"
                    }
                    alt={business.name}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />

                  <div className="absolute -bottom-6 left-5 h-16 w-16 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                    <Image
                      src={
                        business.logoImageUrl ||
                        "/business/default-logo.jpg"
                      }
                      alt={`${business.name} logo`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="p-6 pt-10">
                  <h3 className="line-clamp-1 text-xl font-black text-slate-900 transition group-hover:text-[#087531]">
                    {business.name}
                  </h3>

                  <p className="mt-2 font-bold text-[#087531]">
                    {business.category}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {business.city}, {business.state}
                  </p>

                  {business.rating && (
                    <div className="mt-4 flex items-center gap-2 text-sm">
                      <span className="text-yellow-500">★★★★★</span>

                      <span className="font-bold">
                        {business.rating.toFixed(1)}
                      </span>

                      {business.reviewCount ? (
                        <span className="text-slate-500">
                          ({business.reviewCount})
                        </span>
                      ) : null}
                    </div>
                  )}

                  <div className="mt-5 font-bold text-[#087531]">
                    View Business →
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}