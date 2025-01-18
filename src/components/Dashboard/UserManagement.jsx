import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../Services/api';
import { deleteRecords } from '../Services/api';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await getAllUsers();
          setUsers(response.data);
        } catch (err) {
          setError('Failed to fetch users.');
        }
      };
  
      fetchUsers();
    }, []);
  
    const handleDeleteUser = async (id) => {
      try {
        await deleteRecords(id); // Assuming deleteRecords is used for deleting users
        setUsers(users.filter((user) => user.id !== id));
      } catch (err) {
        setError('Failed to delete user.');
      }
    };
  
    return (
      <div className="dashboard-container">
        <h1>User Management</h1>
        {error && <p className="error">{error}</p>}
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
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
export default UserManagement;
