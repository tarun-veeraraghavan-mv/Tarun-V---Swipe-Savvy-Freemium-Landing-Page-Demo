// COMPONENT: PaymentSuccessful

// DESCRIPTION:
// Confirmation page shown after a successful payment upgrade.
// It verifies the payment session with the backend using the sessionId from the URL,
// updates the user state accordingly, and provides a navigation link to the listing page.

// CONTEXT:
// - useParams(): Retrieves sessionId from URL params
// - useUser(): Provides setUser to update user state after successful payment

// BEHAVIOR:
// - On mount, calls backend API `/verify-payment-session/:sessionId`
//   to validate payment and retrieve updated user data
// - Updates global user state with response data from backend
// - Displays success message and link to `/listing` page

import { Link, useParams } from "react-router-dom";
import Container from "../../components/Container";
import { useEffect } from "react";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";

export default function Payment() {
  const { sessionId } = useParams();
  const { setUser } = useUser();

  useEffect(() => {
    async function verifyPaymentSession() {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/verify-payment-session/${sessionId}`
      );

      console.log(res.data);
      setUser(res.data);
    }
    if (sessionId) {
      verifyPaymentSession();
    }
  }, [sessionId]);

  return (
    <Container>
      <h1 className="payment-status-heading">Payment Successful</h1>
      <p className="payment-status-detail">
        Your upgrade is now complete. You can start enjoying the benefits
        immediately
      </p>
      <div style={{ textAlign: "center" }}>
        <Link to="/listing" className="listing-page-navigate">
          Go to Listing page
        </Link>
      </div>
    </Container>
  );
}
