import "./App.css";
import { useEffect, useState } from "react";
import Quote from "./components/quote/quote";
import Clock from "./components/Clock/clock";
import axios from "axios";

function App() {
  const [date, setDate] = useState({});
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    getTime();
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
      dayOfyear: data.day_of_year,
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
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  };

  return (
    <div className="container">
      <div className="background"></div>
      <Quote />
      <Clock date={date} greeting={greeting} />
    </div>
  );
}

export default App;
