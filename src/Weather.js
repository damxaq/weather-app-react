import React, { useState, useEffect } from "react";
import DailyWeatherComponent from "./DailyWeatherComponent";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const LOCATION_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/onecall?";
const ICON_URL = "https://openweathermap.org/img/wn/";

const Weather = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(undefined);
  const [current, setCurrent] = useState({});
  const [dailyWeather, setDailyWeather] = useState([]);
  const [dayChosen, setDayChosen] = useState(0);

  const getIcon = (icon) => {
    return ICON_URL + icon + "@2x.png";
  };

  const fetchCoordinates = async (city) => {
    const response = await fetch(`${LOCATION_URL}${city}&appid=${API_KEY}`);
    const { coord } = await response.json();
    console.log(coord);
    setCoords(coord);
  };

  const fetchWeather = async (coord) => {
    const response = await fetch(
      `${WEATHER_URL}lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=minutely,hourly&appid=${API_KEY}`
    );
    const data = await response.json();
    console.log(data);
    const newWeather = {
      temp: data.current.temp,
      icon: getIcon(data.current.weather[0].icon),
      description: data.current.weather[0].description,
    };
    setCurrent(newWeather);
    setDailyWeather(data.daily);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (location) fetchCoordinates(location);
  }, [location]);

  useEffect(() => {
    if (coords) fetchWeather(coords);
  }, [coords]);

  if (!location) {
    return (
      <div>
        <h2>Please enter the location</h2>
      </div>
    );
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div className="current-container">
        <h1>Weather for {location}:</h1>
        <h2>Temp: {current.temp}°C</h2>
        <img src={current.icon} alt="icon" />
        <h2>{current.description}</h2>
      </div>

      <div>
        <ul>
          {dailyWeather?.length &&
            dailyWeather.map((weather, index) => {
              return (
                <li key={index}>
                  <button
                    className={` ${
                      index === dayChosen ? "daily-btn active" : "daily-btn"
                    } `}
                    onClick={() => setDayChosen(index)}
                  >
                    <DailyWeatherComponent {...weather} />
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Weather;
