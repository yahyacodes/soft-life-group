import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log(user);

  if (loading) {
    return <div>Loading...</div>; // Show loading state while loading is true
  }

  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    // If no token, redirect to login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
