import React from "react";
import PostCardSkeleton from "./PostCardSkeleton";

const PostDetailSkeleton = () => {
  return (
    <section className="container">
      <div className="flex gap-4 items-start pt-10">
        <div className="flex-1">
          <div className="relative h-[500px] w-full skeleton"></div>
          <div className="px-6 py-4">
            <div className="h-8 skeleton"></div>
            <div className="flex text-zinc-500 text-sm gap-2 mt-1">
              <p className="h-6 skeleton"></p>
              <p className="h-6 skeleton"></p>
            </div>
            <div className="space-y-2">
              <p className="h-6 skeleton w-full"></p>
              <p className="h-6 skeleton w-full"></p>
              <p className="h-6 skeleton w-full"></p>
              <p className="h-6 skeleton w-full"></p>
              <p className="h-6 skeleton w-full"></p>
            </div>
          </div>
          <div className="px-6 py-4">
            <div>
              <div className="h-10 skeleton w-60"></div>
            </div>
            <ul>
              {Array(4)
                .fill(2)
                .map((item, index) => (
                  <li key={index} className="py-3 flex gap-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden shadow-card skeleton"></div>
                    <div className="flex-1 space-y-1">
                      <div className="h-10 skeleton w-44"></div>
                      <p className="skeleton h-24 w-full"></p>
                      <p className="h-6 skeleton w-32"></p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="w-[400px] rounded-md border border-zinc-200">
          <header className="py-4 px-3 border-b border-b-zinc-200">
            <div className="h-10 skeleton w-44"></div>
          </header>
          <div className="pt-4">
            <ul>
              {Array(5)
                .fill(5)
                .map((post) => (
                  <li key={post._id} className="flex gap-4 p-4 ">
                    <div className="w-20 h-20 flex-shrink-0 rounded-md skeleton"></div>
                    <div className="flex-1 space-y-1">
                      <h6 className="h-8 skeleton w-32">{post?.title}</h6>
                      <p className="h-6 skeleton">{post?.message}</p>
                      <p className="h-6 skeleton">{post?.message}</p>
                      <p className="h-4 skeleton w-24"></p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <header className="py-4 px-3 border-b border-b-zinc-200">
            <div className="h-10 skeleton w-44"></div>
          </header>
          <ul className="flex gap-2 flex-wrap my-2 px-4">
            {Array(8)
              .fill(2)
              ?.map((tag) => (
                <li key={tag} className=" w-28 h-8 skeleton "></li>
              ))}
          </ul>
        </div>
      </div>
      <div className="py-10">
        <header className="mb-4">
          <div className=" h-12 skeleton w-80"></div>
        </header>
        <div className="grid grid-cols-4 gap-8 ">
          {Array(4)
            .fill(2)
            .map((_item, index) => (
              <PostCardSkeleton key={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default PostDetailSkeleton;
