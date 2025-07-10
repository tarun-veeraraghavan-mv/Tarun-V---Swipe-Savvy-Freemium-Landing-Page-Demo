// COMPONENT: Verify

// DESCRIPTION:
// This component manages the 3-step verification process after a user selects a business.
// It dynamically renders different verification steps (business ownership, account creation, terms acceptance)
// and controls navigation based on user progress and context state.

// HOOKS & CONTEXT:
// - useSelectedBusiness(): Accesses the currently selected business from global state
// - useUser(): Manages the current user object across the app
// - useNavigate(): React Router hook used to redirect users if no business is selected

// STATE:
// - progress (int): Tracks current step in the 3-step verification process
// - ownerVerificationChecked (bool): Tracks checkbox for confirming business ownership
// - readTermsAndConditionsChecked (bool): Tracks checkbox for accepting terms and conditions

// BEHAVIOR:
// - If no business is selected, redirects user to the homepage
// - Renders progress bar and displays appropriate step component:
//   1. <VerifyBusiness />
//   2. <VerifyAccountCreation />
//   3. <VerifyTermsAndConditions />

import { useEffect, useState } from "react";
import { useSelectedBusiness } from "../../contexts/SelectBusinessContext";
import { useNavigate } from "react-router-dom";
import VerifyBusiness from "./verifyBusiness/VerifyBusiness";
import VerifyAccountCreation from "./VerifyAccountCreation";
import VerifyTermsAndConditions from "./verifyTermsAndConditions/VerifyTermsAndConditions";
import Container from "../../components/Container";
import { useUser } from "../../contexts/UserContext";
import StepProgressBar from "./StepProgressBar";

export default function Verify() {
  // hooks and context
  const { selectedBusiness } = useSelectedBusiness();
  const { user, setUser } = useUser();

  // current step in 3-step verification
  const [progress, setProgress] = useState(1);

  // check box state to check if user is owner and if they agreed to terms and conditions
  const [ownerVerificationChecked, setOwnerVerificationChecked] =
    useState(false);

  const [readTermsAndConditionsChecked, setReadTermsAndConditionsChecked] =
    useState(false);

  // navigation function to redirect user
  const navigate = useNavigate();

  // if no business is selected, redirect user back to '/' home page
  useEffect(() => {
    if (!selectedBusiness) {
      navigate("/");
    }
  }, [navigate, selectedBusiness]);

  return (
    <Container>
      {/* Renders the progress bar on the screen */}
      <StepProgressBar progress={progress} />

      {/* If progress step is 1 */}
      {progress === 1 && (
        <VerifyBusiness
          ownerVerificationChecked={ownerVerificationChecked}
          setOwnerVerificationChecked={setOwnerVerificationChecked}
          setProgress={setProgress}
        />
      )}

      {/* If progress step is 2 */}
      {progress === 2 && (
        <VerifyAccountCreation setProgress={setProgress} setUser={setUser} />
      )}

      {/* If progress step is 3 */}
      {progress === 3 && (
        <VerifyTermsAndConditions
          readTermsAndConditionsChecked={readTermsAndConditionsChecked}
          setReadTermsAndConditionsChecked={setReadTermsAndConditionsChecked}
          setProgress={setProgress}
          user={user}
          setUser={setUser}
        />
      )}
    </Container>
  );
}
