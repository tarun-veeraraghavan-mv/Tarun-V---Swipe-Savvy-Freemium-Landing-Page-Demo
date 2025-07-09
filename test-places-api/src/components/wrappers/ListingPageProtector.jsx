import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

export default function ListingPageProtector() {
  const { user } = useUser();

  return user ? <Outlet /> : <Navigate to="/" />;
}
