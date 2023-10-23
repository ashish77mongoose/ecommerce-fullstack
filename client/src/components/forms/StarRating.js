import React from "react";
import Rating from "react-rating";
import { reactIcons } from "../../utils/icons";

const StarRating = ({ readonly, number, handleRating, rating }) => {
  const handleProfileRating = (value) => {
    handleRating(value);
  };
  return (
    <div className="flex items-center gap-1 [&_span]:leading-[1]">
      <Rating
        readonly={readonly}
        emptySymbol={
          <span className="text-yellow-500">{reactIcons.starOutline}</span>
        }
        fullSymbol={
          <span className="text-yellow-500">{reactIcons.starFill}</span>
        }
        fractions={1}
        initialRating={number?.toFixed(1) || rating}
        onChange={handleProfileRating}
        onClick={handleProfileRating}
      />
      <div className="number">{number?.toFixed(1) || rating}</div>
    </div>
  );
};

export default StarRating;
