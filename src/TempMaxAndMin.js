import React from "react";

export default function TempMaxAndMin(props) {
  return (
    <div className="TempMaxAndMin">
      <span className="current-temperature">
        {props.unit === "metric"
          ? Math.round(props.data.temperature)
          : Math.round(props.data.temperature * (9 / 5) + 32)}
      </span>
      <span className="temp-unit">
        <a
          href="/"
          className={`${props.celsiusState}`}
          onClick={props.showCelsius}
        >
          °C
        </a>{" "}
        |{" "}
        <a
          href="/"
          className={`${!props.celsiusState}`}
          onClick={props.showFahrenheit}
        >
          °F
        </a>
      </span>
    </div>
  );
}
