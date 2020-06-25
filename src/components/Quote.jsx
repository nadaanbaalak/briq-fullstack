import React from "react";
import "../styles/quote.css";

function Quote(props) {
  return (
    <div className="quoteBody">
      <h1>{`"${props.currentQuote.en}"`}</h1>
      <p>{props.currentQuote.author}</p>
    </div>
  );
}

export default Quote;
