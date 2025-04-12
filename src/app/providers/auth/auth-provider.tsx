import { PropsWithChildren } from "react";
import { getUser } from "@/shared/api/get-user";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: PropsWithChildren) {
  const {
    data: authUser,
    isLoading: isAuthLoading,
    isError,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: getUser,
    retry: false,
  });

  const isAuthenticated = !isError && !!authUser;

  return (
    <AuthContext.Provider
      value={{ authUser: isAuthenticated ? authUser : null, isAuthLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
