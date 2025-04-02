import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { API_URL } from "@/constants";
import { useAuth } from "@/hooks/use-auth";

export function ProtectedRoute({ authOnly }: { authOnly: boolean }) {
  const { authUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthLoading && !authUser && authOnly) {
      window.location.href = `${API_URL}/oauth2/authorization/azure`;
    }
  }, [authUser, isAuthLoading, authOnly]);
  if (isAuthLoading) return;
  if (!authUser && authOnly) navigate("/login");
  if (authUser && !authOnly) navigate("/");
  return <Outlet />;
}
