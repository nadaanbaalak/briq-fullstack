import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import "../styles/ratingStar.css";

function RatingStars(props) {
  const { ratingsArray, onRatingChange } = props;

  const ratingStarsArray = ratingsArray.map((value, index) => {
    return value === 1 ? (
      <StarFilled
        key={index}
        onClick={() => onRatingChange(index)}
        className="ratingStar"
      />
    ) : (
      <StarOutlined
        key={index}
        onClick={() => onRatingChange(index)}
        className="ratingStar"
      />
    );
  });

  return ratingStarsArray;
}

export default RatingStars;
