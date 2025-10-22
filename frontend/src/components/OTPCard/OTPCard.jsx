import { assets } from "./../../assets/assets";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import React from "react";

const OTPCard = () => {
  return (
    <div className="otp-container min-h-screen flex items-center justify-center md:justify-end bg-gradient-to-br p-6 ">
      <div className="otp-card bg-[var(--login-card-bg)] shadow-xl rounded-2xl p-8 w-full max-w-md h-auto page-transition">
        <div className="otp-title flex flex-col items-center gap-2">
          <img src={assets.logo} alt="" className="w-[70px]" />
          <h1 className="text-3xl font-semibold text-center mb-6 text-[var(--header-text)]">
            Verify Your Account
          </h1>
        </div>
        <div className="otp-info text-center mb-6">
          <p className="text-[var(--header-bottom-text)] text-md">
            We’ve sent a 6-digit verification code to your registered email.
            Please enter it below to verify your identity.
          </p>
        </div>
        <div className="otp-input flex items-center justify-center">
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />

              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="otp-verify flex items-center justify-center">
          <button className="otp-btn mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:cursor-pointer">
            Verify
          </button>
        </div>
        <div className="otp-resend flex items-center justify-center mt-5    ">
          <p className="text-[var(--header-bottom-text)] text-sm font-normal">
            Didn't receive the otp? <span className="text-blue-500 text-sm hover:underline hover:cursor-pointer font-semibold ">Resend</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPCard;
