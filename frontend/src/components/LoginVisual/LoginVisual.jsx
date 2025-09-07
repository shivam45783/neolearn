import React from "react";
import { assets } from "../../assets/assets";
import "./LoginVisual.css";
const LoginVisual = () => {
  return (
    <div className="auth-visual-transparent h-lvh flex flex-col justify-between top-0 bottom-0">
      <div className="auth-visual-top">
        <div className="auth-logo mt-5 flex flex-col justify-center items-center gap-1.5">
          <img src={assets.logo} alt="" className="w-[80px]" />
          <h1 className="text-xl font-semibold text-[var(--header-text)]">
            NeoLearn
          </h1>
        </div>
        <div className=" mt-5">
          <p className="auth-description text-[var(--header-bottom-text)] font-medium text-xl">
            Empowering learning through technology and innovation.
          </p>
        </div>
      </div>
      <div className="visual-1">
        <img src={assets.auth_visual_1} alt="" />
      </div>
    </div>
  );
};

export default LoginVisual;
