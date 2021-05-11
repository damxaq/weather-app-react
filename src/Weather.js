import React from "react";

const Weather = ({ weather, main, wind, visibility }) => {
  const { temp_min, temp_max } = main;
  console.log("main", main);
  return (
    <div>
      <h2>Min: {temp_min}°C</h2>
      <h2>Max: {temp_max}°C</h2>
    </div>
  );
};

export default Weather;
