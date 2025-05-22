import { ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated() && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [navigate, location]);

  return <>{children}</>;
};

export default ProtectedRoute;
