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

      const res = await axios.post("http://localhost:3000/create-user", user);
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
