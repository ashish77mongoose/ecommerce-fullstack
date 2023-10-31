import React from "react";

const CategoryCardSkeleton = () => {
  return (
    <div>
      <div className="h-60 w-full relative overflow-hidden rounded-t-lg skeleton mb-1"></div>
      <div className="py-4 px-4 space-y-2 bg-zinc-50">
        <div className="text-center space-y-1">
          <div className=" skeleton h-8 rounded-sm"></div>
          <p className=" skeleton h-6 rounded-sm"></p>
        </div>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;
