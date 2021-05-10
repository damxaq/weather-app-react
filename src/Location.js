import React, { useState } from "react";

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e);
};

const Location = () => {
  return (
    <div>
      <form>
        <label htmlFor="city">Enter location</label>
        <input type="text" name="city" id="city" />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Location;
