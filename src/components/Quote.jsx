import React from "react";

function Quote(props) {
  return (
    <div>
      <h1>{`"${props.currentQuote.en}"`}</h1>
      <h2>{props.currentQuote.author}</h2>
    </div>
  );
}

export default Quote;
