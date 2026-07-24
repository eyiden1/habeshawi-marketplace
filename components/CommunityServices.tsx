import Link from "next/link";
import Card from "@/components/ui/Card";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";

const services = [
  {
    id: 1,
    title: "Tax Preparation",
    description:
      "Find trusted tax preparers, accountants, and bookkeeping professionals.",
    icon: "🧾",
  },
  {
    id: 2,
    title: "Immigration Services",
    description:
      "Connect with professionals who provide immigration and document assistance.",
    icon: "🛂",
  },
  {
    id: 3,
    title: "Translation Services",
    description:
      "Find Amharic and English translation and interpretation services.",
    icon: "🌐",
  },
  {
    id: 4,
    title: "Real Estate Services",
    description:
      "Connect with local real estate agents, property managers, and lenders.",
    icon: "🏡",
  },
  {
    id: 5,
    title: "Insurance Services",
    description:
      "Explore auto, home, health, life, and business insurance assistance.",
    icon: "🛡️",
  },
  {
    id: 6,
    title: "Travel Services",
    description:
      "Find flight booking, vacation planning, and travel support services.",
    icon: "✈️",
  },
];

export default function CommunityServices() {
  return (
    <Section tone="white">
      <SectionHeader
        eyebrow="Trusted Community Support"
        title="Community Services"
        description="Find trusted professionals and essential services serving the Habesha community."
        amharic="የማህበረሰብ አገልግሎቶች"
        actionHref="/services"
        actionLabel="View All Services"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.id}
            href="/services"
            className="group block h-full"
          >
            <Card hover className="h-full">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl transition group-hover:bg-green-100">
                <span aria-hidden="true">{service.icon}</span>
              </div>

              <h3 className="mt-5 text-xl font-black text-slate-900 transition group-hover:text-[#087531]">
                {service.title}
              </h3>

              <p className="mt-3 leading-6 text-slate-600">
                {service.description}
              </p>

              <span className="mt-5 inline-flex items-center gap-2 font-bold text-[#087531]">
                Explore Service
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