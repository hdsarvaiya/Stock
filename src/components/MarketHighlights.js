import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // import Firebase Firestore

const MarketHighlights = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const snapshot = await db.collection("market-highlights").get();
        const highlightsData = snapshot.docs.map((doc) => doc.data());
        setHighlights(highlightsData);
      } catch (error) {
        console.error("Error fetching market highlights", error);
      }
    };

    fetchHighlights();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center">Market Highlights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {highlights.length ? (
          highlights.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <p className="text-xl font-bold text-blue-600">{item.name}</p>
              <p className="text-lg text-gray-700">${item.price}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default MarketHighlights;
