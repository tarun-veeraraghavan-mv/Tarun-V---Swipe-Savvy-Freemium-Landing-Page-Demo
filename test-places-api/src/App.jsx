import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListingPageProtector from "./components/wrappers/ListingPageProtector";
import VerificationProcessProtector from "./components/wrappers/VerificationProcessProtector";
import { SelectedBusinessProvider } from "./contexts/SelectBusinessContext";
import { UserProvider } from "./contexts/UserContext";
import SimplePlacesSearch from "./features/home/SimplePlacesSearch";
import Listing from "./features/listings/Listing";
import Payment from "./features/payment/PaymentSuccessful";
import Verify from "./features/verification/Verify";
import PaymentCancelled from "./features/payment/PaymentCancelled";

function App() {
  return (
    <UserProvider>
      <SelectedBusinessProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "#eee",
              color: "#444",
            },
          }}
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SimplePlacesSearch />} />

            <Route path="/verify" element={<VerificationProcessProtector />}>
              <Route path="/verify" element={<Verify />} />
            </Route>

            <Route path="/listing" element={<ListingPageProtector />}>
              <Route path="/listing" element={<Listing />} />
            </Route>

            <Route path="/success/:sessionId" element={<Payment />} />
            <Route path="/cancel" element={<PaymentCancelled />} />
          </Routes>
        </BrowserRouter>
      </SelectedBusinessProvider>
    </UserProvider>
  );
}

export default App;
