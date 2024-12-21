// src/components/Home.js
import React, { useState, useEffect } from "react";
import StockMarket from "./StockMarket";
import TopNewsSlider from "./TopNewsSlider";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const stockMarketPosition = document.getElementById("stock-market").offsetTop;
      if (scrollPosition + window.innerHeight >= stockMarketPosition) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Top News Slider */}
      <h1 className="text-3xl font-bold text-center mb-8">Top Stock Market News</h1>
      <TopNewsSlider />

      {/* Stock Market Component with scroll effect */}
      <div
        id="stock-market"
        className={`mt-20 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <StockMarket />
      </div>
    </div>
  );
};

export default Home;
