type AdminNotificationEmailProps = {
  title: string;
  location: string;
  monthlyRent: string;
  amountPaid: string;
  customerEmail?: string | null;
  reviewUrl: string;
  adminUrl: string;
};

export default function AdminNotificationEmail({
  title,
  location,
  monthlyRent,
  amountPaid,
  customerEmail,
  reviewUrl,
  adminUrl,
}: AdminNotificationEmailProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 620,
        margin: "0 auto",
        color: "#1e293b",
      }}
    >
      <div
        style={{
          background: "#087531",
          padding: 24,
          borderRadius: "12px 12px 0 0",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#ffffff",
            fontSize: 26,
          }}
        >
          New Paid Rental
        </h1>
      </div>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderTop: 0,
          padding: 24,
          borderRadius: "0 0 12px 12px",
        }}
      >
        <p>
          A customer submitted and paid for a rental listing.
        </p>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            margin: "24px 0",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Title
              </td>

              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {title}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Location
              </td>

              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {location}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Monthly Rent
              </td>

              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {monthlyRent}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Amount Paid
              </td>

              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                  color: "#087531",
                  fontWeight: "bold",
                }}
              >
                {amountPaid}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Customer Email
              </td>

              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                {customerEmail || "Not provided"}
              </td>
            </tr>

            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Payment
              </td>

              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                  color: "#087531",
                  fontWeight: "bold",
                }}
              >
                Paid
              </td>
            </tr>

            <tr>
              <td
                style={{
                  fontWeight: "bold",
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Status
              </td>

              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Pending Approval
              </td>
            </tr>
          </tbody>
        </table>

        <a
          href={reviewUrl}
          style={{
            display: "inline-block",
            marginTop: 12,
            marginRight: 10,
            background: "#087531",
            color: "#ffffff",
            textDecoration: "none",
            padding: "12px 20px",
            borderRadius: 8,
            fontWeight: "bold",
          }}
        >
          Review Rental
        </a>

        <a
          href={adminUrl}
          style={{
            display: "inline-block",
            marginTop: 12,
            background: "#334155",
            color: "#ffffff",
            textDecoration: "none",
            padding: "12px 20px",
            borderRadius: 8,
            fontWeight: "bold",
          }}
        >
          Open Admin
        </a>

        <p
          style={{
            marginTop: 28,
            color: "#64748b",
            fontSize: 13,
          }}
        >
          Habeshawi Marketplace administrator notification.
        </p>
      </div>
    </div>
  );
}