import Link from "next/link";

const safetyTips = [
  {
    title: "Meet in a Public Place",
    description:
      "Choose a busy, well-lit location such as a shopping center, police safe-exchange area, or public parking lot.",
    icon: "📍",
  },
  {
    title: "Inspect Before Paying",
    description:
      "Check the item carefully and confirm that it matches the listing description before giving the seller money.",
    icon: "🔍",
  },
  {
    title: "Avoid Advance Payments",
    description:
      "Do not send deposits, gift cards, wire transfers, or cryptocurrency before seeing and verifying the item.",
    icon: "💳",
  },
  {
    title: "Protect Personal Information",
    description:
      "Never share passwords, verification codes, banking details, or Social Security numbers with buyers or sellers.",
    icon: "🔒",
  },
  {
    title: "Bring Someone With You",
    description:
      "Consider bringing a friend or family member, especially when meeting someone for a high-value transaction.",
    icon: "👥",
  },
  {
    title: "Report Suspicious Listings",
    description:
      "Report listings that appear fraudulent, misleading, unsafe, prohibited, or too good to be true.",
    icon: "🚩",
  },
];

const frequentlyAskedQuestions = [
  {
    question: "How do I post an item?",
    answer:
      "Use the Post New Ad button and complete the listing form with the title, category, price, location, description, and photos.",
  },
  {
    question: "How do I contact a seller?",
    answer:
      "Open the listing and select Contact Seller. Marketplace messages will keep the conversation inside Habeshawi Marketplace.",
  },
  {
    question: "Can Habeshawi Marketplace guarantee a transaction?",
    answer:
      "No. Buyers and sellers are responsible for inspecting items, confirming information, and completing transactions safely.",
  },
  {
    question: "What should I do with a suspicious listing?",
    answer:
      "Do not send money or personal information. Save the listing details and report the listing for review.",
  },
];

export default function MarketplaceHelpPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <Link
          href="/marketplace"
          className="font-medium text-green-700 hover:underline"
        >
          ← Back to Marketplace
        </Link>

        <section className="mt-6 rounded-3xl bg-green-800 px-6 py-12 text-white md:px-10">
          <div className="max-w-3xl">
            <p className="font-semibold text-green-100">
              Habeshawi Marketplace
            </p>

            <h1 className="mt-3 text-4xl font-bold">
              Help and Safety Center
            </h1>

            <p className="mt-4 text-lg leading-8 text-green-50">
              Learn how to buy, sell, communicate, and meet safely when using
              the marketplace.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Marketplace Safety Tips
            </h2>

            <p className="mt-2 text-gray-600">
              Follow these guidelines before completing any transaction.
            </p>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {safetyTips.map((tip) => (
              <article
                key={tip.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl">
                  {tip.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  {tip.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {tip.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-red-200 bg-red-50 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-red-900">
            Warning Signs of a Scam
          </h2>

          <ul className="mt-5 space-y-3 text-red-900">
            <li>• The price is unusually low for the item.</li>
            <li>• The seller refuses to meet or let you inspect the item.</li>
            <li>• Someone asks for payment using gift cards or wire transfer.</li>
            <li>• The buyer sends more money than requested.</li>
            <li>• Someone pressures you to act immediately.</li>
            <li>• The listing photos or description appear copied.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-6 space-y-4">
            {frequentlyAskedQuestions.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <summary className="cursor-pointer font-bold text-gray-900">
                  {item.question}
                </summary>

                <p className="mt-3 leading-7 text-gray-600">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Need More Help?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-600">
            Visit your messages, review your listings, or return to the
            marketplace to continue browsing.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/marketplace/messages"
              className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
            >
              View Messages
            </Link>

            <Link
              href="/marketplace/my-listings"
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              My Listings
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}