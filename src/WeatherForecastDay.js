import React from "react";

export default function WeatherForecastDay() {
  return (
    <div className="col WeatherForecastDay">
      <div className="WeatherForecast-date">
        <h4>Fri</h4>
      </div>
      <div className="WeatherForecast-icon-max">
        <img
          src="https://openweathermap.org/img/wn/02d@2x.png"
          alt="in-2-days-weather-icon"
          className="WeatherForecast-icon"
          width="90"
        />
        <span className="WeatherForecast-max">19°</span>
      </div>
      <div className="WeatherForecast-min">12°</div>
    </div>
  );
}
