import React, { useState, useRef, useEffect } from "react";
import Weather from "./Weather";
import Loader from "react-loader-spinner";

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const LOCATION_URL = "https://api.openweathermap.org/data/2.5/weather?q=";

const Location = () => {
  const locationValue = useRef("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(undefined);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [isWrongLocation, setIsWrongLocation] = useState(false);

  const fetchCoordinates = async (city) => {
    const response = await fetch(`${LOCATION_URL}${city}&appid=${API_KEY}`)
      .then((data) => {
        if (data.status >= 400) throw new Error("Location not found");
        return data;
      })
      .catch((e) => {
        console.log(e);
        setCoords(undefined);
        setLoading(false);
        setIsWrongLocation(true);
      });

    if (response) {
      const { coord } = await response.json();
      setIsWrongLocation(false);
      setCoords(coord);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLocation = locationValue.current.value;
    if (newLocation && newLocation !== location) {
      setIsAutomatic(false);
      setLoading(true);
      setLocation(locationValue.current.value);
    }
    locationValue.current.value = "";
  };

  useEffect(() => {
    if (location && !isAutomatic) fetchCoordinates(location);
  }, [location, isAutomatic]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setIsAutomatic(true);
        setLocation("Your location");
      });
    }
  }, []);

  return (
    <div className="main">
      <form onSubmit={handleSubmit}>
        <input
          name="city"
          type="text"
          ref={locationValue}
          placeholder="Location"
        />
      </form>

      {loading && (
        <div className="loading">
          <Loader type="ThreeDots" color="#00BFFF" height={150} width={150} />
        </div>
      )}
      {isWrongLocation && (
        <div>
          <h2>Location not found, try again</h2>
        </div>
      )}
      {!(location || coords) ? (
        <div>
          <h2>Please enter the location</h2>
        </div>
      ) : (
        <div className={loading ? "weather-hidden" : ""}>
          {coords && location && (
            <Weather
              location={location}
              setLoading={setLoading}
              coords={coords}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Location;
