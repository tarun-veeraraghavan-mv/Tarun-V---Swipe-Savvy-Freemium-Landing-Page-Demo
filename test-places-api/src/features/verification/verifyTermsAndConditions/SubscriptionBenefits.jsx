import { FaCheck } from "react-icons/fa6";

export default function SubscriptionBenefits() {
  return (
    <div>
      <p className="terms-and-conditions-free-benefits-title">Free Benefits!</p>
      <ul className="terms-and-conditions-free-benefits-list">
        <li className="terms-and-conditions-free-benefits-list-item">
          <FaCheck height={30} width={30} />
          <p>No monthly fees</p>
        </li>
        <li className="terms-and-conditions-free-benefits-list-item">
          <FaCheck height={30} width={30} /> <p>No setup fees</p>
        </li>
        <li className="terms-and-conditions-free-benefits-list-item">
          <FaCheck height={30} width={30} />
          <p>No cancellation fees</p>
        </li>
        <li className="terms-and-conditions-free-benefits-list-item">
          <FaCheck height={30} width={30} />
          <p>Free Swipe Savvy window sticker</p>
        </li>
        <li className="terms-and-conditions-free-benefits-list-item">
          <FaCheck height={30} width={30} />
          <p>Free Swipe Savvy POS signage</p>
        </li>
      </ul>
    </div>
  );
}
