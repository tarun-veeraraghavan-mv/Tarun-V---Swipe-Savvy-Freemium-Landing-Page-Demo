// COMPONENT: SimplePlacesSearch

// DESCRIPTION
// This is the homepage (`/`) of the app.
// It handles:
// - User input for searching businesses using Google Places API
// - Displaying the hero section, call-to-action, and testimonials
// - Automatically navigating to the verification page once a business is selected

// FEATURES:
// - Uses `useGooglePlacesApi(input)` to fetch place suggestions from the backend
// - Uses `useSelectedBusiness()` context to manage the selected business globally
// - Uses React Router's `useNavigate()` for client-side route changes

// STRUCTURE:
// - <Logo />: Renders the app or brand logo
// - <HeroDetails />: Displays main hero section headline/subtitle
// - <SearchBusinessInput />: Business search input + suggestions list
// - <HeroCtaSubtext />: Subtext below the CTA
// - <TestimonialList />: Social proof section, showing user testimonials

// BEHAVIOUR:
// - When the user selects a business, it triggers `setSelectedBusiness()`
// - A `useEffect` watches `selectedBusiness`, and if it's set, it redirects the user to `/verify`

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedBusiness } from "../../contexts/SelectBusinessContext";
import { useGooglePlacesApi } from "../../hooks/useGooglePlacesApi";

// UI Components
import TestimonialList from "./TestimonialList";
import Logo from "./Logo";
import HeroDetails from "./HeroDetails";
import SearchBusinessInput from "./SearchBusinessInput";
import HeroCtaSubtext from "./HeroCtaSubtext";

export default function SimplePlacesSearch() {
  const [input, setInput] = useState("");
  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness();
  const navigate = useNavigate();

  // Auto-redirect to /verify once a business is selected
  useEffect(() => {
    if (selectedBusiness) {
      console.log("Business was selected: " + selectedBusiness);
      navigate("/verify");
    }
  }, [selectedBusiness, navigate]);

  // Fetch autocomplete suggestions using custom hook
  const { places: data } = useGooglePlacesApi(input);

  return (
    <div className="hero-page-container">
      <div className="hero-page-cta-background-image">
        <Logo />
        <HeroDetails />
        <SearchBusinessInput
          data={data}
          input={input}
          setInput={setInput}
          setSelectedBusiness={setSelectedBusiness}
        />
      </div>
      <HeroCtaSubtext />
      <TestimonialList />
    </div>
  );
}
