import React, { useState } from "react";
import './styles/calculator.css';


const LoanEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rateOfInterest = parseFloat(interestRate) / 12 / 100;
    const months = parseFloat(loanTenure) * 12;
    
    const emiAmount = (principal * rateOfInterest * Math.pow(1 + rateOfInterest, months)) / (Math.pow(1 + rateOfInterest, months) - 1);
    setEmi(emiAmount.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Loan EMI Calculator</h2>
      <div className="form-group">
        <label>Loan Amount</label>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Enter Loan Amount"
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Annual Interest Rate (%)</label>
        <input
          type="number"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          placeholder="Enter Interest Rate"
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Loan Tenure (Years)</label>
        <input
          type="number"
          value={loanTenure}
          onChange={(e) => setLoanTenure(e.target.value)}
          placeholder="Enter Tenure"
          className="input"
        />
      </div>
      <button onClick={calculateEMI} className="btn">
        Calculate EMI
      </button>
      {emi && (
        <div className="result">
          <h3>Monthly EMI: ₹{emi}</h3>
        </div>
      )}
    </div>
  );
};

export default LoanEMICalculator;
