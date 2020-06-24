import React, { Component } from "react";
import axios from "axios";
import { Spin } from "antd";
import Quote from "./components/Quote";
import RatingStars from "./components/RatingStars";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      rating: [0, 0, 0, 0, 0],
      quote: { id: "", en: "", author: "" },
      baseURL: "https://programming-quotes-api.herokuapp.com",
      isLoading: true,
    };
  }

  //Getting random quote to display on first mount
  async componentDidMount() {
    const { baseURL, quote } = this.state;
    localStorage.clear();

    try {
      const { data } = await axios.get(`${baseURL}/quotes/random`);
      const currentQuote = { ...quote };
      const { _id: id, en, author } = data;
      //console.log(data);
      currentQuote["id"] = id;
      currentQuote["en"] = en;
      currentQuote["author"] = author;
      this.setState({ quote: currentQuote, isLoading: false });
    } catch (err) {
      console.log(err);
    }
  }

  //Handler to change stars when user rates a quote
  handleRatingChange = (index) => {
    const updatedRating = [0, 0, 0, 0, 0];
    for (let i = 0; i <= index; i++) {
      updatedRating[i] = 1;
    }
    this.setState({ rating: updatedRating });
  };

  //Handler that runs when user submit's the rating for a quote.
  handleRatingSubmit = async () => {
    let currentRating = this.state.rating.reduce(
      (total, value) => total + value,
      0
    );

    if (currentRating === 0) currentRating = 1;
    const pastQuotes = JSON.parse(localStorage.getItem("previousQuotes")) || [];
    pastQuotes.push(this.state.quote["id"]);
    localStorage.setItem("previousQuotes", JSON.stringify(pastQuotes));

    try {
      await axios.post(`${this.state.baseURL}/quotes/vote`, {
        quoteId: this.state.quote["id"],
        newVote: currentRating,
      });
      const quotes = await axios.get(`${this.state.baseURL}/quotes`);
      //console.log(quotes.data);
      const previousQuotes = JSON.parse(localStorage.getItem("previousQuotes"));
      //console.log("Previous Quotes id array : ", previousQuotes);
      //console.log(inverseDocumentFrequency(quotes.data, {}, previousQuotes));
      this.setState({ rating: [0, 0, 0, 0, 0] });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div className="container">
        {this.state.isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <Quote currentQuote={this.state.quote} />
            <div>
              <RatingStars
                ratingsArray={this.state.rating}
                onRatingChange={this.handleRatingChange}
              />
            </div>
            <button
              className="btn btn-primary m-2"
              onClick={this.handleRatingSubmit}
            >
              Rate
            </button>
          </>
        )}
      </div>
    );
  }
}

export default App;
