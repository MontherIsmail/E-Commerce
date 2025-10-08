import { useEffect, useState } from "react";
import { User } from "../../types/user"; // Update the path based on your project structure
import DashboardLayout from "@/components/DashboardLayout";
import withPermission from "../../hoc/withPermission";
import axios from "axios";
import Swal from "sweetalert2";
import { getApiUrl } from "../../config/api";
import { 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiEdit, 
  FiTrash2, 
  FiUser, 
  FiMail, 
  FiCalendar,
  FiShield,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiArrowDown,
  FiRefreshCw,
  FiX
} from "react-icons/fi";

const UsersPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<{ username: string; email: string; password: string } | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [filterName, setFilterName] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof User>('username');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const usersPerPage = 10;

  const getUsers = async () => {
    try {
      setLoading(true);
      // Add minimum delay to show skeleton loaders
      await new Promise((resolve) => setTimeout(resolve, 800));
      const response = await axios.get(
        getApiUrl("/auth/users")
      );
      // Filter out admin users - only show regular users
      const regularUsers = response.data.filter((user: any) => user.role !== "admin");
      setUsers(regularUsers);
    } catch (error) {
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Filter and search logic - exclude admin users
  const filteredUsers = users?.filter(
    (user) =>
      user.role !== "admin" && // Exclude admin users
      user?.username?.toLowerCase().includes(filterName.toLowerCase()) &&
      (searchId === "" || String(user.id) === searchId) &&
      user?.email?.toLowerCase().includes(searchEmail.toLowerCase())
  );

  // Sort users
  const sortedUsers = filteredUsers?.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil((sortedUsers?.length || 0) / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const paginatedUsers = sortedUsers?.slice(startIndex, endIndex);

  // User statistics
  const totalUsers = users?.length || 0;
  const activeUsers = users?.filter(user => user.role !== "admin").length || 0;
  const adminUsers = users?.filter(user => user.role === "admin").length || 0;

  const handleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchId("");
    setFilterName("");
    setSearchEmail("");
    setCurrentPage(1);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const beginEditUser = (user: User) => {
    setSelectedUser(user);
    setEditForm({ username: user.username || '', email: user.email || '', password: '' });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditForm(null);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editForm) return;
    const { name, value } = e.target;
    setEditForm({ ...editForm, [name]: value });
  };

  const handleUpdateUser = async (userId: number) => {
    if (!editForm) return;
    try {
      const payload: any = { username: editForm.username, email: editForm.email };
      if (editForm.password && editForm.password.trim().length > 0) {
        payload.password = editForm.password.trim();
      }
      await axios.put(getApiUrl(`/auth/users/${userId}`), payload, { withCredentials: true });
      Swal.fire({ icon: 'success', title: 'Updated', text: 'User updated successfully', timer: 1500, showConfirmButton: false });
      // reflect in UI
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, username: payload.username, email: payload.email } as any : u)));
      setIsEditing(false);
      setEditForm(null);
      setSelectedUser(null);
    } catch (error: any) {
      Swal.fire({ icon: 'error', title: 'Error', text: error?.response?.data?.message || 'Failed to update user' });
    }
  };

  const handleDeleteUser = (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Make API call to delete the product
          // await axios.delete(
          //   `http://localhost:5000/api/v1/users/${userId}`
          // );
          setUsers(users?.filter((user) => user.id !== userId));
          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
          // Optionally, redirect or refresh the page
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. The product could not be deleted.",
            icon: "error",
          });
          console.error(error);
        }
      }
    });
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
                <p className="text-gray-600">Manage and monitor all registered users</p>
              </div>
              <button
                onClick={() => getUsers()}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiRefreshCw className="mr-2" />
                Refresh
              </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <FiUser className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FiShield className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FiMail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Admin Users</p>
                    <p className="text-2xl font-bold text-gray-900">{adminUsers}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Search & Filter</h2>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <FiFilter className="mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
              
              <div className={`${showFilters ? 'block' : 'hidden'} transition-all duration-300`}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {/* Search by ID */}
                  <div className="relative">
                    <label htmlFor="searchId" className="block text-sm font-medium text-gray-700 mb-2">
                      Search by ID
            </label>
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              id="searchId"
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter user ID"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
                    </div>
          </div>

          {/* Filter by Name */}
                  <div className="relative">
                    <label htmlFor="filterName" className="block text-sm font-medium text-gray-700 mb-2">
                      Search by Name
            </label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              id="filterName"
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Enter user name"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
                    </div>
          </div>

          {/* Search by Email */}
                  <div className="relative">
                    <label htmlFor="searchEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Search by Email
            </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              id="searchEmail"
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Enter user email"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Users ({sortedUsers?.length || 0})
                </h2>
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1}-{Math.min(endIndex, sortedUsers?.length || 0)} of {sortedUsers?.length || 0} users
          </div>
        </div>

          {loading ? (
            <div className="animate-pulse">
                  <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="h-12 bg-gray-200 rounded-lg w-12"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className="h-8 bg-gray-200 rounded w-20"></div>
                        </div>
                    ))}
                  </div>
                </div>
              ) : paginatedUsers && paginatedUsers.length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort('id')}
                          >
                            <div className="flex items-center">
                              ID
                              <FiArrowDown className="ml-2 w-3 h-3" />
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort('username')}
                          >
                            <div className="flex items-center">
                              User
                              <FiArrowDown className="ml-2 w-3 h-3" />
                            </div>
                          </th>
                          <th 
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSort('email')}
                          >
                            <div className="flex items-center">
                              Email
                              <FiArrowDown className="ml-2 w-3 h-3" />
            </div>
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                </tr>
              </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              #{user.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-medium text-sm">
                                      {user.username?.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                      {user.username}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    {user.role || 'User'}
                                  </div>
                                </div>
                              </div>
                    </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.email}
                    </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewUser(user)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                                  <FiEye className="w-3 h-3 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => beginEditUser(user)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                        >
                          <FiEdit className="w-3 h-3 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                        >
                                  <FiTrash2 className="w-3 h-3 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-6">
                      <div className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiChevronLeft className="w-4 h-4 mr-1" />
                          Previous
                        </button>
                        
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`inline-flex items-center px-3 py-2 border text-sm font-medium rounded-md ${
                              currentPage === page
                                ? 'border-blue-500 text-blue-600 bg-blue-50'
                                : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                          <FiChevronRight className="w-4 h-4 ml-1" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FiUser className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {users && users.length === 0 ? "No Users Found" : "No Matching Users"}
                </h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                  {users && users.length === 0
                    ? "There are no users in the system yet."
                    : "No users match your current search criteria. Try adjusting your filters."}
                </p>
            </div>
          )}
            </div>
          </div>
        </div>

        {/* Edit User Modal */}
        {isEditing && selectedUser && editForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
                  <button onClick={cancelEdit} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={editForm.username}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password (optional)</label>
                  <input
                    type="password"
                    name="password"
                    value={editForm.password}
                    onChange={handleEditChange}
                    minLength={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Minimum 6 characters"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
                <button onClick={cancelEdit} className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={() => handleUpdateUser(Number(selectedUser.id))} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced User Details Modal */}
        {selectedUser && !isEditing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                  <button
                    onClick={handleClosePopup}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {/* User Avatar and Basic Info */}
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                          {selectedUser.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {selectedUser.username}
                      </h3>
                      <p className="text-gray-600">{selectedUser.email}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                        {selectedUser.role || 'User'}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          User ID
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                          #{selectedUser.id}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                          {selectedUser.username}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                          {selectedUser.email}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account Type
                        </label>
                        <p className="text-sm text-gray-900 bg-gray-50 px-3 py-2 rounded-lg">
                          {selectedUser.role || 'Regular User'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                onClick={handleClosePopup}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Close
              </button>
                    <button
                      onClick={() => {
                        // Add edit functionality here
                        handleClosePopup();
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <FiEdit className="w-4 h-4 mr-2 inline" />
                      Edit User
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default withPermission('manageUsers')(UsersPage);
