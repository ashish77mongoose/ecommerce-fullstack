import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const PostCardNoLike = ({ post }) => {
  const navigate = useNavigate();

  return (
    <div
      key={post._id}
      className="w-full bg-white rounded-md overflow-hidden text-black shadow-card"
    >
      <div
        onClick={() => navigate(`/post/${post._id}`)}
        className="h-[200px]  w-full relative overflow-hidden"
      >
        <img
          className="w-full h-full object-cover hoverable-img"
          src={`${process.env.REACT_APP_DEV_API}${post.selectedFile}`}
          alt=""
        />
      </div>
      <div className="px-4 py-3">
        <div className="flex items-center gap-2">
          <h6 className="font-medium text-primary-blue">{post.fullName}</h6>
          <p className="text-muted">{moment(post.createdAt).fromNow()}</p>
        </div>

        <h6 className="font-semibold text-xl line-clamp-2">{post.title}</h6>
        <p className="text-muted line-clamp-4 pt-1">{post.message}</p>
        <div className="flex mt-1 flex-wrap">
          {post.tags.map((tag, index) => (
            <span className="ml-1 cursor-pointer hover:underline text-blue-600 font-medium text-sm">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCardNoLike;
