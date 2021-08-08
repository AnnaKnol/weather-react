import React from "react";

import "./CurrentTemperature.css";

export default function CurrentTemperature() {
  return (
    <div className="CurrentTemperature">
      <span className="current-temperature">11</span>
      <span className="temp-unit">°C</span>
    </div>
  );
}
