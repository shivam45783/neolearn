import React, { useState } from "react";
import LoginVisual from "../../components/LoginVisual/LoginVisual";
import Login from "../../components/Login/Login";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.isLogin == false) setIsLogin(false);
    else setIsLogin(true);
  }, [location.state]);
  return (
    <div className="w-full page-transition justify-center md:justify-between items-center flex ">
      <div className="auth-visuals w-[30%] md:flex hidden ">
        <LoginVisual />
      </div>
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
    </div>
  );
};

export default Auth;
