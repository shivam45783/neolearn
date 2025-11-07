import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/GeneralContext";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const hasLoggedInBefore =
    localStorage.getItem("hasLoggedInBefore") === "true";
  const { setIsLogin, getUser } = useContext(GeneralContext);
  const navigate = useNavigate();
  useEffect(() => {
    const check = async () => {
      const token = localStorage.getItem("accessToken");
      const loggedIn = await getUser(token);

      if (!loggedIn && hasLoggedInBefore) {
        setIsLogin(true);
        navigate("/auth");
      }
    };
    check();
  }, []);

  return children;
};

export default ProtectedRoute;
