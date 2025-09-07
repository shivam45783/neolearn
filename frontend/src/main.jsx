import React from "react";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StudentContextProvider, {
  StudentContext,
} from "./context/StudentContext.jsx";
import GeneralContextProvider from "./context/GeneralContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <GeneralContextProvider>
      <StudentContextProvider>
        <App />
      </StudentContextProvider>
    </GeneralContextProvider>
  </BrowserRouter>
);
