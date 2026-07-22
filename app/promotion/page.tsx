import Link from "next/link";

const plans = [
  {
    name: "Free Community",
    price: "$0",
    duration: "7 days",
    description:
      "For basic community announcements and small local promotions.",
    features: [
      "Basic promotion page",
      "One image",
      "Community category placement",
      "7-day visibility",
    ],
    badge: "Free",
    cardClass: "border-slate-200 bg-white",
  },
  {
    name: "Bronze",
    price: "$39.99",
    duration: "60 days",
    description:
      "A simple way for local businesses to gain more visibility.",
    features: [
      "Featured category placement",
      "Up to 5 images",
      "Business contact information",
      "60-day visibility",
    ],
    badge: "Starter",
    cardClass: "border-orange-200 bg-orange-50",
  },
  {
    name: "Silver",
    price: "$79.99",
    duration: "60 days",
    description:
      "More visibility with priority placement across promotion pages.",
    features: [
      "Priority category placement",
      "Homepage featured section",
      "Up to 10 images",
      "60-day visibility",
    ],
    badge: "Popular",
    cardClass: "border-slate-300 bg-slate-100",
  },
  {
    name: "Gold",
    price: "$149.99",
    duration: "60 days",
    description:
      "Premium promotion for businesses that want stronger exposure.",
    features: [
      "Homepage banner placement",
      "Priority promotion position",
      "Business profile page",
      "60-day visibility",
    ],
    badge: "Premium",
    cardClass: "border-yellow-300 bg-yellow-50",
  },
  {
    name: "Platinum",
    price: "$299.99",
    duration: "60 days",
    description:
      "Maximum exposure across Habeshawi Marketplace.",
    features: [
      "Top homepage banner",
      "Featured across major sections",
      "Premium business profile",
      "Social media promotion support",
    ],
    badge: "Maximum Reach",
    cardClass: "border-purple-300 bg-purple-50",
  },
];

const promotionTypes = [
  {
    title: "Restaurants & Cafes",
    description:
      "Promote restaurants, coffee shops, bakeries, catering, and food services.",
    icon: "🍽️",
  },
  {
    title: "Stores & Services",
    description:
      "Advertise grocery stores, salons, tax services, lawyers, and local professionals.",
    icon: "🏪",
  },
  {
    title: "Events",
    description:
      "Promote concerts, festivals, church events, job fairs, and community gatherings.",
    icon: "📅",
  },
  {
    title: "Featured Listings",
    description:
      "Increase visibility for marketplace, housing, business, and job listings.",
    icon: "⭐",
  },
];

export default function PromotionPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5]">
      <section className="bg-gradient-to-br from-[#064d2b] via-[#087531] to-[#0b8f3d] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black">
              Habeshawi Promotion
            </span>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Promote Your Business to the Ethiopian and Eritrean Community
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-green-50 sm:text-xl">
              Reach customers across Washington, DC, Maryland, and Virginia
              with affordable 60-day advertising packages.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/promotion/post"
                className="rounded-xl bg-yellow-400 px-7 py-4 text-center text-lg font-black text-black transition hover:bg-yellow-300"
              >
                Start Advertising
              </Link>

              <Link
                href="/promotion/pricing"
                className="rounded-xl border-2 border-white px-7 py-4 text-center text-lg font-black text-white transition hover:bg-white hover:text-[#064d2b]"
              >
                Compare Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center">
          <span className="font-black uppercase tracking-wider text-[#087531]">
            Promotion Options
          </span>

          <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
            What Can You Promote?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
            Habeshawi Promotion supports businesses, services, community
            events, and featured listings throughout the platform.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {promotionTypes.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="text-4xl">{item.icon}</div>

              <h3 className="mt-5 text-xl font-black text-[#064d2b]">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <span className="font-black uppercase tracking-wider text-[#087531]">
              Advertising Packages
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Choose the Right Package
            </h2>

            <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-600">
              Paid packages remain active for 60 days. The free community
              package remains active for 7 days.
            </p>
          </div>

          <div className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-5">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`flex h-full flex-col rounded-3xl border p-7 shadow-sm ${plan.cardClass}`}
              >
                <span className="w-fit rounded-full bg-[#087531] px-3 py-1 text-xs font-black text-white">
                  {plan.badge}
                </span>

                <h3 className="mt-5 text-2xl font-black text-slate-900">
                  {plan.name}
                </h3>

                <div className="mt-4 text-4xl font-black text-[#064d2b]">
                  {plan.price}
                </div>

                <p className="mt-1 font-bold text-slate-700">
                  {plan.duration}
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  {plan.description}
                </p>

                <ul className="mt-6 grid gap-3 text-sm leading-6 text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="font-black text-[#087531]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/promotion/post?package=${encodeURIComponent(
                    plan.name
                      .toLowerCase()
                      .replace(" community", "")
                  )}`}
                  className="mt-8 block rounded-xl bg-[#087531] px-5 py-3 text-center font-black text-white transition hover:bg-[#064d2b]"
                >
                  Choose {plan.name}
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/promotion/pricing"
              className="inline-flex rounded-xl border border-[#087531] px-6 py-3 font-black text-[#087531] transition hover:bg-green-50"
            >
              View Full Package Comparison
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid overflow-hidden rounded-3xl bg-[#064d2b] text-white shadow-xl lg:grid-cols-2">
          <div className="p-8 sm:p-12">
            <span className="font-black uppercase tracking-wider text-yellow-400">
              Easy Advertising
            </span>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              Submit Your Promotion in Minutes
            </h2>

            <div className="mt-8 grid gap-6">
              <Step
                number="1"
                title="Choose a package"
                description="Select the promotion plan that matches your business goals."
              />

              <Step
                number="2"
                title="Create your advertisement"
                description="Add your business information, contact details, image, and message."
              />

              <Step
                number="3"
                title="Complete payment"
                description="Paid packages move to review after payment is confirmed."
              />

              <Step
                number="4"
                title="Admin approval"
                description="Approved advertisements become active for the selected duration."
              />
            </div>
          </div>

          <div className="flex items-center justify-center bg-yellow-400 p-8 text-black sm:p-12">
            <div className="max-w-md text-center">
              <div className="text-7xl">📣</div>

              <h3 className="mt-6 text-3xl font-black">
                Ready to Reach More Customers?
              </h3>

              <p className="mt-4 leading-7">
                Create your promotion today and connect with the Habeshawi
                community across the DMV.
              </p>

              <Link
                href="/promotion/post"
                className="mt-7 inline-block rounded-xl bg-[#064d2b] px-7 py-4 font-black text-white transition hover:bg-[#087531]"
              >
                Create Advertisement
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-6 py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="text-3xl font-black">
              Already Have an Advertisement?
            </h2>

            <p className="mt-3 text-slate-300">
              Review your advertisements, payment status, approval status,
              clicks, and impressions.
            </p>
          </div>

          <Link
            href="/promotion/my-ads"
            className="rounded-xl bg-white px-7 py-4 font-black text-slate-900 transition hover:bg-slate-100"
          >
            View My Advertisements
          </Link>
        </div>
      </section>
    </main>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-yellow-400 font-black text-black">
        {number}
      </div>

      <div>
        <h3 className="text-lg font-black">{title}</h3>

        <p className="mt-1 leading-6 text-green-50">
          {description}
        </p>
      </div>
    </div>
  );
}