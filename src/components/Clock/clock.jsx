import React, { useEffect, useState } from "react";
import Sun from "../../assets/desktop/icon-sun.svg";
import Moon from "../../assets/desktop/icon-moon.svg";
import Arrow from "../../assets/desktop/icon-arrow-down.svg";
import axios from "axios";
import "./clock.css";

function Clock({ date, greeting, day, show, setShow }) {
  const [locations, setLocations] = useState({});

  const getLocation = async () => {
    const response = await axios.get(
      "https://api.ipbase.com/v2/info?apikey=" + process.env.REACT_APP_API_KEY,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );

    console.log(response.data.data.location);
    const data = response.data.data.location;

    let locationObj = {
      city: data.city.name,
      country_code: data.country.alpha2,
    };
    setLocations(locationObj);
    console.log(locationObj);
  };

  useEffect(() => {
    getLocation();
  }, []);

  function showToggle() {
    setShow(!show ? "--active" : "");
  }

  return (
    <div className="clock-container">
      <div className="clock-greeting">
        {day ? (
          <img src={Sun} className="clock-icon" alt="sun" />
        ) : (
          <img src={Moon} className="clock-icon" alt="moon" />
        )}
        {greeting} , it's currtently
      </div>
      <div className="clock-times">
        <p className="clock-time">{date.hours}:</p>
        <p className="clock-time">{date.minutes}</p>
        <span className="clock-abbreviation">{date.abbreviation}</span>
      </div>
      <div className="clock-city">
        In {locations.city} Stockholm, {locations.country_code}SE
        <button className="clock-btn" onClick={showToggle}>
          <span className="btn-text">{show ? "less" : "more"}</span>
          <img className="btn-arrow" src={Arrow} />
        </button>
      </div>
    </div>
  );
}

export default Clock;
