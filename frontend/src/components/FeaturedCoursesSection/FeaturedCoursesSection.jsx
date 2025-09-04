import React from "react";
import { assets } from "../../assets/assets";
import "./FeaturedCoursesSection.css";
const FeaturedCoursesSection = () => {
  return (
    <div className="feautured-courses-section flex justify-start ml-10 mb-10 md:mt-30 flex-col">
      <div className="featured-courses-title">
        <h1 className="featured-courses-heading font-semibold text-[var(--header-text)] text-lg sm:text-xl lg:text-2xl">
          Take your first step towards your{" "}
          <span className="highlight-span text-[var(--header-blue-theme)] relative inline-block">
            dream career
            <img
              src={assets.line_sketch}
              alt=""
              className="featured-line-sketch absolute left-0 bottom-0 w-[120px] sm:w-35 lg:w-58"
            />
          </span>
        </h1>
      </div>
      <div className="featured-courses-description mt-5">
        <p className="font-medium text-[var(--header-bottom-text)] text-[13px] md:text-base">
          Get the skills and real-world experience employers want with Career
          Accelerators.
        </p>
      </div>
    </div>
  );
};

export default FeaturedCoursesSection;
