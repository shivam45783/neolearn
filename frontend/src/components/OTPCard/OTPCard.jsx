import { assets } from "./../../assets/assets";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { OTPInputContext } from "input-otp";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GeneralContext } from "../../context/GeneralContext";

const OTPCard = () => {
  const [otp, setOTP] = useState("");
  const navigate = useNavigate();
  const { backend_url, setUserData, errorToast, successToast, setIsOTP } =
    useContext(GeneralContext);
  const verifyOTP = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(backend_url + "/api/auth/verify-otp", {
        token: accessToken,
        otp,
      });
      if (response.status === 200) {
        successToast(response.data.message);
        console.log("OTP res", response.data.message);
        console.log("user data from otp", response.data.data);
        await setUserData(response.data.data);
        setIsOTP(false);
        localStorage.removeItem("otp_expiry");
        setTimeout(() => navigate("/dashboard"), 0);
        // navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
      if (
        (e.response &&
          (e.response.status === 404 || e.response.status === 400)) ||
        e.response.status === 500 || e.response.status === 401
      ) {
        errorToast(e.response.data.message);
      } else {
        console.log(e.message);

        // errorToast(e.message);
      }
    }
  };
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const expiry = localStorage.getItem("otp_expiry");
    if (!expiry) return;

    const expiryTime = new Date(expiry).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = expiryTime - now;
      setTimeLeft(diff > 0 ? Math.floor(diff / 1000) : 0);
    };

    updateTimer(); 
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

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
          <InputOTP maxLength={6} onChange={(value) => setOTP(value)}>
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
          <button
            className="otp-btn mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:cursor-pointer"
            onClick={verifyOTP}
          >
            Verify
          </button>
        </div>
        <div className="text-center mt-3">
          {timeLeft > 0 ? (
            <p className="text-sm text-gray-500">
              OTP expires in{" "}
              <span className="font-semibold text-blue-600">
                {formatTime(timeLeft)}
              </span>
            </p>
          ) : (
            <p className="text-sm text-red-500 font-medium">OTP expired</p>
          )}
        </div>

        <div className="otp-resend flex items-center justify-center mt-5    ">
          <p className="text-[var(--header-bottom-text)] text-sm font-normal">
            Didn't receive the otp?{" "}
            <span className="text-blue-500 text-sm hover:underline hover:cursor-pointer font-semibold ">
              Resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPCard;
