import VerificationProcessProtector from "./components/wrappers/VerificationProcessProtector";
import Verify from "./features/verification/Verify";
import { SelectedBusinessProvider } from "./contexts/SelectBusinessContext";
import SimplePlacesSearch from "./SimplePlacesSearch";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Listing from "./features/listings/Listing";
import { Toaster } from "react-hot-toast";
import ProSubscriptionListing from "./features/listings/ProSubscriptionListing";
import ListingPageProtector from "./components/wrappers/ListingPageProtector";
import { UserProvider } from "./contexts/UserContext";

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

            <Route
              path="/success/:sessionId"
              element={<ProSubscriptionListing />}
            />
            <Route
              path="/cancel"
              element={<p>Successfully cancelled subscription</p>}
            />
          </Routes>
        </BrowserRouter>
      </SelectedBusinessProvider>
    </UserProvider>
  );
}

export default App;
