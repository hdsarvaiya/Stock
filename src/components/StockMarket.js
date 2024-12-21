// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const StockMarket = () => {
//   const [stockData, setStockData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const symbols = [
//     "AAPL", // Apple
//     "GOOGL", // Alphabet (Google)
//     "AMZN", // Amazon
//     "MSFT", // Microsoft
//     "TSLA", // Tesla
//     "NFLX", // Netflix
//     "META", // Meta Platforms (Facebook)
//     "NVDA", // NVIDIA
//     "ADBE", // Adobe
//     "PYPL", // PayPal
//     "INTC", // Intel
//     "ORCL", // Oracle
//   ]; // Add more symbols as needed
  
//   useEffect(() => {
//     const fetchStockData = async () => {
//       try {
//         // Fetch stock data from the Yahoo Finance backend
//         const response = await axios.get("http://localhost:5000/stocks", {
//           params: { symbols: symbols.join(",") },
//         });

//         // Set the fetched stock data to state
//         setStockData(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching stock data", error);
//         setLoading(false);
//       }
//     };

//     fetchStockData();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100">
//       <h2 className="text-2xl font-semibold mb-6 text-center">Stock Market</h2>
//       {loading ? (
//         <p className="text-center text-gray-500">Loading stock data...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {stockData.length ? (
//             stockData.map((data, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-4 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
//               >
//                 <h3 className="text-xl font-bold">{data.symbol}</h3>
//                 <p className="text-lg text-gray-700">{data.name}</p>
//                 <p className="text-lg text-green-600">${data.price.toFixed(2)}</p>
//                 <p
//                   className={
//                     data.change > 0
//                       ? "text-green-500"
//                       : "text-red-500"
//                   }
//                 >
//                   {data.change > 0 ? "+" : ""}
//                   {data.change.toFixed(2)} ({data.changePercent.toFixed(2)}%)
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500">
//               No data available
//             </p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StockMarket;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar"; // Import the Navbar component
import { usStocks, indianStocks, japanStocks, ukStocks, australiaStocks, chinaStocks } from "./stocksSymbols"; // Import all country stock symbols

const StockMarket = () => {
  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // Filter state: 'all', 'us', 'indian', etc.
  const [isDarkMode, setIsDarkMode] = useState(() =>
    localStorage.getItem("darkMode") === "true"
  ); // Initialize dark mode state from localStorage

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Fetch data for all countries
        const symbols = [
          ...usStocks,
          ...indianStocks,
          ...japanStocks,
          ...ukStocks,
          ...australiaStocks,
          ...chinaStocks,
        ]
          .map((s) => s.symbol)
          .join(",");

        const response = await axios.get("http://localhost:5000/stocks", {
          params: { symbols },
        });

        const formattedData = response.data.map((item) => {
          const stockInfo = [
            ...usStocks,
            ...indianStocks,
            ...japanStocks,
            ...ukStocks,
            ...australiaStocks,
            ...chinaStocks,
          ].find((s) => s.symbol === item.symbol);

          const isIndianStock = item.symbol.includes(".NS");
          const priceInINR = isIndianStock ? item.price : item.price;

          return {
            ...item,
            name: stockInfo?.name || item.symbol,
            price: priceInINR,
            currency: isIndianStock ? "₹" : "$",
          };
        });

        setStockData(formattedData);
        setFilteredData(formattedData.slice(0, 12)); // Limit to 12 for the "All" filter
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stock data", error);
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);

  // Update filtered data based on selected filter
  useEffect(() => {
    let dataToDisplay = [];

    if (filter === "all") {
      dataToDisplay = stockData.slice(0, 12); // Show only the first 12 stocks for "all"
    } else if (filter === "us") {
      dataToDisplay = stockData
        .filter((stock) => !stock.symbol.includes(".NS"))
        .slice(0, 12);
    } else if (filter === "indian") {
      dataToDisplay = stockData.filter((stock) =>
        stock.symbol.includes(".NS")
      );
    } else if (filter === "japan") {
      dataToDisplay = stockData.filter((stock) =>
        japanStocks.some((s) => s.symbol === stock.symbol)
      );
    } else if (filter === "uk") {
      dataToDisplay = stockData.filter((stock) =>
        ukStocks.some((s) => s.symbol === stock.symbol)
      );
    } else if (filter === "australia") {
      dataToDisplay = stockData.filter((stock) =>
        australiaStocks.some((s) => s.symbol === stock.symbol)
      );
    } else if (filter === "china") {
      dataToDisplay = stockData.filter((stock) =>
        chinaStocks.some((s) => s.symbol === stock.symbol)
      );
    }

    setFilteredData(dataToDisplay);
  }, [filter, stockData]);

  // Update the body class based on the dark mode state
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-white", "text-black");
    } else {
      document.body.classList.add("bg-white", "text-black");
      document.body.classList.remove("bg-gray-900", "text-white");
    }
  }, [isDarkMode]);

  return (
    <div>
      {/* Navbar */}


      {/* Stock Market Heatmap */}
      <div className={`p-6 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Stock Market Heatmap
        </h2>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-4">
          {[
            { label: "All Stocks", value: "all" },
            { label: "US Stocks", value: "us" },
            { label: "Indian Stocks", value: "indian" },
            { label: "Japan Stocks", value: "japan" },
            { label: "UK Stocks", value: "uk" },
            { label: "Australia Stocks", value: "australia" },
            { label: "China Stocks", value: "china" },
          ].map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-4 py-2 mx-2 rounded ${
                filter === value
                  ? "bg-blue-500 text-white"
                  : isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading stock data...</p>
        ) : (
          <div className="flex flex-wrap gap-0 justify-center p-2 rounded-lg shadow-md">
            {filteredData.length ? (
              filteredData.map((data, index) => {
                const isPositive = data.change > 0;

                return (
                  <div
                    key={index}
                    style={{
                      backgroundColor: isPositive
                        ? `rgba(0, 175, 0, ${Math.min(
                            0.9 + Math.abs(data.changePercent / 100),
                            0.9
                          )})`
                        : `rgba(175, 0, 0, ${Math.min(
                            0.9 + Math.abs(data.changePercent / 100),
                            0.9
                          )})`,
                      flexBasis: `${Math.min(
                        20 + Math.abs(data.changePercent) * 4,
                        25
                      )}%`,
                      flexGrow: 1,
                      height: "120px",
                    }}
                    className="flex items-center justify-center border border-gray-300"
                  >
                    <div className="text-white text-center">
                      <h2 className="text-lg font-bold">{data.symbol}</h2>
                      <p className="text-sm">{data.name}</p>
                      <p className="text-sm">
                        {data.currency}
                        {data.price.toFixed(2)} ({data.changePercent.toFixed(2)}
                        %)
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">No data available</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockMarket;
