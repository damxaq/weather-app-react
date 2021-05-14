import React from "react";

const CurrentWeatherComponent = ({
  icon,
  clouds,
  date,
  description,
  humidity,
  temp,
  wind,
  location,
}) => {
  return (
    <div className="current-container">
      <div className="current-left">
        <div className="left-element">
          <img src={icon} alt="icon" />
        </div>
        <div className="left-element">
          <p className="temp">
            {Math.round(temp)} <sup>°C</sup>
          </p>
        </div>
        <div className="left-element">
          <p>Clouds: {clouds}%</p>
          <p>Humidity: {humidity}%</p>
          <p>Wind: {Math.round(wind)} km/h</p>
        </div>
      </div>
      <div className="current-right">
        <p className="city">{location}</p>
        <p>{date}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default CurrentWeatherComponent;
