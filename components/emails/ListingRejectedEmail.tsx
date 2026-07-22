type ListingRejectedEmailProps = {
  title: string;
  reason: string;
  siteUrl: string;
};

export default function ListingRejectedEmail({
  title,
  reason,
  siteUrl,
}: ListingRejectedEmailProps) {
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
          background: "#b42318",
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
          Listing Requires Attention
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
          We reviewed your rental listing, but it could not be approved in its
          current form.
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
                Listing
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
                Status
              </td>

              <td
                style={{
                  color: "#b42318",
                  fontWeight: "bold",
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                Rejected
              </td>
            </tr>
          </tbody>
        </table>

        <div
          style={{
            background: "#fff7ed",
            borderLeft: "4px solid #f97316",
            padding: 16,
            borderRadius: 6,
            marginTop: 20,
          }}
        >
          <strong>Reason</strong>

          <p style={{ marginTop: 10 }}>
            {reason || "Please review your listing and submit it again."}
          </p>
        </div>

        <p style={{ marginTop: 24 }}>
          You can correct your listing and submit it again for review.
        </p>

        <a
          href={siteUrl}
          style={{
            display: "inline-block",
            marginTop: 18,
            background: "#087531",
            color: "#ffffff",
            textDecoration: "none",
            padding: "12px 22px",
            borderRadius: 8,
            fontWeight: "bold",
          }}
        >
          Visit Habeshawi Marketplace
        </a>

        <p
          style={{
            marginTop: 28,
            color: "#64748b",
            fontSize: 13,
          }}
        >
          Thank you for using Habeshawi Marketplace.
        </p>
      </div>
    </div>
  );
}