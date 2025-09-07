import React, { useState } from "react";
import LoginVisual from "../../components/LoginVisual/LoginVisual";
import Login from "../../components/Login/Login";
import CreateAccount from "../../components/CreateAccount/CreateAccount";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="w-full page-transition justify-center md:justify-between items-center flex ">
      <div className="auth-visuals w-[30%] md:flex hidden ">
        <LoginVisual />
      </div>
      <div className="auth_login w-full md:mr-10">
         {isLogin ? (
        <Login switchToSignup={() => setIsLogin(false)} />
        ) : (
        <CreateAccount switchToLogin={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default Auth;
