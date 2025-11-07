import React, { use, useContext, useEffect, useState } from "react";
import { StudentContext } from "../../context/StudentContext";
import { assets } from "../../assets/assets";
import "./Login.css";
import axios from "axios";
import { GeneralContext } from "../../context/GeneralContext";
import { useNavigate } from "react-router-dom";

const Login = ({ switchToSignup }) => {
  const navigate = useNavigate();
  const { role, setRole } = useContext(StudentContext);
  const {
    backend_url,
    setLoading,
    getUser,
    themeImages,
    setIsLogin,
    errorToast,
  } = useContext(GeneralContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: role,
  });
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      role: role,
    }));
  }, [role]);
  const [showPass, setShowPass] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      errorToast("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        backend_url + "/api/auth/login",
        formData
      );
      const data = response.data.data;

      console.log(data);
      if (response.status === 200) {
        const { access_token } = data;
        localStorage.setItem("accessToken", access_token);

        await getUser(access_token);
        setTimeout(() => navigate("/dashboard"), 0);
      }
    } catch (e) {
      console.log(e);
      if (e.response && e.response.status === 403) {
        errorToast(e.response.data.message);
        setIsLogin(false);
        navigate("/auth");
        errorToast("Verify your email to login.");
      } else if (e.response && e.response.status === 401) {
        setFormData((prev) => ({
          ...prev,
          password: "",
          email: "",
        }));
        errorToast(e.response.data.message);
      } else if (e.response && e.response.status === 500) {
        errorToast(e.response.data.message);
      } else {
        console.log(JSON.stringify(e));
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container min-h-screen flex items-center justify-center md:justify-end bg-gradient-to-br p-6">
      <div className="login-card bg-[var(--login-card-bg)] shadow-xl rounded-2xl p-8 w-full max-w-md h-auto page-transition flex flex-col">
        <div className="login-title flex flex-col items-center gap-2">
          <img src={assets.logo} alt="" className="w-[70px]" />
          <h1 className="text-3xl font-semibold text-center mb-6 text-[var(--header-text)]">
            Login
          </h1>
        </div>

        {/* Role Selection */}
        <div className="flex justify-between mb-6 text-[15px]">
          {["Student", "Instructor", "Admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 mx-1 py-2 rounded-lg font-medium capitalize transition cursor-pointer ${
                role === r
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={onSubmitHandler}>
          <div>
            <label className="block text-[var(--header-bottom-text)] text-sm mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="email-textbox w-full border border-[var(--login-border-color)] rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[var(--header-bottom-text)]"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[var(--header-bottom-text)] font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={formData.password}
                placeholder="Enter your password"
                className="w-full border border-[var(--login-border-color)] rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[var(--header-bottom-text)]"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  });
                }}
              />

              <img
                src={showPass ? themeImages.view : themeImages.hide}
                alt="toggle visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition"
          >
            Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[var(--login-card-bottom-text)] hover:cursor-pointer">
          Don’t have an account?{" "}
          <span
            onClick={switchToSignup}
            className="text-[var(--header-blue-theme)] hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
