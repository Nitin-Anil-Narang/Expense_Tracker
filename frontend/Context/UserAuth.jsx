import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { logAuthEvent } from "../service/logService";

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
            logAuthEvent({
                event: 'LOGIN',
                actor_id: decoded.id,
                actor_role: decoded.role,
                target_table: 'users',
                target_id: decoded.id,
                action_result: "Login Successful",
                description: `${decoded.names} logged in via UI`
            });

        } catch (error) {
            console.error("Login error:", error);
            logout();
        }
    };


    const logout = () => {
        

        
        

        logAuthEvent({
            event: 'LOGOUT',
            actor_id: user.id,
            actor_role: user.role,
            target_table: 'user',
            target_id: user.id,
            action_result: 'Logout Successful',
            description: `${user.names} Logged Out`,
        });
        localStorage.removeItem("token");
        setToken(null);
        setHeaders(null);
        setUser(null);
        navigate("/");
        
    };

    return (
        <UserContext.Provider value={{ logout, login, headers, user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
