import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProSubscriptionListing() {
  const { sessionId } = useParams();

  useEffect(() => {
    async function verifyPaymentSession() {
      const res = await axios.get(
        `http://localhost:3000/verify-payment-session/${sessionId}`
      );

      console.log(res.data);
    }
    if (sessionId) {
      verifyPaymentSession();
    }
  }, [sessionId]);

  return <div>ProSubscriptionListing</div>;
}
