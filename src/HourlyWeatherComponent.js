import React from "react";

const HourlyWeatherComponent = ({ time, temp }) => {
  return (
    <div>
      <p>{time}</p>
      <p className="hourly-p">{Math.round(temp)}°C</p>
    </div>
  );
};

export default HourlyWeatherComponent;
