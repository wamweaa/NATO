import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../Services/api';
import FinancialRecords from './FinancialRecords';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection
import { isAuthenticated } from '../Services/auth';  // Import isAuthenticated to check authentication

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Use navigate for programmatic navigation

  useEffect(() => {
    // Check if the user is authenticated before fetching data
    if (!isAuthenticated()) {
      navigate('/login');  // Redirect to login if not authenticated
    } else {
      const fetchUsers = async () => {
        try {
          const response = await getAllUsers();
          setUsers(response.data);
        } catch (err) {
          setError('Failed to fetch users.');
        }
      };

      fetchUsers();
    }
  }, [navigate]);  // Add navigate as dependency

  return (
    <div className="dashboard-container">
      <h1>Admin Dashboard</h1>
      {error && <p className="error">{error}</p>}
      
      <h2>All Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Manage Financial Records</h2>
      <FinancialRecords />
    </div>
  );
};

export default AdminDashboard;
