import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import withAuth from "../../hoc/withAuth";
import axios from "axios";
import Swal from "sweetalert2";

interface Admin {
  id: number;
  email: string;
  username: string;
  role: string;
  permissions: {
    manageUsers: boolean;
    manageProducts: boolean;
    manageOrders: boolean;
    viewAnalytics: boolean;
    manageAdmins: boolean;
  };
  createdAt: string;
}

const AdminsPage = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    username: "",
    password: "",
    permissions: {
      manageUsers: true,
      manageProducts: true,
      manageOrders: true,
      viewAnalytics: true,
      manageAdmins: false,
    },
  });

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/auth/users", {
        withCredentials: true,
      });
      // Filter only admin users
      const adminUsers = response.data.filter((user: any) => user.role === "admin");
      setAdmins(adminUsers);
    } catch (error) {
      console.error("Error fetching admins:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load admins",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin({
      ...newAdmin,
      [name]: value,
    });
  };

  const handlePermissionChange = (permission: string) => {
    setNewAdmin({
      ...newAdmin,
      permissions: {
        ...newAdmin.permissions,
        [permission]: !newAdmin.permissions[permission as keyof typeof newAdmin.permissions],
      },
    });
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAdmin.email || !newAdmin.password) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Email and password are required",
      });
      return;
    }

    if (newAdmin.password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Password must be at least 6 characters",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/create-admin",
        newAdmin,
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Admin created successfully",
        timer: 2000,
      });

      setNewAdmin({
        email: "",
        username: "",
        password: "",
        permissions: {
          manageUsers: true,
          manageProducts: true,
          manageOrders: true,
          viewAnalytics: true,
          manageAdmins: false,
        },
      });

      setIsCreating(false);
      fetchAdmins();
    } catch (error: any) {
      console.error("Error creating admin:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to create admin",
      });
    }
  };

  const permissionLabels = {
    manageUsers: "Manage Users",
    manageProducts: "Manage Products",
    manageOrders: "Manage Orders",
    viewAnalytics: "View Analytics",
    manageAdmins: "Manage Admins",
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
            <p className="text-gray-600 mt-1">Create and manage admin users with custom permissions</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Admin
          </button>
        </div>

        {/* Admins List */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Admin
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {admins.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                        No admins found
                      </td>
                    </tr>
                  ) : (
                    admins.map((admin) => (
                      <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                              {admin.username?.charAt(0).toUpperCase() || admin.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{admin.username || "N/A"}</p>
                              <p className="text-sm text-gray-500">{admin.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            {admin.permissions ? (
                              <>
                                {admin.permissions.manageUsers && (
                                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                    Users
                                  </span>
                                )}
                                {admin.permissions.manageProducts && (
                                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                                    Products
                                  </span>
                                )}
                                {admin.permissions.manageOrders && (
                                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                                    Orders
                                  </span>
                                )}
                                {admin.permissions.viewAnalytics && (
                                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                                    Analytics
                                  </span>
                                )}
                                {admin.permissions.manageAdmins && (
                                  <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                                    Admins
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-sm text-gray-400">All Permissions</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Admin Modal */}
        {isCreating && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Admin</h2>
                  <button
                    onClick={() => setIsCreating(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={handleCreateAdmin} className="p-6">
                {/* Basic Information */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newAdmin.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="admin@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={newAdmin.username}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Admin Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={newAdmin.password}
                      onChange={handleInputChange}
                      required
                      minLength={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Minimum 6 characters"
                    />
                  </div>
                </div>

                {/* Permissions */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Permissions</h3>
                  <p className="text-sm text-gray-600 mb-4">Select what this admin can access and manage</p>
                  
                  <div className="space-y-3">
                    {Object.entries(permissionLabels).map(([key, label]) => (
                      <label
                        key={key}
                        className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={newAdmin.permissions[key as keyof typeof newAdmin.permissions]}
                          onChange={() => handlePermissionChange(key)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="ml-3">
                          <span className="font-medium text-gray-900">{label}</span>
                          <p className="text-sm text-gray-500">
                            {key === "manageUsers" && "Can view, create, edit, and delete users"}
                            {key === "manageProducts" && "Can view, create, edit, and delete products"}
                            {key === "manageOrders" && "Can view and manage customer orders"}
                            {key === "viewAnalytics" && "Can access analytics and reports"}
                            {key === "manageAdmins" && "Can create and manage other admin accounts"}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Create Admin
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default withAuth(AdminsPage);

