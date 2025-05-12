import "./global.css";
import { createRoot } from "react-dom/client";
import { AppRouter } from "@/app/router/app-router";
import { AppProvider } from "@/app/providers/app-provider";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <AppRouter />
  </AppProvider>
);
