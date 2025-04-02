import "./global.css";
import "./components/editor/temp.css";
import { createRoot } from "react-dom/client";
import { App } from "@/app/app";
import { Provider } from "@/app/provider";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>
);
