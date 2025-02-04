import React, { useState } from "react";


const DashboardForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    school: "",
    tscNumber: "",
    membershipNumber: "",
    year: "",
    shares: Array(12).fill({ month: "", paidIn: "", balance: "", loaned: "", repaid: "" }),
    loanAmount: "",
    commission: "",
    bankCharges: "",
    chequeValue: "",
    interest: { charged: "", paid: "", balance: "" }
  });

  const handleChange = (e, index, field) => {
    if (field === "shares") {
      const updatedShares = [...formData.shares];
      updatedShares[index][e.target.name] = e.target.value;
      setFormData({ ...formData, shares: updatedShares });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="dashboard-form">
      <h2>Membership Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>School:</label>
          <input type="text" name="school" value={formData.school} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>TSC Number:</label>
          <input type="text" name="tscNumber" value={formData.tscNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Membership Number:</label>
          <input type="text" name="membershipNumber" value={formData.membershipNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Year:</label>
          <input type="text" name="year" value={formData.year} onChange={handleChange} />
        </div>

        <h2>Shares & Loans</h2>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Paid In</th>
              <th>Balance</th>
              <th>Loaned</th>
              <th>Repaid</th>
            </tr>
          </thead>
          <tbody>
            {formData.shares.map((share, index) => (
              <tr key={index}>
                <td>{["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][index]}</td>
                <td><input type="text" name="paidIn" value={share.paidIn} onChange={(e) => handleChange(e, index, "shares")} /></td>
                <td><input type="text" name="balance" value={share.balance} onChange={(e) => handleChange(e, index, "shares")} /></td>
                <td><input type="text" name="loaned" value={share.loaned} onChange={(e) => handleChange(e, index, "shares")} /></td>
                <td><input type="text" name="repaid" value={share.repaid} onChange={(e) => handleChange(e, index, "shares")} /></td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Loan Details</h2>
        <div className="form-group">
          <label>Loan Amount:</label>
          <input type="text" name="loanAmount" value={formData.loanAmount} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Commission:</label>
          <input type="text" name="commission" value={formData.commission} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Bank Charges:</label>
          <input type="text" name="bankCharges" value={formData.bankCharges} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Cheque Value:</label>
          <input type="text" name="chequeValue" value={formData.chequeValue} onChange={handleChange} />
        </div>

        <h2>Interest</h2>
        <div className="form-group">
          <label>Charged:</label>
          <input type="text" name="charged" value={formData.interest.charged} onChange={(e) => handleChange(e, "interest", "charged")} />
        </div>
        <div className="form-group">
          <label>Paid:</label>
          <input type="text" name="paid" value={formData.interest.paid} onChange={(e) => handleChange(e, "interest", "paid")} />
        </div>
        <div className="form-group">
          <label>Balance:</label>
          <input type="text" name="balance" value={formData.interest.balance} onChange={(e) => handleChange(e, "interest", "balance")} />
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default DashboardForm;
