import React, { useState } from "react";
import LoginVisual from "../../components/LoginVisual/LoginVisual";
import Login from "../../components/Login/Login";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import OTPCard from "../../components/OTPCard/OTPCard";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOTP, setIsOTP] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.isLogin == false) setIsLogin(false);
    else setIsLogin(true);
  }, [location.state]);
  return (
    <div className="min-w-screen page-transition justify-center md:justify-between items-center flex ">
      <div className="auth-visuals w-[30%] md:flex hidden ">
        <LoginVisual />
      </div>
      {!isOTP ? (
        <div className="auth_login w-full md:mr-10">
          {isLogin ? (
            <Login
              switchToSignup={() => {
                setIsLogin(false);
              }}
            />
          ) : (
            <CreateAccount
              switchToLogin={() => {
                setIsLogin(true);
              }}
            />
          )}
        </div>
      ) : (
        <div className="auth_login w-full md:mr-10">
          <OTPCard />
        </div>
      )}
    </div>
  );
};

export default Auth;
