import React, { useState, useEffect } from "react";
import DailyWeatherComponent from "./DailyWeatherComponent";
import HourlyWeatherComponent from "./HourlyWeatherComponent";

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

  if (loading) return <div className="loading">Loading...</div>;

  console.log(dailyWeather[dayChosen]);
  const { day, eve, morn, night } = dailyWeather[dayChosen].temp;

  const hourly = [
    { temp: morn, time: "Mornig" },
    { temp: day, time: "Day" },
    { temp: eve, time: "Evening" },
    { temp: night, time: "Night" },
  ];

  return (
    <div className="weather-container">
      <div className="current-container">
        <h1 className="city">{location}</h1>
        <h2>Temp: {Math.round(current.temp)}°C</h2>
        <h2>{current.description}</h2>
      </div>

      <div className="hourly-container">
        {hourly.map((item, index) => {
          return <HourlyWeatherComponent key={index} {...item} />;
        })}
      </div>

      <div className="daily-container">
        <ul className="daily-ul">
          {dailyWeather?.length &&
            dailyWeather.map((weather, index) => {
              return (
                <li key={index} className="daily-li">
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
