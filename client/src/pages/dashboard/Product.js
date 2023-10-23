import React, { useEffect, useState } from "react";
import { getAllProducts, getCategories } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import { imageRender, numberWithCommas } from "../../utils/helpers";
import ActionButton from "../../components/button/ActionButton";
import { reactIcons } from "../../utils/icons";
import DeleteButton from "../../components/button/DeleteButton";

const Product = () => {
    const [products, setProducts] = useState([]);
    const getAllProductsData = async () => {
        try {
            const res = await getAllProducts();
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setProducts(data);
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error.response.data.message} />);
        }
    };
    useEffect(() => {
        getAllProductsData();
    }, []);
    return (
        <div>
            <header className="mb-4">
                <h3 className="heading-3">All Products </h3>
            </header>
            <div>
                <div className="overflow-x-auto w-full">
                    <table>
                        <thead>
                            <tr>
                                <th className="w-[80px]">Sr.No</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Image</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product,index)=>(
                                <tr>
                                    <td className="w-[80px]" >{index+1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.countInStock}</td>
                                    <td>Rs. {numberWithCommas(product.price)}</td>
                                    <td>
                                        <div className="flex justify-center">

                                        <div className="w-14 h-14">
                                            <img className="w-full h-full object-contain" src={imageRender(product?.images[0])} alt={product.name} />

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

export default Product;
