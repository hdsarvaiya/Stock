import React, { useState } from "react";

const InvestmentReturnCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rateOfInterest, setRateOfInterest] = useState("");
  const [years, setYears] = useState("");
  const [futureValue, setFutureValue] = useState(null);

  const calculateReturn = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rateOfInterest) / 100;
    const t = parseFloat(years);
    const fv = p * Math.pow(1 + r, t);
    setFutureValue(fv.toFixed(2));
  };

  return (
    <div className="calculator-container">
      <h2>Investment Return Calculator</h2>
      <div className="form-group">
        <label>Principal Amount</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="Enter Principal Amount"
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Rate of Interest (%)</label>
        <input
          type="number"
          value={rateOfInterest}
          onChange={(e) => setRateOfInterest(e.target.value)}
          placeholder="Enter Interest Rate"
          className="input"
        />
      </div>
      <div className="form-group">
        <label>Years</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="Enter Number of Years"
          className="input"
        />
      </div>
      <button onClick={calculateReturn} className="btn">
        Calculate Return
      </button>
      {futureValue && (
        <div className="result">
          <h3>Future Value: ₹{futureValue}</h3>
        </div>
      )}
    </div>
  );
};

export default InvestmentReturnCalculator;
