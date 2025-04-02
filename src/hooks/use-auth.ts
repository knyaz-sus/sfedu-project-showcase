import { AuthContext } from "@/context/auth-context";
import { useContextTyped } from "@/hooks/use-context-typed";

export const useAuth = () => useContextTyped(AuthContext);
