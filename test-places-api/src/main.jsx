import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "./styles/cta.css";
import "./styles/media.css";
import "./styles/verify.css";
import "./styles/listing.css";
import "./styles/payment.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
