import React, { useEffect } from "react";
import { useState } from "react";
import { createPost, getSinglePost, updatePost, uploadImage } from "../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { useNavigate, useParams } from "react-router-dom";
import { reactIcons } from "../utils/icons";
import { useSelector } from "react-redux";
import Spinner from "../components/loaders/Spinner";
import TextInput from "../components/forms/TextInput";
import TextArea from "../components/forms/TextArea";
const initialState = {
  title: "",
  message: "",
  tags: "",
  selectedFile: "",
};
const AddPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialState);
  const handleReset = () => {
    setForm(initialState);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleUpload = async (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await uploadImage(formData);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        setForm({ ...form, selectedFile: data });
        toast.success(<ToastMsg title={"Image uploaded Successfully"} />);
      } else {
        toast.success(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.success(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    let tags = form.tags.split(",");
    e.preventDefault();
    try {
      let formData = {
        ...form,
        tags,
        fullName: user.fullName,
        creator: user._id,
      };
      const res = id
        ? await updatePost(id, formData)
        : await createPost(formData);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(
          <ToastMsg title={`${id ? "Updated" : "Created"} Successfully`} />
        );
        handleReset();
        navigate("/my-post");
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      console.log(error, "error");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await getSinglePost(id);
        const { status, data } = res;
        if (status >= 200 && status < 300) {
          console.log(data);
          setForm({
            title: data.title,
            message: data.message,
            tags: data.tags.toString(),
            selectedFile: data.selectedFile,
          });
        } else {
          toast.error(<ToastMsg title={data.message} />);
        }
      } catch (error) {
        console.log(error, "error");
      }
    };
    getPost();
  }, [id]);
  return (
    <>
      {isLoading && <Spinner />}
      <div className=" flex items-center justify-center py-10 px-8">
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-full  bg-white rounded-lg space-y-2 py-6 shadow-lg"
        >
          <header className="py-4 text-center text-3xl font-bold">
            {id ? "Update" : " Create"} Post
          </header>
          <div className="px-4 space-y-2">
            <TextInput
              label={"Title"}
              type="text"
              placeholder="title"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
            <TextArea
              label={"Description"}
              type="text"
              placeholder="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              className={"h-[140px]"}
            />
            <TextInput
              label={"Tags"}
              type="text"
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="tags with comma separted eg. news,sports,fight"
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="">Post Image</label>
              <input
                type="file"
                id="selectedFile"
                hidden={id ? true : false}
                onChange={handleUpload}
                className="w-full py-2 px-4 rounded-md border border-zinc-200 focus:outline-green-300 text-black text-base"
              />
              {form.selectedFile && (
                <div className="w-28 h-28 relative">
                  <img
                    className=" object-contain rounded-md"
                    src={`${process.env.REACT_APP_DEV_API}${form.selectedFile}`}
                    alt=""
                  />
                  {id && (
                    <label
                      htmlFor="selectedFile"
                      className="action-btn action-sm absolute right-2 top-1"
                    >
                      {reactIcons.edit}
                    </label>
                  )}
                </div>
              )}
            </div>
          </div>
          <footer className="py-4 text-center font-medium">
            <button
              type="submit"
              className="px-12 py-2 rounded-md bg-green-500 text-white"
            >
              {id ? "Update" : " Create"}
            </button>
          </footer>
        </form>
      </div>
    </>
  );
};

export default AddPost;
