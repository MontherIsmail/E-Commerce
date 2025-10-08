import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import createClient from "../../api";
import { useAuth } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { Footer, Navbar } from "../../components";
import withAuth from "../../hoc/withAuth";

// Dynamic base path based on environment
const getBasePath = () => {
  return process.env.NODE_ENV === 'production' ? '/ecommerce' : '';
};

const basePath = getBasePath();

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
      if (!user?.id) {
        console.error("User ID is not available.");
        return;
      }
      const { getProfile } = createClient("");
      const response = await getProfile(user.id);
      const profileData = (response as any).profileData || response.data?.profileData || {};
      const { email, username } = profileData;
      setUserData({ email: email || "", username: username || "" });
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
      if (!user?.id) {
        console.error("User ID is not available.");
        return;
      }
      const { editProfile } = createClient("");
      const response = await editProfile(user.id, userData);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${response.message}`,
        showConfirmButton: false,
        timer: 1500,
      });

      router.push('/profile');
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
      if (!user?.id) {
        console.error("User ID is not available.");
        return;
      }
      const { editPassword } = createClient("");
      const response = await editPassword(user.id, password);

      if (response.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.error,
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
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.message || "Something went wrong!",
      });
      console.error("Error changing password:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8" style={{ marginTop: "70px" }}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Edit Profile</h1>
            <p className="text-gray-500">Update your profile information and security settings</p>
          </div>

          <div className="space-y-6">
            {/* Profile Information Card */}
            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                <p className="text-sm text-gray-500 mt-1">Update your account details</p>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={userData?.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userData?.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>

                  <button
                    onClick={handleProfileUpdate}
                    disabled={loading}
                    className="w-full bg-green-600 text-white font-medium py-3 px-6 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      "Update Profile"
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
                <p className="text-sm text-gray-500 mt-1">Update your password to keep your account secure</p>
              </div>
              <div className="p-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={password.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={password.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmNewPassword"
                      value={password.confirmNewPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 border border-gray-300 focus:outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    onClick={handleChangePassword}
                    disabled={loading}
                    className="w-full bg-black text-white font-medium py-3 px-6 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Changing Password...
                      </span>
                    ) : (
                      "Change Password"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withAuth(EditProfile);
