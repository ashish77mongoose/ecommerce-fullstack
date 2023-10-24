import React, { useEffect, useState } from "react";
import TextInput from "../../components/forms/TextInput";
import TextArea from "../../components/forms/TextArea";
import ReactSelect from "../../components/forms/ReactSelect";
import { addProduct, getSubCategories } from "../../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../../components/toast/ToastMsg";
import MultipleFileUpload from "../../components/forms/MultipleFileUpload";
import { useNavigate } from "react-router-dom";
const initialState = {
    name: "",
    description: "",
    richDescription: "",
    images: [],
    brand: "",
    price: "",
    subCategory: "",
    countInStock: "",
    isFeatured: false,
};
const AddProduct = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState(initialState);
    const [images, setImages] = useState(null);
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
            toast.error(<ToastMsg title={error.response.data.message} />);
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
        images.forEach((f) => {
            formData.append("images", f);
        });
        try {
            const res = await addProduct(formData);
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                toast.success(<ToastMsg title={`Added Successfully`} />);
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
                            setImages={setImages}
                            images={images}
                        />
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
                        label={"Price"}
                        placeholder="Price "
                        value={form.price}
                        onChange={handleChange}
                    />
                    <TextInput
                        name="countInStock"
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
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
