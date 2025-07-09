import { useEffect, useState } from "react";
import { useSelectedBusiness } from "../../contexts/SelectBusinessContext";
import { useNavigate } from "react-router-dom";
import VerifyBusiness from "./VerifyBusiness";
import VerifyAccountCreation from "./VerifyAccountCreation";
import VerifyTermsAndConditions from "./VerifyTermsAndConditions";
import Container from "../../components/Container";
import { useUser } from "../../contexts/UserContext";

export default function Verify() {
  const { selectedBusiness } = useSelectedBusiness();
  const { user, setUser } = useUser();
  const [progress, setProgress] = useState(1);
  const [ownerVerificationChecked, setOwnerVerificationChecked] =
    useState(false);
  const [readTermsAndConditionsChecked, setReadTermsAndConditionsChecked] =
    useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedBusiness) {
      navigate("/");
    }
  }, [navigate, selectedBusiness]);

  return (
    <Container>
      <div style={{ marginBottom: "35px" }}>
        <p>Step {progress} of 3</p>
        <progress
          value={progress}
          max="3"
          style={{
            width: "100%",
            transition: "width 0.3s ease-in-out",
          }}
          className="progress"
        ></progress>
      </div>

      {progress === 1 && (
        <VerifyBusiness
          ownerVerificationChecked={ownerVerificationChecked}
          setOwnerVerificationChecked={setOwnerVerificationChecked}
          setProgress={setProgress}
        />
      )}

      {progress === 2 && (
        <VerifyAccountCreation setProgress={setProgress} setUser={setUser} />
      )}

      {progress === 3 && (
        <VerifyTermsAndConditions
          readTermsAndConditionsChecked={readTermsAndConditionsChecked}
          setReadTermsAndConditionsChecked={setReadTermsAndConditionsChecked}
          setProgress={setProgress}
          user={user}
        />
      )}
    </Container>
  );
}
