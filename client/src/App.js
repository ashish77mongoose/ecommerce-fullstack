import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddPost from "./pages/AddPost";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { ToastContainer, toast } from "react-toastify";
import {
  FavouritePosts,
  ForgotPassword,
  Login,
  MyPosts,
  PostDetail,
  Posts,
  Profile,
  Register,
  ResetPassword,
} from "./pages";
import { getUser } from "./api/api";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import ToastMsg from "./components/toast/ToastMsg";
import { useEffect } from "react";
import MainLayout from "./components/layout/MainLayout";
function App() {
  const dispatch = useDispatch();
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
  useEffect(() => {
    if (localStorage.getItem("ashishToken")) {
      getUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Posts />} />
            <Route path="add" element={<AddPost />} />
            <Route path="edit/:id" element={<AddPost />} />
            <Route path="my-post" element={<MyPosts />} />
            <Route path="profile/:userId" element={<Profile />} />
            <Route path="post/:id" element={<PostDetail />} />
            <Route path="favourites" element={<FavouritePosts />} />
          </Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordReset" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        className={
          "lg:w-[500px] text-16 font-semibold w-[320px] p-0 !font-poppins"
        }
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
      />
    </div>
  );
}

export default App;
