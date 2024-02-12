/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { createContext, useContext } from "react";

interface AuthContextType {
  authUser: any | null;
  setAuthUser: React.Dispatch<React.SetStateAction<any | null>>;
}
const AuthContext = createContext<AuthContextType>({
    authUser: null,
    setAuthUser: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = ()=>{
    return useContext(AuthContext);
}

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('realEstate-auth')as string ) || null);
  return (
    <AuthContext.Provider value={{authUser, setAuthUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
