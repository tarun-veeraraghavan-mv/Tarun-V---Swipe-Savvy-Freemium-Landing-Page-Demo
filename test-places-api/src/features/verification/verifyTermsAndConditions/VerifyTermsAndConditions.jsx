// COMPONENT: VerifyTermsAndConditions

// DESCRIPTION:
// This is Step 3 of the verification flow where the user agrees to the terms and conditions.
// It finalizes the account creation by submitting the user object to the backend API,
// and redirects the user to the `/listing` page upon success.

// PROPS:
// - user (object): The user data collected from the previous step
// - setUser (function): Updates the global user context with the response from the backend
// - setProgress (function): Allows returning to Step 2 if there's a backend validation error

// BEHAVIOR:
// - Uses react-hook-form to handle agreement checkbox and submission
// - Uses Axios to POST the user object to `/create-user` endpoint
// - Displays error toasts if user data is missing or the request fails
// - Redirects to `/listing` on successful creation
// - Includes a collapsible accordion to show full terms text
// - Displays subscription benefits and related info below the form

// UI COMPONENTS USED:
// - <TermsHeadingText />: Displays the section heading
// - <TermsAccordian />: Shows/hides the full terms & conditions text
// - <TermsForm />: Renders checkbox input for agreement and submit button
// - <NotificationText />: Shows a disclaimer or informational text
// - <SubscriptionBenefits />: Highlights what the user gets from subscribing

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { termsAndConditionsText } from "../../../../constants/terms-and-conditions";
import SubscriptionBenefits from "./SubscriptionBenefits";
import TermsAccordian from "./TermsAccordian";
import NotificationText from "./NotificationText";
import TermsHeadingText from "./TermsHeadingText";
import TermsForm from "./TermsForm";

export default function VerifyTermsAndConditions({
  user,
  setUser,
  setProgress,
}) {
  const [openTermsAndConditions, setOpenTermsAndConditions] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  async function onSubmit() {
    if (!user) {
      toast.error("You must login to activate your free listing");
      return;
    }
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/create-user`,
        user
      );
      console.log(res);
      setUser(res.data);

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
      <TermsHeadingText />

      <TermsAccordian
        setOpenTermsAndConditions={setOpenTermsAndConditions}
        openTermsAndConditions={openTermsAndConditions}
        termsAndConditionsText={termsAndConditionsText}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="terms-and-conditions-agreement-form"
      >
        <TermsForm loading={loading} register={register} errors={errors} />
      </form>

      <NotificationText />
      <SubscriptionBenefits />
    </div>
  );
}
