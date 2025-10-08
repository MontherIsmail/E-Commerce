import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { API_CONFIG } from "../config/api";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const { data } = await axios.get(
          `${API_CONFIG.BASE_URL}/auth/me`,
          { withCredentials: true }
        );
        const { id, username, role } = data.user || {};
        if (id) {
          setUser({ id, username, role });
        } else {
          setUser(null);
        }
      } catch (e: any) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "login successfully") {
        const { user: u } = response.data || {};
        if (u?.id) {
          setUser({ id: u.id, username: u.username, role: u.role });
          setLoading(false);
          toast.success("Login successful!");
          router.push('/');
        }
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
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}/auth/signup`,
        {
          username,
          email,
          password,
          role: "user",
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "Signed up") {
        const { user: u } = response.data || {};
        if (u?.id) {
          setUser({ id: u.id, username: u.username, role: u.role });
          setLoading(false);          
          router.push('/');
        }
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
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_CONFIG.BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      router.push('/login');
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      setUser(null);
      router.push('/login');
    }
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
