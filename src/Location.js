import React, { useState, useRef } from "react";
import Weather from "./Weather";

const Location = () => {
  const locationValue = useRef("");
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation(locationValue.current.value);
    locationValue.current.value = "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="city" type="text" ref={locationValue} />
        <button type="submit" className="submit-btn" onSubmit={handleSubmit}>
          ⇨
        </button>
      </form>
      <Weather location={location} />
    </div>
  );
};

export default Location;
