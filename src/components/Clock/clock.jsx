import React, { useEffect, useState } from "react";
import Sun from "../../assets/desktop/icon-sun.svg";
import Moon from "../../assets/desktop/icon-moon.svg";
import Arrow from "../../assets/desktop/icon-arrow-down.svg";
import axios from "axios";

function Clock({ date, greeting }) {
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

  return (
    <div>
      <div>{greeting}</div>
      <p>{date.hours}:</p>
      <p>{date.minutes}</p>
      <span>{date.abbreviation}</span>
      <div>
        In {locations.city}, {locations.country_code}{" "}
      </div>
      <button>
        <span>more</span>
        <img src={Arrow} />
      </button>
    </div>
  );
}

export default Clock;
