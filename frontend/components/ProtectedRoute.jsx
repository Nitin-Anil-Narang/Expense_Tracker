import { useUser } from "../Context/UserAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children, roles = [] }) => {
  const { user ,loading } = useUser();

  if (loading) {
    return <div >Loading...</div>; 
  }

  if (!user) return <Navigate to="/" />;
  if (!roles.includes(user.role)) return <Navigate to="/unauthorized" />;

  return children;
};
