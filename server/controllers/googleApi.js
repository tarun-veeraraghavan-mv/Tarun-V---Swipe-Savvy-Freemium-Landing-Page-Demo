const axios = require("axios");

exports.searchGoogleApi = async (req, res) => {
  const { query } = req.body;

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
    query
  )}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await axios.get(url);
    console.log(response.data.results);
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching places:", error.message);
  }
};
