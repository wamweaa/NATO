import React from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
  return (
    <div className="sidebar">
    <div className="logo">KNUT</div>
    <ul className="nav">
      <li>
        <a href="#" className="active">Dashboard</a>
      </li>
      <li><Link to="/Financialrecords">Financial records</Link></li>
      <li><Link to="/usermanagement">User Management</Link></li>
      <li><Link to=""></Link></li>

    </ul>
  </div>
  );
};

export default Sidebar;
