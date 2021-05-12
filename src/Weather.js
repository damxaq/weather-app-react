import React, { useState, useEffect } from "react";
import DailyWeatherComponent from "./DailyWeatherComponent";
import HourlyWeatherComponent from "./HourlyWeatherComponent";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const LOCATION_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/onecall?";
const ICON_URL = "https://openweathermap.org/img/wn/";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thuersday",
  "Friday",
  "Saturday",
];

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
      date: days[new Date(data.current.dt * 1000).getDay()],
      clouds: data.current.clouds,
      humidity: data.current.humidity,
      wind: data.current.wind_speed * 3.6,
    };
    console.log(newWeather);
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

  //console.log(dailyWeather[dayChosen]);
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
        <div className="current-left">
          <div className="left-element">
            <img src={current.icon} alt="icon" />
          </div>
          <div className="left-element">
            <p className="temp">
              {Math.round(current.temp)} <sup>°C</sup>
            </p>
          </div>
          <div className="left-element">
            <p>Clouds: {current.clouds}%</p>
            <p>Humidity: {current.humidity}%</p>
            <p>Wind: {Math.round(current.wind)} km/h</p>
          </div>
        </div>
        <div className="current-right">
          <p className="city">{location}</p>
          <p>{current.date}</p>
          <p>{current.description}</p>
        </div>
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
