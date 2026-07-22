type ListingApprovedEmailProps = {
  title: string;
  location: string;
  listingUrl: string;
};

export default function ListingApprovedEmail({
  title,
  location,
  listingUrl,
}: ListingApprovedEmailProps) {
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
          Your Listing Is Live
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
          Good news! Your rental listing has been reviewed and approved.
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
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                  fontWeight: "bold",
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
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                  fontWeight: "bold",
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
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                  fontWeight: "bold",
                }}
              >
                Status
              </td>

              <td
                style={{
                  padding: "10px 0",
                  borderBottom: "1px solid #e2e8f0",
                  color: "#087531",
                  fontWeight: "bold",
                }}
              >
                Approved and Live
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          Customers can now view your listing on Habeshawi Marketplace.
        </p>

        <a
          href={listingUrl}
          style={{
            display: "inline-block",
            marginTop: 16,
            background: "#087531",
            color: "#ffffff",
            textDecoration: "none",
            padding: "12px 22px",
            borderRadius: 8,
            fontWeight: "bold",
          }}
        >
          View Your Listing
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