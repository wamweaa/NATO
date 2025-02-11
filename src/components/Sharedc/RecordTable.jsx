import React from "react";

const RecordTable = ({ records, handleDeleteRecord }) => {
  return (
    <table className="records-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Month</th>
          <th>Year</th>
          <th>Paid In</th>
          <th>Balance</th>
          <th>Loaned</th>
          <th>Repaid</th>
          <th>Shares</th>
          <th>Interest</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {records.length > 0 ? (
          records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.month}</td>
              <td>{record.year}</td>
              <td>{record.paid_in}</td>
              <td>{record.balance}</td>
              <td>{record.loaned}</td>
              <td>{record.repaid}</td>
              <td>{record.shares}</td>
              <td>{record.interest}</td>
              <td>
                <button onClick={() => handleDeleteRecord(record.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="10">No records available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RecordTable;
