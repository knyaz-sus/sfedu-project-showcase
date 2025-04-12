import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/use-auth";
import { API_URL } from "@/shared/api/constants";
import { Spinner } from "@/shared/ui/spinner";

interface ProtectedRouteProps {
  authOnly: boolean;
}

export function ProtectedRoute({ authOnly }: ProtectedRouteProps) {
  const { authUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthLoading) return;
    if (authOnly && !authUser) {
      navigate("/login", { replace: true });
      setTimeout(() => {
        window.location.href = `${API_URL}/oauth2/authorization/azure`;
      }, 0);
    } else if (!authOnly && authUser) {
      navigate("/", { replace: true });
    }
  }, [authUser, isAuthLoading, authOnly, navigate]);

  if (isAuthLoading) {
    return <Spinner />;
  }

  return <Outlet />;
}
