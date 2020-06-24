import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

function RatingStars(props) {
  const { ratingsArray, onRatingChange } = props;

  const ratingStarsArray = ratingsArray.map((value, index) => {
    return value === 1 ? (
      <StarFilled
        key={index}
        onClick={() => onRatingChange(index)}
        style={{ fontSize: "30px" }}
      />
    ) : (
      <StarOutlined
        key={index}
        onClick={() => onRatingChange(index)}
        style={{ fontSize: "30px" }}
      />
    );
  });

  return ratingStarsArray;
}

export default RatingStars;
