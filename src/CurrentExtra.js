import React from "react";

import "./CurrentExtra.css";

export default function CurrentExtra(props) {
  return (
    <div className="CurrentExtra">
      <ul>
        <li>Humidity: {props.humidity}%</li>
        <li>Feels like: {props.feelingTemperature}°</li>
        <li>Wind speed: {props.wind} km/h</li>
        <li id="precipitation"></li>
      </ul>
    </div>
  );
}
