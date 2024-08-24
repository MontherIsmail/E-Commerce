import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  role: string;
  username: string;
  exp?: number;
}

const getUserInfo = (): JwtPayload | null => {
  const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
  const token = cookies
    .find((cookie) => cookie.startsWith("token="))
    ?.split("=")[1];

  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }

  return null;
};

export default getUserInfo;
