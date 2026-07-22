import Link from "next/link";

const notifications = [
  {
    id: 1,
    type: "message",
    title: "New message from Samuel T.",
    description: "Yes, the iPhone is still available.",
    time: "5 minutes ago",
    unread: true,
    href: "/marketplace/messages/iphone-15-pro",
    icon: "💬",
  },
  {
    id: 2,
    type: "favorite",
    title: "Someone saved your listing",
    description: "Your Restaurant Equipment listing was added to favorites.",
    time: "2 hours ago",
    unread: true,
    href: "/marketplace/my-listings",
    icon: "❤️",
  },
  {
    id: 3,
    type: "listing",
    title: "Listing published successfully",
    description: "Your Toyota Camry listing is now visible in the marketplace.",
    time: "Yesterday",
    unread: false,
    href: "/marketplace/toyota-camry",
    icon: "✅",
  },
  {
    id: 4,
    type: "safety",
    title: "Marketplace safety reminder",
    description:
      "Always inspect items before paying and meet sellers in a safe public place.",
    time: "Monday",
    unread: false,
    href: "/marketplace/help",
    icon: "🛡️",
  },
];

export default function MarketplaceNotificationsPage() {
  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              href="/marketplace"
              className="font-medium text-green-700 hover:underline"
            >
              ← Back to Marketplace
            </Link>

            <h1 className="mt-5 text-3xl font-bold text-gray-900">
              Notifications
            </h1>

            <p className="mt-2 text-gray-600">
              You have {unreadCount} unread{" "}
              {unreadCount === 1 ? "notification" : "notifications"}.
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg border border-green-700 px-5 py-3 font-semibold text-green-700 hover:bg-green-50"
          >
            Mark All as Read
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {notifications.map((notification, index) => (
            <Link
              key={notification.id}
              href={notification.href}
              className={`flex gap-4 p-5 transition hover:bg-gray-50 ${
                notification.unread ? "bg-green-50/60" : "bg-white"
              } ${
                index !== notifications.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                {notification.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <h2
                    className={`text-gray-900 ${
                      notification.unread ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {notification.title}
                  </h2>

                  {notification.unread && (
                    <span
                      className="mt-2 h-3 w-3 flex-none rounded-full bg-green-600"
                      aria-label="Unread notification"
                    />
                  )}
                </div>

                <p className="mt-2 leading-6 text-gray-600">
                  {notification.description}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  {notification.time}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Notification Preferences
          </h2>

          <p className="mt-2 text-gray-600">
            Choose which marketplace updates you want to receive.
          </p>

          <Link
            href="/marketplace/settings"
            className="mt-5 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            Manage Settings
          </Link>
        </div>
      </div>
    </main>
  );
}