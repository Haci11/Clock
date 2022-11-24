import React from "react";
import "./infoclock.css";

const Infoclock = ({ date, day }) => {
  let backgroundDayOrNight = day ? "daybg" : "nightbg";
  return (
    <div className={`infoclock-container ${backgroundDayOrNight}`}>
      <div>
        <h4 className="clockinfo-title">Current timezone</h4>
        <p className="clockingo-text">{date.timezone}</p>
      </div>
      <div>
        <h4 className="clockinfo-title">day of the year</h4>
        <p className="clockingo-text">{date.dayOfYear}</p>
      </div>
      <div>
        <h4 className="clockinfo-title">day of the week</h4>
        <p className="clockingo-text">{date.dayOfWeek}</p>
      </div>
      <div>
        <h4 className="clockinfo-title">week number</h4>
        <p className="clockingo-text">{date.week}</p>
      </div>
    </div>
  );
};
export default Infoclock;
