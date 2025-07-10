const axios = require("axios");

// FUNCTION: searchGoogleApi()

// DESCRIPTION: Searches Google API by a text query sent from the client
// Uses axios to call the API.
// It requires a valid `GOOGLE_PLACES_API_KEY` in environment variables
// returns an array of place results

// ROUTE: POST /create-user

// PARAMS: query (string): The text user typed into the search box

// RETURN: an array of place that matches the query text

exports.searchGoogleApi = async (req, res) => {
  const { query } = req.body;

  // Validate query
  if (!query || typeof query !== "string") {
    return res
      .status(400)
      .json({ error: "Invalid or missing query parameter." });
  }

  // Building the Google API
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  try {
    // Call Google Places API
    const response = await axios.get(url);

    // Log and return results
    console.log(response.data.results);
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching places:", error.message);
    res.status(500).json({ error: "Failed to fetch places from Google API." });
  }
};
