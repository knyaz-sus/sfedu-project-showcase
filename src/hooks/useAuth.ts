import { AuthContext } from "@/context/AuthContext";
import { useContextTyped } from "@/hooks/useContextTyped";

export const useAuth = () => useContextTyped(AuthContext);
