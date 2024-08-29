import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import createClient from "../../api";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Footer, Navbar } from "../../components";
import withAuth from "../../hoc/withAuth";

const EditProfile = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    username: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      if (!user.id) {
        console.error("User ID is not available.");
        return;
      }
      const { getProfile } = createClient("");
      const response = await getProfile(user?.id);
      const { email, username } = response.profileData;
      setUserData({ email, username });
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({
      ...password,
      [name]: value,
    });
  };

  const handleProfileUpdate = async () => {
    setLoading(true);
    try {
      if (!user.id) {
        console.error("User ID is not available.");
        return;
      }
      const { editProfile } = createClient("");
      const response = await editProfile(user?.id, userData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${response.message}`,
        showConfirmButton: false,
        timer: 1500,
      });

      router.push("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setLoading(false);
  };

  const handleChangePassword = async () => {
    setLoading(true);
    if (password.newPassword !== password.confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "New passwords do not match!",
      });
      setLoading(false);
      return;
    }

    try {
      if (!user.id) {
        console.error("User ID is not available.");
        return;
      }
      const { editPassword } = createClient("");
      const response = await editPassword(user?.id, password);
      if (response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${response.response.data.message}`,
        });
        return setLoading(false);
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Password updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      setPassword({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: `${error}`,
      });
      console.error("Error changing password:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6 lg:px-8 mt-10">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={userData?.username}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData?.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            onClick={handleProfileUpdate}
            className="w-full py-2 px-4 bg-gray-900 text-white font-semibold shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              value={password.currentPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={password.newPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmNewPassword"
              value={password.confirmNewPassword}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full py-2 px-4 bg-gray-900 text-white font-semibold shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
            disabled={loading}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withAuth(EditProfile);
