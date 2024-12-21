import React, { useState } from "react";

const TaxSavingCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState("");
  const [deductions, setDeductions] = useState("");
  const [taxableIncome, setTaxableIncome] = useState(null);

  const calculateTaxableIncome = () => {
    const income = parseFloat(annualIncome);
    const deduction = parseFloat(deductions);
    const taxable = income - deduction;
    setTaxableIncome(taxable.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Tax Saving Calculator</h2>
      <div className="form-group">
        <label>Annual Income</label>
        <input
          type="number"
          value={annualIncome}
          onChange={(e) => setAnnualIncome(e.target.value)}
          placeholder="Enter Annual Income"
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Total Deductions</label>
        <input
          type="number"
          value={deductions}
          onChange={(e) => setDeductions(e.target.value)}
          placeholder="Enter Deductions"
          className="input"
        />
      </div>
      <button onClick={calculateTaxableIncome} className="btn">
        Calculate Taxable Income
      </button>
      {taxableIncome && (
        <div className="result">
          <h3>Taxable Income: ₹{taxableIncome}</h3>
        </div>
      )}
    </div>
  );
};

export default TaxSavingCalculator;
