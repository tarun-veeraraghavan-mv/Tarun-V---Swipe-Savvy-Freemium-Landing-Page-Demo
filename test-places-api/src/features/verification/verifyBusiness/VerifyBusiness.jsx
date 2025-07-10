// COMPONENT: VerifyBusiness

// DESCRIPTION:
// This component represents Step 1 of the verification flow — verifying business ownership.
// It displays the selected business details and provides action buttons for the user to confirm or go back.

// PROPS:
// - setProgress (function): Callback to advance the verification step (typically to step 2)

// CONTEXT:
// - useSelectedBusiness():
//   - selectedBusiness: The business object selected by the user on the homepage
//   - setSelectedBusiness: Allows clearing or changing the selected business

// BEHAVIOR:
// - Renders the heading for the verification step
// - Displays selected business info using <BusinessDisplay />
// - Renders two buttons via <VerificationButtons />:
//   - One to confirm ownership (calls `setProgress(2)`)
//   - One to go back or reset the selected business

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
