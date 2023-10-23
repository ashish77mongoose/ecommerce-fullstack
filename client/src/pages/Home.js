import React, { useEffect, useState } from "react";
import { getCategories } from "../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import CategoriesSwiper from "../components/swipers/CategoriesSwiper";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const res = await getCategories();
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setCategories(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error.response.data.message} />);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  console.log(categories, "categories");
  return (
    <section className="">
      <div className="container">
        <header className="py-4">
          <h4 className="heading-3">Top Categories</h4>
        </header>
        <div className="">
          <CategoriesSwiper categories={categories} />
        </div>
      </div>
    </section>
  );
};

export default Home;
