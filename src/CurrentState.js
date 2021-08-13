import React from "react";

import "./CurrentState.css";

export default function CurrentState(props) {
  return (
    <div className="CurrentState">
      <ul>
        <li className="current-icon">
          <img
            src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`}
            alt="current-weather-icon"
          />
        </li>
        <li className="description">{props.description}</li>
      </ul>
    </div>
  );
}
