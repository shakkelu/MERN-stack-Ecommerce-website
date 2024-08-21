import { useState, useContext, createContext, useEffect } from "react";

const Authcontext = createContext();

export const Authprovider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

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

  return (
    <Authcontext.Provider value={[auth, setAuth]}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => useContext(Authcontext);
