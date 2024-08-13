import { UserModel } from "@/models/UserModel";
import { createContext, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthContextModel extends UserModel {
    isAuthenticated: boolean;
    login: (password: string) => Promise<string | void>;
    logout: () => void;
}

export const AuthContext = createContext({} as AuthContextModel);

interface Props {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [userData, setUserData] = useState<UserModel>();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const data: UserModel = JSON.parse(localStorage.getItem('@Auth.Data') || "{}");
        if (data.id) {
            setIsAuthenticated(true);
            setUserData(data);
        }
        Logout();
    }, []);

    const Login = useCallback((password: string) => {
        console.log(password);
        if (password != "Abóbora") {
            return "Senha inválida";
        }
        localStorage.setItem("@Auth.Token", JSON.stringify(btoa("LSIIM/UFSC:Abóbora")));
        localStorage.setItem("@Auth.Data", JSON.stringify({ name: "LSIIM" }));
        setUserData({id: 1, name: "LSIIM" });
        setIsAuthenticated(true);
    }, []);

    const Logout = useCallback(() => {
        localStorage.removeItem('@Auth.Data');
        localStorage.removeItem('@Auth.Token');
        setIsAuthenticated(false);
        return <Navigate to='/' />;
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, ...userData, login: Login, logout: Logout }}>
            {children}
        </AuthContext.Provider>
    );
}
