import React from "react";
import MaxAndMin from "./MaxAndMin";

import "./TempMaxAndMin.css";

export default function TempMaxAndMin(props) {
  let unitStatus = props.unit === "metric" ? true : false;

  return (
    <div className="TempMaxAndMin row">
      <div className="current-temperature col-8 col-sm-6">
        {props.unit === "metric"
          ? Math.round(props.data.temperature)
          : Math.round(props.data.temperature * (9 / 5) + 32)}
      </div>
      <div className="col-4 col-sm-5 text-center">
        <MaxAndMin data={props.data} unit={props.unit} />
        <div className="temp-unit">
          <a href="/" className={`${unitStatus}`} onClick={props.showCelsius}>
            °C
          </a>{" "}
          |{" "}
          <a
            href="/"
            className={`${!unitStatus}`}
            onClick={props.showFahrenheit}
          >
            °F
          </a>
        </div>
      </div>
    </div>
  );
}
