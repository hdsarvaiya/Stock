// src/components/ToolsPage.js
import React from "react";
import { Link } from "react-router-dom";

const ToolsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl text-center font-semibold mb-8 text-gray-800">
          Available Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
            to="/tools/stock-simulator"
            className="bg-blue-500 text-white py-5 px-6 rounded-lg text-xl text-center hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            <div className="font-semibold mb-2">Stock Simulator</div>
            <p className="text-sm text-gray-100">Simulate stock market investments.</p>
          </Link>
          <Link
            to="/tools/sip-calculator"
            className="bg-green-500 text-white py-5 px-6 rounded-lg text-xl text-center hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            <div className="font-semibold mb-2">SIP Calculator</div>
            <p className="text-sm text-gray-100">Calculate your SIP returns over time.</p>
          </Link>
          <Link
            to="/tools/market-highlights"
            className="bg-yellow-500 text-white py-5 px-6 rounded-lg text-xl text-center hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
          >
            <div className="font-semibold mb-2">Market Highlights</div>
            <p className="text-sm text-gray-100">Get the latest stock market news.</p>
          </Link>
          <Link
            to="/tools/loan-emi-calculator"
            className="bg-indigo-500 text-white py-5 px-6 rounded-lg text-xl text-center hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            <div className="font-semibold mb-2">Loan EMI Calculator</div>
            <p className="text-sm text-gray-100">Calculate your loan EMI payments.</p>
          </Link>
          <Link
            to="/tools/retirement-planning-calculator"
            className="bg-teal-500 text-white py-5 px-6 rounded-lg text-xl text-center hover:bg-teal-700 transition duration-300 transform hover:scale-105"
          >
            <div className="font-semibold mb-2">Retirement Planning</div>
            <p className="text-sm text-gray-100">Plan your retirement savings and needs.</p>
          </Link>
          <Link
            to="/tools/investment-return-calculator"
            className="bg-purple-500 text-white py-5 px-6 rounded-lg text-xl text-center hover:bg-purple-700 transition duration-300 transform hover:scale-105"
          >
            <div className="font-semibold mb-2">Investment Return Calculator</div>
            <p className="text-sm text-gray-100">Calculate potential returns on investments.</p>
          </Link>
          <Link
            to="/tools/tax-saving-calculator"
            className="bg-pink-500 text-white py-5 px-6 rounded-lg text-xl text-center hover:bg-pink-700 transition duration-300 transform hover:scale-105"
          >
            <div className="font-semibold mb-2">Tax Saving Calculator</div>
            <p className="text-sm text-gray-100">Estimate your tax savings based on deductions.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
