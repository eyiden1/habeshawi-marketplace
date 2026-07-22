import Image from "next/image";
import Link from "next/link";

type MarketplaceConversationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const messages = [
  {
    id: 1,
    sender: "seller",
    text: "Hello, yes, the item is still available.",
    time: "10:35 AM",
  },
  {
    id: 2,
    sender: "buyer",
    text: "Great. Is the price negotiable?",
    time: "10:38 AM",
  },
  {
    id: 3,
    sender: "seller",
    text: "I can consider a reasonable offer.",
    time: "10:41 AM",
  },
  {
    id: 4,
    sender: "buyer",
    text: "Can I come see it tomorrow afternoon?",
    time: "10:43 AM",
  },
  {
    id: 5,
    sender: "seller",
    text: "Yes, tomorrow afternoon works for me.",
    time: "10:45 AM",
  },
];

export default async function MarketplaceConversationPage({
  params,
}: MarketplaceConversationPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <Link
          href="/marketplace/messages"
          className="font-medium text-green-700 hover:underline"
        >
          ← Back to Messages
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-4 border-b border-gray-200 p-5">
            <div className="relative h-16 w-16 flex-none overflow-hidden rounded-xl bg-gray-100">
              <Image
                src="/phone1.jpg"
                alt="Marketplace listing"
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-xl font-bold text-gray-900">
                Samuel T.
              </h1>

              <Link
                href={`/marketplace/${id}`}
                className="mt-1 block truncate font-medium text-green-700 hover:underline"
              >
                iPhone 15 Pro
              </Link>

              <p className="mt-1 text-sm text-gray-500">
                Listing ID: {id}
              </p>
            </div>

            <Link
              href={`/marketplace/${id}`}
              className="hidden rounded-lg border border-green-700 px-4 py-2 font-semibold text-green-700 hover:bg-green-50 sm:block"
            >
              View Listing
            </Link>
          </div>

          <div className="h-[480px] space-y-5 overflow-y-auto bg-gray-50 p-5">
            {messages.map((message) => {
              const isBuyer = message.sender === "buyer";

              return (
                <div
                  key={message.id}
                  className={`flex ${
                    isBuyer ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                      isBuyer
                        ? "rounded-br-md bg-green-700 text-white"
                        : "rounded-bl-md border border-gray-200 bg-white text-gray-900"
                    }`}
                  >
                    <p className="leading-6">{message.text}</p>

                    <p
                      className={`mt-1 text-right text-xs ${
                        isBuyer ? "text-green-100" : "text-gray-500"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <form className="border-t border-gray-200 bg-white p-4">
            <div className="flex gap-3">
              <label htmlFor="message" className="sr-only">
                Write a message
              </label>

              <textarea
                id="message"
                name="message"
                rows={2}
                placeholder="Write a message..."
                className="min-w-0 flex-1 resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
              />

              <button
                type="submit"
                className="self-end rounded-xl bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
              >
                Send
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-sm leading-6 text-yellow-900">
            For your safety, avoid sharing passwords, verification codes, bank
            account information, or Social Security numbers in marketplace
            messages.
          </p>
        </div>
      </div>
    </main>
  );
}