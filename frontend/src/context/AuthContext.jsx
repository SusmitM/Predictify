/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
const AuthContext=createContext();

export const AuthContextProvider=({children})=>{
    const { user, isAuthenticated } = useAuth0();

    return(
        <>
        <AuthContext.Provider value={{user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
        </>
    )
}

export const useAuthContext=()=>useContext(AuthContext);