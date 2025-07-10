import { useNavigate } from "react-router-dom";

export default function VerificationButtons({
  setProgress,
  setSelectedBusiness,
}) {
  const navigate = useNavigate();

  return (
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
  );
}
