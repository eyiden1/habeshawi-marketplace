type PaymentReceiptEmailProps = {
  title: string;
  propertyType?: string | null;
  amountPaid: string;
  siteUrl: string;
};

export default function PaymentReceiptEmail({
  title,
  propertyType,
  amountPaid,
  siteUrl,
}: PaymentReceiptEmailProps) {
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
            color: "#fff",
            fontSize: 26,
          }}
        >
          Payment Received
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
          Thank you for posting your rental on Habeshawi Marketplace.
        </p>

        <p>
          Your payment has been received successfully. Your listing is now
          waiting for administrator review.
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
              <td style={{ fontWeight: "bold", padding: "10px 0" }}>
                Listing
              </td>

              <td>{title}</td>
            </tr>

            <tr>
              <td style={{ fontWeight: "bold", padding: "10px 0" }}>
                Property Type
              </td>

              <td>{propertyType || "Not specified"}</td>
            </tr>

            <tr>
              <td style={{ fontWeight: "bold", padding: "10px 0" }}>
                Amount Paid
              </td>

              <td
                style={{
                  color: "#087531",
                  fontWeight: "bold",
                }}
              >
                {amountPaid}
              </td>
            </tr>

            <tr>
              <td style={{ fontWeight: "bold", padding: "10px 0" }}>
                Status
              </td>

              <td>Pending Review</td>
            </tr>
          </tbody>
        </table>

        <a
          href={siteUrl}
          style={{
            display: "inline-block",
            marginTop: 18,
            background: "#087531",
            color: "#fff",
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
          Please keep this email as confirmation of your payment.
        </p>
      </div>
    </div>
  );
}