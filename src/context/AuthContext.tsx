import { UserModel } from "@/models/UserModel";
import { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
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
        toast.success(data.id);
        if (data.id !== undefined) {
            setUserData(data);
            setIsAuthenticated(true);
        }
    }, []);
    
    const Login = useCallback((password: string) => {
        if (password != "lsiimsim") {
            return "Senha inválida";
        }
        localStorage.setItem("@Auth.Token", JSON.stringify(btoa("LSIIM/UFSC:lsiimsim")));
        localStorage.setItem("@Auth.Data", JSON.stringify({ id:1, name: "LSIIM" }));
        setUserData({id: 1, name: "LSIIM" });
        setIsAuthenticated(true);
    }, []);

    const Logout = useCallback(() => {
        localStorage.removeItem('@Auth.Data');
        localStorage.removeItem('@Auth.Token');
        setIsAuthenticated(false);
    }, []);

    const ApiLogin = useCallback(async (password: string) => {
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });
            console.log(response.status)
            if (!response.ok) throw new Error("Erro ao se comunicar com o servidor");
            const data = await response.json();
            console.log(data);
            if (data.success) {
                localStorage.setItem("@Auth.Token", JSON.stringify(data.token));
                localStorage.setItem("@Auth.Data", JSON.stringify({ id: data.id, name: data.name }));
                setUserData({ id: data.id, name: data.name });
                setIsAuthenticated(true);
                console.log("CHEGOU AQUI");
                toast.success("Login efetuado com sucesso!");
                return;
            } 
            else {
                toast.error(data.message || "Erro ao efetuar login.");
                return data.message || "Erro ao efetuar login.";
            }
        } 
        catch (error) {
            toast.error("Erro ao efetuar login.");
            console.error(error);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuthenticated, ...userData, login: Login, logout: Logout }}>
            {children}
        </AuthContext.Provider>
    );
}
