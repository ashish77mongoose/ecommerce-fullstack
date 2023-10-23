import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../api/api";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { imageRender } from "../utils/helpers";

const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const getProduct = async (id) => {
    try {
      const res = await getSingleProduct(id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setProduct(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error.response.data.message} />);
    }
  };
  useEffect(() => {
    getProduct(id);
  }, [id]);
  return (
    <div className="py-4">
      <div className="container">
        <div className="flex gap-4">
          <div className="relative">
            <img
              className="w-full"
              src={imageRender(product?.images[0])}
              alt={product?.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
