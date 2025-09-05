import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import ThemeToggle from "./components/ThemeButton/ThemeButton";
import Loading from "./components/Loading/Loading";
// import Login from "./pages/Auth/Auth";
import Auth from "./pages/Auth/Auth";

const BodyClassController = () => {
  const location = useLocation();
  if (location.pathname === "/") {
    document.body.classList.add("landing-page");
  } else {
    document.body.classList.remove("landing-page");
  }
};
const App = () => {
  const location = useLocation();
  const hideLayout = location.pathname == "/auth";
  const hideThemeToggle = location.pathname == "/auth";
  return (
    <>
      <Loading isLoading={false} />
      <BodyClassController />
      <div className="navbar">{!hideLayout && <Navbar />}</div>
      {!hideThemeToggle && <ThemeToggle />}
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          ></Route>
          <Route path="/auth" element={<Auth />}></Route>
        </Routes>
      </div>
      <div className="footer">{!hideLayout && <Footer />}</div>
    </>
  );
};

export default App;
