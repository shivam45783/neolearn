import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
  const backend_url = "http://localhost:3000";
  const [loading, setLoading] = useState(false);
  const [isOTP, setIsOTP] = useState(false);
  useEffect(() => {
    if (loading) {
      document.documentElement.classList.add("no-scroll"); // html
      document.body.classList.add("no-scroll"); // body
    } else {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    }
  }, [loading]);

  const contextValue = {
    backend_url,
    loading,
    setLoading,
    isOTP,
    setIsOTP,
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
