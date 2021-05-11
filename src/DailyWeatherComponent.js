import React from "react";

const ICON_URL = "https://openweathermap.org/img/wn/";
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const DailyWeatherComponent = ({ dt, temp, weather }) => {
  const getIcon = (icon) => {
    return ICON_URL + icon + "@2x.png";
  };

  const dayOfWeek = days[new Date(dt * 1000).getDay()];
  const icon = getIcon(weather[0].icon);

  return (
    <div className="daily-element">
      <p>{dayOfWeek}</p>
      <p>
        <img src={icon} alt="icon" />
      </p>
      <p>{Math.round(temp.day)}°C</p>
    </div>
  );
};

export default DailyWeatherComponent;
