import React from "react";

export default function WeatherForecastDay(props) {
  function maxTemperature() {
    let temperature = null;
    if (props.unit === "metric") {
      temperature = Math.round(props.data.temp.max);
    } else {
      temperature = Math.round((props.data.temp.max * 9) / 5 + 32);
    }
    return `${temperature}°`;
  }
  function minTemperature() {
    let temperature = null;
    if (props.unit === "metric") {
      temperature = Math.round(props.data.temp.min);
    } else {
      temperature = Math.round((props.data.temp.min * 9) / 5 + 32);
    }
    return `${temperature}°`;
  }
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  return (
    <div className="col-lg WeatherForecastDay">
      <div className="WeatherForecast-date">
        <h4>{day()}</h4>
      </div>
      <div className="WeatherForecast-icon-max">
        <img
          src={`https://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
          alt="in-2-days-weather-icon"
          className="WeatherForecast-icon"
          width="90"
        />
        <span className="WeatherForecast-max">{maxTemperature()}</span>
      </div>
      <div className="WeatherForecast-min">{minTemperature()}</div>
    </div>
  );
}
