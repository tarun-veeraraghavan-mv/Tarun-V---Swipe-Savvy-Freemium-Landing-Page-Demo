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
        `http://localhost:3000/verify-payment-session/${sessionId}`
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
