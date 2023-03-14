import React from "react";
import "./Forecast.css";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { icon_url } from "../../baseurl";
import { Grid } from "@mui/material";

const Forecast = ({ data }) => {
  
  const formateDate = (dateString:any) => {
    let date = new Date(dateString);
    let fromated_date = date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    return fromated_date;
  };

  return (
    <div className="forecast">
      <h2>5-day forecast</h2>
      {data &&
        data.list &&
        data.list.map((item:any, i:number) => {
          return (
            <Accordion key={i} className="accordian">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div className="dailyInfo">
                  <img
                    src={`${icon_url}/${item.weather[0].icon}.png`}
                    className="imageIcon"
                    alt="weather_icon"
                  />
                  <label className="day">{Math.round(item.main.temp)}°C</label>
                  <label className="day">{formateDate(item.dt_txt)}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="minmaxTemp">
                    {Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C
                  </label>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <p className="detailText">
                      Feels like: <b>{Math.round(item.main.feels_like)}°C</b>
                    </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="detailText">
                      Wind speed: <b>{item.wind.speed} m/s</b>
                    </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="detailText">
                      Humidity: <b>{item.main.humidity}%</b>
                    </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="detailText">
                      Pressure: <b>{item.main.pressure} hPa</b>
                    </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="detailText">
                      Clouds: <b>{item.main.pressure} hPa</b>
                    </p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="detailText">
                      Sea level: <b>{item.main.pressure} hPa</b>
                    </p>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </div>
  );
};

export default Forecast;
