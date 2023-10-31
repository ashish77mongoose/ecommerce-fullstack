import React, { useEffect, useState } from "react";
import { getCategories, getProducts } from "../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
const AllProducts = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
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
  const getAllProducts = async () => {
    try {
      const res = await getProducts();
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setProducts(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);
  return (
    <section className="">
      <div className="container">
        <header className="py-4">
          <h4 className="heading-3">Top Categories</h4>
        </header>
      </div>
    </section>
  );
};

export default AllProducts;
