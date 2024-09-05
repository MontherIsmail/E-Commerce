// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import createClient from "../api";
import getUserInfo from "../utils/userInfo/getUserInfo";
import axios from "axios";
import Swal from "sweetalert2";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const userInfo = getUserInfo();
      if (userInfo) {
        const { username, role, id }: any = userInfo;
        setUser({ username, role, id, token });
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        // "https://e-commerce-1-fdtm.onrender.com/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("data", response.data);
      if (response.data.message === "login successfully") {
        const userInfo = getUserInfo();
        if (userInfo) {
          const { username, role, id }: any = userInfo;
          setUser({ username, role, id });
        }
        router.push("/");
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${
          error?.response?.data?.message ||
          error.message ||
          "Somthing went wrong!"
        }`,
      });
      console.log("login failed", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const { register } = createClient("");
      const role = "user";
      const data = await register({ username, email, password, role });
      if (data.message === "Signed up") {
        router.push("/");
      } else if (data.response?.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${
            data?.response?.data?.message ||
            data?.message ||
            "Somthing went wrong!"
          }`,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${
          error?.response?.data?.message ||
          error.message ||
          "Somthing went wrong!"
        }`,
      });
      console.log("registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context: any = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
