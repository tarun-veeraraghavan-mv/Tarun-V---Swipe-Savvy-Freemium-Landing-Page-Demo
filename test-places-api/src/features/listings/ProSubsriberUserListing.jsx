import Container from "../../components/Container";

export default function ProSubsriberUserListing() {
  return (
    <Container>
      <h2 className="listing-heading">🎉 You’ve Upgraded to Shop Savvy Pro!</h2>
      <p className="listing-heading-subtext">
        You’re now fully optimized for visibility, rewards, and performance
        tracking.
      </p>

      <div className="pro-plan-image">
        <div className="banner-details">
          <p className="plan-heading">
            🟢 Plan: Shop Savvy Pro (50% <br /> Lifetime Discount Active)
          </p>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              listStyle: "none",
              gap: "12px",
            }}
          >
            <li className="plan-details">✅ Featured placement in our app</li>
            <li className="plan-details">✅ Run 2x rewards promotions</li>
            <li className="plan-details">
              ✅ Sync your listing across Google, Yelp, Facebook & more
            </li>
            <li className="plan-details">
              ✅ Access analytics and performance reports
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
