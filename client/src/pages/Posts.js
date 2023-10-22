/* eslint-disable react-hooks/exhaustive-deps */
import React, { useDeferredValue, useEffect, useState } from "react";
import { getCategoriesOfPosts, getPosts, getUser } from "../api/api";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { setUser } from "../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import RenderNoData from "../components/layout/RenderNoData";
import PostCard from "../components/cards/PostCard";
import PostCardSkeleton from "../components/cards/PostCardSkeleton";
import { setCategoriesOfPost } from "../redux/features/postSlice";
import { reactIcons } from "../utils/icons";
import { Listbox, Transition } from "@headlessui/react";
import InfiniteScroll from "react-infinite-scroll-component";
const Posts = () => {
  const [searchText, setSearchText] = useState("");
  const searchValue = useDeferredValue(searchText);
  const categories = useSelector((state) => state.post.categories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState({ currentPage: 1, numberOfPages: 1 });
  const [page, setPage] = useState(pages.currentPage);
  const getPostsData = async (page, searchValue, selectedCategory) => {
    setIsSkeletonLoading(true)
    try {
      const res = await getPosts(page, searchValue, selectedCategory);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        setPosts([...posts, ...data.data]);
        setPages({
          currentPage: data.currentPage,
          numberOfPages: data.numberOfPages,
        });
      } else {
        toast.error(<ToastMsg title={"Something went wrong"} />);
      }
    } catch (error) {
      console.log(error, "error");
    }finally{
        setIsSkeletonLoading(false)
    }
  };
  const getUserData = async () => {
    try {
      const res = await getUser();
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        dispatch(setUser(data));
      } else {
        toast.error(<ToastMsg title={"Something went wrong"} />);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const getCategoriesOfPostsData = async () => {
    try {
      const res = await getCategoriesOfPosts();
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        dispatch(setCategoriesOfPost(data));
      } else {
        toast.error(<ToastMsg title={"Something went wrong"} />);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    getUserData();
    getCategoriesOfPostsData();
  }, []);
  useEffect(() => {
    getPostsData(page, searchValue, selectedCategory);
  }, [page, searchValue, selectedCategory]);

  const fetchMorePosts = () => {
    if (page < pages.numberOfPages) {
      setPage((prev) => prev + 1);
    }
  };
  return (
    <>
      <section className=" py-12  text-black px-8">
        <div className="container">
          <header className="flex gap-4">
            <form action="" className="flex flex-1 max-w-xl items-center gap-2">
              <input
                type="text"
                placeholder="search by title"
                value={searchText}
                onChange={(e) => {setSearchText(e.target.value);setPosts([])}}
                className="border-zinc-200 bg-white input-field max-w-xl w-full"
              />
            </form>
            <div className="w-[250px]">
              <Listbox value={selectedCategory} onChange={(value)=>{
                setSelectedCategory(value)
                setPosts([])
                }}>
                <div className="relative">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 h-10 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">
                      {selectedCategory || "Select a category"}
                    </span>
                    <span className="pointer-events-none absolute text-gray-400 text-20 inset-y-0 right-0 flex items-center pr-2">
                      {reactIcons.arrowDown}
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={React.Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 z-[100] w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      <Listbox.Option
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={""}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              Select a category
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                {reactIcons.check}
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                      {categories?.map((category, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={category}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {category}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  {reactIcons.check}
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
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
              ) : posts.length > 0 ? (
                posts?.map((post) => (
                  <PostCard key={post._id} type={"post"} post={post} />
                ))
              ) : (
                <RenderNoData
                  className={"col-span-full"}
                  title={"No Post Available"}
                  subtitle={"Add Post to get your post by clicking add posts"}
                />
              )}
            </div>
          </InfiniteScroll>
        </div>
      </section>
    </>
  );
};

export default Posts;
