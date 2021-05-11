import React, { useState, useRef } from "react";
import Weather from "./Weather";

const Location = () => {
  const locationValue = useRef("Poznan");
  const [location, setLocation] = useState("Poznan");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(locationValue.current.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="city" type="text" ref={locationValue} />
      </form>
      <Weather location={location} />
    </div>
  );
};

export default Location;
