import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // Load auth data from local storage on mount
  useEffect(() => {
    // Retrieve and parse auth data from local storage on mount
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
      });
    }
  }, []); // Empty dependency array to run effect only once on mount

  // Set axios default headers whenever auth changes
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth?.token;
  }, [auth.token]); // Dependency array includes auth.token to update headers when it changes

  // Provide context values
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
