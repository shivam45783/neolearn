import React, { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useAnimate } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { assets } from "../assets/assets.js";
export const GeneralContext = createContext();

const GeneralContextProvider = (props) => {
  const backend_url = "http://localhost:3000";
  const [loading, setLoading] = useState(false);
  const [isOTP, setIsOTP] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [themeImages, setThemeImages] = useState({});
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
    const hasLoggedInBefore =
      localStorage.getItem("hasLoggedInBefore") === "true";

    if (!token) {
      try {
        const refreshResponse = await axios.get(
          backend_url + "/api/auth/refresh"
        );
        localStorage.setItem(
          "accessToken",
          refreshResponse.data.data.access_token
        );
        return await getUser(refreshResponse.data.data.access_token);
      } catch (err) {
        return false;
      }
    }

    try {
      const userResponse = await axios.get(backend_url + "/api/auth/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userResponse.status === 200) {
        localStorage.setItem("hasLoggedInBefore", "true");
        setUserData(userResponse.data.data);
        return true;
      }
    } catch (err) {
      // Access token expired -> try refresh
      if (err.response?.status === 401) {
        try {
          const refreshResponse = await axios.get(
            backend_url + "/api/auth/refresh"
          );
          localStorage.setItem(
            "accessToken",
            refreshResponse.data.data.access_token
          );
          return await getUser(refreshResponse.data.data.access_token);
        } catch {
          return false; // ❗ Return false instead of redirect
        }
      }
      return false;
    }
  };

  const errorToast = (message) => {
    toast.custom(
      (t) => (
        <div
          className={`toast_error px-4 py-3 rounded-xl shadow-lg flex
      ${t.visible ? "animate-enter" : "animate-leave"}`}
        >
          <div className="flex items-center gap-2">
            {/* <span className="text-red-600 text-xl">❌</span> */}
            <img
              src={assets.logo_red}
              alt=""
              className="w-[26px] disable-image-drag"
            />
            <p className="font-medium disable-selection">{message}</p>
          </div>
        </div>
      ),
      {
        duration: 3000,
      }
    );
  };
  const successToast = (message) => {
    toast.custom(
      (t) => (
        <div
          className={`toast_success px-4 py-3 rounded-xl shadow-lg flex 
      ${t.visible ? "animate-enter" : "animate-leave"}`}
        >
          <div className="flex items-center gap-2">
            {/* <span className="text-red-600 text-xl">❌</span> */}
            <img
              src={assets.logo_green}
              alt=""
              className="w-[26px] disable-image-drag"
            />
            <p className="font-medium disable-selection">{message}</p>
          </div>
        </div>
      ),
      {
        duration: 3000,
      }
    );
  };
  const logoutUser = async () => {
    try {
      console.log("Before req");
      console.log(userData);
      
      const response = await axios.post(backend_url+"/api/auth/logout", {userData: userData}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.status === 200) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("hasLoggedInBefore");
        setUserData(null);
        setIsLogin(true);
        navigate("/auth");
      }
    } catch (e) {
      console.log("Logout error:", e?.response?.data || e);
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
    getUser,
    backend_url,
    loading,
    setLoading,
    isOTP,
    setIsOTP,
    userData,
    setUserData,
    isLogin,
    setIsLogin,
    errorToast,
    successToast,
    themeImages,
    setThemeImages,
    logoutUser,
  };

  return (
    <GeneralContext.Provider value={contextValue}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;

/*
const getUser = async (token) => {
    console.log("token", token);
    const hasLoggedInBefore =
      localStorage.getItem("hasLoggedInBefore") === "true";
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
          return await getUser(refreshResponse.data.data.access_token);
        }
      } catch (e) {
        if (e.response && e.response.status === 403) {
          if (hasLoggedInBefore) {
            setIsLogin(true);
            navigate("/auth");
          }
        }
        return false;
      }

    }
    try {
      const userResponse = await axios.get(backend_url + "/api/auth/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userResponse.status === 200) {
        localStorage.setItem("hasLoggedInBefore", "true");
        setUserData(userResponse.data.data);
        console.log("✅ userData:", userResponse.data.data);
        return true;
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

            return await getUser(refreshResponse.data.data.access_token);
          }
        } catch (refreshErr) {
          if (refreshErr.response && refreshErr.response.status === 403) {
            if (hasLoggedInBefore) {
              setIsLogin(true);
              navigate("/auth");
            }
          }
          return false;
        }
      } else {
        console.log("❌ Error in getUser:", e);
        return false;
      }
    }
  };

*/
