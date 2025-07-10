// COMPONENT: VerifyAccountCreation

// DESCRIPTION:
// This is Step 2 of the verification flow where the user creates a Swipe Savvy account.
// It collects and validates user details using `react-hook-form` and updates user context state.
// On successful submission, it progresses the verification flow to Step 3.

// PROPS:
// - setProgress (function): Callback to advance the verification step (moves to Step 3)
// - setUser (function): Sets the new user object into global state (likely context)

// BEHAVIOR:
// - Uses `useForm()` from react-hook-form for form state and validation
// - Fields include: full name, email, phone number, password, confirm password, and optional website
// - Validates email, phone number, and password strength
// - Confirms password matches
// - Includes checkboxes for SMS opt-in and ownership verification
// - If all validations pass, saves user data (excluding confirmPassword) and moves to the next step

import { useForm } from "react-hook-form";

export default function VerifyAccountCreation({ setProgress, setUser }) {
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  async function onSubmit(data) {
    console.log(data);

    const { confirmPassword: _, ...userData } = data;
    setUser(userData);
    setProgress(3);
  }

  return (
    <div>
      <h2 className="account-creation-heading">
        Create your Swipe Savvy Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="verify-account-form-container">
          <div>
            <div className="input-container">
              <label htmlFor="name" className="input-label-text">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                id="name"
                name="name"
                className="input-field"
                {...register("name", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Your name has to be atleast 6 charecters",
                  },
                  maxLength: {
                    value: 25,
                    message: "Your name has to be maximum 16 charecters",
                  },
                })}
              />
              {errors?.name?.message && (
                <p className="input-error-text">{errors.name.message}</p>
              )}
            </div>
            <div className="input-container">
              <label className="input-label-text">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                className="input-field"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors?.email?.message && (
                <p className="input-error-text">{errors.email.message}</p>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="phone" className="input-label-text">
                Mobile Number
              </label>
              <input
                type="text"
                placeholder="Enter your mobile number"
                id="phone"
                name="phone"
                className="input-field"
                {...register("phone", {
                  required: "This field is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Enter a valid 10-digit phone number",
                  },
                })}
              />
              {errors?.phone?.message && (
                <p className="input-error-text">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div>
            <div className="input-container">
              <label htmlFor="password" className="input-label-text">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                id="password"
                name="password"
                className="input-field"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Your password has to be atleast 8 charecters",
                  },
                  maxLength: {
                    value: 13,
                    message: "Your password has to be maximum of 13 charecters",
                  },
                })}
              />
              {errors?.password?.message && (
                <p className="input-error-text">{errors.password.message}</p>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="confirmPassword" className="input-label-text">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="Confirm your password"
                id="confirmPassword"
                name="confirmPassword"
                className="input-field"
                {...register("confirmPassword", {
                  required: "This field is required",
                  validate: (value) =>
                    value === getValues("password") || "Passwords do not match",
                })}
              />
              {errors?.confirmPassword?.message && (
                <p className="input-error-text">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="input-container">
              <label htmlFor="website" className="input-label-text">
                Website or Social link (Optional)
              </label>
              <input
                type="text"
                placeholder="Enter your website or social link"
                id="website"
                name="website"
                className="input-field"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="account-creation-options-container">
            <div className="account-creation-input-container">
              <input
                type="checkbox"
                name="recieve-sms"
                id="recieve-sms"
                {...register("recieveSms")}
              />
              <label htmlFor="recieve-sms" style={{ marginLeft: "10px" }}>
                Do you wish to recieve SMS messages from us?
              </label>
              {errors?.recieveSms?.message && (
                <p className="input-error-text">{errors.recieveSms.message}</p>
              )}
            </div>
            <div>
              <input
                type="checkbox"
                id="owner-checkbox"
                name="owner-checkbox"
                {...register("owner", {
                  required: "You must confirm you're the owner",
                })}
              />
              <label htmlFor="owner-checkbox" style={{ marginLeft: "10px" }}>
                I am the owner or authorized representative of this business.
              </label>
            </div>
            {errors?.owner && (
              <p className="input-error-text">{errors.owner.message}</p>
            )}
          </div>
          <button className="account-creation-submit-button" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
