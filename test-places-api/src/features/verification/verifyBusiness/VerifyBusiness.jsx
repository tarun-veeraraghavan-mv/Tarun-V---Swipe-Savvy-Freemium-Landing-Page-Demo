import { useSelectedBusiness } from "../../../contexts/SelectBusinessContext";
import BusinessDisplay from "./BusinessDisplay";
import HeadingText from "./HeadingText";
import VerificationButtons from "./VerificationButtons";

export default function VerifyBusiness({ setProgress }) {
  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness();

  console.log(selectedBusiness);

  return (
    <div>
      <HeadingText />
      <BusinessDisplay selectedBusiness={selectedBusiness} />
      <VerificationButtons
        setProgress={setProgress}
        setSelectedBusiness={setSelectedBusiness}
      />
    </div>
  );
}
