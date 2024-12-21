import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() =>
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-white", "text-black");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.add("bg-white", "text-black");
      document.body.classList.remove("bg-gray-900", "text-white");
      localStorage.setItem("darkMode", "false");
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
