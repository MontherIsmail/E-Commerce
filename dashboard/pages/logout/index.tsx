import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        // Call the logout API
        await axios.post(
          "http://localhost:5000/api/v1/auth/logout",
          {},
          { withCredentials: true }
        );
        
        // Redirect to login page
        router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
        // Even if logout fails, redirect to login
        router.push("/login");
      }
    };

    handleLogout();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Logging out...</p>
      </div>
    </div>
  );
};

export default LogoutPage;

