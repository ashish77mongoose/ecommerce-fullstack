import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { getUserPosts } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import RenderNoData from "../components/layout/RenderNoData";
import PostCard from "../components/cards/PostCard";
import PostCardSkeleton from "../components/cards/PostCardSkeleton";
import Spinner from "../components/loaders/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { setMyPosts } from "../redux/features/postSlice";

const MyPosts = () => {
   const dispatch=useDispatch()
  const [isLoading, setIsLoading] = useState(false);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const myPosts = useSelector((state) => state.post.myPosts);
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState({ currentPage: 1, numberOfPages: 1 });
  const [page, setPage] = useState(pages.currentPage);
  const getPostsData = async (page) => {
    try {
      const res = await getUserPosts(user._id, page);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        setPosts([...posts, ...data.data]);
        dispatch(setMyPosts([...posts, ...data.data]))
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
    } finally {
    }
  };

  useEffect(() => {
    getPostsData(page);
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
            <h2 className="text-4xl font-semibold ">My Posts</h2>
            <div className="flex items-center gap-4">
              <Link to={"/favourites"} className="btn-red">
                Favourite Posts
              </Link>
              <Link to={"/add"} className="btn-green">
                Add New Post
              </Link>
            </div>
          </header>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={page < pages.numberOfPages}
          >
            <div className="grid grid-cols-4 gap-8 mt-10">
              {isSkeletonLoading ? (
                Array(8)
                  .fill(2)
                  .map((_item, index) => <PostCardSkeleton key={index} />)
              ) : myPosts?.length > 0 ? (
                myPosts?.map((post) => (
                  <PostCard key={post._id} post={post} type={"my"} />
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

export default MyPosts;
