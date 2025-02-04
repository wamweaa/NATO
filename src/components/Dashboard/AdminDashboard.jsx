import React from "react";
import Sidebar from "../Sharedc/Sidebar";


const AdminDashboard = () => {
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
            <span>Logged in as: John Doe</span>
            <img src="https://via.placeholder.com/40" alt="User Avatar" className="avatar" />
          </div>
        </header>

        {/* Body */}
        <section className="content">
          <div className="card">
            <h2>Overview</h2>
            <p>This is a summary of key metrics.</p>
          </div>
          <div className="card">
            <h2>Recent Activity</h2>
            <ul>
              <li>Project A updated</li>
              <li>New user registered</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
