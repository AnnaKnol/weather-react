import React, { useState, useEffect } from "react";
import WeatherForecastDay from "./WeatherForecastDay";

import "./WeatherForecast.css";
import axios from "axios";

export default function WeatherForecast(props) {
  let [loaded, setLoaded] = useState(false);
  let [forecast, setForecast] = useState(null);

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  function fetchForecast(response) {
    setForecast(response.data.daily);
    setLoaded(true);
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
      <div className="WeatherForecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index > 1 && index < 7) {
              return (
                <WeatherForecastDay
                  data={dailyForecast}
                  key={index}
                  index={index}
                  unit={props.unit}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  } else {
    load();

    return null;
  }
}
