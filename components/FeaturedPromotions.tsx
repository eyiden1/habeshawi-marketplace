import Link from "next/link";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

const promotions = [
  {
    id: 1,
    title: "Promote Your Restaurant",
    category: "Restaurant Promotion",
    description:
      "Reach local customers and showcase your food, specials, events, and catering services.",
    icon: "🍽️",
    href: "/post-ad",
  },
  {
    id: 2,
    title: "Grow Your Local Business",
    category: "Business Promotion",
    description:
      "Advertise your store, professional service, community organization, or special offer.",
    icon: "📣",
    href: "/post-ad",
  },
  {
    id: 3,
    title: "Promote an Event",
    category: "Community Event",
    description:
      "Share concerts, cultural celebrations, networking events, and community gatherings.",
    icon: "🎉",
    href: "/post-ad",
  },
];

export default function FeaturedPromotions() {
  return (
    <Section tone="green">
      <SectionHeader
        eyebrow="Featured Advertising"
        title="Promote Your Business"
        description="Reach the Habesha community across the DMV with a featured promotion that stays visible for up to 60 days."
        amharic="ንግድዎን እና አገልግሎትዎን ለማህበረሰባችን ያስተዋውቁ"
        actionHref="/post-ad"
        actionLabel="Post a Promotion"
        light
      />

      <div className="grid gap-6 md:grid-cols-3">
        {promotions.map((promotion) => (
          <Link
            key={promotion.id}
            href={promotion.href}
            className="group block h-full"
          >
            <Card
              hover
              padding="lg"
              className="flex h-full flex-col border-white/15 bg-white text-slate-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-4xl">
                  <span aria-hidden="true">{promotion.icon}</span>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-[#087531]">
                  60 Days
                </span>
              </div>

              <p className="mt-6 text-sm font-black uppercase tracking-wide text-[#087531]">
                {promotion.category}
              </p>

              <h3 className="mt-2 text-2xl font-black text-slate-900 transition group-hover:text-[#087531]">
                {promotion.title}
              </h3>

              <p className="mt-4 flex-1 leading-7 text-slate-600">
                {promotion.description}
              </p>

              <span className="mt-7 inline-flex items-center gap-2 font-black text-[#087531]">
                Start Promotion
                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}