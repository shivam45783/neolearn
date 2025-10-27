import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
  const backend_url = "http://localhost:3000";
  const [loading, setLoading] = useState(false);
  const [isOTP, setIsOTP] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      document.documentElement.classList.add("no-scroll"); // html
      document.body.classList.add("no-scroll"); // body
    } else {
      document.documentElement.classList.remove("no-scroll");
      document.body.classList.remove("no-scroll");
    }
  }, [loading]);
  const getUser = async (token) => {
    console.log("token", token);

    if (token === null) {
      try {
        const refreshResponse = await axios.get(
          backend_url + "/api/auth/refresh"
        );
        if (refreshResponse.status == 200) {
          localStorage.setItem(
            "accessToken",
            refreshResponse.data.data.access_token
          );
          await getUser(refreshResponse.data.data.access_token);
        }
      } catch (e) {
        if (e.response && e.response.status === 403) {
          setIsLogin(true);
          navigate("/auth");
        }
      }
      console.log("I am here");

      return;
    }
    try {
      const userResponse = await axios.get(backend_url + "/api/auth/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userResponse.status === 200) {
        setUserData(userResponse.data.data);
        console.log("✅ userData:", userResponse.data.data);
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        console.log("⚠️ Token expired, refreshing...");
        try {
          const refreshResponse = await axios.get(
            backend_url + "/api/auth/refresh"
          );

          if (refreshResponse.status === 200) {
            localStorage.setItem(
              "accessToken",
              refreshResponse.data.data.access_token
            );
            // Retry getUser with new token
            await getUser(refreshResponse.data.data.access_token);
          }
        } catch (refreshErr) {
          console.log("❌ Refresh failed:", refreshErr);
        }
      } else {
        console.log("❌ Error in getUser:", e);
      }
    }
  };

  useEffect(() => {
    async function loadData() {
      // if (!localStorage.getItem("accessToken")) return;
      const accessToken = localStorage.getItem("accessToken");
      await getUser(accessToken);
    }
    loadData();
  }, []);
  const contextValue = {
    backend_url,
    loading,
    setLoading,
    isOTP,
    setIsOTP,
    userData,
    setUserData,
    isLogin,
    setIsLogin,
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;
