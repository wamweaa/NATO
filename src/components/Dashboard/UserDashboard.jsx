


import React, { useEffect, useState } from 'react';
import { isAuthenticated, getToken } from '../Services/auth';
import Sidebar from '../Sharedc/Sidebar';

const UserDashboard = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    accountType: '',
    tscNumber: '',
  });
  const [loans, setLoans] = useState([]);
  const [transactions, setTransactions] = useState([]);
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
        const userResponse = await fetch('http://127.0.0.1:5000/api/user/details', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (!userResponse.ok) throw new Error(`Error ${userResponse.status}`);
        const userData = await userResponse.json();
        setUserDetails(userData);

        const loansResponse = await fetch('http://127.0.0.1:5000/api/loans', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!loansResponse.ok) throw new Error(`Error ${loansResponse.status}`);
        setLoans(await loansResponse.json());

        const transactionsResponse = await fetch('http://127.0.0.1:5000/api/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!transactionsResponse.ok) throw new Error(`Error ${transactionsResponse.status}`);
        setTransactions(await transactionsResponse.json());
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="dashboard-container">Loading...</div>;

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
          <p><strong>Account Name:</strong> {userDetails.name}</p>
          <p><strong>Account Type:</strong> {userDetails.accountType}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>TSC Number:</strong> {userDetails.tscNumber}</p>
        </section>

        <section className="cards-container">
          <div className="card">
            <h4>Total Loans</h4>
            <p>KES {loans.reduce((acc, loan) => acc + loan.amount, 0)}</p>
          </div>
          <div className="card">
            <h4>Interest Earned</h4>
            <p>KES 20,000</p>
          </div>
        </section>

        <section className="transactions">
          <h3>Loan Progress</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
                <th>Transaction Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.type}</td>
                  <td>KES {transaction.amount}</td>
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
