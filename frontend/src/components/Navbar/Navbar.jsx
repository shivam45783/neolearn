import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { GeneralContext } from "../../context/GeneralContext";
import HoverMenu from "../HoverMenu/HoverMenu";
const Navbar = () => {
  const navigate = useNavigate();
  const navigateAuth = (mode) => {
    navigate("/auth", { state: { isLogin: mode === "login" } });
  };
  const token = localStorage.getItem("accessToken");

  return (
    <div className="navbar bg-transparent px-6 py-2 w-full justify-between flex items-center">
      <div className="flex flex-row items-center  gap-1">
        <img src={assets.logo} alt="" className="w-[40px]" />
        <h1 className="font-semibold text-xl text-[var(--navbar-heading)]">
          NeoLearn
        </h1>
      </div>

      <div className="nav-right flex flex-row items-center gap-4">
        <nav className="navlink flex-row gap-5 text-[13.5px] font-medium text-[var(--navlinks-color)] hidden sm:flex">
          <button className="transition-colors duration-150 cursor-pointer">
            Pricing
          </button>

          <button className="transition-colors duration-150 cursor-pointer">
            Teach on NeoLearn
          </button>

          {!token && (
            <button
              className="transition-colors duration-150 cursor-pointer"
              onClick={() => navigateAuth("login")}
            >
              Login
            </button>
          )}
        </nav>

        {!token ? (
          <div className="btn">
            <button
              className="create-account-btn bg-[#005EF6] text-white py-2 px-4 rounded-xl text-[13px] font-medium hover:cursor-pointer hover:bg-[#0046C7]
        "
              onClick={() => navigateAuth("signup")}
            >
              Create Account
            </button>
          </div>
        ) : (
          <HoverMenu />
        )}
      </div>
    </div>
  );
};

export default Navbar;
