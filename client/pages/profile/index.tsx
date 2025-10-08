import React, { useEffect, useState } from "react";
import Link from "next/link";
import createClient from "../../api";
import { useAuth } from "../../context/AuthContext";
import { Footer, Navbar } from "../../components";
import { ProfileSkeleton } from "../../components/Skeletons";
import withAuth from "../../hoc/withAuth";
import type { Profile } from "../../types";

const Profile = () => {
  const basePath = process.env.NODE_ENV === 'production' ? '/ecommerce' : '';
  const [userData, setUserData] = useState<Partial<Profile>>({
    email: "",
    username: "",
    role: "",
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchUserData = async () => {
    try {
      if (!user?.id) {
        setLoading(false);
        return;
      }
      const { getProfile } = createClient("");
      // Add minimum delay to show skeleton loaders
      await new Promise((resolve) => setTimeout(resolve, 800));
      const response = await getProfile(user.id);
      const profileData = (response as any).profileData || response.data?.profileData;
      setUserData(profileData || {});
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8" style={{ marginTop: "70px" }}>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-500">Manage your account information</p>
          </div>

          {loading ? (
            <ProfileSkeleton />
          ) : (
            <div className="space-y-6">
              {/* Profile Card */}
              <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  <p className="text-sm text-gray-500 mt-1">Your personal details</p>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Username */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-medium text-gray-500 block mb-1">Username</label>
                    <p className="text-lg text-gray-900 font-medium">
                      {userData.username || <span className="text-gray-400 italic">Not set</span>}
                    </p>
                  </div>

                  {/* Email */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-medium text-gray-500 block mb-1">Email</label>
                    <p className="text-lg text-gray-900 font-medium break-all">
                      {userData.email || <span className="text-gray-400 italic">Not set</span>}
                    </p>
                  </div>

                  {/* Role */}
                  <div className="pb-4">
                    <label className="text-sm font-medium text-gray-500 block mb-1">Role</label>
                    <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold ${
                      userData.role === 'admin' 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-green-600 text-white'
                    }`}>
                      {userData.role?.toUpperCase() || 'USER'}
                    </span>
                  </div>

                  {/* Edit Button */}
                  <div className="pt-4">
                    <Link href="/edit-profile">
                      <button className="w-full bg-black text-white font-medium py-3 px-6 hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Edit Profile</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Account Security Card */}
              <div className="bg-gray-50 border border-gray-200 shadow-sm p-6">
                <div className="flex items-start mb-3">
                  <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">Account Security</h3>
                    <p className="text-sm text-gray-600">
                      Keep your account secure by using a strong password and updating it regularly. 
                      You can change your password in the Edit Profile section.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default withAuth(Profile);
