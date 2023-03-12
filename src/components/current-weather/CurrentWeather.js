import React from "react";
import "./CurrentWeather.css";
import { icon_url } from "../../baseurl";
import Card from "@mui/material/Card";

const CurrentWeather = ({ data }) => {
  
  const currentTime = () => {
    return new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <Card className="card">
      <div className="content">
        <div className="topContent">
          <div className="cityInfo">
            <p className="city">
              {data.name}, {data.sys.country}
            </p>
            <p className="description">{data.weather[0].description}</p>
          </div>
          <img
            alt="weather"
            className="image"
            src={`${icon_url}/${data.weather[0].icon}.png`}
          />
        </div>
        <p>{currentTime()}</p>
        <div className="bottomContent">
          <p className="temperature">{Math.round(data.main.temp)}°C</p>
          <div className="details">
            <p className="title">Details :</p>
            <div className="row">
              <span className="label">Feels like</span>
              <span className="value">
                {Math.round(data.main.feels_like)}°C
              </span>
            </div>
            <div className="row">
              <span className="label">Wind</span>
              <span className="value">{data.wind.speed} m/s</span>
            </div>
            <div className="row">
              <span className="label">Humidity</span>
              <span className="value">{data.main.humidity}%</span>
            </div>
            <div className="row">
              <span className="label">Pressure</span>
              <span className="value">{data.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CurrentWeather;
