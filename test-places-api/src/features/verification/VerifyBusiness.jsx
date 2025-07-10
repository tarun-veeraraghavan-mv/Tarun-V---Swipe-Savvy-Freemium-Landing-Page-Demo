import { useNavigate } from "react-router-dom";
import { useSelectedBusiness } from "../../contexts/SelectBusinessContext";

export default function VerifyBusiness({ setProgress }) {
  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness();
  const navigate = useNavigate();

  console.log(selectedBusiness);

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
            src={
              selectedBusiness.photos[0].photo_reference
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${selectedBusiness.photos[0].photo_reference}&key=AIzaSyBQ3RH7SbmPFpee6g2yext-zL45YtGv9Fo`
                : "No images available for this shop"
            }
            alt="Image of your shop"
            className="verify-business-image"
          />
        </div>
        <div>
          <p className="verify-business-company-title">
            {selectedBusiness.name}
          </p>
          <p className="verify-business-company-details">
            {selectedBusiness.formatted_address || "Address not available"}
          </p>
          <div className="verify-business-company-details">
            {selectedBusiness.user_ratings_total && selectedBusiness.rating ? (
              <p>
                <strong>{selectedBusiness.user_ratings_total}</strong> user
                views (<strong>{selectedBusiness.rating}</strong> ⭐️)
              </p>
            ) : (
              "No ratings details could be found"
            )}
          </div>
          <div className="verify-business-company-details">
            {selectedBusiness.geometry.location.lat &&
            selectedBusiness.geometry.location.lng ? (
              <p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedBusiness.geometry.location.lat},${selectedBusiness.geometry.location.lng}`}
                  target="_blank"
                >
                  View on google maps &rarr;
                </a>
              </p>
            ) : (
              "Could not display this shop on Google Maps"
            )}
          </div>
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
