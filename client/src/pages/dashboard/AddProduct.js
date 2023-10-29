import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import TextArea from "../../components/forms/TextArea";
import ReactSelect from "../../components/forms/ReactSelect";
import { addProduct, deleteProductImage, getSingleProduct, getSubCategories, updateProduct } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import MultipleFileUpload from "../../components/forms/MultipleFileUpload";
import { useNavigate, useParams } from "react-router-dom";
import { imageRender } from "../../utils/helpers";
import { reactIcons } from "../../utils/icons";
const initialState = {
    name: "",
    description: "",
    richDescription: "",
    brand: "",
    price: "",
    subCategory: "",
    countInStock: "",
    isFeatured: false,
};
const AddProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState);
    const [images, setImages] = useState([]);
    const [updateImages, setUpdateImages] = useState([]);
    const [categories, setCategories] = useState([]);
    const [select, setSelect] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const getSubCategoriesData = async () => {
        try {
            const res = await getSubCategories();
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setCategories([
                    { label: "Select Category", value: "" },
                    ...data.map((item) => ({
                        label: item.name,
                        value: item._id,
                    })),
                ]);
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }
    };
    useEffect(() => {
        getSubCategoriesData();
    }, []);
    const handleReset = () => {
        setForm(initialState);
        setImages(null);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const [key, value] of Object.entries(form)) {
            formData.append(key, value);
        }
        if(productId){
            if(updateImages&&updateImages.length>0){
                updateImages.forEach((f) => {
                    formData.append("images", f);
                });
            }
        }else{
            if(images.length>0){
                images.forEach((f) => {
                    formData.append("images", f);
                });
            }

        }

        
        try {
            const res = productId? await updateProduct(productId,formData)  : await addProduct(formData);
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                toast.success(<ToastMsg title={`${productId?'Updated' :'Added'} Successfully`} />);
                handleReset();
                navigate("/dashboard/products");
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error, "error");
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }
    };
    const getProduct = async (id) => {
        try {
            const res = await getSingleProduct(id);
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setForm({
                    name:data.name,
                    description:data.description,
                    richDescription:data.richDescription,
                    brand:data.brand,
                    price:data.price,
                    subCategory:data.subCategory?._id,
                    countInStock:data.countInStock,
                    isFeatured:data.isFeatured,
                });
                setImages(data.images);
                setSelect(categories?.find((item)=>item.value===data.subCategory?._id))
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error)
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }
    };
    useEffect(() => {
        if (productId&&categories.length>0) {
             getProduct(productId);
        }
    }, [productId,categories]);

    const handleRemoveImage= async (url)=>{
        try {
            const res = await deleteProductImage(productId,{imgPath:url});
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                toast.success(<ToastMsg title={`Deleted Successfully`} />);
                setImages(images.filter(image=>image!==url))
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error, "error");
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }

    }

    return (
        <div className="py-10 px-4">
            <form
                onSubmit={handleSubmit}
                action=" "
                className="max-w-5xl mx-auto"
            >
                <div className="grid grid-cols-2 gap-6">
                    <TextInput
                        name="name"
                        label={"Name of the product"}
                        placeholder="Enter name"
                        value={form.name}
                        onChange={handleChange}
                    />
                    <TextInput
                        name="description"
                        label={"One line description of the product"}
                        placeholder="Enter description"
                        value={form.description}
                        onChange={handleChange}
                    />
                    <div className="col-span-2">
                        <TextArea
                            name="richDescription"
                            label={"Long description of the product"}
                            placeholder="Enter description"
                            value={form.richDescription}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <MultipleFileUpload
                            setImages={productId ? setUpdateImages:setImages}
                            images={productId?updateImages: images}
                            productId={productId||null}
                        />
                        <div className="flex gap-4  flex-wrap my-4">
        { productId && images?.length>0 && (
          images?.map((url ,index)=>(
            <div   key={index} className="flex flex-col gap-1 relative bg-gray-300 p-1 rounded-md">
                {/* <button type="button" onClick={()=>handleFrontImage(index)} className="text-2xl flex-center bg-pink-100 rounded-full w-8 h-8 text-red-500 absolute top-2 right-2">{ isFront===index? reactIcons.heartFill :  reactIcons.heartOutline}</button> */}
                <button type="button" onClick={()=>handleRemoveImage(url)} className="text-xl flex-center bg-pink-100 rounded-full w-8 h-8 text-red-500 absolute left-2 top-2">{ reactIcons.delete}</button>
                <img className="w-32 h-32 object-contain cursor-pointer" src={imageRender(url)} alt="" />
            </div>
          ))
        )}
      </div>
                    </div>

                    <TextInput
                        name="brand"
                        label={"Brand Name"}
                        placeholder="Brand of the product"
                        value={form.brand}
                        onChange={handleChange}
                    />
                    <TextInput
                        name="price"
                        type="number"
                        label={"Price"}
                        placeholder="Price "
                        value={form.price}
                        onChange={handleChange}
                    />
                    <TextInput
                        name="countInStock"
                        type="number"
                        label={"Quantity"}
                        placeholder="Quantity"
                        value={form.countInStock}
                        onChange={handleChange}
                    />
                    <ReactSelect
                        label={"Choose category"}
                        options={categories}
                        value={select || categories[0]}
                        onChange={(e) => {
                            setForm({ ...form, subCategory: e.value });
                            setSelect(e);
                        }}
                    />
                    <div className="flex gap-2 col-span-2">
                        <label
                            htmlFor="isFeatured"
                            className="flex items-center gap-4"
                        >
                            <input
                                checked={form.isFeatured}
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        isFeatured: e.target.checked,
                                    });
                                }}
                                className="w-5 h-5 accent-amber-500"
                                type="checkbox"
                                name=""
                                id=""
                            />
                            <span>
                                Want this product to be featured product?
                            </span>
                        </label>
                    </div>
                    <div className="col-span-2">
                        <button type="submit" className="btn-primary">
                            {productId? 'Update'  :'Add'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
