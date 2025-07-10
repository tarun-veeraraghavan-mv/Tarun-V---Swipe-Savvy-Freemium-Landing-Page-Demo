// COMPONENT: APP

// DESCRIPTION:
// This is the root component of the application.
// It sets up global context providers, routing, and route protection.

// STRUCTURE:
// - UserProvider: Provides user-related state and authentication info globally.
// - SelectedBusinessProvider: Provides selected business state globally.
// - AppToast: Global toast notification handler.
// - BrowserRouter: React Router DOM component for client-side routing.
// - Routes: Defines all app routes and protected routes.

// ROUTE OVERVIEW:
// - "/": Public route showing SimplePlacesSearch component. This is where the user types in their business name
// - "/verify": Protected route (wrapped with VerificationProcessProtector)
// for verification flow. Has 3 steps: user selects if the search result is their business, creates
// their Swipe Savvy account and agress to the terms and conditions
// - "/listing": Protected route (wrapped with ListingPageProtector) for listing management.
// Has user's current account plan (free / pro). UI changes based on the plan
// - "/success/:sessionId": Payment success page.
// - "/cancel": Payment cancellation page.

// ROUTE Protection wrappers: (./components/wrappers)
// - VerificationProcessProtector: Ensures user has selected a business form '/' route
// before going into the verification step
// - ListingPageProtector: Ensures user has agreed to terms and conditions and the user was successfully created

import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppToast from "./components/AppToast";
import ListingPageProtector from "./components/wrappers/ListingPageProtector";
import VerificationProcessProtector from "./components/wrappers/VerificationProcessProtector";
import { SelectedBusinessProvider } from "./contexts/SelectBusinessContext";
import { UserProvider } from "./contexts/UserContext";
import SimplePlacesSearch from "./features/home/SimplePlacesSearch";
import Listing from "./features/listings/Listing";
import PaymentCancelled from "./features/payment/PaymentCancelled";
import Payment from "./features/payment/PaymentSuccessful";
import Verify from "./features/verification/Verify";

function App() {
  return (
    <UserProvider>
      <SelectedBusinessProvider>
        {/* Global notification handler */}
        <AppToast />

        {/* Client-side routing */}
        <BrowserRouter>
          <Routes>
            {/* Public homepage with place search */}
            <Route path="/" element={<SimplePlacesSearch />} />

            {/* Protected verification flow */}
            <Route path="/verify" element={<VerificationProcessProtector />}>
              <Route path="/verify" element={<Verify />} />
            </Route>

            {/* Protected listing management */}
            <Route path="/listing" element={<ListingPageProtector />}>
              <Route path="/listing" element={<Listing />} />
            </Route>

            {/* Payment result routes */}
            <Route path="/success/:sessionId" element={<Payment />} />
            <Route path="/cancel" element={<PaymentCancelled />} />
          </Routes>
        </BrowserRouter>
      </SelectedBusinessProvider>
    </UserProvider>
  );
}

export default App;
