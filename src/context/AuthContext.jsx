import React from 'react'
import { createContext,useState } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth ,isAuthenticated] = useState(()=>{
        const token = localStorage.getItem('token');
        return {token,isAuthenticated: !!token,};
    });

    const login = async (user) => {
        const response = await axios.post(
          "http://localhost:3000/api/auth/signin",
          user
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        setAuth({ token, isAuthenticated: true });
      };
    const logout = () => {
        localStorage.removeItem("token");
        setAuth({ token: null, isAuthenticated: false });
      };
    const signup = async (user) => {
        const response = await axios.post(
          "http://localhost:3000/api/auth/signup",
          user
        );
        const token = response.data.token;
        localStorage.setItem("token", token);
        setAuth({ token, isAuthenticated: true });
      };
    <AuthContext.Provider value={{ ...auth, login, logout, signup }}>
        {children}
    </AuthContext.Provider>
}


