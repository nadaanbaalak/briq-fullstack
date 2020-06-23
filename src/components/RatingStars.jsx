import React from "react";

function RatingStars(props) {
  const { ratingsArray, handleRatingChange } = props;

  const ratingStarsArray = ratingsArray.map((value, index) => {
    if (value === 1)
      return <i className="fas fa-star" onClick={handleRatingChange(index)} />;
    else if (value === 0)
      return <i className="far fa-star" onClick={handleRatingChange(index)} />;
  });

  return ratingStarsArray;
}

export default RatingStars;
