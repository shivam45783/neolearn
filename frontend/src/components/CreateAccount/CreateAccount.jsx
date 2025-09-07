import React, { useContext } from "react";
import { StudentContext } from "../../context/StudentContext";
import { assets } from "../../assets/assets";
// import "./Login.css"; // same styles

const CreateAccount = ({ switchToLogin }) => {
  const { role, setRole } = useContext(StudentContext);

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
          {["student", "teacher", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`flex-1 mx-1 py-2 rounded-lg font-medium capitalize transition ${
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
        <form className="space-y-3">
          <div>
            <label className="block text-[var(--header-bottom-text)] text-sm mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-[var(--login-border-color)] rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-[var(--header-bottom-text)]"
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
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
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
        <hr className="mt-3 mb-3 border-[var(--login-card-bottom-text)]" />
        <div className="googleAuth flex gap-3 p-3 rounded-lg items-center justify-center">
          <img src={assets.google} alt="" className="w-[25px]  " />
          <p className="text-[var(--header-bottom-text)] font-medium text-md">
            Continue with Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
