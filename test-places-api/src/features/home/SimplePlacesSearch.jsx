import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedBusiness } from "../../contexts/SelectBusinessContext";
import { useGooglePlacesApi } from "../../hooks/useGooglePlacesApi";
import TestimonialList from "./TestimonialList";
import Logo from "./Logo";
import HeroDetails from "./HeroDetails";
import SearchBusinessInput from "./SearchBusinessInput";
import HeroCtaSubtext from "./HeroCtaSubtext";

export default function SimplePlacesSearch() {
  const [input, setInput] = useState("");
  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedBusiness) {
      console.log("Business was selected: " + selectedBusiness);
      navigate("/verify");
    }
  }, [selectedBusiness, navigate]);

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
