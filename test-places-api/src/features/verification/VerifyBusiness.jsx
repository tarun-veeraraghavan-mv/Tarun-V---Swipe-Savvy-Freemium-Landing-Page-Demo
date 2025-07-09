import { useNavigate } from "react-router-dom";
import { useSelectedBusiness } from "../../contexts/SelectBusinessContext";

export default function VerifyBusiness({ setProgress }) {
  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness();
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <h2 className="verify-business-heading">Is this your business ?</h2>
        <p className="verify-business-subheading">
          We found the following match for your entry. Please confirm before
          proceeding
        </p>
      </div>
      <div className="displayChosenCompanyContainer">
        <div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR6q9Pod7mDvR_dmZvRCh6OaQn1_uEjS-c2ZD1vQ8MVZXxmTgmyf7zFetF1Bb7UbTIH3g0pk_GZXnNzF0kWym1dWe5Iod3ig3Mg5ZFjsJbIk9ne585xrL0RXm0XLCvy8gEvJngG4KbgskmmGILztKq_thNsKmXnjP9U3Of_aXcBjBw9qg7RSt99CSLSuhm3Jz3vXuf3RahdG8dMO4N2sOKHxNCmuBfDMLzaPl0a2HZ_L-bOX56iJ7F2NWkeduPhb3Xs5iHuMrnEwk"
            alt="Image of your shop"
            className="verify-business-image"
          />
        </div>
        <div>
          <p className="verify-business-company-title">
            {selectedBusiness.name}
          </p>
          <p className="verify-business-company-details">
            {selectedBusiness.formatted_address}
          </p>
          <p className="verify-business-company-details">
            {selectedBusiness.user_ratings_total} user views (
            {selectedBusiness.rating})
          </p>
        </div>
      </div>
      <div className="verify-bussiness-button-container">
        <button
          onClick={() => setProgress((prev) => (prev < 3 ? prev + 1 : prev))}
          className="this-is-me-button"
        >
          ➡️ Yes, this is me
        </button>
        <button
          onClick={() => {
            setSelectedBusiness(null);
            navigate("/");
          }}
          className="this-is-not-me-button"
        >
          ↩️ No, this is not me
        </button>
      </div>
    </div>
  );
}
