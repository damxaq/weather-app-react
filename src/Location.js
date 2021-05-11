import React, { useState } from "react";
import Weather from "./Weather";

const Location = () => {
  const [location, setLocation] = useState("Poznan");
  const [weather, setWeather] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    const url = "http://api.openweathermap.org/data/2.5/weather?q=";
    const API_KEY = "&appid=59ca3e783384be0ae597d7ff9cef0f84";
    const response = await fetch(`${url}${city}&units=metric${API_KEY}`);
    const data = await response.json();
    console.log(data);
    setLoading(false);
    setWeather(data);
  };

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    fetchWeather(location);
    setLocation("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="city"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </form>
      {loading ? <div>Loading...</div> : weather && <Weather {...weather} />}
    </div>
  );
};

export default Location;
