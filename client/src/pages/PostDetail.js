import React, { useEffect, useState } from "react";
import {
  getPostByTags,
  getRecentPosts,
  getSinglePost,
  postComment,
  postCommentReply,
  updateComment,
  updateCommentReply,
} from "./../api/api";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ToastMsg from "./../components/toast/ToastMsg";
import moment from "moment";
import PostCardSkeleton from "../components/cards/PostCardSkeleton";
import RenderNoData from "../components/layout/RenderNoData";
import PostCardNoLike from "../components/cards/PostCardNoLike";
import { useSelector } from "react-redux";
import PostDetailSkeleton from "../components/cards/PostDetailSkeleton";
import TextArea from "../components/forms/TextArea";
import { reactIcons } from "../utils/icons";

const PostDetail = () => {
  const [commentText, setCommentText] = useState("");
  const [commentReplyText, setCommentReplyText] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [commentReplyId, setCommentReplyId] = useState(null);
  const categories = useSelector((state) => state.post.categories);
  const user = useSelector((state) => state.auth.user);
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
  const [post, setPost] = useState({});
  const [recentPosts, setRecentPosts] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const { id } = useParams();
  const getRecentsPostsData = async () => {
    try {
      const res = await getRecentPosts();
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        setRecentPosts(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  const getRelatedPostsByTag = async (tags) => {
    try {
      const res = await getPostByTags({ tags });
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        setRelatedPosts(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setIsSkeletonLoading(false);
    }
  };
  const getPost = async () => {
    try {
      const res = await getSinglePost(id);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        setPost(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  useEffect(() => {
    if (id) {
      getPost();
    }
  }, [id]);
  useEffect(() => {
    getRecentsPostsData();
  }, []);
  useEffect(() => {
    if (post?.title) {
      getRelatedPostsByTag(post.tags);
    }
  }, [post?.title]);
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const res = await postComment({
        postId: post._id,
        userId: user._id,
        commentText,
      });
      const { status, data } = res;

      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={"Comment added successfully"} />);
        setCommentText("");
        getPost();
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  const handleCommentReply = async (e, commentReplyId) => {
    e.preventDefault();
    try {
      const res = await postCommentReply({
        commentId: commentReplyId,
        userId: user._id,
        commentText: commentReplyText,
      });
      const { status, data } = res;

      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={"Comment added successfully"} />);
        setCommentReplyText("");
        getPost();
        setCommentReplyId(null);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  const handleUpdateComment = async (e) => {
    e.preventDefault();
    try {
      const res = await updateComment(commentId, {
        commentText,
      });
      const { status, data } = res;

      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={"Comment updated successfully"} />);
        setCommentText("");
        getPost();
        setCommentId(null);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  const handleUpdateReplyComment = async (e) => {
    e.preventDefault();
    try {
      const res = await updateCommentReply(commentReplyId, {
        commentText: commentReplyText,
      });
      const { status, data } = res;

      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={"Comment updated successfully"} />);
        setCommentReplyText("");
        getPost();
        setCommentReplyId(null);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };

  return (
    <>
      {isSkeletonLoading ? (
        <PostDetailSkeleton />
      ) : (
        <section className="container">
          <div className="flex gap-4 items-start pt-10">
            <div className="flex-1">
              <div className="relative h-[500px] w-full overflow-hidden rounded-md">
                <img
                  className="w-full h-full object-cover hoverable-img"
                  src={`${process.env.REACT_APP_DEV_API}${post.selectedFile}`}
                  alt=""
                />
              </div>
              <div className="px-6 py-4">
                <h3 className="heading-3">{post.title}</h3>
                <div className="flex text-zinc-500 text-sm gap-2 mt-1">
                  <p>{post.fullName}</p>
                  <p className="">
                    {moment(post.createdAt).format("MMM d , YYYY")}
                  </p>
                </div>
                <p className="leading-6 text-zinc-600 mt-6">{post.message}</p>
              </div>
              <div className="px-6 py-4">
                <div>
                  <h4 className="heading-4">
                    Comments <span>({post?.parentComment?.length})</span>{" "}
                  </h4>
                </div>
                <ul className="py-2 my-2 pr-4 max-h-[600px] overflow-y-auto">
                  {post?.parentComment.map((comment, index) => (
                    <li key={comment._id} className="py-3 flex gap-6">
                      <div className="flex-shrink-0 w-16 h-16  p-[1px] bg-orange-500 rounded-full overflow-hidden shadow-card">
                        <img
                          className="w-full rounded-full h-full object-cover"
                          src={
                            comment?.user?.profileImage
                              ? `${process.env.REACT_APP_DEV_API}${comment?.user?.profileImage}`
                              : "/images/user.png"
                          }
                          alt=""
                        />
                      </div>
                      <div className="flex-1">
                        <h6 className="heading-6">{comment?.user?.fullName}</h6>
                        <p>{comment.commentText}</p>
                        <p className="text-xs text-gray-600 mt-1">
                          {moment(comment.createdAt).format("D MMM, YYYY")}
                        </p>
                        <div className="flex gap-2 items-center my-1 ">
                          <button
                            onClick={() => {
                              setCommentId(comment._id);
                              setCommentText(comment.commentText);
                            }}
                            className="font-medium text-gray-600 px-2 py-1 flex items-center gap-1 text-sm rounded-md hover:bg-zinc-300 bg-zinc-200"
                          >
                            <span className="">{reactIcons.edit}</span> Edit
                          </button>
                          <button
                            onClick={() => setCommentReplyId(comment._id)}
                            className="font-medium text-gray-600 px-2 py-1 flex items-center gap-1 text-sm rounded-md hover:bg-zinc-300 bg-zinc-200"
                          >
                            <span className="">{reactIcons.reply}</span> Reply
                          </button>
                          {commentId && (
                            <button
                              onClick={() => {
                                setCommentId(null);
                                setCommentText("");
                              }}
                              className="font-medium text-red-600 px-2 py-1 flex items-center gap-1 text-sm rounded-md hover:bg-zinc-300 bg-red-200"
                            >
                              <span className="">{reactIcons.close}</span> close
                            </button>
                          )}
                        </div>
                        <div className="my-2 ">
                          {commentReplyId === comment._id && (
                            <div className="">
                              <div className="">
                                <form
                                  onSubmit={(e) =>
                                    handleCommentReply(e, comment._id)
                                  }
                                  action=""
                                  className="w-full"
                                >
                                  <TextArea
                                    value={commentReplyText}
                                    onChange={(e) =>
                                      setCommentReplyText(e.target.value)
                                    }
                                    placeholder="Add Reply"
                                  />
                                  <button
                                    disabled={!commentReplyText}
                                    type="submit"
                                    className="btn-primary"
                                  >
                                    Submit
                                  </button>
                                </form>
                              </div>
                            </div>
                          )}
                          {commentId === comment._id && (
                            <div className="">
                              <form
                                onSubmit={handleUpdateComment}
                                action=""
                                className="w-full"
                              >
                                <TextArea
                                  value={commentText}
                                  onChange={(e) =>
                                    setCommentText(e.target.value)
                                  }
                                  placeholder="Add comment"
                                />
                                <button
                                  disabled={!commentText}
                                  type="submit"
                                  className="btn-primary"
                                >
                                  {commentId ? "Update" : "Add"} Comment
                                </button>
                              </form>
                            </div>
                          )}
                        </div>
                        <div className="my-2 ">
                          <ul className="py-2 my-2 pr-4   ml-10">
                            {comment?.commentReply?.map((reply) => (
                              <>
                                <li key={reply._id} className="py-3 flex gap-6">
                                  <div className="flex-shrink-0 w-10 h-10  p-[1px] bg-orange-500 rounded-full overflow-hidden shadow-card">
                                    <img
                                      className="w-full rounded-full h-full object-cover"
                                      src={
                                        reply.user.profileImage
                                          ? `${process.env.REACT_APP_DEV_API}${reply.user.profileImage}`
                                          : "/images/user.png"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <h6 className="heading-6">
                                      {reply.user.fullName}
                                    </h6>
                                    <p>{reply.commentText}</p>
                                    <p className="text-xs text-gray-600 mt-1">
                                      {moment(reply.createdAt).format(
                                        "D MMM, YYYY"
                                      )}
                                    </p>

                                    <div className="flex gap-2 items-center my-1 ">
                                      <button
                                        onClick={() => {
                                          setCommentReplyId(reply._id);
                                          setCommentReplyText(
                                            reply.commentText
                                          );
                                        }}
                                        className="font-medium text-gray-600 px-2 py-1 flex items-center gap-1 text-sm rounded-md hover:bg-zinc-300 bg-zinc-200"
                                      >
                                        <span className="">
                                          {reactIcons.edit}
                                        </span>{" "}
                                        Edit
                                      </button>
                                      {commentReplyId === reply._id && (
                                        <button
                                          onClick={() => {
                                            setCommentReplyId(null);
                                            setCommentReplyText("");
                                          }}
                                          className="font-medium text-red-600 px-2 py-1 flex items-center gap-1 text-sm rounded-md hover:bg-zinc-300 bg-red-200"
                                        >
                                          <span className="">
                                            {reactIcons.close}
                                          </span>{" "}
                                          close
                                        </button>
                                      )}
                                    </div>
                                    <div className="my-2 ">
                                      {commentReplyId === reply._id && (
                                        <div className="">
                                          <div className="">
                                            <form
                                              onSubmit={
                                                commentReplyId
                                                  ? handleUpdateReplyComment
                                                  : (e) =>
                                                      handleCommentReply(
                                                        e,
                                                        comment._id
                                                      )
                                              }
                                              action=""
                                              className="w-full"
                                            >
                                              <TextArea
                                                value={commentReplyText}
                                                onChange={(e) =>
                                                  setCommentReplyText(
                                                    e.target.value
                                                  )
                                                }
                                                placeholder="Add Reply"
                                              />
                                              <button
                                                type="submit"
                                                disabled={!commentReplyText}
                                                className="btn-primary"
                                              >
                                                Submit
                                              </button>
                                            </form>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </li>
                              </>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                {commentId === null && (
                  <div className="ml-20">
                    <form onSubmit={handleComment} action="" className="w-full">
                      <TextArea
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add comment"
                      />
                      <button
                        disabled={!commentText}
                        type="submit"
                        className="btn-primary"
                      >
                        Add Comment
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
            <div className="w-[400px] rounded-md border border-zinc-200">
              <header className="py-4 px-3 border-b border-b-zinc-200">
                <h4 className="heading-4">Recent Posts</h4>
              </header>
              <div className="pt-4">
                <ul>
                  {recentPosts.map((post) => (
                    <li key={post._id}>
                      <Link
                        to={`/post/${post._id}`}
                        className="flex gap-4 p-4 hover:bg-amber-50 duration-150 cursor-pointer"
                      >
                        <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                          <img
                            className="w-full h-full object-cover"
                            src={`${process.env.REACT_APP_DEV_API}${post?.selectedFile}`}
                            alt=""
                          />
                        </div>
                        <div>
                          <h6 className="line-clamp-1">{post?.title}</h6>
                          <p className="line-clamp-2 text-sm text-gray-700">
                            {post?.message}
                          </p>
                          <p className="text-zinc-400 text-sm">
                            {moment(post.createdAt).format("MMM d , YYYY")}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <header className="py-4 px-3 border-b border-b-zinc-200">
                <h4 className="heading-4">Top Categories</h4>
              </header>
              <ul className="flex gap-2 flex-wrap my-2 px-4">
                {categories?.map((tag) => (
                  <li
                    key={tag}
                    className="border border-zinc-200 px-2 py-1 cursor-pointer bg-white text-gray-700 text-sm rounded-md"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="py-10">
            <header className="mb-4">
              <h2 className="heading-3">Related Posts</h2>
            </header>
            <div className="grid grid-cols-4 gap-8 ">
              {isSkeletonLoading ? (
                Array(8)
                  .fill(2)
                  .map((_item, index) => <PostCardSkeleton key={index} />)
              ) : relatedPosts.length > 0 ? (
                relatedPosts?.map((post) => (
                  <PostCardNoLike key={post._id} post={post} />
                ))
              ) : (
                <RenderNoData
                  className={"col-span-full"}
                  title={"No Post Available"}
                  subtitle={"Add Post to get your post by clicking add posts"}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetail;
