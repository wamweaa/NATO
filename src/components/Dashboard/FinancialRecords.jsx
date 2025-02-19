import React, { useEffect, useState } from "react";
import Sidebar from "../Sharedc/Sidebar";
import { getRecords, getAllUsers, adminAddRecord, adminDeleteRecord } from "../Services/api";
import RecordTable from "../Sharedc/RecordTable";
import { IoIosSearch } from "react-icons/io";

const FinancialRecords = () => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersResponse, recordsResponse] = await Promise.all([
        getAllUsers(),
        getRecords(),
      ]);
      setUsers(usersResponse.data);
      setRecords(recordsResponse.data);
      setFilteredRecords(recordsResponse.data); // Initially, show all records
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredRecords(records); // Reset to all records if search is empty
      return;
    }
  
    const userTSCNumbers = users.reduce((acc, user) => {
      acc[user.id] = user.tsc_number?.toString().trim().toLowerCase(); 
      return acc;
    }, {});
  
    const filtered = records.filter((record) => {
      const userTSC = userTSCNumbers[record.user_id] || "";
      return userTSC.includes(searchQuery.trim().toLowerCase());
    });
  
    setFilteredRecords(filtered);
  };
  

  const handleAddRecord = async (newRecord) => {
    try {
      const response = await adminAddRecord(newRecord);
      setRecords((prevRecords) => [...prevRecords, response.data]);
      setFilteredRecords((prevRecords) => [...prevRecords, response.data]);
    } catch (err) {
      setError("Failed to add record.");
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await adminDeleteRecord(id);
      setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
      setFilteredRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
    } catch (err) {
      setError("Failed to delete record.");
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <header className="header">
          <h1>Financial Records</h1>
        </header>

        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Loading financial records...</p>
        ) : (
          <div className="card">
            <h2>Add Financial Record</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const newRecord = {
                  user_id: e.target.user.value,
                  month: e.target.month.value,
                  year: e.target.year.value,
                  paid_in: e.target.paid_in.value,
                  balance: e.target.balance.value,
                  loaned: e.target.loaned.value,
                  repaid: e.target.repaid.value,
                  shares: e.target.shares.value,
                  interest: e.target.interest.value,
                  category: e.target.category.value,
                };

                await handleAddRecord(newRecord);
                e.target.reset();
              }}
            >
              <div className="form-group">
                <select name="user" required>
                  <option value="">Select User</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} ({user.tsc_number})
                    </option>
                  ))}
                </select>
                <select name="category" required>
                  <option value="">Select Category</option>
                  <option value="Burial and Development Fund">Burial and Development Fund</option>
                  <option value="Education Fund">Education Fund</option>
                </select>
                <input type="text" name="month" placeholder="Month" required />
                <input type="number" name="year" placeholder="Year" required />
                <input type="number" name="paid_in" placeholder="Paid In" required />
                <input type="number" name="balance" placeholder="Balance" required />
                <input type="number" name="loaned" placeholder="Loaned" required />
                <input type="number" name="repaid" placeholder="Repaid" required />
                <input type="number" name="shares" placeholder="Shares" required />
                <input type="number" name="interest" placeholder="Interest" required />
                <button type="submit">Add Record</button>
              </div>
            </form>

            <div className="searchbar">
              <input
                type="text"
                placeholder="Search by TSC Number"
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch}>
                <IoIosSearch />
              </button>
            </div>

            <RecordTable records={filteredRecords} users={users} onDelete={handleDeleteRecord} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialRecords;
