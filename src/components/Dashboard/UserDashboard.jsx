import React, { useEffect, useState } from 'react';
import { isAuthenticated, getToken } from '../Services/auth';
import Sidebar from '../Sharedc/Sidebar';

const UserDashboard = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    role: '',
    created_at: '',
  });
  const [financialRecords, setFinancialRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) {
      alert('You must log in first.');
      window.location.href = '/login';
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = getToken();

        // Fetch user details
        const userResponse = await fetch('http://127.0.0.1:5000/api/user/details', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userResponse.ok) throw new Error(`Error ${userResponse.status}`);
        const userData = await userResponse.json();
        setUserDetails(userData);

        // Fetch financial records
        const recordsResponse = await fetch('http://127.0.0.1:5000/api/records', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!recordsResponse.ok) throw new Error(`Error ${recordsResponse.status}`);
        const recordsData = await recordsResponse.json();
        setFinancialRecords(recordsData);

      } catch (err) {
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="dashboard-container">Loading...</div>;

  // Calculate total loans, balance, and interest
  const totalLoans = financialRecords.reduce((acc, record) => acc + record.loaned, 0);
  const totalBalance = financialRecords.reduce((acc, record) => acc + record.balance, 0);
  const totalInterest = financialRecords.reduce((acc, record) => acc + record.interest, 0);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <h2>Hello {userDetails.name}</h2>
          <p>{new Date().toDateString()}</p>
        </header>

        <section className="user-info">
          <h3>Account Details</h3>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Role:</strong> {userDetails.role}</p>
          <p><strong>Account Created:</strong> {new Date(userDetails.created_at).toLocaleDateString()}</p>
        </section>

        <section className="cards-container">
          <div className="card">
            <h4>Total Loans</h4>
            <p>KES {totalLoans.toFixed(2)}</p>
          </div>
          <div className="card">
            <h4>Total Balance</h4>
            <p>KES {totalBalance.toFixed(2)}</p>
          </div>
          <div className="card">
            <h4>Total Interest</h4>
            <p>KES {totalInterest.toFixed(2)}</p>
          </div>
        </section>

        <section className="transactions">
          <h3>Financial Records</h3>
          <table>
            <thead>
              <tr>
                <th>Month</th>
                <th>Year</th>
                <th>Paid In</th>
                <th>Balance</th>
                <th>Loaned</th>
                <th>Repaid</th>
                <th>Interest</th>
              </tr>
            </thead>
            <tbody>
              {financialRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.month}</td>
                  <td>{record.year}</td>
                  <td>KES {record.paid_in.toFixed(2)}</td>
                  <td>KES {record.balance.toFixed(2)}</td>
                  <td>KES {record.loaned.toFixed(2)}</td>
                  <td>KES {record.repaid.toFixed(2)}</td>
                  <td>KES {record.interest.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;