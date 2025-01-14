import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from "jwt-decode";
import {logout as logoutApi} from "../api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const isBlocked = decodedToken['isBlocked'] === 'True';
            setIsAuthenticated(true);
            setUser({ role: userRole, isBlocked });
        }
    }, []);

    const login = (token) => {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        const isBlocked = decodedToken['isBlocked'] === 'True';
        setIsAuthenticated(true);
        setUser({ role: userRole, isBlocked });
    };

    const logout = () => {
        logoutApi();
        Cookies.remove('accessToken');
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
