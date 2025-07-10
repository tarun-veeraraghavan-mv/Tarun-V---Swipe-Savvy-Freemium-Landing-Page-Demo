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
