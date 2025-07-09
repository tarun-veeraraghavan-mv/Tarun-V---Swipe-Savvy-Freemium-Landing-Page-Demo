import axios from "axios";
import Container from "../../components/Container";
import { useUser } from "../../contexts/UserContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Listing() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleUpgrade = async () => {
    const res = await axios.post(
      "http://localhost:3000/create-checkout-session",
      { email: user.email }
    );

    const { url } = res.data;
    window.location.href = url;
  };

  return (
    <Container>
      <h2
        style={{
          textAlign: "center",
          fontWeight: "600",
          fontSize: "34px",
          letterSpacing: "0.4px",
          marginBottom: "20px",
          style: "#999",
        }}
      >
        🎉 Your business is now live on Swipe Savvy!
      </h2>
      <p style={{ textAlign: "center", marginBottom: "23px" }}>
        Make the most of the limited-time upgrade - first month free + 50% off
        for free trade
      </p>
      <div className="listing-container">
        <button className="freeAccountActiveButton">Free Plan Active</button>
        <button className="upgradeOfferButton">Upgrade offer</button>
      </div>

      <div style={{ marginBottom: "35px" }}>
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzeXCLFA8vwycsXT0G4sW70rZRgOc14i0ya3fjYVpUBLe2IvSe05iHzgDsma8JGziiTJHcfDfdiYwqy6hZ6bXfS1qMvPaHfbuB4cQFUHpciAL6lhcO8b8x7WizjJ2jfNPoxkMAIJV0KXOTX91SlksoPUIpHKxSrwRcqiPr7wExPWBNfXhvDzY5nO82XpCKE9SwciZmC1TaUTINkvgoAm7hB2oMsOEbNXJO9ECZAaLZPGG9FCY1Ds3TWOwZrFFgM-0ZGWl8xEaaqvM')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(0px)",
            height: "300px",
            width: "100%",
            zIndex: 0,
            borderRadius: "20px",
            position: "relative",
            marginBottom: "30px",
          }}
        >
          <div className="banner-details">
            <p
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "32px",
                marginBottom: "12px",
              }}
            >
              Featured placement in our app
            </p>
            <p style={{ color: "white" }}>Run 2x rewards promotions</p>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              right: "20px",
            }}
          >
            <button className="syncListingsButton">
              Sync your listings social media
            </button>
          </div>
        </div>
        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAwLlS17kwEKuR4qpSg2NaVrBVun1y8u86pmRkTGece5qLO9-JBLyqU2NKL_UwMZEvg35fhvgutlUkpxLeBNFNq_Ahby31l-5o-gKVysVPqtapu17EZceM_ojAOjMAfyNn-Ya5ii9V1h2_hN4nuL4PxEeaCdAQZzZiEZIDxMHdpzlyIETEntY7eT_9t6I-DYudcb88LiUAyZmEC5yavIKyNVOic2gFQelBYhGyEMcmsxT9IsMna0VOS7tJpquVhqnMa3n6EgynuThs')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(0px)",
            height: "300px",
            width: "100%",
            zIndex: 0,
            borderRadius: "20px",
            position: "relative",
            marginBottom: "30px",
          }}
        >
          <div className="banner-details">
            <p
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "32px",
                marginBottom: "12px",
              }}
            >
              Access analytics and performance <br /> reports
            </p>
            <p style={{ color: "white" }}>
              Try it free for 30 days - then just $34.50/mo (50% off forever)
            </p>
          </div>
          <div style={{ position: "absolute", bottom: "20px", right: "20px" }}>
            <button className="syncListingsButton" onClick={handleUpgrade}>
              🔥 Yes upgrade me - Risk free
            </button>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: "24px" }}>
        <p style={{ fontWeight: "bold", textAlign: "center" }}>
          ➡️ No Thanks, I’ll Stay on the free plan
        </p>
      </div>

      <div>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "26px",
            marginBottom: "20px",
          }}
        >
          Client testimonials
        </p>
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
              <p style={{ marginBottom: "10px" }}>
                <strong>
                  "Swipe Savvy has been a game-changer for my business. The
                  analytics are incredibly insightful, and the ability to run
                  promotions has significantly boosted my customer engagement."
                </strong>
              </p>
              <p style={{ color: "#666" }}>
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
              <p style={{ marginBottom: "10px" }}>
                <strong>
                  "I love how easy it is to manage my business listing on Swipe
                  Savvy. The platform is user-friendly, and the support team is
                  always there to help. Highly recommend!"
                </strong>
              </p>
              <p style={{ color: "#666" }}>
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
              <p style={{ marginBottom: "10px" }}>
                <strong>
                  "Thanks to Swipe Savvy, my business has seen a noticeable
                  increase in foot traffic. The featured placement in the app
                  has definitely helped attract new customers."
                </strong>
              </p>
              <p style={{ color: "#666" }}>
                - Emily, Proprietor of The Green Leaf Boutique
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
