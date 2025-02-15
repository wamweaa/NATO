import React, { useEffect, useState } from "react";
import Sidebar from "../Sharedc/Sidebar";
import { getAllUsers, getRecords, adminAddRecord, adminDeleteRecord } from "../Services/api";
import RecordTable from "../Sharedc/RecordTable";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [activeTab, setActiveTab] = useState("users");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersResponse, recordsResponse] = await Promise.all([
        getAllUsers(),
        getRecords(),
      ]);
      setUsers(usersResponse.data);
      setRecords(recordsResponse.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (newRecord) => {
    try {
      const response = await adminAddRecord(newRecord);
      setRecords((prevRecords) => [...prevRecords, response.data]); // Add new record locally
    } catch (err) {
      setError("Failed to add record.");
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await adminDeleteRecord(id);
      setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id)); // Remove record locally
    } catch (err) {
      setError("Failed to delete record.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <h1>Welcome to KNUT Dashboard</h1>
          <div className="user-info">
            <span>Logged in as: Admin</span>
            <img src="https://via.placeholder.com/40" alt="User Avatar" className="avatar" />
          </div>
        </header>

        <div className="tabs">
          <button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>
            User Management
          </button>
          <button onClick={() => setActiveTab("records")} className={activeTab === "records" ? "active" : ""}>
            Financial Records
          </button>
        </div>

        <section className="content">
          {error && <p className="error">{error}</p>}
          {loading ? (
            <p>Loading data...</p>
          ) : (
            <>
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
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const newRecord = {
                        user_id: e.target.user.value,
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
                      <select name="user" required>
                        <option value="">Select User</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.username} ({user.email})
                          </option>
                        ))}
                      </select>
                      <select name="category" required>
                        <option value="">Select Category</option>
                        <option value="Burial and Development Fund">Burial and Development Fund</option>
                        <option value="Education Fund">Education Fund</option>
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
                  <RecordTable records={records} users={users} onDelete={handleDeleteRecord} />
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
