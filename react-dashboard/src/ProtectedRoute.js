import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("token");
  //return token ? <Outlet /> : <Navigate to="/" replace/>;
  return token ? children : <Navigate to="/" replace />;
}

export default ProtectedRoute;