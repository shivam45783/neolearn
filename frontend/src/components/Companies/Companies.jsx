import React from "react";
import { assets } from "../../assets/assets";
import "./Companies.css";
const Companies = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-15 mb-10 md:w-6/10">
        <h1 className="md:text-xl text-[16px] text-[var(--header-text)] font-semibold mb-6">
          Trusted by learners from
        </h1>
        <div className="companies grid grid-cols-2 gap-8 justify-between items-center md:flex mb-10">
          <img src={assets.microsoft} alt="Microsoft" />
          <img src={assets.adobe} alt="Adobe" />
          <img src={assets.google} alt="Google" className="w-[30px]" />
          <img src={assets.paypal} alt="PayPal" />
        </div>
        <div className="companies-bottom flex flex-col justify-center items-center text-center md:mt-15 mt-10">
          <h1 className="md:text-xl text-[16px] text-[var(--header-text)] font-semibold mb-6">
            Learn from the best
          </h1>
          <p className="text-[13px] md:text-base  font-medium text-[var(--header-bottom-text)]">
            Discover top-rated courses across various categories. From
            development to design, business and wellness, our courses are
            crafted to{" "}
            <span className="text-[var(--header-blue-theme)]">
              deliver best results.
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Companies;
