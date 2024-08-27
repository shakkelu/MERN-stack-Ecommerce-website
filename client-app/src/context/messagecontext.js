import { createContext, useState, useContext } from "react";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState("");

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to use the Message context
export const useMessage = () => useContext(MessageContext);
