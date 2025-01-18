import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li><Link to="/user/dashboard">User Dashboard</Link></li>
        <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
        <li><Link to="/financial-records">Financial Records</Link></li>
        <li><Link to="/user-management">User Management</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
