import React from "react";

function Quote(props) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{`"${props.currentQuote.en}"`}</h1>
      <p>{props.currentQuote.author}</p>
    </div>
  );
}

export default Quote;
