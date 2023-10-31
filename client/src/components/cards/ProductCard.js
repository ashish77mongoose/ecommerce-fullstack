import React from "react";
import { Link } from "react-router-dom";
import { imageRender, numberWithCommas } from "../../utils/helpers";
import StarRating from "../forms/StarRating";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="h-60 w-full relative overflow-hidden rounded-t-lg ">
        <img
          className="hoverable-img"
          src={imageRender(product.images[0])}
          alt={product.title}
        />
      </div>
      <div className="py-4 px-4 space-y-2 bg-neutral-200 rounded-b-lg">
        <div className="text-center">
          <h4 className="heading-4">{product.name}</h4>
          <p className="text-muted line-clamp-1">{product.description}</p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span>{product.brand}</span>
            <span className="text-muted text-sm">
              Rs. {numberWithCommas(product.price)}
            </span>
          </div>
          <div>
            <div>
              <StarRating readonly={true} number={product.rating} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
