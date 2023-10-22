import React from "react";
import { BiEditAlt, BiTrash } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { BsCheckLg, BsReply } from "react-icons/bs";
import { HiOutlineChevronDown, HiChevronUp } from "react-icons/hi";
import {
  AiFillCamera,
  AiFillEye,
  AiFillEyeInvisible,
  AiFillHeart,
  AiFillLike,
  AiOutlineHeart,
  AiOutlineLike,
} from "react-icons/ai";
export const reactIcons = {
  trash: <BiTrash />,
  edit: <BiEditAlt />,
  eyeslash: <AiFillEyeInvisible />,
  eye: <AiFillEye />,
  arrowDown: <HiOutlineChevronDown />,
  arrowUp: <HiChevronUp />,
  unlike: <AiOutlineLike />,
  like: <AiFillLike />,
  check: <BsCheckLg />,
  camera: <AiFillCamera />,
  reply: <BsReply />,
  close: <IoMdClose />,
  heartFill: <AiFillHeart />,
  heartOutline: <AiOutlineHeart />,
};
