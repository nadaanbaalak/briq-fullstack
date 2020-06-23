import React from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";

function RatingStars(props) {
  const { ratingsArray, onRatingChange } = props;

  const ratingStarsArray = ratingsArray.map((value, index) => {
    return value === 1 ? (
      <StarFilled
        key={index}
        onClick={() => onRatingChange(index)}
        twoToneColor="#FFFF00"
      />
    ) : (
      <StarOutlined key={index} onClick={() => onRatingChange(index)} />
    );
  });

  return ratingStarsArray;
}

export default RatingStars;

/*
else if (value === 0)
  return <i className="far fa-star" onClick={onRatingChange(index)} />;
*/
