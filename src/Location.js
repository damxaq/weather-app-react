// add dogs
// add automatic localization
// add try catches

import React, { useState, useRef, useEffect } from "react";
import Weather from "./Weather";

const Location = () => {
  const locationValue = useRef("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(locationValue.current.value);
    locationValue.current.value = "";
  };

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       console.log("Latitude is :", position.coords.latitude);
  //       console.log("Longitude is :", position.coords.longitude);
  //       setCoords({
  //         lat: position.coords.latitude,
  //         lon: position.coords.longitude,
  //       });
  //     });
  //   }
  // }, [coords]);

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

      {loading && <div className="loading">Loading...</div>}
      {!location ? (
        <div>
          <h2>Please enter the location</h2>
        </div>
      ) : (
        <div className={loading ? "weather-hidden" : ""}>
          <Weather location={location} setLoading={setLoading} />
        </div>
      )}
    </div>
  );
};

export default Location;
