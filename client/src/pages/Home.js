import React, { useEffect, useState } from "react";
import { getCategories, getFeaturedProducts } from "../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import CategoriesSwiper from "../components/swipers/CategoriesSwiper";
import FeaturedSwiper from "../components/swipers/FeaturedSwiper";
import ProductCardSkeleton from "../components/cards/ProductCardSkeleton";
import CategoryCardSkeleton from "../components/cards/CategoryCardSkeleton";
import { reactIcons } from "../utils/icons";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
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
    } finally {
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
    } finally {
    }
  };
  useEffect(() => {
    (async () => {
      await Promise.all([getAllCategories(), getAllFeaturedProducts()])
        .then((res) => {
          setSkeletonLoading(false);
        })
        .catch((err) => {
          setSkeletonLoading(false);
        });
    })();
  }, []);
  return (
    <section className=" pt-4 pb-20 space-y-4">
      <div className="container">
        <header className="py-4">
          <h4 className="heading-3">Top Categories</h4>
        </header>
        <div className="">
          {skeletonLoading ? (
            <div className="grid grid-cols-4 gap-4">
              {Array(4)
                .fill(2)
                .map((_item, index) => (
                  <CategoryCardSkeleton key={index} />
                ))}
            </div>
          ) : (
            <CategoriesSwiper data={categories} />
          )}
        </div>
      </div>
      <div className="container">
        <header className="py-4 flex justify-between gap-4 px-8">
          <h4 className="heading-3">Featured Products</h4>
          <Link className="flex items-center gap-2 btn-outline-primary px-4" to='/products'>View All Products <span>{reactIcons.arrowright}</span></Link>
        </header>
        <div className="">
          {skeletonLoading ? (
            <div className="grid grid-cols-4 gap-4">
              {Array(4)
                .fill(2)
                .map((_item, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
            </div>
          ) : (
            <FeaturedSwiper data={featuredProducts} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
