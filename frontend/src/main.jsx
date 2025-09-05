import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StudentContextProvider, {
  StudentContext,
} from "./context/StudentContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StudentContextProvider>
      <App />
    </StudentContextProvider>
  </BrowserRouter>
);
