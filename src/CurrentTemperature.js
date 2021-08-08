import React from "react";

import "./CurrentTemperature.css";

export default function CurrentTemperature(props) {
  return (
    <div className="CurrentTemperature">
      <span className="current-temperature">{props.temperature}</span>
      <span className="temp-unit">°C</span>
    </div>
  );
}
