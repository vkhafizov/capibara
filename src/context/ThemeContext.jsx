// src/context/ThemeContext.jsx
import { createContext, useState, useEffect } from 'react';

// Create the context
export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to light theme, but check localStorage first
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Load theme preference from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('capy_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newMode = !prev;
      
      // Save to localStorage
      localStorage.setItem('capy_theme', newMode ? 'dark' : 'light');
      
      // Toggle the class on the document element
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newMode;
    });
  };
  
  // Value object to be provided to context consumers
  const value = {
    isDarkMode,
    toggleTheme
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}