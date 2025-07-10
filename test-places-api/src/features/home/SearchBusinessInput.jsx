// COMPONENT: SearchBusinessInput

// DESCRIPTION:
// This component renders the business search input and autocomplete results.
// It is a critical part of the homepage flow where users
// search for and select their business.

// PROPS:
// - input (string): Current input value from the user
// - setInput (function): Setter to update the input state
// - data (array): List of place predictions (Google Places API results)
// - setSelectedBusiness (function): Callback to set the
// selected business (triggers navigation)

// Behavior:
// - Renders an input box where users type their business name
// - Shows a dropdown of results as user types (from `data`)
// - Clicking a result sets it as the selected business

export default function SearchBusinessInput({
  input,
  setInput,
  data,
  setSelectedBusiness,
}) {
  return (
    <div className="hero-page-input-box">
      <div>
        {/* Input box where user types */}
        <input
          type="text"
          placeholder="🔍 Enter your business name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="hero-page-input"
        />
      </div>
      <div>
        {/* Search results display */}
        {data.length > 0 && (
          <ul className="hero-search-results-box">
            {data.map((c) => (
              // Clicking on item selects the business
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
