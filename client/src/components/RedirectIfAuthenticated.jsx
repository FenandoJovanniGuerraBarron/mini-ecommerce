import { Navigate } from "react-router-dom";

function RedirectIfAuthenticated({ children }) {
  const isAuthenticated = !!localStorage.getItem("token");
  if (isAuthenticated) {
    return <Navigate to="/products" replace />;
  }
  return children;
}

export default RedirectIfAuthenticated; 