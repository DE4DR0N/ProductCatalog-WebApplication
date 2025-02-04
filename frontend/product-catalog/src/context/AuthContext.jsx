import { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { logout as logoutApi } from "../api.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
                const isBlocked = decodedToken['isBlocked'] === 'True';
                const userData = { role: userRole, isBlocked };

                setIsAuthenticated(true);
                setUser(userData);
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('user', JSON.stringify(userData));
            } catch (error) {
                console.error("Ошибка при декодировании токена:", error);
                logout();
            }
        }
    }, []);

    const login = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            const isBlocked = decodedToken['isBlocked'] === 'True';
            const userData = { role: userRole, isBlocked };

            setIsAuthenticated(true);
            setUser(userData);
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (error) {
            console.error("Ошибка при декодировании токена:", error);
        }
    };

    const logout = () => {
        logoutApi();
        Cookies.remove('accessToken');
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
