import React, { useEffect, useState } from "react";
import { getAllSubCategories } from "../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { imageRender } from "../utils/helpers";
import { useParams } from "react-router-dom";
import RenderNoData from "../components/layout/RenderNoData";

const AllSubCategory = () => {
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const getAllSubCategoriesData = async (id) => {
    try {
      const res = await getAllSubCategories({ id });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setSubCategories(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  useEffect(() => {
    getAllSubCategoriesData(id);
  }, [id]);
  return (
    <section className="">
      <div className="container">
        <header className="py-4">
          <h4 className="heading-3">Brand new categories</h4>
        </header>
        <div className="grid grid-cols-4 gap-4">
          {subCategories.length > 0 ? (
            subCategories.map((category) => (
              <div className="shadow-card border-c rounded-lg">
                <div className="h-60 w-full relative overflow-hidden rounded-t-lg ">
                  <img
                    className="hoverable-img"
                    src={imageRender(category.icon)}
                    alt={category.title}
                  />
                </div>
                <div className="py-4 text-center">
                  <h4 className="heading-4">{category.name}</h4>
                </div>
              </div>
            ))
          ) : (
            <RenderNoData
              title={"No data available"}
              className={"col-span-full"}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AllSubCategory;
