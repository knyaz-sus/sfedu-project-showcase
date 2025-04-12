import { AuthContext } from "@/app/providers/auth/auth-context";
import { useContextTyped } from "@/shared/hooks/use-context-typed";

export const useAuth = () => useContextTyped(AuthContext);
