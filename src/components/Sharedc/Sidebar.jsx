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
      <li><Link to="/DashboardForm">Share and loans</Link></li>
      <li><a href="#">Transactions</a></li>
      <li><a href="#">Bills</a></li>
      <li><a href="#">Withdraw/Deposit</a></li>
      <li><a href="#">Reports</a></li>
      <li><a href="#">Profile Settings</a></li>
    </ul>
  </div>
  );
};

export default Sidebar;
