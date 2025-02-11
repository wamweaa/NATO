import React from "react";

const RecordTable = ({ records, users, onDelete }) => {
  return (
    <table className="records-table">
      <thead>
        <tr>
          <th>User Email</th>
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
          records.map((record) => {
            // Find the corresponding user by user_id
            const user = users.find((u) => u.id === record.user_id);
            return (
              <tr key={record.id}>
                <td>{user ? user.email : "Unknown"}</td> {/* Display email */}
                <td>{record.month}</td>
                <td>{record.year}</td>
                <td>{record.paid_in}</td>
                <td>{record.balance}</td>
                <td>{record.loaned}</td>
                <td>{record.repaid}</td>
                <td>{record.shares}</td>
                <td>{record.interest}</td>
                <td>
                  <button onClick={() => onDelete(record.id)}>Delete</button>
                </td>
              </tr>
            );
          })
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
