import { AuthUser } from "@/shared/types/schemas";
import { createContext } from "react";

type AuthUserState = {
  authUser: AuthUser;
  isAuthLoading: boolean;
};

export const AuthContext = createContext<AuthUserState>({
  authUser: undefined,
  isAuthLoading: false,
});
