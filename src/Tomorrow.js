import React from "react";

import "./Tomorrow.css";

export default function Tomorrow() {
  return (
    <div className="Tomorrow">
      <ul>
        <li>
          <h4>Tomorrow</h4>
        </li>
        <li>
          <img
            src="https://openweathermap.org/img/wn/10d@2x.png"
            alt="tomorrow-weather-icon"
            className="tomorrow-icon"
            width="90"
          />
          <span className="tomorrow-max">14°</span>
        </li>
        <li className="tomorrow-min">4°</li>
      </ul>
    </div>
  );
}
