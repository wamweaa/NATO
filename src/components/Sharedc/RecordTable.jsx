import React from "react";

const RecordTable = ({ records, users, onDelete }) => {
  return (
    <div className="table-container">
      <table className="records-table">
        <thead>
          <tr>
            <th>TSC Number</th>
            <th>Month</th>
            <th>Year</th>
            <th>Shares: Paid In</th>
            <th>Shares: Balance</th>
            <th>Shares: Loaned</th>
            <th>Loans: Repaid</th>
            <th>Loans: Balance</th>
            <th>Loans: Top-Up</th>
            <th>Loans: Commission</th>
            <th>Loans: Penalty</th>
            <th>Loans: Bank Charges</th>
            <th>Loans: Cheque Value</th>
            <th>Interest: Charged</th>
            <th>Interest: Paid</th>
            <th>Interest: Balance</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {records.length > 0 ? (
    records.map((record, index) => {
      const user = users.find((u) => u.id === record.user_id);

      // Ensure shares, loans, and interest exist before accessing their properties
      const shares = record.shares || {};
      const loans = record.loans || {};
      const interest = record.interest || {};

      return (
        <tr key={record.id ?? `record-${index}`}>
          <td>{user ? user.tsc_number : "Unknown"}</td>
          <td>{record.month}</td>
          <td>{record.year}</td>
          <td>{shares.paid_in ?? 0}</td>
          <td>{shares.balance ?? 0}</td>
          <td>{shares.loaned ?? 0}</td>
          <td>{loans.repaid ?? 0}</td>
          <td>{loans.balance ?? 0}</td>
          <td>{loans.top_up_amount ?? 0}</td>
          <td>{loans.commission ?? 0}</td>
          <td>{loans.penalty ?? 0}</td>
          <td>{loans.bank_charges ?? 0}</td>
          <td>{loans.cheque_value ?? 0}</td>
          <td>{interest.charged_interest ?? 0}</td>
          <td>{interest.paid_interest ?? 0}</td>
          <td>{interest.balance ?? 0}</td>
          <td>{record.category || "N/A"}</td>
          <td>
            <button className="delete-btn" onClick={() => onDelete(record.id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="18">No records available.</td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
};

export default RecordTable;
