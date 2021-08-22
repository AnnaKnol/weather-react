import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Tomorrow.css";

export default function Tomorrow(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function fetchForecast(response) {
    setForecast(response.data.daily[1]);
    setLoaded(true);
  }

  function maxTemperature() {
    let temperature = null;
    if (props.unit === "metric") {
      temperature = Math.round(forecast.temp.max);
    } else {
      temperature = Math.round((forecast.temp.max * 9) / 5 + 32);
    }
    return `${temperature}°`;
  }
  function minTemperature() {
    let temperature = null;
    if (props.unit === "metric") {
      temperature = Math.round(forecast.temp.min);
    } else {
      temperature = Math.round((forecast.temp.min * 9) / 5 + 32);
    }
    return `${temperature}°`;
  }

  function load() {
    let apiKey = "39b9fa38fab84a614d2c18fbd5c314dd";
    let lat = props.coordinates.lat;
    let lon = props.coordinates.lon;
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(fetchForecast);
  }

  if (loaded) {
    return (
      <div className="Tomorrow">
        <ul>
          <li>
            <h4>Tomorrow</h4>
          </li>
          <li>
            <img
              src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt="tomorrow-weather-icon"
              className="tomorrow-icon"
              width="90"
            />
            <span className="tomorrow-max">{maxTemperature()}</span>
          </li>
          <li className="tomorrow-min">{minTemperature()}</li>
        </ul>
      </div>
    );
  } else {
    load();

    return null;
  }
}
