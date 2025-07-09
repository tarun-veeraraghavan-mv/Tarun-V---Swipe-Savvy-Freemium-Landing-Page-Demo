import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { termsAndConditionsText } from "../../../constants/terms-and-conditions";

export default function VerifyTermsAndConditions({ user, setProgress }) {
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  async function onSubmit() {
    try {
      setLoading(true);

      const res = await axios.post("http://localhost:3000/create-user", user);
      console.log(res);

      toast.success("Account successfully created!");

      navigate("/listing");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        toast.error(err.response.data.error);
        setProgress(2);
      } else {
        toast.error("Something went wrong!");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 className="terms-and-conditions-heading">Just one more step</h2>

      <p className="terms-and-conditions-subtext">
        Please review and agree to our terms activating your account
      </p>
      <div className="terms-and-conditions-accordian-box">
        <div
          className="terms-and-conditions-accordian-open-button"
          onClick={() => setOpenTermsAndConditions(!openTermsAndConditions)}
        >
          <p style={openTermsAndConditions ? { marginBottom: "25px" } : {}}>
            Terms and services
          </p>
          {openTermsAndConditions ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        {openTermsAndConditions && (
          <p className="terms-and-conditions-accordian-text">
            {termsAndConditionsText}
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="terms-and-conditions-agreement-form"
      >
        <div className="terms-and-conditions-agreement-form">
          <input
            name="companyPolicy"
            type="checkbox"
            {...register("companyPolicy", {
              required:
                "You must agree to the company's policy to start your free listing",
            })}
          />
          <label className="terms-and-conditions-agreement-form-label">
            I have read and agree to the Swipe Savvy Merchant Agreement and
            Privacy Policy.
          </label>
          {errors?.companyPolicy?.message && (
            <p className="error-text">{errors.companyPolicy.message}</p>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            className="activate-my-account-button"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Activating your account..."
              : "Activate my free listing page"}
          </button>
        </div>
      </form>
      <p className="terms-and-conditions-notification">
        We'll ship your Swipe Savvy window sticker and POS signage within 5-7
        business days
      </p>
      <div>
        <p className="terms-and-conditions-free-benefits-title">
          Free Benefits!
        </p>
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
    </div>
  );
}
