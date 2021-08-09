import React from "react";

import "./CurrentState.css";

export default function CurrentState() {
  return (
    <div className="CurrentState">
      <ul>
        <li className="current-icon">
          <img
            src="https://openweathermap.org/img/wn/10d@2x.png"
            alt="current-weather-icon"
          />
        </li>
        <li className="description">Rain falling</li>
      </ul>
    </div>
  );
}
