import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const status = localStorage.getItem("loginStatus");

  if (!refreshToken || !status) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
