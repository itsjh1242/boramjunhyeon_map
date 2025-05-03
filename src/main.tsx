import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";
import "./style/font.css";
import "./style/index.css";

const isProd = import.meta.env.MODE === "production";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={isProd ? "/boramjunhyeon_map" : "/"}>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
