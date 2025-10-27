import React, { useContext } from "react";
import { StudentContext } from "../../context/StudentContext";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { GeneralContext } from "../../context/GeneralContext";
// import "./Login.css"; // same styles

const CreateAccount = ({ switchToLogin }) => {
  const { role, setRole } = useContext(StudentContext);
  const { backend_url, setLoading, setIsOTP } = useContext(GeneralContext);
  const [formData, setFormData] = useState({
    name: "",
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
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { name, email, password, role } = formData;
      const response = await axios.post(
        backend_url + "/api/auth/register",
        formData
      );
      const data = response.data.data;
      const { access_token } = data;
      console.log(data);

      if (response.status === 200) {
        const emailResData = {
          subject: "Email Verification",
          token: access_token,
        };

        const emailResponse = await axios.post(
          backend_url + "/api/mail/send-mail",
          emailResData
        );
        console.log("email", emailResponse);

        if (emailResponse.status === 200) {
          localStorage.setItem("accessToken", access_token);
          setIsOTP(true);
        }
      }
      console.log(response);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container min-h-screen flex items-center justify-center md:justify-end bg-gradient-to-br p-6 ">
      <div className="login-card bg-[var(--login-card-bg)] shadow-xl rounded-2xl p-8 w-full max-w-md h-auto page-transition">
        <div className="login-title flex flex-col items-center gap-2">
          <img src={assets.logo} alt="" className="w-[70px]" />
          <h1 className="text-3xl font-semibold text-center mb-6 text-[var(--header-text)]">
            Create Account
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

        {/* Create Account Form */}
        <form className="space-y-3" onSubmit={onSubmitHandler}>
          <div>
            <label className="block text-[var(--header-bottom-text)] text-sm mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-[var(--login-border-color)] rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[var(--header-bottom-text)]"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  name: e.target.value,
                });
              }}
            />
          </div>

          <div>
            <label className="block text-[var(--header-bottom-text)] text-sm mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-[var(--login-border-color)] rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[var(--header-bottom-text)]"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  email: e.target.value,
                });
              }}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-[var(--header-bottom-text)] font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-[var(--login-border-color)] rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[var(--header-bottom-text)]"
              onChange={(e) => {
                setFormData({
                  ...formData,
                  password: e.target.value,
                });
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold cursor-pointer hover:bg-blue-700 transition"
          >
            Sign Up as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-[var(--login-card-bottom-text)] hover:cursor-pointer">
          Already have an account?{" "}
          <span
            onClick={switchToLogin}
            className="text-[var(--header-blue-theme)] hover:underline hover:cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;
