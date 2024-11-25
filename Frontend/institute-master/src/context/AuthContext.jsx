import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext ({
    isAuthenticated: false,
    jwtToken: null,
    loding:true,
    login: () => {},
    logout: () => {}
});

export function AuthProvider({children}) {
    const [isAuthenticated, setIsauthenticated] = useState(false);
    const [jwtToken, setJwtToken] = useState(null);
    const [loading, setLaoding] = useState(true);

    function login(jwtToken) {
        setIsauthenticated(true);
        setJwtToken(jwtToken);
        localStorage.setItem("token", jwtToken);
    }

    function logout() {
        setIsauthenticated(false);
        setJwtToken(null);
        localStorage.removeItem("token");
    }

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsauthenticated(true);
            setJwtToken(token);
        }
        setLaoding(false);
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, jwtToken, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}