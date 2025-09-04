import React from "react";
import "./Loading.css";
// import logo from "./logo.png"; // your PNG logo
import { assets } from "../../assets/assets";

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="loading-screen">
          <div className="logo-wrapper">
            <img src={assets.logo} alt="logo" className="logo" />
            <div className="fill-animation"></div>
          </div>
          <div className="loading-text font-medium">NeoLearn</div>
        </div>
      )}
    </>
  );
};

export default Loading;
