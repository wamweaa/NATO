import React, { useEffect, useState } from "react";
import Sidebar from "../Sharedc/Sidebar";
import { getAllUsers } from "../Services/api";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers();
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <h1>User Management</h1>
        </header>

        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="card">
            <h2>Users List</h2>
            <table className="users-table">
              <thead>
                <tr>
                  <th>TSC Number</th> {/* Changed from ID to TSC Number */}
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.tsc_number}> {/* Changed key from id to tsc_number */}
                    <td>{user.tsc_number || "N/A"}</td> {/* Display TSC Number */}
                    <td>{user.name || "N/A"}</td>  
                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
