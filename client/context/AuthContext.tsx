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

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<void>;
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
      const { username, role, id }: any = userInfo;
      setUser({ username, role, id, token });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { login } = createClient("");
      const data = await login({ email, password });
      if (data.message === "login successfully") {
        Cookies.set("token", data.token, { expires: 1 });
        const userInfo = getUserInfo();
        const { username, role, id }: any = userInfo;
        if (userInfo) {
          setUser({ username, role, id });
        }
        router.push("/");
      }
    } catch (error) {
      console.log("login failed", error);
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
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
