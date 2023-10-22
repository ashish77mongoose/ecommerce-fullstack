import React, { useEffect, useState } from "react";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { getFavouritePosts } from "../api/api";
import RenderNoData from "../components/layout/RenderNoData";
import PostCard from "../components/cards/PostCard";
import PostCardSkeleton from "../components/cards/PostCardSkeleton";
import Spinner from "../components/loaders/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const FavouritePosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favouritePosts, setFavouritePosts] = useState([]);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [pages, setPages] = useState({ currentPage: 1, numberOfPages: 1 });
  const [page, setPage] = useState(pages.currentPage);

  const getFavouritePostsData = async (page) => {
    try {
      const res = await getFavouritePosts(page);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        setFavouritePosts([...favouritePosts, ...data.data]);
        setPages({
          currentPage: data.currentPage,
          numberOfPages: data.numberOfPages,
        });
        setIsSkeletonLoading(false);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }finally{
    }
  };

  useEffect(() => {
    getFavouritePostsData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchMorePosts = () => {
    if (page < pages.numberOfPages) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <>
      {isLoading && <Spinner />}
      <section className="py-12 text-black px-8">
        <div className="container">
          <header className="flex justify-between items-center">
            <h2 className="text-4xl font-semibold ">Favourite Posts</h2>
          </header>
          <InfiniteScroll
            dataLength={favouritePosts.length}
            next={fetchMorePosts}
            hasMore={page < pages.numberOfPages}
          >
            <div className="grid grid-cols-4 gap-8 mt-10">
              {isSkeletonLoading ? (
                Array(8)
                  .fill(2)
                  .map((item, index) => <PostCardSkeleton key={index} />)
              ) : favouritePosts?.length > 0 ? (
                favouritePosts?.map((favouritePost,index) => (
                  <PostCard
                    key={index}
                    post={favouritePost?.post}
                    type={"post"}
                    favourite={true}
                  />
                ))
              ) : (
                <RenderNoData
                  className="col-span-full"
                  title={"No Post Available"}
                />
              )}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
};

export default FavouritePosts;
