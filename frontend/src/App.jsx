import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import ThemeToggle from "./components/ThemeButton/ThemeButton";
import Loading from "./components/Loading/Loading";

const BodyClassController = () => {
    const location = useLocation();
    if (location.pathname === "/") {
      document.body.classList.add("landing-page");
    } else {
      document.body.classList.remove("landing-page");
    }
}
const App = () => {
  return (
    <>
    <Loading isLoading={false} />
      <BodyClassController />
      <div className="navbar">{<Navbar />}</div>
      <ThemeToggle />
      <div className="app">
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
        </Routes>
      </div>
      <div className="footer">{<Footer />}</div>
    </>
  );
};

export default App;
