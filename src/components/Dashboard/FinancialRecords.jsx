import React, { useEffect, useState } from 'react';
import { getRecords, addRecords, deleteRecords } from '../Services/api';
import RecordTable from '../Sharedc/RecordTable';

const FinancialRecords = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    month: '',
    year: '',
    paid_in: 0,
    balance: 0,
    loaned: 0,
    repaid: 0,
    shares: 0,
    interest: 0,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await getRecords();
        setRecords(response.data);
      } catch (err) {
        setError('Failed to fetch records.');
      }
    };

    fetchRecords();
  }, []);

  const handleAddRecord = async () => {
    try {
      const response = await addRecords(newRecord);
      setRecords([...records, response.data]);
      setNewRecord({
        month: '',
        year: '',
        paid_in: 0,
        balance: 0,
        loaned: 0,
        repaid: 0,
        shares: 0,
        interest: 0,
      });
    } catch (err) {
      setError('Failed to add record.');
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await deleteRecords(id);
      setRecords(records.filter((record) => record.id !== id));
    } catch (err) {
      setError('Failed to delete record.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Financial Records</h1>
      {error && <p className="error">{error}</p>}
      
      {/* Input fields for adding a new record */}
      <input
        type="text"
        placeholder="Month"
        value={newRecord.month}
        onChange={(e) => setNewRecord({ ...newRecord, month: e.target.value })}
      />
      <input
        type="number"
        placeholder="Year"
        value={newRecord.year}
        onChange={(e) => setNewRecord({ ...newRecord, year: e.target.value })}
      />
      <input
        type="number"
        placeholder="Paid In"
        value={newRecord.paid_in}
        onChange={(e) => setNewRecord({ ...newRecord, paid_in: e.target.value })}
      />
      <input
        type="number"
        placeholder="Balance"
        value={newRecord.balance}
        onChange={(e) => setNewRecord({ ...newRecord, balance: e.target.value })}
      />
      <input
        type="number"
        placeholder="Loaned"
        value={newRecord.loaned}
        onChange={(e) => setNewRecord({ ...newRecord, loaned: e.target.value })}
      />
      <input
        type="number"
        placeholder="Repaid"
        value={newRecord.repaid}
        onChange={(e) => setNewRecord({ ...newRecord, repaid: e.target.value })}
      />
      <input
        type="number"
        placeholder="Shares"
        value={newRecord.shares}
        onChange={(e) => setNewRecord({ ...newRecord, shares: e.target.value })}
      />
      <input
        type="number"
        placeholder="Interest"
        value={newRecord.interest}
        onChange={(e) => setNewRecord({ ...newRecord, interest: e.target.value })}
      />
      <button onClick={handleAddRecord}>Add Record</button>

      {/* Pass records to RecordTable component */}
      <RecordTable records={records} />
    </div>
  );
};

export default FinancialRecords;
