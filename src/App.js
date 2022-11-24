import "./App.css";
import { useEffect, useState } from "react";
import Quote from "./components/quote/quote";
import Clock from "./components/Clock/clock";
import InfoClock from "./components/InfoClock/infoclock";

import axios from "axios";

function App() {
  const [date, setDate] = useState({});
  const [greeting, setGreeting] = useState("");
  const [timeOfDay, setTimeOfDay] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    getTime();
    const updateTimer = setInterval(() => {
      getTime();
    }, 30000);
    return () => clearInterval(updateTimer);
  }, []);

  const getTime = async () => {
    const res = await axios.get("http://worldtimeapi.org/api/ip");
    let data = res.data;
    let current_date = new Date(data.datetime.toString());
    let dateObj = {
      hours: current_date.getHours(),
      minutes: ("0" + current_date.getMinutes()).slice(-2),
      abbreviation: data.abbreviation,
      timezone: data.timezone,
      dayOfYear: data.day_of_year,
      dayOfWeek: data.day_of_week,
      week: data.week_number,
    };
    setDate(dateObj);
    greetinginfo(dateObj.hours);
    console.log(dateObj);
  };

  const greetinginfo = (hour) => {
    if (hour >= 5 && hour < 12) {
      setGreeting("Good Morning");
      setTimeOfDay(true);
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon");
      setTimeOfDay(true);
    } else {
      setTimeOfDay(false);
      setGreeting("Good Evening");
    }
  };
  let backgroundDayOrNight = timeOfDay ? "day" : "night";
  return (
    <>
      <div className={`background ${backgroundDayOrNight}`}></div>
      <div className="container">
        <Quote show={show} setShow={setShow} />
        <Clock
          date={date}
          greeting={greeting}
          day={timeOfDay}
          show={show}
          setShow={setShow}
        />
      </div>
      <InfoClock date={date} day={timeOfDay} show={show} setShow={setShow} />
    </>
  );
}

export default App;
