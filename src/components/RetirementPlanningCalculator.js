// src/components/RetirementPlanningCalculator.js
import React, { useState } from "react";

const RetirementPlanningCalculator = () => {
  const [currentAge, setCurrentAge] = useState("");
  const [retirementAge, setRetirementAge] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [requiredSavings, setRequiredSavings] = useState(null);

  const calculateRetirementSavings = () => {
    const yearsToRetire = parseFloat(retirementAge) - parseFloat(currentAge);
    const target = parseFloat(targetAmount);
    const savings = target / (yearsToRetire * 12); // Monthly savings needed
    setRequiredSavings(savings.toFixed(2));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Retirement Planning Calculator
        </h2>
        <div className="grid gap-4">
          <div className="mb-4">
            <label htmlFor="currentAge" className="block text-lg font-medium mb-2">
              Current Age:
            </label>
            <input
              type="number"
              id="currentAge"
              value={currentAge}
              onChange={(e) => setCurrentAge(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="retirementAge" className="block text-lg font-medium mb-2">
              Retirement Age:
            </label>
            <input
              type="number"
              id="retirementAge"
              value={retirementAge}
              onChange={(e) => setRetirementAge(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="targetAmount" className="block text-lg font-medium mb-2">
              Target Amount (₹):
            </label>
            <input
              type="number"
              id="targetAmount"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            onClick={calculateRetirementSavings}
            className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Calculate Required Savings
          </button>
        </div>

        {requiredSavings && (
          <div className="mt-6 text-center text-lg font-medium text-teal-600">
            <p>Your required monthly savings is: ₹{requiredSavings}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RetirementPlanningCalculator;
