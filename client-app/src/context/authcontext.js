import { useState, useContext, createContext, useEffect } from "react";

const Authcontext = createContext();

export const Authprovider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedata = JSON.parse(data);
      setAuth({
        ...auth,
        user: parsedata.user,
        token: parsedata.token,
      });
    }
  }, [auth]);
  return (
    <Authcontext.Provider value={[auth, setAuth]}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => useContext(Authcontext);
