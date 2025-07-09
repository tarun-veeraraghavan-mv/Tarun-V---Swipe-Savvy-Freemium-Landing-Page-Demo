import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useSelectedBusiness } from "./contexts/SelectBusinessContext";
import { useNavigate } from "react-router-dom";
import Container from "./components/Container";

const BACKEND_URL = "http://localhost:3000";

export default function SimplePlacesSearch() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { selectedBusiness, setSelectedBusiness } = useSelectedBusiness();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedBusiness) {
      console.log("Business was selected: " + selectedBusiness);
      navigate("/verify");
    }
  }, [selectedBusiness, navigate]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const data = await axios.get(`${BACKEND_URL}/test-companies`);

        console.log(data.data);
        setData(data.data);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response.data.error);
        } else {
          setError("Something went wrong!");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredCompanies = input
    ? data.filter((c) => c.name.toLowerCase().includes(input.toLowerCase()))
    : [];

  return (
    <div
      style={{
        maxWidth: "1100px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "55px",
        marginBottom: "70px",
        padding: "0 32px",
      }}
    >
      <div style={{ marginBottom: "40px", position: "relative" }}>
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDVWKD4Dfbrc5nQgWv5RBnuU5JxozG1Je8EVL-IalLffnjy8AohKPi8bPLRiXZ4dAV-gm7YG5jVj3Tcsg2k94mYkbfri18qGjkqHZPkHp2w_7eGPKNpMknG18uxV4jBei0MEC6tWocTvFOlHjnk2HzhdpfEnF3Xys4UeIgTh2HOc30ezdJO4pu0b1GYeCJ6Mi76iskt4zHapgf0sJ0MSJmds1JV12IKFYc29pezxSmNMMzLa5kngkf7HY35axncbddc6Z60HnSodBI')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(0px)",
            height: "500px",
            width: "100%",
            zIndex: -1,
            borderRadius: "20px",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        ></div>

        <h1
          style={{
            position: "absolute",
            top: "7%",
            left: "50%",
            translate: "-50%",
            fontSize: "46px",
            width: "800px",
            textAlign: "center",
            marginBottom: "20px",
            color: "white",
          }}
        >
          You've been selected for a special free Email listing
        </h1>

        <p
          style={{
            color: "white",
            position: "absolute",
            top: "18%",
            textAlign: "center",
          }}
        >
          Your business has been recognized for its outstanding reputation. Join
          the Swipe Savvy Rewards Network - compoletely free.
        </p>

        <div
          style={{
            position: "relative",
            height: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <input
              type="text"
              placeholder="Enter your business name or phone number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                padding: "12px 24px",
                width: 500,
                outline: "none",
                border: "1px solid #eee",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "25%",
            left: "50%",
            translate: "-50% ",
            width: "500px",
            zIndex: 100,
          }}
        >
          {filteredCompanies.length > 0 && (
            <ul
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.4)",
                maxWidth: "500px",
                margin: "0 auto",
                listStyle: "none",
              }}
            >
              {filteredCompanies.slice(0, 4).map((c) => (
                <li
                  key={c.place_id}
                  onClick={() => setSelectedBusiness(c)}
                  className="searchListItem"
                >
                  {c.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div>
        <p style={{ color: "#777", textAlign: "center", marginBottom: "40px" }}>
          We'll find your business and you can confirm the correct one in the
          next step
        </p>
      </div>

      <div>
        <p
          style={{ fontWeight: "bold", fontSize: "26px", marginBottom: "20px" }}
        >
          Client Testimonials
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "30px",
        }}
      >
        <div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA37OypyIIkmjtV68kDfUXxjGQTFOQ7-8z9BuONH72H1JCDto-cAwA6SNNY75OfbUqTA_3YX2sotixrZUek5mWJWjTAK8ULVbEeOXhB1yAu1pKylSAESjUAmskald5eoE5F3GRoDARVeQ6TW4AYLmDcQ58oKuY6IHizDnwcdvDnE7nM1_ce792ZZkfvCRjaDRKSt5BWLIslUUa2b3c6j_rdRnAT_EHtWmiPT3GRVmc9yQ9VdgE__UITadU-fPTqvpSkdle0jX6mCno"
            style={{
              width: "100%",
              borderRadius: "20px",
              marginBottom: "20px",
            }}
          />
          <p style={{ marginBottom: "10px" }}>
            <strong>
              "Swipe Savvy has been a game-changer for my business. I've seen a
              significant increase in customer loyalty and repeat business since
              joining the network."
            </strong>
          </p>
          <p style={{ color: "#666" }}>
            Sophia, The Owner of The Cozy Corner Cafe
          </p>
        </div>
        <div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh8XODbVafe5o9SGDjx_VXoN9twbviO4_TcZTrmcrc9j4yxvFvc5YfogTW7D91rEE-Z5yW0hJtvIQXQmztgw1zYBw-fU6umStA99Itfw_Y1UVa0iJoClptYrOu54ciLYfIwGstx9fd-cnQ8A7P9iRG6EVgJIo-Bdml1ptIFiBfCKgHYPitM89UTzlNbcDPNRWpCXl7ZhywtJlOSVX4jmbo030ViA93_bfLgBv8Fv-gO_tl7r392t9DiWqIHYUuKLvzjRF02iFirzE"
            style={{
              width: "100%",
              borderRadius: "20px",
              marginBottom: "20px",
            }}
          />
          <p style={{ marginBottom: "10px" }}>
            <strong>
              "The platform is incredibly user-friendly, and the support team is
              always there to help. Highly recommend Swipe Savvy to any business
              looking to boost customer engagement."
            </strong>
          </p>
          <p style={{ color: "#666" }}>Ethan, Manager at The Gear Shop</p>
        </div>
        <div>
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsgSlBW9NqRjJ2osL_fZRufSwhs9pUpDcJx2Kk5OA7VsJraXmGss0vJAMxUb3tIG-0Yail90ETc_kH7zqeT7gmxW3CwT2VawVZiTdYpJjMhaDRrkqjqbwsRcBX6iQlRaj0SNttVkDrcxH05OJSQLeV2peF3McK1YqqtDD1O6dQCeBS4IS0z8_YmFJQzhNUkNRAipZtz0rFYvW_ulFK4rYlS14syrOxRCHupU1JyX-oICIkZz_Lq6Tsi-AjRNAq_5R5afwzBdR6Azw"
            alt=""
            style={{
              width: "100%",
              borderRadius: "20px",
              marginBottom: "20px",
            }}
          />
          <p style={{ marginBottom: "10px" }}>
            <strong>
              "I love how Swipe Savvy allows me to connect with my customers on
              a personal level. It's helped me build stronger relationships and
              create a more loyal customer base."
            </strong>
          </p>
          <p style={{ color: "#666" }}>
            Olivia, Founder of Bloom & Grow Boutique
          </p>
        </div>
      </div>
    </div>
  );
}
