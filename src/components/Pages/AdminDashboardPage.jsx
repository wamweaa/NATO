import React from 'react';
import Navbar from '../Sharedc/Navbar';
import Sidebar from '../Sharedc/Sidebar';
import AdminDashboard from '../Dashboard/AdminDashboard';
import Footer from '../Sharedc/Footer';

const AdminDashboardPage = () => {
  return (
    <div>
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-content">
          <AdminDashboard />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
