import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

// custom hook: useGooglePlacesApi

// DESCRIPTION: Custom hook to fetch place search results using Google Places API via backend.
// It sends the provided 'query' string to your backend endpoint at /search.
// Automatically runs every time 'query' changes.
// Uses a simple debounce function to prevent any API abouse

// PARAM: query (string): The search query
// RETURNS: { places } - An array of place results returned from Google Places API
export function useGooglePlacesApi(query) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // If no query, reset states and don't fetch
    if (!query) {
      setPlaces([]);
      setError("");
      setLoading(false);
      return;
    }

    // Set a debounce timeout of 300ms
    const handler = setTimeout(() => {
      const fetchSearchPlaces = async () => {
        try {
          setLoading(true);
          const res = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/search`,
            {
              query,
            }
          );
          setPlaces(res.data);
          setError("");
        } catch (err) {
          if (err instanceof AxiosError && err.response) {
            setError(err.response.data.error);
          } else {
            setError("Something went wrong");
          }
        } finally {
          setLoading(false);
        }
      };

      fetchSearchPlaces();
    }, 300); // wait 300ms after last keystroke

    // Cleanup function clears the timeout if query changes before 300ms
    return () => clearTimeout(handler);
  }, [query]);

  return { places, loading, error };
}
