import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser as login,
  logoutUser as logout,
  registerUser as register,
  checkUserStatus,
} from "../utils/UserAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUserStatus(setUser, setLoading);
  }, []);

  const loginUser = (userInfo) => login(userInfo, setUser, setLoading);
  const logoutUser = () => logout(setUser, setLoading);
  const registerUser = (userInfo) => register(userInfo, setUser, setLoading);

  const contextData = {
    user,
    loginUser,
    logoutUser,
    registerUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
