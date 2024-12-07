export const API_URL = import.meta.env.PROD
  ? "https://showcase-2-0.onrender.com"
  : ("http://localhost:8080" as const);
