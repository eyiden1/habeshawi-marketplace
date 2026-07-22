import Image from "next/image";
import Link from "next/link";

const conversations = [
  {
    id: "iphone-15-pro",
    seller: "Samuel T.",
    listing: "iPhone 15 Pro",
    message: "Yes, the phone is still available.",
    time: "10:45 AM",
    image: "/phone1.jpg",
    unread: true,
  },
  {
    id: "toyota-camry",
    seller: "Mimi G.",
    listing: "Toyota Camry",
    message: "You can come see the car tomorrow afternoon.",
    time: "Yesterday",
    image: "/cars1.jpg",
    unread: false,
  },
  {
    id: "restaurant-equipment",
    seller: "Dawit K.",
    listing: "Restaurant Equipment",
    message: "The equipment is being sold as one package.",
    time: "Monday",
    image: "/sofa1.jpg",
    unread: false,
  },
];

export default function MarketplaceMessagesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8">
          <Link
            href="/marketplace"
            className="font-medium text-green-700 hover:underline"
          >
            ← Back to Marketplace
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Marketplace Messages
          </h1>

          <p className="mt-2 text-gray-600">
            View conversations about your marketplace listings.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {conversations.map((conversation, index) => (
            <Link
              key={conversation.id}
              href={`/marketplace/messages/${conversation.id}`}
              className={`flex items-center gap-4 p-5 transition hover:bg-gray-50 ${
                index !== conversations.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-xl bg-gray-100">
                <Image
                  src={conversation.image}
                  alt={conversation.listing}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className={`truncate text-lg text-gray-900 ${
                        conversation.unread
                          ? "font-bold"
                          : "font-semibold"
                      }`}
                    >
                      {conversation.seller}
                    </h2>

                    <p className="mt-1 truncate text-sm font-medium text-green-700">
                      {conversation.listing}
                    </p>
                  </div>

                  <div className="flex flex-none items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {conversation.time}
                    </span>

                    {conversation.unread && (
                      <span
                        className="h-3 w-3 rounded-full bg-green-600"
                        aria-label="Unread message"
                      />
                    )}
                  </div>
                </div>

                <p
                  className={`mt-2 truncate ${
                    conversation.unread
                      ? "font-semibold text-gray-800"
                      : "text-gray-600"
                  }`}
                >
                  {conversation.message}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-5">
          <h2 className="font-bold text-green-900">
            Marketplace Safety Reminder
          </h2>

          <p className="mt-2 text-sm leading-6 text-green-800">
            Meet sellers in a safe public place, inspect items before paying,
            and never send money before confirming the listing is legitimate.
          </p>
        </div>
      </div>
    </main>
  );
}