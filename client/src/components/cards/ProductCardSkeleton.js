import React from "react";

const ProductCardSkeleton = ({ product }) => {
  return (
    <div>
      <div className="h-60 w-full relative overflow-hidden rounded-t-lg skeleton mb-1"></div>
      <div className="py-4 px-4 space-y-2 bg-zinc-50">
        <div className="text-center space-y-1">
          <div className=" skeleton h-8 rounded-sm"></div>
          <p className=" skeleton h-6 rounded-sm"></p>
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <div className="skeleton h-6 rounded-sm"></div>
            <div className=" skeleton h-6 rounded-sm"></div>
          </div>
          <div className="w-20">
            <div className="skeleton h-6 rounded-sm"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
