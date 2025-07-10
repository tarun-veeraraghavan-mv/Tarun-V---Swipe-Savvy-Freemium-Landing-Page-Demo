import React from "react";
import Container from "../../components/Container";
import { Link } from "react-router-dom";

export default function PaymentCancelled() {
  return (
    <Container>
      <h1 className="payment-status-heading">Payment Cancelled</h1>
      <p className="payment-status-detail">
        Your payment was cancelled due to some error. We will reach you back
        shortly.
      </p>
      <div style={{ textAlign: "center" }}>
        <Link to="/listing" className="listing-page-navigate">
          Go to Listing page
        </Link>
      </div>
    </Container>
  );
}
