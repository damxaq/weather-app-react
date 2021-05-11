import React, { useState, useEffect } from "react";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const LOCATION_URL = "https://api.openweathermap.org/data/2.5/weather?q=";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/onecall?";

const Weather = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(undefined);
  const [current, setCurrent] = useState({});
  const [daily, setDaily] = useState([]);

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
      icon: data.current.weather[0].icon,
    };
    setCurrent(newWeather);
    setDaily(data.daily);
    console.log(newWeather);
    console.log(data.daily);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchCoordinates(location);
  }, [location]);

  useEffect(() => {
    if (coords) fetchWeather(coords);
  }, [coords]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <div>
        <h1>Weather for {location}:</h1>
      </div>
      <h2>Temp: {current.temp}°C</h2>
    </div>
  );
};

export default Weather;
