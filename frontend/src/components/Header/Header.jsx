import React from "react";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 md:mt-15 text-center px-4">
      {/* Heading */}
      <div className="header-top w-full flex justify-center">
        <h1 className="text-xl sm:text-2xl lg:text-4xl font-semibold text-[var(--header-text)]">
          Empower your future with the courses
        </h1>
      </div>

      <div className="header-bottom mt-2 w-full flex justify-center">
        <span className="font-semibold text-[var(--header-text)] text-xl sm:text-2xl lg:text-4xl">
          designed to{" "}
          <span className="hero-header text-[var(--header-blue-theme)] relative">
            fit your passion.
          </span>
        </span>
      </div>

      {/* SVG Sketch */}
      <div className="line-sketch">
        <img
          src={assets.line_sketch}
          alt="sketch"
          className="absolute w-[140px] sm:w-40 lg:w-58"
        />
      </div>

      {/* Description */}
      <div className="header-text text-center flex flex-col text-[13px] md:text-base mt-7 md:mt-10 w-[90%] sm:w-[70%] lg:w-[60%] font-medium text-[var(--header-bottom-text)]">
        <p>
          Build skills that employers value. Explore expert-led courses,
          hands-on content, and a supportive community to achieve your career
          goals.
        </p>
      </div>
    </div>
  );
};

export default Header;
