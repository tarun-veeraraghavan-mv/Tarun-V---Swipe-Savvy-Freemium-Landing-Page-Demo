import TestimonialsListItem from "./TestimonialsListItem";

const testimonialList = [
  {
    id: 1,
    clientImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA37OypyIIkmjtV68kDfUXxjGQTFOQ7-8z9BuONH72H1JCDto-cAwA6SNNY75OfbUqTA_3YX2sotixrZUek5mWJWjTAK8ULVbEeOXhB1yAu1pKylSAESjUAmskald5eoE5F3GRoDARVeQ6TW4AYLmDcQ58oKuY6IHizDnwcdvDnE7nM1_ce792ZZkfvCRjaDRKSt5BWLIslUUa2b3c6j_rdRnAT_EHtWmiPT3GRVmc9yQ9VdgE__UITadU-fPTqvpSkdle0jX6mCno",
    testimonial:
      "Swipe Savvy has been a game-changer for my business. I've seen a significant increase in customer loyalty and repeat business since joining the network.",
    owner: "Sophia, The Owner of The Cozy Corner Cafe",
  },
  {
    id: 2,
    clientImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDh8XODbVafe5o9SGDjx_VXoN9twbviO4_TcZTrmcrc9j4yxvFvc5YfogTW7D91rEE-Z5yW0hJtvIQXQmztgw1zYBw-fU6umStA99Itfw_Y1UVa0iJoClptYrOu54ciLYfIwGstx9fd-cnQ8A7P9iRG6EVgJIo-Bdml1ptIFiBfCKgHYPitM89UTzlNbcDPNRWpCXl7ZhywtJlOSVX4jmbo030ViA93_bfLgBv8Fv-gO_tl7r392t9DiWqIHYUuKLvzjRF02iFirzE",
    testimonial:
      "The platform is incredibly user-friendly, and the support team is always there to help. Highly recommend Swipe Savvy to any business looking to boost customer engagement.",
    owner: "Ethan, Manager at The Gear Shop",
  },
  {
    id: 3,
    clientImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDsgSlBW9NqRjJ2osL_fZRufSwhs9pUpDcJx2Kk5OA7VsJraXmGss0vJAMxUb3tIG-0Yail90ETc_kH7zqeT7gmxW3CwT2VawVZiTdYpJjMhaDRrkqjqbwsRcBX6iQlRaj0SNttVkDrcxH05OJSQLeV2peF3McK1YqqtDD1O6dQCeBS4IS0z8_YmFJQzhNUkNRAipZtz0rFYvW_ulFK4rYlS14syrOxRCHupU1JyX-oICIkZz_Lq6Tsi-AjRNAq_5R5afwzBdR6Azw",
    testimonial:
      "I love how Swipe Savvy allows me to connect with my customers on a personal level. It's helped me build stronger relationships and create a more loyal customer base.",
    owner: "Olivia, Founder of Bloom & Grow Boutique",
  },
];

export default function TestimonialList() {
  return (
    <div>
      <div>
        <p className="client-testimonials-heading">Client Testimonials</p>
      </div>

      <div className="homepageClientTestomonialsContainer">
        {testimonialList.map((t) => (
          <TestimonialsListItem t={t} key={t.id} />
        ))}
      </div>
    </div>
  );
}
