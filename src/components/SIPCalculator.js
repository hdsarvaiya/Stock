import React, { useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const SIPCalculator = () => {
  const [investment, setInvestment] = useState("");
  const [rateOfInterest, setRateOfInterest] = useState("");
  const [years, setYears] = useState("");
  const [finalAmount, setFinalAmount] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  const calculateSIP = () => {
    const monthlyRate = rateOfInterest / 12 / 100;
    const months = years * 12;
    const futureValue =
      investment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    setFinalAmount(futureValue.toFixed(2));

    // Prepare line chart data
    const yearlyData = [];
    for (let i = 1; i <= years; i++) {
      const monthsSoFar = i * 12;
      const valueAtYear =
        investment * ((Math.pow(1 + monthlyRate, monthsSoFar) - 1) / monthlyRate) * (1 + monthlyRate);
      yearlyData.push(valueAtYear.toFixed(2));
    }

    setChartData({
      labels: Array.from({ length: years }, (_, i) => `Year ₹{i + 1}`),
      datasets: [
        {
          label: "Investment Value Over Time",
          data: yearlyData,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          tension: 0.4,
          fill: true,
        },
      ],
    });

    // Prepare pie chart data
    const totalInvestment = investment * months;
    const returns = futureValue - totalInvestment;
    setPieChartData({
      labels: ["Investment", "Returns"],
      datasets: [
        {
          label: "SIP Breakdown",
          data: [totalInvestment.toFixed(2), returns.toFixed(2)],
          backgroundColor: ["#4CAF50", "#FF5722"],
          borderColor: ["#4CAF50", "#FF5722"],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">SIP Calculator</h2>
        <div className="grid gap-4">
          <div className="mb-4">
            <label htmlFor="investment" className="block text-lg font-medium mb-2">
              Monthly Investment (₹):
            </label>
            <input
              type="number"
              id="investment"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="rateOfInterest" className="block text-lg font-medium mb-2">
              Annual Rate of Interest (%):
            </label>
            <input
              type="number"
              id="rateOfInterest"
              value={rateOfInterest}
              onChange={(e) => setRateOfInterest(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="years" className="block text-lg font-medium mb-2">
              Investment Duration (years):
            </label>
            <input
              type="number"
              id="years"
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            onClick={calculateSIP}
            className="w-full py-3 bg-teal-600 text-white rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Calculate Final Amount
          </button>
        </div>

        {finalAmount && (
          <div className="mt-6 text-center text-lg font-medium text-teal-600">
            <p>Your final investment value is: ₹{finalAmount}</p>
          </div>
        )}

        {chartData && pieChartData && (
          <div className="mt-6 flex flex-col md:flex-row justify-between gap-6">
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
                Investment Growth Over Time
              </h3>
              <Line
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                }}
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-700">
                Investment vs. Returns
              </h3>
              <Pie
                data={pieChartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                    },
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SIPCalculator;
