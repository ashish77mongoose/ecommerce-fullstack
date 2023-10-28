import React, { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { imageRender } from "../../utils/helpers";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import AddCategory from "../../components/modals/AddCategory";
import DeleteConfirmation from "../../components/modals/DeleteConfirmation";
import { Link } from "react-router-dom";

const Category = () => {
  const [isAddNewCatOpen, setIsAddNewCatOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [isConfirmedOpen, setIsConfirmedOpen] = useState(false);
  const isClosed = isAddNewCatOpen === false;
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
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, [isClosed]);
  const handleDelete = async () => {
    try {
      const res = await deleteCategory(category._id);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        toast.success(<ToastMsg title="Deleted Successfully" />);
        setIsConfirmedOpen(false);
        getAllCategories();
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
  return (
    <>
      <div>
        <header className="mb-4 flex items-center justify-between">
          <h3 className="heading-3">All Categories </h3>
          <button
            onClick={() => setIsAddNewCatOpen(true)}
            className="btn-primary"
          >
            Add New Category{" "}
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
                  <th>SubCategories</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr>
                    <td className="w-[80px]">{index + 1}</td>
                    <td>{category.name}</td>
                    <td>{category.description}</td>
                    <td>{category.color}</td>
                    <td>
                      <div className="flex justify-center">
                        <div className="w-14 h-14">
                          <img
                            className="w-full h-full object-contain"
                            src={imageRender(category?.icon)}
                            alt={category.name}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <Link
                        className="btn-primary"
                        to={`/dashboard/categories/${category._id}`}
                        state={{ name: category.name }}
                      >
                        View
                      </Link>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <ActionButton
                          onClick={() => {
                            setCategory(category);
                            setIsAddNewCatOpen(true);
                          }}
                        >
                          {reactIcons.edit}
                        </ActionButton>
                        <DeleteButton
                          onClick={() => {
                            setCategory(category);
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
      <AddCategory
        isOpen={isAddNewCatOpen}
        category={category || null}
        closeModal={() => {
          setIsAddNewCatOpen(false);
          setCategory(null);
        }}
      />
      <DeleteConfirmation
        isOpen={isConfirmedOpen}
        closeModal={() => setIsConfirmedOpen(false)}
        handleDelete={handleDelete}
        title={"category"}
      />
    </>
  );
};

export default Category;
