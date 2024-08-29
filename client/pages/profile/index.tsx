import React, { useEffect, useState } from "react";
import Link from "next/link";
import createClient from "../../api";
import { useAuth } from "../../context/AuthContext";
import { Footer, Navbar } from "../../components";
import withAuth from "../../hoc/withAuth";

const Profile = () => {
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    role: "",
  });
  const { user } = useAuth();

  const fetchUserData = async () => {
    try {
      if (!user?.id) {
        console.error("User ID is not available.");
        return;
      }
      const { getProfile } = createClient("");
      const response = await getProfile(user?.id);
      setUserData(response.profileData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 pt-20 px-4" style={{ minHeight: "60vh" }}>
        <div className="max-w-4xl mx-auto py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center sm:text-left">
            My Profile
          </h1>
          <div className="bg-white shadow-md p-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <span className="text-gray-600 font-semibold">Username:</span>
                <span className="text-gray-900">{userData.username}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <span className="text-gray-600 font-semibold">Email:</span>
                <span className="text-gray-900">{userData.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                <span className="text-gray-600 font-semibold">Role:</span>
                <span className="text-gray-900">{userData.role}</span>
              </div>
              <div className="flex justify-center sm:justify-start">
                <Link href="/edit-profile">
                  <div className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-700 transition-colors duration-300 text-center">
                    Edit Profile
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withAuth(Profile);
