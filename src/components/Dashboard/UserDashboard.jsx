import React, { useEffect, useState } from 'react';
import { isAuthenticated, getToken } from '../Services/auth';
import RecordTable from '../Sharedc/RecordTable';
import Statistics from '../Sharedc/Statistics';
import Sidebar from '../Sharedc/Sidebar';

const UserDashboard = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    role: '',
  });
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ month: '', year: '' });

  useEffect(() => {
    // Check if the user is authenticated
    if (!isAuthenticated()) {
      alert('You must log in first.');
      window.location.href = '/login';
      return;
    }

    const fetchUserDetails = async () => {
      try {
        const token = getToken();
        const userResponse = await fetch('http://127.0.0.1:5000/api/user/details', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userResponse.ok) {
          throw new Error(`Error ${userResponse.status}: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();
        setUserDetails(userData);

        const recordsResponse = await fetch('http://127.0.0.1:5000/api/records', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!recordsResponse.ok) {
          throw new Error(`Error ${recordsResponse.status}: ${recordsResponse.statusText}`);
        }

        const recordsData = await recordsResponse.json();
        setRecords(recordsData);
        setFilteredRecords(recordsData);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    const filtered = records.filter((record) => {
      const recordDate = new Date(record.date);
      const matchesMonth = filters.month ? recordDate.getMonth() + 1 === parseInt(filters.month) : true;
      const matchesYear = filters.year ? recordDate.getFullYear() === parseInt(filters.year) : true;
      return matchesMonth && matchesYear;
    });

    setFilteredRecords(filtered);
  };

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <header className="header">
          <h1>Welcome to KNUT Dashboard</h1>
          <div className="user-info">
            <span>Logged in as: {userDetails.username}</span>
            <img src="https://via.placeholder.com/40" alt="User Avatar" className="avatar" />
          </div>
        </header>

        <section className="content">
          {error ? (
            <div className="card">
              <p className="error">{error}</p>
            </div>
          ) : (
            <>
              <div className="card">
                <h2>User Information</h2>
                <p>Email: {userDetails.email}</p>
                <p>Role: {userDetails.role}</p>

                <div className="filter-bar">
                  <label>
                    Month:
                    <select name="month" value={filters.month} onChange={handleFilterChange}>
                      <option value="">All</option>
                      {[...Array(12)].map((_, index) => (
                        <option key={index} value={index + 1}>
                          {new Date(0, index).toLocaleString('default', { month: 'long' })}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Year:
                    <select name="year" value={filters.year} onChange={handleFilterChange}>
                      <option value="">All</option>
                      {[...Array(5)].map((_, index) => {
                        const year = new Date().getFullYear() - index;
                        return (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </label>
                </div>
              </div>

              <div className="card">
                <RecordTable records={filteredRecords} />
              </div>

              <div className="card">
                <Statistics records={filteredRecords} />
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;