import React, { useState } from "react";
import { reactIcons } from "../../utils/icons";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { addToFavourite, postLike, removeFromFavourites } from "../../api/api";
import ToastMsg from "../toast/ToastMsg";
import { toast } from "react-toastify";
import DeleteConfirmation from "../modals/DeleteConfirmation";

const PostCard = ({ post, type, favourite }) => {
  const [toggle, setToggle] = useState(favourite || post?.isFavourite);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [likes, setLikes] = useState(post?.likes.length);
  const userId = user?._id;
  const hasLikedPost = post?.likes?.find((like) => like === userId);
  const [likeToggle, setLikeToggle] = useState(hasLikedPost);
  const handleAddToFavourites = async () => {
    try {
      const res = await addToFavourite(post?._id);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={"Added to your favourites"} />);
        setToggle((prev) => !prev);
      } else {
        toast.success(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.success(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
    }
  };
  const handleRemoveFromFavourites = async () => {
    try {
      const res = await removeFromFavourites(post?._id);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={"Removed from your favourites"} />);
        setToggle((prev) => !prev);
      } else {
        toast.success(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.success(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
    }
  };
  const handleLike = async (id) => {
    try {
      const res = await postLike(id);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        setLikes(data.likes.length);
        setLikeToggle((prev) => !prev);
      } else {
        toast.error(<ToastMsg title={"Something went wrong"} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };

  return (
    <>
      <div
        key={post?._id}
        className="w-full bg-white rounded-md overflow-hidden text-black shadow-card"
      >
        <div
          onClick={() => navigate(`/post/${post?._id}`)}
          className="h-[200px]  w-full relative overflow-hidden"
        >
          <img
            className="w-full h-full object-cover hoverable-img"
            src={`${process.env.REACT_APP_DEV_API}${post?.selectedFile}`}
            alt=""
          />
          {type === "my" && (
            <div className="flex gap-2 absolute right-2 top-1 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDeleteConfirmModalOpen(true);
                }}
                className="action-btn text-xl text-red-500 bg-red-200 "
              >
                {reactIcons.trash}
              </button>
              <Link
                to={`/edit/${post?._id}`}
                onClick={(e) => e.stopPropagation()}
                className="action-btn text-xl text-amber-600 "
              >
                {reactIcons.edit}
              </Link>
            </div>
          )}

          {type === "post" && (
            <div className="flex gap-2 absolute left-2 top-1 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggle
                    ? handleRemoveFromFavourites()
                    : handleAddToFavourites();
                }}
                className="action-btn text-xl text-red-500 bg-red-200 "
              >
                {toggle ? reactIcons.heartFill : reactIcons.heartOutline}
              </button>
            </div>
          )}
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center gap-2">
            <h6 className="font-medium text-amber-600">{post?.fullName}</h6>
            <p className="text-muted">{moment(post?.createdAt).fromNow()}</p>
          </div>

          <h6 className="font-semibold text-xl line-clamp-2">{post?.title}</h6>
          <p className="text-muted line-clamp-4 pt-1">{post?.message}</p>
          <div className="flex mt-1 flex-wrap">
            {post?.tags.map((tag, index) => (
              <span
                key={index}
                className="ml-1 cursor-pointer hover:underline text-blue-600 font-medium text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 ">
            <div
              onClick={() => handleLike(post?._id)}
              className="cursor-pointer flex items-center gap-2"
            >
              <span className="text-2xl">
                {likeToggle ? reactIcons.like : reactIcons.unlike}
              </span>
              <div className="text-lg leading-[1]">
                <span className="mx-1">{likes > 0 && likes}</span> Like
                {likes > 1 ? "s" : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmation
        isOpen={isDeleteConfirmModalOpen}
        id={post?._id}
        closeModal={() => setIsDeleteConfirmModalOpen(false)}
      />
    </>
  );
};

export default PostCard;
