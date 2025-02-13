import React, { useEffect, useState } from "react";
import Sidebar from "../Sharedc/Sidebar";
import { getAllUsers, getRecords, adminAddRecord, adminDeleteRecord } from "../Services/api";
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

  // Handle adding a financial record
  const handleAddRecord = async (newRecord) => {
    try {
      await adminAddRecord(newRecord);
      setRecords([...records, newRecord]);
    } catch (err) {
      setError("Failed to add record.");
    }
  };

  // Handle deleting a financial record
  const handleDeleteRecord = async (id) => {
    try {
      await adminDeleteRecord(id);
      setRecords(records.filter(record => record.id !== id));
    } catch (err) {
      setError("Failed to delete record.");
    }
  };

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
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
{activeTab === "records" && (
  <div className="card">
    <h2>Financial Records</h2>

    {/* Add New Record Form */}
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const userId = e.target.user.value;
        const newRecord = {
          user_id: userId, // Associate record with selected user
          month: e.target.month.value,
          year: e.target.year.value,
          paid_in: e.target.paid_in.value,
          balance: e.target.balance.value,
          loaned: e.target.loaned.value,
          repaid: e.target.repaid.value,
          shares: e.target.shares.value,
          interest: e.target.interest.value,
          category: e.target.category.value,
        };

        await handleAddRecord(newRecord);
        e.target.reset();
      }}
    >
      <div className="form-group">
        {/* Select User Dropdown */}
        <select name="user" required>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username} ({user.email})
            </option>
          ))}
        </select>
        {/* user dropdown for category */}
        <select name="category" required>
      <option value="">Select Category</option>
      <option value="savings">Savings</option>
      <option value="loans">Loans</option>
      <option value="shares">Shares</option>
      <option value="interest">Interest</option>
    </select>
        
        <input type="text" name="month" placeholder="Month" required />
        <input type="number" name="year" placeholder="Year" required />
        <input type="number" name="paid_in" placeholder="Paid In" required />
        <input type="number" name="balance" placeholder="Balance" required />
        <input type="number" name="loaned" placeholder="Loaned" required />
        <input type="number" name="repaid" placeholder="Repaid" required />
        <input type="number" name="shares" placeholder="Shares" required />
        <input type="number" name="interest" placeholder="Interest" required />
        <button type="submit">Add Record</button>
      </div>
    </form>

    {/* Display Financial Records */}
    <RecordTable records={records} users={users} onDelete={handleDeleteRecord} />
  </div>
)}


        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
