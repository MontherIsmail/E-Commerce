import { useEffect, useState } from "react";
import { User } from "../../types/user"; // Update the path based on your project structure
import DashboardLayout from "@/components/DashboardLayout";
import axios from "axios";
import Swal from "sweetalert2";

const UsersPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>();
  const [searchId, setSearchId] = useState<string>("");
  const [filterName, setFilterName] = useState<string>("");
  const [searchEmail, setSearchEmail] = useState<string>("");

  const getUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/auth/users"
      );
      console.log("responseeee", response.data);
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Filter and search logic
  const filteredUsers = users?.filter(
    (user) =>
      user?.username?.toLowerCase().includes(filterName.toLowerCase()) &&
      (searchId === "" || String(user.id) === searchId) &&
      user?.email?.toLowerCase().includes(searchEmail.toLowerCase())
  );

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
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
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Users</h1>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:gap-6">
          {/* Search by ID */}
          <div className="flex flex-col w-full md:w-1/3">
            <label
              htmlFor="searchId"
              className="mb-2 font-medium text-gray-700"
            >
              Search by ID:
            </label>
            <input
              id="searchId"
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter user ID"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Filter by Name */}
          <div className="flex flex-col w-full md:w-1/3">
            <label
              htmlFor="filterName"
              className="mb-2 font-medium text-gray-700"
            >
              Search by Name:
            </label>
            <input
              id="filterName"
              type="text"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              placeholder="Enter user name"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Search by Email */}
          <div className="flex flex-col w-full md:w-1/3">
            <label
              htmlFor="searchEmail"
              className="mb-2 font-medium text-gray-700"
            >
              Search by Email:
            </label>
            <input
              id="searchEmail"
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Enter user email"
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user.id}>
                  <td className="border px-4 py-2 text-left">{user.id}</td>
                  <td className="border px-4 py-2 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.username}
                  </td>
                  <td className="border px-4 py-2 text-left overflow-hidden text-ellipsis whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="border px-4 py-2 text-left">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewUser(user)}
                        className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="bg-red-500 text-white px-4 py-2 hover:bg-red-600 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Details Popup */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 w-full max-w-lg rounded-md">
              <h2 className="text-2xl font-bold mb-4">User Details</h2>
              <p className="text-gray-700 mb-2">
                Name: {selectedUser.username}
              </p>
              <p className="text-gray-700 mb-2">Email: {selectedUser.email}</p>
              <button
                onClick={handleClosePopup}
                className="mt-4 bg-red-500 text-white px-4 py-2 hover:bg-red-600 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
