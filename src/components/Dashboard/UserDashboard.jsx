import React, { useEffect, useState } from 'react';
import { isAuthenticated, getToken } from '../Services/auth';
// import Sidebar from '../Sharedc/Sidebar';

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
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Fetch financial records filtered by category
  const fetchFilteredRecords = async (category) => {
    try {
      const token = getToken();
      const url = category
        ? `http://127.0.0.1:5000/api/records?category=${category}`
        : `http://127.0.0.1:5000/api/records`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error(`Error ${response.status}`);
      const data = await response.json();
      setFinancialRecords(data);
    } catch (err) {
      setError("Failed to fetch financial records.");
    }
  };

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
        fetchFilteredRecords(selectedCategory);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [selectedCategory]);

  if (loading) return <div className="dashboard-loading">Loading...</div>;

  // Calculate total loans, balance, and interest
  const totalLoans = financialRecords.reduce((acc, record) => acc + record.loaned, 0);
  const totalBalance = financialRecords.reduce((acc, record) => acc + record.balance, 0);
  const totalInterest = financialRecords.reduce((acc, record) => acc + record.interest, 0);

  return (
    <div className="dashboard-container">
      {/* <Sidebar /> */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <h2 className="dashboard-title">Hello, {userDetails.name}</h2>
          <p className="dashboard-date">{new Date().toDateString()}</p>
        </header>

        <div className="filter-section">
        <label>Filter by Category: </label>
<select onChange={handleCategoryChange} value={selectedCategory}>
  <option value="">All</option>
  <option value="Burial and Development Fund">Burial and Development Fund</option>
  <option value="Education Fund">Education Fund</option>
</select>

        </div>

        <section className="account-info">
          <h3 className="section-title">Account Details</h3>
          <div className="account-details">
            <p><strong>Name:</strong> {userDetails.name}</p>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Role:</strong> {userDetails.role}</p>
            <p><strong>Account Created:</strong> {new Date(userDetails.created_at).toLocaleDateString()}</p>
          </div>
        </section>

        <section className="financial-summary">
          <div className="summary-card">
            <h4>Total Loans</h4>
            <p>KES {totalLoans.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h4>Total Balance</h4>
            <p>KES {totalBalance.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h4>Total Interest</h4>
            <p>KES {totalInterest.toFixed(2)}</p>
          </div>
        </section>

        <section className="transactions">
          <h3 className="section-title">Financial Records</h3>
          <div className="table-container">
            <table className="transaction-table">
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
