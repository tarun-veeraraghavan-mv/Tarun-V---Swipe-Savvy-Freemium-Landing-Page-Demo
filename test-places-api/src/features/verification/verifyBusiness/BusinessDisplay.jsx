import React from "react";

export default function BusinessDisplay({ selectedBusiness }) {
  return (
    <div className="displayChosenCompanyContainer">
      <DisplayImage selectedBusiness={selectedBusiness} />
      <DisplayDetails selectedBusiness={selectedBusiness} />
    </div>
  );
}

function DisplayImage({ selectedBusiness }) {
  return (
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
  );
}

function DisplayDetails({ selectedBusiness }) {
  return (
    <div>
      <p className="verify-business-company-title">{selectedBusiness.name}</p>
      <p className="verify-business-company-details">
        {selectedBusiness.formatted_address || "Address not available"}
      </p>
      <div className="verify-business-company-details">
        {selectedBusiness.user_ratings_total && selectedBusiness.rating ? (
          <p>
            <strong>{selectedBusiness.user_ratings_total}</strong> user views (
            <strong>{selectedBusiness.rating}</strong> ⭐️)
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
  );
}
