import { PropsWithChildren, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/app/providers/auth/auth-provider";
import { ThemeProvider } from "@/app/providers/theme/theme-provider";
import { FiltersProvider } from "@/app/providers/filters/filters-provider";
import { ScrollToTop } from "@/app/router/scroll-to-top";
import { Toaster } from "@/shared/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function AppProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <ThemeProvider>
            <Toaster />
            <FiltersProvider>{children}</FiltersProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
