import React from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar bg-transparent px-2 py-2 w-full justify-between flex items-center">
      <div className="flex flex-row items-center  gap-1">
        <img src={assets.logo} alt="" className="w-[40px]" />
        <h1 className="font-semibold text-xl text-[var(--navbar-heading)]">NeoLearn</h1>
      </div>

      <div className="nav-right flex flex-row items-center gap-4">
        <nav className="navlink  flex-row gap-1 text-[13.5px] font-medium text-[var(--navlinks-color)] hidden sm:flex">
          <a href="#" className="cursor-pointer hover:underline">
            <span className="hover:text-[#005EF6]">Pricing</span>
          </a>
          <a
            href="#"
            className="cursor-pointer hover:underline  before:content-['|'] before:mx-2"
          >
            <span className="hover:text-[#005EF6]">Teach on NeoLearn</span>
          </a>
          <a
            href="#"
            className="cursor-pointer hover:underline  before:content-['|'] before:mx-2"
          >
            <span className="hover:text-[#005EF6]">Login</span>
          </a>
        </nav>

        <div className="btn">
          <button
            className="create-account-btn bg-[#005EF6] text-white py-2 px-4 rounded-xl text-[13px] font-medium hover:cursor-pointer hover:bg-[#0046C7]
        "
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
