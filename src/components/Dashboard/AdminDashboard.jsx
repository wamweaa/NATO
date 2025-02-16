import React, { useEffect, useState } from "react";
import { getAllUsers, getRecords } from "../Services/api";
import Sidebar from "../Sharedc/Sidebar";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await getAllUsers();
        const recordsResponse = await getRecords();
        setUsers(usersResponse.data);
        setRecords(recordsResponse.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <h1>Admin Dashboard</h1>
          <div className="user-info">
            <span>Logged in as: Admin</span>
            <img src="https://via.placeholder.com/40" alt="User Avatar" className="avatar" />
          </div>
        </header>

        <div className="dashboard-grid">
          <section className="card">
            <h2>All Users</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>TSC Number</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.tsc_number}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card">
            <h2>Financial Records</h2>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Paid In</th>
                    <th>Balance</th>
                    <th>Loaned</th>
                    <th>Repaid</th>
                    <th>Shares</th>
                    <th>Interest</th>
                    <th>Category</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td>{record.id}</td>
                      <td>{record.month}</td>
                      <td>{record.year}</td>
                      <td>{record.paid_in}</td>
                      <td>{record.balance}</td>
                      <td>{record.loaned}</td>
                      <td>{record.repaid}</td>
                      <td>{record.shares}</td>
                      <td>{record.interest}</td>
                      <td>{record.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
