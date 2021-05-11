import React, { useState } from "react";
import Weather from "./Weather";

const Location = () => {
  const [location, setLocation] = useState("Poznan");

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <Weather location={location} />
    </div>
  );
};

export default Location;
