import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const StockSimulator = () => {
  const [stock, setStock] = useState("");
  const [amount, setAmount] = useState("");
  const [simulatedValue, setSimulatedValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [chartData, setChartData] = useState(null);

  const API_URL = "http://localhost:5000/simulate";
  const SEARCH_API_URL = "http://localhost:5000/search";

  const debouncedSearch = (query) => {
    if (query.length > 1) {
      setIsSearching(true);
      axios
        .get(SEARCH_API_URL, { params: { query } })
        .then((response) => {
          const stockSuggestions = response.data.quotes.map((quote) => ({
            symbol: quote.symbol,
            name: quote.longName || quote.shortName || "Unknown",
          }));
          setSuggestions(stockSuggestions);
          setIsSearching(false);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
          setIsSearching(false);
        });
    } else {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (!selectedSymbol) {
      const timeoutId = setTimeout(() => debouncedSearch(stock), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [stock]);

  const handleSimulation = async () => {
    if (!selectedSymbol || !amount || !startDate || !endDate) {
      alert("Please select a stock symbol, enter an investment amount, and choose valid start and end dates.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(API_URL, {
        params: {
          symbol: selectedSymbol,
          amount: amount,
          start_date: startDate,
          end_date: endDate,
        },
      });

      if (response.data.simulated_value) {
        setSimulatedValue(response.data.simulated_value);
        setChartData({
          labels: response.data.dates.map((date) => new Date(date).toLocaleDateString()),
          datasets: [
            {
              label: `${selectedSymbol} Value Over Time`,
              data: response.data.closingPrices,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              tension: 0.4,
            },
          ],
        });
      } else {
        setError("Error fetching stock data. Please try again.");
      }
    } catch (err) {
      setError("Error fetching stock data. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-teal-500 to-green-500 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Stock Simulator</h2>

        <div className="mb-6">
          <label htmlFor="stock" className="block text-lg font-medium text-gray-700">Choose Stock:</label>
          <input
            type="text"
            id="stock"
            value={stock}
            onChange={(e) => {
              setStock(e.target.value);
              setSelectedSymbol(null);
            }}
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter stock symbol (e.g., AAPL)"
          />
          {suggestions.length > 0 && !selectedSymbol && (
            <div className="mt-2 bg-white shadow-lg rounded-md max-h-40 overflow-auto">
              {isSearching ? (
                <div className="p-2 text-gray-500">Loading...</div>
              ) : (
                suggestions.map((suggestion) => (
                  <div
                    key={suggestion.symbol}
                    className="px-4 py-2 cursor-pointer hover:bg-teal-100"
                    onClick={() => {
                      setStock(suggestion.symbol);
                      setSelectedSymbol(suggestion.symbol);
                      setSuggestions([]);
                    }}
                  >
                    {suggestion.symbol} - {suggestion.name}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="amount" className="block text-lg font-medium text-gray-700">Investment Amount ($):</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Enter amount"
          />
        </div>

        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <label htmlFor="startDate" className="block text-lg font-medium text-gray-700">Start Date:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="endDate" className="block text-lg font-medium text-gray-700">End Date:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <button
          onClick={handleSimulation}
          className="w-full py-4 bg-teal-600 text-white rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
          disabled={loading}
        >
          {loading ? "Simulating..." : "Simulate Investment"}
        </button>

        {error && (
          <div className="mt-4 text-center text-lg text-red-600">
            <p>{error}</p>
          </div>
        )}

        {simulatedValue && (
          <div className="mt-4 text-center text-lg text-teal-600">
            <p>Your simulated investment in {selectedSymbol} is worth ${simulatedValue} now.</p>
          </div>
        )}

        {chartData && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-center text-gray-800 mb-4">Stock Value Over Time</h3>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <Line data={chartData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockSimulator;
