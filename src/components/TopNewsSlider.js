import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick"; // Import the slick slider component

const TopNewsSlider = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/news");
        setNewsData(response.data.articles); // Assuming the API response contains 'articles' array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading top news...</div>;

  const sliderSettings = {
    dots: true, // Show dots at the bottom for navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed
    slidesToShow: 1, // Only one slide per view
    slidesToScroll: 1, // Scroll one slide at a time
    autoplay: true, // Auto scroll the carousel
    autoplaySpeed: 3000, // Time between auto scrolls (in milliseconds)
  };

  return (
    <div className="relative max-w-4xl mx-auto"> {/* Add max-width and center the content */}
      <Slider {...sliderSettings}>
        {newsData.map((news, index) => (
          <div key={index} className="relative">
            <img
              src={news.urlToImage || "https://via.placeholder.com/800x400"} // Adjust fallback image size
              alt={news.title}
              className="w-full h-146 object-cover rounded-lg" // Smaller height for the image
            />
            <div className="absolute bottom-6 left-6 bg-black bg-opacity-60 text-white p-4 rounded-md">
              <h3 className="text-xl font-semibold">{news.title}</h3> {/* Smaller text size */}
              <p className="text-sm">{news.description}</p> {/* Smaller description text */}
              <a
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline mt-2 block text-sm"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopNewsSlider;
