import React, { Component } from "react";
import axios from "axios";
import { Spin } from "antd";
import { getSimilarQuote, getDifferentQuote } from "./utils/cosineSimilarity";
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

  //Handler to submit rating and get similar or different quote.
  handleRatingSubmit = async () => {
    const { rating, quote, baseURL } = this.state;

    let currentRating = rating.reduce((total, value) => total + value, 0);
    if (currentRating === 0) currentRating = 1;
    this.setState({ isLoading: true });

    //Saving current quote id to previous Quotes array in local storage
    const pastQuotes = JSON.parse(localStorage.getItem("previousQuotes")) || [];
    pastQuotes.push(quote["id"]);
    localStorage.setItem("previousQuotes", JSON.stringify(pastQuotes));

    try {
      //posting user rating for given quote
      await axios.post(`${baseURL}/quotes/vote`, {
        quoteId: quote["id"],
        newVote: currentRating,
      });

      const quotes = await axios.get(`${baseURL}/quotes`); //getting all quotes

      const previousQuotes = JSON.parse(localStorage.getItem("previousQuotes"));

      //Determining similar or different quote based on User rating
      let nextQuote = {};
      if (currentRating >= 4) {
        nextQuote = getSimilarQuote(quote, quotes.data, previousQuotes);
      } else {
        nextQuote = getDifferentQuote(quote, quotes.data, previousQuotes);
      }
      this.setState({
        rating: [0, 0, 0, 0, 0],
        quote: nextQuote,
        isLoading: false,
      });
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
