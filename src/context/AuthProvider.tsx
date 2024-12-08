import { PropsWithChildren } from "react";
import { fetchCurrentUser } from "@/api/fetchCurrentUser";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: PropsWithChildren) {
  const { data: authUser, isLoading: isAuthLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: fetchCurrentUser,
    refetchOnWindowFocus: false,
  });
  return (
    <AuthContext.Provider value={{ authUser, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
