import React, { useEffect, useState } from "react";
import axios from "axios";
import Refresh from "../../assets/desktop/icon-refresh.svg";
import "./quote.css";

const Quote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const quoteInfo = async () => {
    const res = await axios.get(
      "https://programming-quotes-api.herokuapp.com/Quotes/random"
    );
    setQuote(res.data.en);
    setAuthor(res.data.author);
  };

  useEffect(() => {
    quoteInfo();
  }, []);

  function fetch() {
    quoteInfo();
  }
  return (
    <div className="quote__container">
      <p className="quote-text">{quote}</p>
      <p className="quote-author">{author}</p>
      <button onClick={fetch} className="quote-btn">
        <img className="quote-img" src={Refresh} alt="" />
      </button>
    </div>
  );
};

export default Quote;
