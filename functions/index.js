const express = require("express");
const yahooFinance = require("yahoo-finance2").default;
const cors = require("cors");
const functions = require("firebase-functions");

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for frontend to communicate with this server
app.use(express.json()); // For parsing application/json

// Stock Symbol Search Endpoint
app.get("/search", async (req, res) => {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Missing query parameter." });
    }

    try {
      const results = await yahooFinance.search(query);
      return res.json(results);
    } catch (err) {
      console.error("Error fetching stock suggestions:", err);
      return res.status(500).json({ error: "Error fetching stock suggestions." });
    }
});

// Stock Simulation Endpoint
app.get("/simulate", async (req, res) => {
  const { symbol, amount, start_date, end_date } = req.query;

  if (!symbol || !amount || !start_date || !end_date) {
    return res.status(400).json({ error: "Missing required parameters." });
  }

  try {
    const historicalData = await yahooFinance.historical(symbol, {
      period1: start_date,
      period2: end_date,
      interval: "1d",
    });

    const startPrice = historicalData[0].close;
    const endPrice = historicalData[historicalData.length - 1].close;
    const growthRate = (endPrice - startPrice) / startPrice;
    const simulatedValue = (amount * (1 + growthRate)).toFixed(2);

    return res.json({ simulated_value: simulatedValue });
  } catch (err) {
    console.error("Error fetching stock data", err);
    return res.status(500).json({ error: "Error fetching stock data." });
  }
});

// Firebase Function to handle Express app
exports.app = functions.https.onRequest(app);
