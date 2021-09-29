import React from "react";

import "./CurrentExtra.css";

export default function CurrentExtra(props) {
  let feelingTemperature =
    props.unit === "metric"
      ? Math.round(props.data.feelingTemperature)
      : Math.round((props.data.feelingTemperature * 9) / 5 + 32);
  let wind =
    props.unit === "metric"
      ? `${Math.round(props.data.wind * 3.6)} km/h`
      : `${Math.round(props.data.wind)} mph`;

  let precipitation = "";
  if (props.data.rain) {
    precipitation = `Precipitation: ${Math.round(props.data.rain["1h"])} mm`;
  } else {
    precipitation = "";
  }

  return (
    <div className="CurrentExtra">
      <ul>
        <li>Humidity: {props.data.humidity}%</li>
        <li>Feels like: {feelingTemperature}°</li>
        <li>Wind speed: {wind}</li>
        <li>{precipitation}</li>
      </ul>
    </div>
  );
}
