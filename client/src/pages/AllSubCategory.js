import React, { useEffect, useState } from "react";
import { getAllSubCategories } from "../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { imageRender } from "../utils/helpers";
import { useParams } from "react-router-dom";
import RenderNoData from "../components/layout/RenderNoData";
import SubCategoryCard from "../components/cards/SubCategoryCard";
import SubCategoryCardSkeleton from "../components/cards/SubCategoryCardSkeleton";

const AllSubCategory = () => {
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState([]);
  const [skeletonLoading, setSkeletonLoading] = useState(true);
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
    }finally{
        setSkeletonLoading(false)
    }
  };
  useEffect(() => {
    getAllSubCategoriesData(id);
  }, [id]);
  return (
    <section className=" py-4 pb-10">
      <div className="container">
        <header className="py-4">
          <h4 className="heading-3">Brand new categories</h4>
        </header>
        <div className="grid grid-cols-4 gap-4">
          { skeletonLoading? Array(12)
                                  .fill(2)
                                  .map((_item, index) => (
                                      <SubCategoryCardSkeleton key={index} />
                                  ))  :subCategories.length > 0 ? (
            subCategories.map((category) => (
             <SubCategoryCard category={category}/>
            ))
          ) : (
            <RenderNoData
              title={"No data available"}
              className={"col-span-full"}
            />
          ) }
        </div>
      </div>
    </section>
  );
};

export default AllSubCategory;
