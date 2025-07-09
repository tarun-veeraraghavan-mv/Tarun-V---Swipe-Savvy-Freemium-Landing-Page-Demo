import { Navigate, Outlet } from "react-router-dom";
import { useSelectedBusiness } from "../../contexts/SelectBusinessContext";

export default function VerificationProcessProtector() {
  const { selectedBusiness } = useSelectedBusiness();

  return selectedBusiness ? <Outlet /> : <Navigate to="/" />;
}
