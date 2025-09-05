import React, { useState,useEffect, createContext } from "react";

export const StudentContext = createContext();

const StudentContextProvider = (props) => {
  const [role, setRole] = useState("student");
  const contextValue = {
    role,
    setRole,
  };
  return (
    <StudentContext.Provider value={contextValue}>
      {props.children}
    </StudentContext.Provider>
  );
};
export default StudentContextProvider;
