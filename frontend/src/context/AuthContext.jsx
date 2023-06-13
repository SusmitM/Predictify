/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const { user, isAuthenticated } = useAuth0();
    console.log(isAuthenticated,user)
    return(
        <>
        <AuthContext.Provider value={{user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
        </>
    )
}

export const useAuthContext=()=>useContext(AuthContext);