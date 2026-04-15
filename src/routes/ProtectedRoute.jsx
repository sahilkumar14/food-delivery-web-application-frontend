import { Navigate } from "react-router-dom";
import { authService } from "../services/api";

const ProtectedRoute = ({ children, isLoggedIn, requiredRole }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole) {
    const user = authService.getCurrentUser();
    if (user && user.role !== requiredRole) {
      // Redirect to their appropriate dashboard
      if (user.role === 'restaurant') {
        return <Navigate to="/orders" replace />;
      } else if (user.role === 'agent') {
        return <Navigate to="/delivery-agent-home" replace />;
      } else {
        return <Navigate to="/home" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;