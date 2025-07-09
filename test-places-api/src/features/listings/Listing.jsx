import axios, { AxiosError } from "axios";
import Container from "../../components/Container";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Listing() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/create-checkout-session",
        { email: user.email }
      );

      const { url } = res.data;
      window.location.href = url;
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Somethign went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h2 className="listing-heading">
        🎉 Your business is now live on Swipe Savvy!
      </h2>
      <p className="listing-heading-subtext">
        Make the most of the limited-time upgrade - first month free + 50% off
        for free trade
      </p>

      <div style={{ marginBottom: "35px" }}>
        <div className="free-plan-background-image">
          <div className="banner-details">
            <p className="plan-heading">Free plan active</p>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                listStyle: "none",
                gap: "12px",
              }}
            >
              <li className="plan-details">✅ You’re listed on Swipe Savvy</li>
              <li className="plan-details">❌ Limited visibility</li>
              <li className="plan-details">❌ No featured placement</li>
              <li className="plan-details">
                ❌ No analytics or performance tracking
              </li>
              <li className="plan-details">
                ❌ No analytics or performance tracking. Manual sync — listings
                not synced to Google/Yelp/etc.
              </li>
            </ul>
          </div>
        </div>
        <div className="pro-plan-image">
          <div className="banner-details">
            <p className="plan-heading">
              Shop Savvy Upgrade — First Month <br /> Free + 50% Off for Life
            </p>
            <ul
              style={{
                display: "flex",
                flexDirection: "column",
                listStyle: "none",
                gap: "12px",
              }}
            >
              <li className="plan-details">✅ Featured placement in our app</li>
              <li className="plan-details">✅ Run 2x rewards promotions</li>
              <li className="plan-details">
                ✅ Sync your listing across Google, Yelp, Facebook & more
              </li>
              <li className="plan-details">
                ✅ Access analytics and performance reports
              </li>
            </ul>
          </div>
          <div className="plan-details-container">
            <button
              className="syncListingsButton"
              onClick={handleUpgrade}
              disabled={loading}
            >
              {!loading
                ? "🔥 Yes upgrade me - Risk free"
                : "Getting you ready..."}
            </button>
          </div>
        </div>
      </div>
      <div className="no-thanks-box">
        <p className="no-thanks-text">
          ➡️ No Thanks, I’ll Stay on the free plan
        </p>
      </div>

      <div>
        <p className="listing-client-heading">Client testimonials</p>
        <div className="listing-client-testimonials">
          <div className="listing-testimonial-box">
            <div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuApDKkzgeVAm92WNZDVh1Rnf_ziRCY9o2c2C4EuRC0UX7vGWIqJ-C5Uec_Fqgo8jjGMb7WKPX2t29-yV5qDzvLu5U1i4vMcDFRgHq4uJJuzvy2V36fc9mg_ytg8nPK7eJcbKqkUkZlzbivIQlME7mbd1_35ZpxVVJ-LL2ZQZBrzSNsCAXNmLFSUL_vua5x8I5qfPA_kbyLelRTIfRJXYkc2dl9FYn1ICePaa6F52U1OXQV55yJz3eCbJbfGrPjLAnOK4MQg1WViPJA"
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  marginBottom: "20px",
                }}
              />
            </div>
            <div>
              <p className="owner-text">
                <strong>
                  "Swipe Savvy has been a game-changer for my business. The
                  analytics are incredibly insightful, and the ability to run
                  promotions has significantly boosted my customer engagement."
                </strong>
              </p>
              <p className="owner-details">
                - Sarah, Owner of The Cozy Corner Cafe
              </p>
            </div>
          </div>
          <div className="listing-testimonial-box">
            <div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXfxNJNys2xhHVK2gt6dac5pRHQDBHOsTaZ0qbsnFTTa8QJ72Rcsqfa56qQ9t3GRs2ee4qEeT3xgUXh5InOTRWOfD4GSlAJcNKqqYEwf2EehOOZTcCJgyZuoHgWDPvJeVB7bJs-qAPDib0xAiLnZv9RCPhWtaiAkQp9rpYcuQRk_KfFTWdn-p_mYEsVHsPKRaMSZeQMr91Lsa8WK1tZQfnvXqxSq-OELpa83GQrDWQN3gx7V9nTlx5HF-Uuy2I25sTKEAfvYrx_T8"
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  marginBottom: "20px",
                }}
              />
            </div>
            <div>
              <p className="owner-text">
                <strong>
                  "I love how easy it is to manage my business listing on Swipe
                  Savvy. The platform is user-friendly, and the support team is
                  always there to help. Highly recommend!"
                </strong>
              </p>
              <p className="owner-details">
                - Michael, Manager at The Urban Style Salon
              </p>
            </div>
          </div>
          <div className="listing-testimonial-box">
            <div>
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5L5v2my_eGtNpFo--PXO9EJsOEIFL0tyR_YRz-P5t8gqR8w4z3p6g__F0e08A_aOUh800HAua5lRADdWE9j_0iWvKr4bDtXI3-6Ldas3pRmXW3TyVd_VbWOTz5-2ysGv38vRqxO8Mro23hsT9xTmx-o7aPHEAbQiQrgzMQyggQkvLfsVDrZppDArZnZAEh8N91-285CfopRi63St81Ud5meFTsOAU8mvoOEmalz85SCgQhRYfiNfSJ5un7SZom1vGFduaK-YiLVM"
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  marginBottom: "20px",
                }}
              />
            </div>
            <div>
              <p className="owner-text">
                <strong>
                  "Thanks to Swipe Savvy, my business has seen a noticeable
                  increase in foot traffic. The featured placement in the app
                  has definitely helped attract new customers."
                </strong>
              </p>
              <p className="owner-details">
                - Emily, Proprietor of The Green Leaf Boutique
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
