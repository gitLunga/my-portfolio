import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

/*
 * React 18's createRoot, not the legacy ReactDOM.render — the old call opted
 * the whole tree out of concurrent rendering and logged a deprecation warning
 * on every load.
 */
const container = document.getElementById("root");
createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
