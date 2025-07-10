import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelectedBusiness } from "./contexts/SelectBusinessContext";
import { useGooglePlacesApi } from "./hooks/useGooglePlacesApi";

const BACKEND_URL = "http://localhost:3000";

export default function SimplePlacesSearch() {
  const [input, setInput] = useState("");
  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedBusiness) {
      console.log("Business was selected: " + selectedBusiness);
      navigate("/verify");
    }
  }, [selectedBusiness, navigate]);

  const { places: data } = useGooglePlacesApi(input);

  return (
    <div className="hero-page-container">
      <div className="hero-page-cta-background-image">
        <div>
          <img
            src="./swipe-savvy-logo.webp"
            alt="Logo of swipe savvy"
            className="swipe-savvy-logo"
          />
        </div>
        <div className="hero-page-cta-text-box">
          <h1 className="hero-page-cta-text-heading">
            You've Been Selected for a Free Loyalty Listing
          </h1>

          <p className="hero-page-cta-text">
            Your business has been recognized for its outstanding reputation.
            Join the Swipe Savvy Rewards Network — completely free.
          </p>
        </div>

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
      </div>
      <div>
        <p className="cta-text">
          We'll find your business and you can confirm the correct one in the
          next step
        </p>
      </div>

      <div>
        <div>
          <p className="client-testimonials-heading">Client Testimonials</p>
        </div>

        <div className="homepageClientTestomonialsContainer">
          <div className="client-testimonial-box">
            <div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA37OypyIIkmjtV68kDfUXxjGQTFOQ7-8z9BuONH72H1JCDto-cAwA6SNNY75OfbUqTA_3YX2sotixrZUek5mWJWjTAK8ULVbEeOXhB1yAu1pKylSAESjUAmskald5eoE5F3GRoDARVeQ6TW4AYLmDcQ58oKuY6IHizDnwcdvDnE7nM1_ce792ZZkfvCRjaDRKSt5BWLIslUUa2b3c6j_rdRnAT_EHtWmiPT3GRVmc9yQ9VdgE__UITadU-fPTqvpSkdle0jX6mCno"
                className="client-testimonial-image"
              />
            </div>
            <div>
              <p className="client-qoute">
                <strong>
                  "Swipe Savvy has been a game-changer for my business. I've
                  seen a significant increase in customer loyalty and repeat
                  business since joining the network."
                </strong>
              </p>
              <p className="client-name">
                Sophia, The Owner of The Cozy Corner Cafe
              </p>
            </div>
          </div>
          <div className="client-testimonial-box">
            <div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh8XODbVafe5o9SGDjx_VXoN9twbviO4_TcZTrmcrc9j4yxvFvc5YfogTW7D91rEE-Z5yW0hJtvIQXQmztgw1zYBw-fU6umStA99Itfw_Y1UVa0iJoClptYrOu54ciLYfIwGstx9fd-cnQ8A7P9iRG6EVgJIo-Bdml1ptIFiBfCKgHYPitM89UTzlNbcDPNRWpCXl7ZhywtJlOSVX4jmbo030ViA93_bfLgBv8Fv-gO_tl7r392t9DiWqIHYUuKLvzjRF02iFirzE"
                className="client-testimonial-image"
              />
            </div>
            <div>
              <p className="client-qoute">
                <strong>
                  "The platform is incredibly user-friendly, and the support
                  team is always there to help. Highly recommend Swipe Savvy to
                  any business looking to boost customer engagement."
                </strong>
              </p>
              <p className="client-name">Ethan, Manager at The Gear Shop</p>
            </div>
          </div>

          <div className="client-testimonial-box">
            <div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsgSlBW9NqRjJ2osL_fZRufSwhs9pUpDcJx2Kk5OA7VsJraXmGss0vJAMxUb3tIG-0Yail90ETc_kH7zqeT7gmxW3CwT2VawVZiTdYpJjMhaDRrkqjqbwsRcBX6iQlRaj0SNttVkDrcxH05OJSQLeV2peF3McK1YqqtDD1O6dQCeBS4IS0z8_YmFJQzhNUkNRAipZtz0rFYvW_ulFK4rYlS14syrOxRCHupU1JyX-oICIkZz_Lq6Tsi-AjRNAq_5R5afwzBdR6Azw"
                alt=""
                className="client-testimonial-image"
              />
            </div>
            <div>
              <p className="client-qoute">
                <strong>
                  "I love how Swipe Savvy allows me to connect with my customers
                  on a personal level. It's helped me build stronger
                  relationships and create a more loyal customer base."
                </strong>
              </p>
              <p className="client-name">
                Olivia, Founder of Bloom & Grow Boutique
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
