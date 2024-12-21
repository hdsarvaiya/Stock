import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StockSimulator from "./components/StockSimulator";
import SIPCalculator from "./components/SIPCalculator";
import MarketHighlights from "./components/MarketHighlights";
import NewsFeed from "./components/Newsfeed";
import Home from "./components/Home"; // Import the Home component
import { ThemeProvider } from "./components/ThemeContext";
import ToolsPage from "./components/ToolsPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LoanEMICalculator from "./components/LoanEMICalculator";
import RetirementPlanningCalculator from "./components/RetirementPlanningCalculator";
import InvestmentReturnCalculator from "./components/InvestmentReturnCalculator";
import TaxSavingCalculator from "./components/TaxSavingCalculator";



function App() {
  return (
    <Router>
      <ThemeProvider>
      <Navbar />
      <div className="tools-section">
        <Routes>
          {/* Set Home as the default route */}
          <Route path="/" element={<Home />} />
          
          {/* Other Routes */}
          <Route path="/news" element={<NewsFeed />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/stock-simulator" element={<StockSimulator />} />
          <Route path="/tools/sip-calculator" element={<SIPCalculator />} />
          <Route path="/tools/market-highlights" element={<MarketHighlights />} />
          <Route path="/tools/loan-emi-calculator" element={<LoanEMICalculator />} />
          <Route path="/tools/retirement-planning-calculator" element={<RetirementPlanningCalculator />} />
          <Route path="/tools/investment-return-calculator" element={<InvestmentReturnCalculator />} />
          <Route path="/tools/tax-saving-calculator" element={<TaxSavingCalculator />} />
        </Routes>
      </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
