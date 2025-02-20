import "./global.css";
import "./components/editor/temp.css";
import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";
import { Provider } from "./app/Provider.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <App />
  </Provider>
);
