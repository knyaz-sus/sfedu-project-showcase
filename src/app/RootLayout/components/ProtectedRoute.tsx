import { API_URL } from "@/constants/url";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function ProtectedRoute({ authOnly }: { authOnly: boolean }) {
  const { authUser, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  if (!isAuthLoading && !authUser && authOnly) navigate("/login");
  if (!isAuthLoading && authUser && !authOnly) navigate("/");
  useEffect(() => {
    if (!isAuthLoading && !authUser && authOnly) {
      window.location.href = `${API_URL}/oauth2/authorization/github`;
    }
  }, [authUser, isAuthLoading, authOnly]);
  return <Outlet />;
}
