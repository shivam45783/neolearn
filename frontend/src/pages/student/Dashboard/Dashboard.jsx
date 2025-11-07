import toast from "react-hot-toast";
import { GeneralContext } from "../../../context/GeneralContext";
import React, { useContext } from "react";

const Dashboard = () => {
  const { userData, errorToast, successToast } = useContext(GeneralContext);
  const toastify = () => {
    // toast.custom((t) => (
    //   <div
    //     className={`${
    //       t.visible ? "animate-enter" : "animate-leave"
    //     } max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
    //   >
    //     <div className="flex items-center gap-3">
    //       <img src="/success.gif" alt="success" className="w-8 h-8" />
    //       <div>
    //         <p className="font-semibold text-green-600">OTP Verified!</p>
    //         <p className="text-gray-500 text-sm">Welcome back, Shivam 🎉</p>
    //       </div>
    //     </div>
    //   </div>
    // ));
    // toast.error("Error");
  };
  return (
    userData && (
      <>
        <div className="mb-10">{userData?.name}</div>
      </>
    )
  );
};

export default Dashboard;
