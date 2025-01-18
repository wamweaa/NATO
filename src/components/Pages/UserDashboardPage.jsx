import React from 'react';
import Navbar from '../Sharedc/Navbar';
import Sidebar from '../Sharedc/Sidebar';
import UserDashboard from '../Dashboard/UserDashboard';
import Footer from '../Sharedc/Footer';

const UserDashboardPage = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-content">
          <UserDashboard />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;
