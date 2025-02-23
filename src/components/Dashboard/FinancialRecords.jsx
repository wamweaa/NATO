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
      setFilteredRecords(recordsResponse.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredRecords(records);
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

  const handleAddRecord = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const parseNumber = (value) => {
      const num = Number(value);
      return isNaN(num) ? 0.0 : num;
    };

    const newRecord = {
      user_id: parseNumber(formData.get("user")),
      month: formData.get("month"),
      year: parseNumber(formData.get("year")),
      paid_in: parseNumber(formData.get("paid_in")),
      shares_balance: parseNumber(formData.get("shares_balance")),
      loaned: parseNumber(formData.get("loaned")),
      repaid: parseNumber(formData.get("repaid")),
      loan_balance: parseNumber(formData.get("loan_balance")),
      top_up_amount: parseNumber(formData.get("top_up_amount")),
      commission: parseNumber(formData.get("commission")),
      penalty: parseNumber(formData.get("penalty")),
      bank_charges: parseNumber(formData.get("bank_charges")),
      cheque_value: parseNumber(formData.get("cheque_value")),
      charged_interest: parseNumber(formData.get("charged_interest")),
      paid_interest: parseNumber(formData.get("paid_interest")),
      interest_balance: parseNumber(formData.get("interest_balance")),
      category: formData.get("category"),
    };

    try {
      const response = await adminAddRecord(newRecord);
      setRecords((prevRecords) => [...prevRecords, response.data]);
      setFilteredRecords((prevRecords) => [...prevRecords, response.data]);
      e.target.reset();
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
            <form onSubmit={handleAddRecord}>
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
                <input type="number" name="shares_balance" placeholder="Shares Balance" required />
                <input type="number" name="loaned" placeholder="Loaned" required />
                <input type="number" name="repaid" placeholder="Repaid" required />
                <input type="number" name="loan_balance" placeholder="Loan Balance" required />
                <input type="number" name="top_up_amount" placeholder="Top-Up Amount" required />
                <input type="number" name="commission" placeholder="Commission" required />
                <input type="number" name="penalty" placeholder="Penalty" required />
                <input type="number" name="bank_charges" placeholder="Bank Charges" required />
                <input type="number" name="cheque_value" placeholder="Cheque Value" required />
                <input type="number" name="charged_interest" placeholder="Charged Interest" required />
                <input type="number" name="paid_interest" placeholder="Paid Interest" required />
                <input type="number" name="interest_balance" placeholder="Interest Balance" required />
                <button type="submit">Add Record</button>
              </div>
            </form>

            <div className="searchbar">
              <input type="text" placeholder="Search by TSC Number" className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button onClick={handleSearch}><IoIosSearch /></button>
            </div>

            <RecordTable records={filteredRecords} users={users} onDelete={handleDeleteRecord} />
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialRecords;
