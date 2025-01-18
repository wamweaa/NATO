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
            {Object.keys(records[0]).map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordTable;
