import { useState } from "react";
import { User } from "../../types/user"; // Update the path based on your project structure
import DashboardLayout from "@/components/DashboardLayout";

const fakeUsers: User[] = [
  { id: "1", name: "Alice Johnson", email: "alice.johnson@example.com" },
  { id: "2", name: "Bob Smith", email: "bob.smith@example.com" },
  { id: "3", name: "Charlie Brown", email: "charlie.brown@example.com" },
  { id: "4", name: "Alice Johnson", email: "alice.johnson@example.com" },
  { id: "5", name: "Bob Smith", email: "bob.smith@example.com" },
  { id: "6", name: "Charlie Brown", email: "charlie.brown@example.com" },
  { id: "7", name: "Alice Johnson", email: "alice.johnson@example.com" },
  { id: "8", name: "Bob Smith", email: "bob.smith@example.com" },
  { id: "9", name: "Charlie Brown", email: "charlie.brown@example.com" },
  // Add more fake users as needed
];

const UsersPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(fakeUsers);
  const [searchId, setSearchId] = useState<string>("");
  const [filterName, setFilterName] = useState<string>("");

  // Filter and search logic
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filterName.toLowerCase()) &&
      (searchId === "" || user.id === searchId)
  );

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleClosePopup = () => {
    setSelectedUser(null);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Users</h1>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          {/* Search by ID */}
          <div className="flex flex-col w-full md:w-1/2">
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
              className="p-2 border border-gray-300"
            />
          </div>

          {/* Filter by Name */}
          <div className="flex flex-col w-full md:w-1/2">
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
              className="p-2 border border-gray-300"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white shadow-md p-4 flex flex-col items-start"
            >
              <div className="flex flex-col w-full">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-700">Email: {user.email}</p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleViewUser(user)}
                  className="bg-green-500 text-white px-4 py-2 hover:bg-green-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="bg-red-500 text-white px-4 py-2 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* User Details Popup */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-4">User Details</h2>
              <p className="text-gray-700 mb-2">Name: {selectedUser.name}</p>
              <p className="text-gray-700 mb-2">Email: {selectedUser.email}</p>
              {/* Add more user details as needed */}
              <button
                onClick={handleClosePopup}
                className="mt-4 bg-red-500 text-white px-4 py-2 hover:bg-red-600"
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
