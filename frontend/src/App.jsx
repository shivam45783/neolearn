import React, { useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import ThemeToggle from "./components/ThemeButton/ThemeButton";
import Loading from "./components/Loading/Loading";
// import Login from "./pages/Auth/Auth";
import Auth from "./pages/Auth/Auth";
import { GeneralContext } from "./context/GeneralContext";
import Dashboard from "./pages/student/Dashboard/Dashboard";
import toast, { ToastBar, Toaster } from "react-hot-toast";
const BodyClassController = () => {
  const location = useLocation();
  if (location.pathname === "/") {
    document.body.classList.add("landing-page");
  } else {
    document.body.classList.remove("landing-page");
  }
  if (location.pathname === "/auth") {
    document.body.classList.add("auth-page");
  } else {
    document.body.classList.remove("auth-page");
  }
};
const App = () => {
  const location = useLocation();
  const hideLayout = location.pathname == "/auth";
  const hideThemeToggle = location.pathname == "/auth";
  const { loading } = useContext(GeneralContext);
  return (
    <>
      <Toaster />
      <Loading isLoading={loading} />
      <BodyClassController />
      <div className="navbar page-transition">{!hideLayout && <Navbar />}</div>
      <ThemeToggle />
      {/* {!hideThemeToggle && <ThemeToggle />} */}
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
      <div className="footer page-transition">{!hideLayout && <Footer />}</div>
    </>
  );
};

export default App;
