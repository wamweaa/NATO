import React, { useEffect, useState } from 'react';
import { getRecords, addRecords, deleteRecords } from '../Services/api';

const FinancialRecords = () => {
    const [records, setRecords] = useState([]);
    const [newRecord, setNewRecord] = useState('');
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
        const response = await addRecords({ name: newRecord });
        setRecords([...records, response.data]);
        setNewRecord('');
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
        <input
          type="text"
          placeholder="Add a new record"
          value={newRecord}
          onChange={(e) => setNewRecord(e.target.value)}
        />
        <button onClick={handleAddRecord}>Add Record</button>
        <ul>
          {records.map((record) => (
            <li key={record.id}>
              {record.name} <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  

export default FinancialRecords;
