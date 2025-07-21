import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [headers, setHeaders] = useState(null);


    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
        try {
            const decoded = jwtDecode(storedToken);
            const currentTime = Date.now() / 1000;
            if (decoded.exp && decoded.exp < currentTime) {
                console.log("Token expired on load");
                localStorage.removeItem("token");
                setToken(null);
                setUser(null);
                setHeaders(null);
            } else {
                setToken(storedToken);
                setUser(decoded);
                setHeaders({ Authorization: `Bearer ${storedToken}` });
            }
        } catch (error) {
            console.error("Invalid token", error);
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
            setHeaders(null);
        }
    }
    setLoading(false);
}, []);



    const login = (token) => {
    try {
        const decoded = jwtDecode(token);
        if (!decoded?.email) {
            throw new Error("Invalid token");
        }
        localStorage.setItem("token", token);
        setToken(token);
        setUser(decoded);
        setHeaders({ Authorization: `Bearer ${token}` });
    } catch (error) {
        console.error("Login error:", error);
        logout();
    }
};


    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setHeaders(null);
        setUser(null);
        navigate("/");
        window.location.reload(); 
    };

    return (
        <UserContext.Provider value={{ logout, login, headers, user,loading}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
