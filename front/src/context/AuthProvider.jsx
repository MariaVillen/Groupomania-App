import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
  const [user, setUser] =useState({});


  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;


