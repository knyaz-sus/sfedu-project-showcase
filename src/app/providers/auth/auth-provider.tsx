import { PropsWithChildren } from "react";
import { getUser } from "@/shared/api/get-user";
import { AuthContext } from "./auth-context";
import { usePersistentQuery } from "@/shared/hooks/use-persistent-query";

export function AuthProvider({ children }: PropsWithChildren) {
  const {
    data: authUser,
    isLoading: isAuthLoading,
    isError,
  } = usePersistentQuery({
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
