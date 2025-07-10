import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";

export default function TermsAccordian({
  setOpenTermsAndConditions,
  openTermsAndConditions,
  termsAndConditionsText,
}) {
  return (
    <div className="terms-and-conditions-accordian-box">
      <div
        className="terms-and-conditions-accordian-open-button"
        onClick={() => setOpenTermsAndConditions(!openTermsAndConditions)}
      >
        <p style={openTermsAndConditions ? { marginBottom: "25px" } : {}}>
          Terms and services
        </p>
        {openTermsAndConditions ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {openTermsAndConditions && (
        <p className="terms-and-conditions-accordian-text">
          {termsAndConditionsText}
        </p>
      )}
    </div>
  );
}
