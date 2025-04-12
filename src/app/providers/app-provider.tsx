import { PropsWithChildren, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/app/providers/auth/auth-provider";
import { ThemeProvider } from "@/app/providers/theme/theme-provider";
import { FiltersProvider } from "@/app/providers/filters/filters-provider";

export function AppProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider>
            <FiltersProvider>{children}</FiltersProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
