// COMPONENT: TermsForm

// DESCRIPTION:
// A subcomponent of the final verification step that renders the
// terms & conditions agreement checkbox and the "Activate" submit button.

// PROPS:
// - register (function): react-hook-form's register function for binding form inputs
// - errors (object): Validation errors object from react-hook-form
// - loading (boolean): Indicates whether the form is currently submitting

// BEHAVIOR:
// - Renders a checkbox for the user to confirm they've read and agreed to terms
// - Displays an error message if the checkbox isn't selected
// - Renders a submit button that changes its label and becomes disabled while `loading` is true

export default function TermsForm({ register, errors, loading }) {
  return (
    <div>
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
    </div>
  );
}
