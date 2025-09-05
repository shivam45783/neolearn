import React from 'react'
import LoginVisual from '../../components/LoginVisual/LoginVisual'
import Login from '../../components/Login/Login'

const Auth = () => {
  
  return (
    <div className="w-full page-transition justify-center md:justify-between items-center flex auth-page">
      <div className="auth-visuals w-[30%] md:flex hidden ">
        <LoginVisual />
      </div>
      <div className="auth_login w-full md:mr-10">
        <Login />
      </div>
    </div>
  );
};

export default Auth;