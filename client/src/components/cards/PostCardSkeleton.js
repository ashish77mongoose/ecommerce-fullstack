import React from "react";

const PostCardSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-md overflow-hidden text-black shadow-card">
      <div className="h-[200px]  w-full relative overflow-hidden rounded-lg bg-zinc-300 animate-pulse"></div>
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="font-medium h-6 w-[100px] text-primary-blue bg-zinc-300 animate-pulse"></div>
          <div className="text-muted h-6 w-[100px] bg-zinc-300 animate-pulse"></div>
        </div>

        <div className="font-semibold text-xl line-clamp-2 h-10 bg-zinc-300 animate-pulse"></div>
        <p className="text-muted line-clamp-4 pt-1 h-20 bg-zinc-300 animate-pulse mt-2"></p>
        <div className="flex items-center gap-2 mt-4 h-6 bg-zinc-300 animate-pulse ">
          <div className="cursor-pointer flex items-center gap-2"></div>
        </div>
      </div>
    </div>
  );
};

export default PostCardSkeleton;
