import React from "react";

export default function TestimonialsListItem({ t }) {
  return (
    <div className="client-testimonial-box">
      <div>
        <img src={t.clientImageUrl} className="client-testimonial-image" />
      </div>
      <div>
        <p className="client-qoute">
          <strong>{t.testimonial}</strong>
        </p>
        <p className="client-name">{t.owner}</p>
      </div>
    </div>
  );
}
