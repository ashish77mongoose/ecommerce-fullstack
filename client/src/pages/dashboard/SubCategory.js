import React, { useEffect, useState } from "react";
import { getCategories } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { imageRender } from "../../utils/helpers";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";
import { useParams } from "react-router-dom";

const SubCategory = () => {
    const {id}=useParams();
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
    return (
        <div>
            <header className="mb-4">
                <h3 className="heading-3">All Categories </h3>
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
                            {categories.map((category,index)=>(
                                <tr>
                                    <td className="w-[80px]" >{index+1}</td>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>{category.color}</td>
                                    <td>
                                        <div className="flex justify-center">

                                        <div className="w-14 h-14">
                                            <img className="w-full h-full object-contain" src={imageRender(category?.icon)} alt={category.name} />

                                        </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center gap-2">
                                            <ActionButton >{reactIcons.edit}</ActionButton>
                                            <DeleteButton >{reactIcons.delete}</DeleteButton>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SubCategory;
