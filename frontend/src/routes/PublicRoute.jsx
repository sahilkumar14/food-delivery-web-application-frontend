import { Navigate } from "react-router-dom";
import { authService } from "../services/api";

const PublicRoute = ({ children, isLoggedIn }) => {
  if (isLoggedIn) {
    const user = authService.getCurrentUser();
    if (user) {
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

export default PublicRoute;