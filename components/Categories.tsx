import Link from "next/link";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

const sections = [
  {
    title: "Rentals",
    amharic: "የሚከራይ ቤቶች",
    icon: "🏠",
    description:
      "Rooms, apartments, houses, basements, commercial spaces and roommates.",
    href: "/housing",
    button: "Browse Rentals",
    color: "bg-green-50",
    iconColor: "bg-green-100",
  },
  {
    title: "Promotions",
    amharic: "ማስታወቂያ",
    icon: "📢",
    description:
      "Discover restaurants, grocery stores, events, sales and featured businesses.",
    href: "/businesses",
    button: "View Promotions",
    color: "bg-yellow-50",
    iconColor: "bg-yellow-100",
  },
  {
    title: "Marketplace",
    amharic: "ገበያ",
    icon: "🛍️",
    description:
      "Buy and sell cars, phones, furniture, electronics and other useful items.",
    href: "/marketplace",
    button: "Shop Marketplace",
    color: "bg-blue-50",
    iconColor: "bg-blue-100",
  },
  {
    title: "Jobs",
    amharic: "ስራ",
    icon: "💼",
    description:
      "Find your next opportunity or connect with qualified local employees.",
    href: "/jobs",
    button: "Find Jobs",
    color: "bg-purple-50",
    iconColor: "bg-purple-100",
  },
];

export default function Categories() {
  return (
    <Section tone="soft">
      <SectionHeader
        eyebrow="Explore the Community"
        title="Explore Habeshawi Marketplace"
        description="Buy, sell, rent, find jobs and promote your business in one trusted community marketplace."
        amharic="ይግዙ • ይሽጡ • ይከራዩ • ስራ ያግኙ • ንግድዎን ያስተዋውቁ"
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="group block h-full"
          >
            <Card
              hover
              padding="lg"
              className={`flex h-full flex-col ${section.color}`}
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl text-4xl ${section.iconColor}`}
              >
                <span aria-hidden="true">{section.icon}</span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-[#064d2b] transition group-hover:text-[#087531]">
                {section.title}
              </h3>

              <p className="mt-2 text-lg font-bold text-[#087531]">
                {section.amharic}
              </p>

              <p className="mt-5 flex-1 leading-7 text-slate-600">
                {section.description}
              </p>

              <div className="mt-7 flex items-center justify-between">
                <span className="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-800 shadow-sm">
                  {section.button}
                </span>

                <span
                  aria-hidden="true"
                  className="text-2xl font-bold text-[#087531] transition group-hover:translate-x-1"
                >
                  →
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}