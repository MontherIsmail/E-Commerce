import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import withAuth from "../../hoc/withAuth";
import axios from "axios";
import { getApiUrl } from "@/config/api";
import Swal from "sweetalert2";

interface AdminProfile {
  id: number;
  username: string;
  email: string;
  role: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [userData, setUserData] = useState({
    email: "",
    username: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const getProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        getApiUrl("/auth/me"),
        { withCredentials: true }
      );
      console.log("profile", response.data.user);
      setProfile(response.data.user);
      setUserData({
        email: response.data.user.email || "",
        username: response.data.user.username || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load profile",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

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
    try {
      if (!profile?.id) return;

      const response = await axios.put(
        getApiUrl(`/profile/${profile.id}`),
        userData,
        { withCredentials: true }
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setProfile({ ...profile, ...userData });
      setIsEditingProfile(false);
    } catch (error: any) {
      console.error("Error updating profile:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update profile",
      });
    }
  };

  const handleChangePassword = async () => {
    if (password.newPassword !== password.confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "New passwords do not match!",
      });
      return;
    }

    if (password.newPassword.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password must be at least 6 characters!",
      });
      return;
    }

    try {
      if (!profile?.id) return;

      const response = await axios.put(
        getApiUrl(`/profile/${profile.id}/password`),
        {
          currentPassword: password.currentPassword,
          newPassword: password.newPassword,
        },
        { withCredentials: true }
      );

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
      setIsChangingPassword(false);
    } catch (error: any) {
      console.error("Error changing password:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to change password",
      });
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information and security settings</p>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {/* Profile Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-blue-600 rounded-lg shadow-lg p-6 text-white">
              <div className="flex items-center justify-center mb-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-bold text-blue-600">
                  {profile?.username?.charAt(0).toUpperCase() || "A"}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center mb-2">{profile?.username || "Admin"}</h2>
              <p className="text-center text-blue-100 mb-4 break-all">{profile?.email}</p>
              <div className="bg-white/20 rounded-lg p-3 text-center">
                <p className="text-sm text-blue-100 mb-1">Role</p>
                <p className="font-semibold text-lg uppercase">{profile?.role || "admin"}</p>
              </div>
            </div>
          </div>

          {/* Profile Details & Password Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  <p className="text-sm text-gray-600 mt-1">Update your account details</p>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                )}
              </div>

              <div className="p-6">
                {!isEditingProfile ? (
                  <div className="space-y-4">
                    <div className="flex items-center border-b border-gray-200 pb-4">
                      <div className="w-1/3">
                        <label className="text-sm font-medium text-gray-500">Username</label>
                      </div>
                      <div className="w-2/3">
                        <p className="text-gray-900 font-medium">{profile?.username || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-center border-b border-gray-200 pb-4">
                      <div className="w-1/3">
                        <label className="text-sm font-medium text-gray-500">Email</label>
                      </div>
                      <div className="w-2/3">
                        <p className="text-gray-900 font-medium break-all">{profile?.email || "N/A"}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-1/3">
                        <label className="text-sm font-medium text-gray-500">User ID</label>
                      </div>
                      <div className="w-2/3">
                        <p className="text-gray-900 font-medium">{profile?.id}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Username
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={userData.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                        value={userData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => {
                          setIsEditingProfile(false);
                          setUserData({
                            email: profile?.email || "",
                            username: profile?.username || "",
                          });
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleProfileUpdate}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Change Password Card */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Security</h2>
                  <p className="text-sm text-gray-600 mt-1">Update your password</p>
                </div>
                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                    Change Password
                  </button>
                )}
              </div>

              <div className="p-6">
                {!isChangingPassword ? (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <p className="text-gray-600">
                      Keep your account secure by using a strong password and updating it regularly.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={password.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Enter new password (min. 6 characters)"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        placeholder="Confirm new password"
                      />
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => {
                          setIsChangingPassword(false);
                          setPassword({
                            currentPassword: "",
                            newPassword: "",
                            confirmNewPassword: "",
                          });
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleChangePassword}
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Profile);
