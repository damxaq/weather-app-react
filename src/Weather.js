import React, { useState, useEffect } from "react";
import DailyWeatherComponent from "./DailyWeatherComponent";
import HourlyWeatherComponent from "./HourlyWeatherComponent";
import CurrentWeatherComponent from "./CurrentWeatherComponent";

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

const Weather = ({ location, setLoading }) => {
  const [coords, setCoords] = useState(undefined);
  const [current, setCurrent] = useState({});
  const [dailyWeather, setDailyWeather] = useState([]);
  const [dayChosen, setDayChosen] = useState(0);

  const getIcon = (icon) => {
    return ICON_URL + icon + "@2x.png";
  };

  const getPosition = (dailyIndex) => {
    let position = "nextSlide";
    if (dailyIndex === dayChosen) {
      position = "activeSlide";
    }
    if (
      dailyIndex === dayChosen - 1 ||
      (dayChosen === 0 && dailyIndex === dailyWeather.length - 1)
    ) {
      position = "lastSlide";
    }
    return position;
  };

  const fetchCoordinates = async (city) => {
    const response = await fetch(`${LOCATION_URL}${city}&appid=${API_KEY}`);
    const { coord } = await response.json();
    setCoords(coord);
  };

  const setNewWeather = ({
    temp,
    weather,
    dt,
    clouds,
    humidity,
    wind_speed,
  }) => {
    const newWeather = {
      temp: temp.day ? temp.day : temp,
      icon: getIcon(weather[0].icon),
      description: weather[0].description,
      date: days[new Date(dt * 1000).getDay()],
      clouds: clouds,
      humidity: humidity,
      wind: wind_speed * 3.6,
    };
    setCurrent(newWeather);
  };

  const fetchWeather = async (coord) => {
    const response = await fetch(
      `${WEATHER_URL}lat=${coord.lat}&lon=${coord.lon}&units=metric&exclude=minutely,hourly&appid=${API_KEY}`
    );
    const data = await response.json();
    setNewWeather(data.current);
    setDailyWeather(data.daily);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (location) fetchCoordinates(location);
    setDayChosen(0);
  }, [location, setDayChosen]);

  useEffect(() => {
    if (coords) fetchWeather(coords);
  }, [coords]);

  useEffect(() => {
    if (dailyWeather[dayChosen]) setNewWeather(dailyWeather[dayChosen]);
  }, [dayChosen]);

  useEffect(() => {
    // Refreshing data every 5 minutes
    let refresher = setInterval(() => {
      if (coords) fetchWeather(coords);
    }, 1000 * 60 * 5);
    return () => clearInterval(refresher);
  }, [coords]);

  return (
    <div className="weather-container">
      <CurrentWeatherComponent {...current} location={location} />

      <div className="timed-container">
        {dailyWeather.map((daily, dailyIndex) => {
          const { day, eve, morn, night } = daily.temp;
          const hourly = [
            { temp: morn, time: "Mornig" },
            { temp: day, time: "Day" },
            { temp: eve, time: "Evening" },
            { temp: night, time: "Night" },
          ];

          const position = getPosition(dailyIndex);

          return (
            <article className={position} key={dailyIndex}>
              <div className="hourly-container">
                {hourly.map((item, index) => {
                  return <HourlyWeatherComponent key={index} {...item} />;
                })}
              </div>
            </article>
          );
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
