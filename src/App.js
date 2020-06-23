import React, { Component } from "react";
import axios from "axios";
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
    };
  }

  //Getting random quote to display on first mount
  async componentDidMount() {
    const { baseURL, quote } = this.state;

    try {
      const { data } = await axios.get(`${baseURL}/quotes/random`);
      const currentQuote = { ...quote };
      const { _id: id, en, author } = data;
      console.log(data);
      currentQuote["id"] = id;
      currentQuote["en"] = en;
      currentQuote["author"] = author;
      this.setState({ quote: currentQuote });
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

  render() {
    return (
      <div className="container">
        <Quote currentQuote={this.state.quote} />
        <RatingStars
          ratingsArray={this.state.rating}
          onRatingChange={this.handleRatingChange}
        />
      </div>
    );
  }
}

export default App;
