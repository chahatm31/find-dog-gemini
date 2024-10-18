import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const gridSize = 5; // Adjust for grid dimensions
  const [dogLocation, setDogLocation] = useState(
    generateRandomLocation(gridSize)
  );
  const [clickedLocation, setClickedLocation] = useState(null);

  useEffect(() => {
    // Reset dog location after a short delay
    const timer = setTimeout(() => {
      setDogLocation(generateRandomLocation(gridSize));
      setClickedLocation(null);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [dogLocation]);

  const handleClick = (row, col) => {
    setClickedLocation({ row, col });
  };

  const calculateProximity = (row, col) => {
    if (!clickedLocation) return "";

    const distance = Math.sqrt(
      Math.pow(row - dogLocation.row, 2) + Math.pow(col - dogLocation.col, 2)
    );
    // Adjust these values for desired color scaling
    if (distance <= 1) return "hot";
    if (distance <= 2) return "warm";
    if (distance <= 3) return "cold";
    return "freezing";
  };

  const generateRandomLocation = (gridSize) => {
    return {
      row: Math.floor(Math.random() * gridSize),
      col: Math.floor(Math.random() * gridSize),
    };
  };

  return (
    <div className="app-container">
      <h1>Find the Dog!</h1>
      <div className="grid">
        {Array.from({ length: gridSize }, (_, row) => (
          <div key={row} className="row">
            {Array.from({ length: gridSize }, (_, col) => (
              <button
                key={col}
                onClick={() => handleClick(row, col)}
                className={`grid-button ${
                  clickedLocation && calculateProximity(row, col)
                }`}
              >
                {dogLocation.row === row && dogLocation.col === col ? (
                  <span role="img" aria-label="dog">
                    🐶
                  </span>
                ) : (
                  ""
                )}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
