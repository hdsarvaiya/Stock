import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/Newsfeed.css";

const NewsFeed = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Replace with a real API endpoint
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://api.example.com/financial-news");
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching news", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-feed">
      <h2>Latest News</h2>
      <ul>
        {news.length ? (
          news.map((article, index) => (
            <li key={index}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
};

export default NewsFeed;
