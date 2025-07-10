import axios from "axios";
import { useEffect, useState } from "react";

export function useGooglePlacesApi(query) {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchSearchPlaces = async () => {
      try {
        const res = await axios.post("http://localhost:3000/search", {
          query,
        });

        setPlaces(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSearchPlaces();
  }, [query]);

  return { places };
}
