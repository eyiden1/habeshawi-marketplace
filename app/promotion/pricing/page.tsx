import Link from "next/link";

const plans = [
  {
    name: "Free Community",
    slug: "free",
    price: "$0",
    duration: "7 days",
    audience: "Community announcements and basic local promotion",
    placement: "Community promotion section",
    images: "1 image",
    homepage: "No",
    priority: "Standard",
    analytics: "Basic views",
    support: "Standard",
    highlight: false,
  },
  {
    name: "Bronze",
    slug: "bronze",
    price: "$39.99",
    duration: "60 days",
    audience: "Small businesses starting to advertise",
    placement: "Featured category placement",
    images: "Up to 5 images",
    homepage: "No",
    priority: "Standard",
    analytics: "Views and clicks",
    support: "Standard",
    highlight: false,
  },
  {
    name: "Silver",
    slug: "silver",
    price: "$79.99",
    duration: "60 days",
    audience: "Businesses seeking more visibility",
    placement: "Priority category placement",
    images: "Up to 10 images",
    homepage: "Featured section",
    priority: "High",
    analytics: "Views and clicks",
    support: "Priority",
    highlight: true,
  },
  {
    name: "Gold",
    slug: "gold",
    price: "$149.99",
    duration: "60 days",
    audience: "Established businesses and major events",
    placement: "Homepage banner and priority sections",
    images: "Up to 15 images",
    homepage: "Banner placement",
    priority: "Premium",
    analytics: "Advanced analytics",
    support: "Priority",
    highlight: false,
  },
  {
    name: "Platinum",
    slug: "platinum",
    price: "$299.99",
    duration: "60 days",
    audience: "Maximum visibility across the platform",
    placement: "Top homepage banner and major sections",
    images: "Up to 20 images",
    homepage: "Top banner placement",
    priority: "Maximum",
    analytics: "Advanced analytics",
    support: "Premium",
    highlight: false,
  },
];

const comparisonRows = [
  { label: "Price", key: "price" },
  { label: "Duration", key: "duration" },
  { label: "Best For", key: "audience" },
  { label: "Placement", key: "placement" },
  { label: "Images", key: "images" },
  { label: "Homepage Exposure", key: "homepage" },
  { label: "Priority Level", key: "priority" },
  { label: "Analytics", key: "analytics" },
  { label: "Support", key: "support" },
] as const;

export default function PromotionPricingPage() {
  return (
    <main className="min-h-screen bg-[#f7f8f5]">
      <section className="bg-[#064d2b] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-flex rounded-full bg-yellow-400 px-4 py-2 text-sm font-black text-black">
            Promotion Pricing
          </span>

          <h1 className="mt-6 text-4xl font-black sm:text-5xl">
            Choose the Best Advertising Package
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-green-50">
            Compare all Habeshawi advertising packages and select the plan that
            fits your business, event, or community promotion.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-5">
          {plans.map((plan) => (
            <article
              key={plan.slug}
              className={`relative flex h-full flex-col rounded-3xl border p-7 shadow-sm ${
                plan.highlight
                  ? "border-[#087531] bg-green-50 ring-2 ring-[#087531]"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#087531] px-4 py-2 text-xs font-black text-white">
                  Most Popular
                </span>
              )}

              <h2 className="text-2xl font-black text-slate-900">
                {plan.name}
              </h2>

              <div className="mt-4 text-4xl font-black text-[#064d2b]">
                {plan.price}
              </div>

              <p className="mt-1 font-bold text-slate-600">
                {plan.duration}
              </p>

              <p className="mt-5 leading-7 text-slate-600">
                {plan.audience}
              </p>

              <div className="mt-6 grid gap-3 text-sm text-slate-700">
                <Feature text={plan.placement} />
                <Feature text={plan.images} />
                <Feature text={`${plan.priority} priority`} />
                <Feature text={plan.analytics} />
              </div>

              <Link
                href={`/promotion/post?package=${plan.slug}`}
                className={`mt-8 block rounded-xl px-5 py-3 text-center font-black transition ${
                  plan.highlight
                    ? "bg-[#087531] text-white hover:bg-[#064d2b]"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                Choose {plan.name}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <span className="font-black uppercase tracking-wider text-[#087531]">
              Full Comparison
            </span>

            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">
              Compare Every Package
            </h2>
          </div>

          <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200">
            <table className="min-w-[1100px] w-full border-collapse bg-white">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-5 text-left text-sm font-black">
                    Feature
                  </th>

                  {plans.map((plan) => (
                    <th
                      key={plan.slug}
                      className="p-5 text-center text-sm font-black"
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((row, index) => (
                  <tr
                    key={row.key}
                    className={
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }
                  >
                    <td className="border-t border-slate-200 p-5 font-black text-slate-900">
                      {row.label}
                    </td>

                    {plans.map((plan) => (
                      <td
                        key={`${plan.slug}-${row.key}`}
                        className="border-t border-slate-200 p-5 text-center text-sm leading-6 text-slate-700"
                      >
                        {plan[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}

                <tr className="bg-slate-100">
                  <td className="border-t border-slate-200 p-5 font-black text-slate-900">
                    Select Plan
                  </td>

                  {plans.map((plan) => (
                    <td
                      key={`${plan.slug}-button`}
                      className="border-t border-slate-200 p-5 text-center"
                    >
                      <Link
                        href={`/promotion/post?package=${plan.slug}`}
                        className="inline-flex rounded-xl bg-[#087531] px-4 py-3 text-sm font-black text-white transition hover:bg-[#064d2b]"
                      >
                        Choose Plan
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <h2 className="text-3xl font-black text-slate-900">
            Important Package Information
          </h2>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            <InfoCard
              title="Approval Required"
              text="All submitted advertisements are reviewed before they become active."
            />

            <InfoCard
              title="Paid Plan Duration"
              text="Bronze, Silver, Gold, and Platinum advertisements remain active for 60 days after approval."
            />

            <InfoCard
              title="Free Plan Duration"
              text="Free Community advertisements remain active for 7 days after approval."
            />

            <InfoCard
              title="Payment Confirmation"
              text="Paid advertisements move to review after payment is successfully confirmed."
            />
          </div>
        </div>
      </section>

      <section className="bg-yellow-400 px-6 py-14 text-black">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="text-3xl font-black">
              Ready to Promote Your Business?
            </h2>

            <p className="mt-3 max-w-2xl leading-7">
              Choose your package, create your advertisement, and reach more
              customers across the DMV Habeshawi community.
            </p>
          </div>

          <Link
            href="/promotion/post"
            className="rounded-xl bg-[#064d2b] px-7 py-4 font-black text-white transition hover:bg-[#087531]"
          >
            Create Advertisement
          </Link>
        </div>
      </section>
    </main>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-black text-[#087531]">✓</span>
      <span>{text}</span>
    </div>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-50 p-6">
      <h3 className="text-lg font-black text-[#064d2b]">
        {title}
      </h3>

      <p className="mt-2 leading-7 text-slate-600">
        {text}
      </p>
    </div>
  );
}