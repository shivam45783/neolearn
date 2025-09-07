import React, { createContext, useState } from "react";

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
  const url = "http://localhost:3000";
  const [loading, setLoading] = useState(false);
  const contextValue = {
    url,
    loading,
    setLoading,
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
