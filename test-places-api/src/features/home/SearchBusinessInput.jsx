import React from "react";

export default function SearchBusinessInput({
  input,
  setInput,
  data,
  setSelectedBusiness,
}) {
  return (
    <div className="hero-page-input-box">
      <div>
        <input
          type="text"
          placeholder="🔍 Enter your business name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="hero-page-input"
        />
      </div>
      <div>
        {data.length > 0 && (
          <ul className="hero-search-results-box">
            {data.map((c) => (
              <li
                key={c.place_id}
                onClick={() => setSelectedBusiness(c)}
                className="search-list-item"
              >
                {c.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
