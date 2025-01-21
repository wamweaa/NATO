import React from 'react';

const RecordTable = ({ records }) => {
  if (records.length === 0) {
    return <p>No records available.</p>;
  }

  return (
    <div className="table-container">
      <h2>Financial Records</h2>
      <table>
        <thead>
          <tr>
            {/* Dynamically create table headers based on the keys in the first record */}
            {Object.keys(records[0]).map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
            <th>Actions</th> {/* For Delete button */}
          </tr>
        </thead>
        <tbody>
          {/* Loop through each record and create table rows */}
          {records.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
              {/* Add a delete button for each row */}
              <td>
                <button onClick={() => handleDeleteRecord(row.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
