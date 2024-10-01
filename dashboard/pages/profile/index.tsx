import { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import DashboardLayout from "@/components/DashboardLayout";
import axios from "axios";

interface AdminProfile {
  username: string;
  email: string;
  role: string;
}

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profile, setProfile] = useState<AdminProfile | null>(null);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/profile/1"
      );
      console.log("profile", response.data.profileData);
      setProfile(response.data.profileData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleEditProfile = (values: AdminProfile) => {
    setProfile(values);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditing(false);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Admin Profile</h1>

        {/* Profile Info */}
        <div className="bg-white shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
          <div className="mb-4">
            <strong className="text-gray-700">Username:</strong>
            <p className="text-gray-900">{profile?.username}</p>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Email:</strong>
            <p className="text-gray-900">{profile?.email}</p>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Role:</strong>
            <p className="text-gray-900">{profile?.role}</p>
          </div>
          <button
            onClick={handleEditClick}
            className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>

        {/* Edit Profile Popup */}
        {isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
              <Formik
                initialValues={{
                  username: profile.username || "",
                  email: profile.email || "",
                  role: profile.role || "",
                }}
                validationSchema={Yup.object({
                  username: Yup.string().required("Required"),
                  email: Yup.string()
                    .email("Invalid email address")
                    .required("Required"),
                  role: Yup.string().required("Required"),
                })}
                onSubmit={handleEditProfile}
              >
                <Form>
                  <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700">
                      Username
                    </label>
                    <Field
                      id="username"
                      name="username"
                      type="text"
                      className="mt-1 p-2 border border-gray-300 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">
                      Email
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      className="mt-1 p-2 border border-gray-300 w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="role" className="block text-gray-700">
                      Role
                    </label>
                    <Field
                      id="role"
                      name="role"
                      type="text"
                      className="mt-1 p-2 border border-gray-300 w-full"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={handleCloseEditPopup}
                      className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600"
                    >
                      Save
                    </button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Profile;
