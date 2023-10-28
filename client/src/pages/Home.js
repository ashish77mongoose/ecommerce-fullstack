import React, { useEffect, useState } from "react";
import { getCategories, getFeaturedProducts } from "../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import CategoriesSwiper from "../components/swipers/CategoriesSwiper";
import FeaturedSwiper from "../components/swipers/FeaturedSwiper";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
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
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  const getAllFeaturedProducts = async () => {
    try {
      const res = await getFeaturedProducts();
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setFeaturedProducts(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  useEffect(() => {
    getAllCategories();
    getAllFeaturedProducts();
  }, []);
  return (
    <section className="">
      <div className="container">
        <header className="py-4">
          <h4 className="heading-3">Top Categories</h4>
        </header>
        <div className="">
          <CategoriesSwiper data={categories} />
        </div>
      </div>
      <div className="container">
        <header className="py-4">
          <h4 className="heading-3">Featured Products</h4>
        </header>
        <div className="">
          <FeaturedSwiper data={featuredProducts} />
        </div>
      </div>
    </section>
  );
};

export default Home;
