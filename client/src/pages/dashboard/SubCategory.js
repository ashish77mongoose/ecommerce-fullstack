import React, { useEffect, useState } from "react";
import { deleteSubCategory, getAllSubCategories } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { imageRender } from "../../utils/helpers";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import { useLocation, useParams } from "react-router-dom";
import AddSubCategory from "../../components/modals/AddSubCategory";

const SubCategory = () => {
  const location = useLocation();
  const { id } = useParams();
  const [isAddNewCatOpen, setIsAddNewCatOpen] = useState(false);
  const [subCategory, setSubCategory] = useState(null);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
  const isClosed = isAddNewCatOpen === false;
  const [subCategories, setSubCategories] = useState([]);
  const getAllSubCategoriesData = async () => {
    try {
      const res = await getAllSubCategories({ id: id });
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        setSubCategories(data);
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error.response.data.message} />);
    }
  };

  useEffect(() => {
    getAllSubCategoriesData();
  }, [isClosed]);

  const handleDelete = async () => {
    try {
      const res = await deleteSubCategory(subCategory._id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title="Deleted Successfully" />);
        setIsConfirmedOpen(false);
        getAllSubCategoriesData();
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error.response.data.message} />);
    }
  };
  return (
    <>
      <div>
        <header className="mb-4 flex items-center justify-between">
          <h3 className="heading-3">
            All Sub Categories of {location?.state?.name}{" "}
          </h3>
          <button
            onClick={() => setIsAddNewCatOpen(true)}
            className="btn-primary"
          >
            Add New Sub Category{" "}
          </button>
        </header>
        <div>
          <div className="overflow-x-auto w-full">
            <table>
              <thead>
                <tr>
                  <th className="w-[80px]">Sr.No</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Color</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((subCategory, index) => (
                  <tr>
                    <td className="w-[80px]">{index + 1}</td>
                    <td>{subCategory.name}</td>
                    <td>{subCategory.description}</td>
                    <td>{subCategory.color}</td>
                    <td>
                      <div className="flex justify-center">
                        <div className="w-14 h-14">
                          <img
                            className="w-full h-full object-contain"
                            src={imageRender(subCategory?.icon)}
                            alt={subCategory.name}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <ActionButton
                          onClick={() => {
                            setSubCategory(subCategory);
                            setIsAddNewCatOpen(true);
                          }}
                        >
                          {reactIcons.edit}
                        </ActionButton>
                        <DeleteButton
                          onClick={() => {
                            setSubCategory(subCategory);
                            setIsConfirmedOpen(true);
                          }}
                        >
                          {reactIcons.delete}
                        </DeleteButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AddSubCategory
        isOpen={isAddNewCatOpen}
        subCategory={subCategory || null}
        closeModal={() => {
          setIsAddNewCatOpen(false);
          setSubCategory(null);
        }}
        id={id}
      />
      <DeleteConfirmation
        isOpen={isConfirmedOpen}
        closeModal={() => setIsConfirmedOpen(false)}
        handleDelete={handleDelete}
        title={"sub category"}
      />
    </>
  );
};

export default SubCategory;
