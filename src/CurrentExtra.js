import React, { useState } from "react";

import "./CurrentExtra.css";

export default function CurrentExtra(props) {
  const [precipitationStatus, setPrecipitationStatus] = useState("");

  if (props.precipitation) {
    setPrecipitationStatus(`Precipitation: ${props.precipitation}%`);
  }

  return (
    <div className="CurrentExtra">
      <ul>
        <li>Humidity: {props.humidity}%</li>
        <li>Feels like: {props.feelingTemperature}°</li>
        <li>Wind speed: {props.wind} km/h</li>
        <li>{precipitationStatus}</li>
      </ul>
    </div>
  );
}
