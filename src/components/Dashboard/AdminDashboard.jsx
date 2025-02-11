import React, { useEffect, useState } from "react";
import Sidebar from "../Sharedc/Sidebar";
import { getAllUsers, deleteRecords, getRecords, addRecords } from "../Services/api";
import RecordTable from "../Sharedc/RecordTable";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (err) {
        setError("Failed to fetch users.");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await getRecords();
        setRecords(response.data);
      } catch (err) {
        setError("Failed to fetch records.");
      }
    };
    fetchRecords();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <h1>Welcome to KNUT Dashboard</h1>
          <div className="user-info">
            <span>Logged in as: Admin</span>
            <img src="https://via.placeholder.com/40" alt="User Avatar" className="avatar" />
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="tabs">
          <button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>User Management</button>
          <button onClick={() => setActiveTab("records")} className={activeTab === "records" ? "active" : ""}>Financial Records</button>
        </div>

        {/* Content */}
        <section className="content">
          {error && <p className="error">{error}</p>}
          {activeTab === "users" && (
            <div className="card">
              <h2>User Management</h2>
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>
                        <button onClick={() => deleteRecords(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === "records" && (
            <div className="card">
              <h2>Financial Records</h2>
              <RecordTable records={records} onDelete={deleteRecords} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;