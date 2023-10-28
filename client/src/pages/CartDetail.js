import React, { useEffect, useState } from "react";
import { getCartItems, placeOrder } from "../api/api";
import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import { imageRender, numberWithCommas } from "../utils/helpers";
import TextInput from "../components/forms/TextInput";
const initialState = {
    orderItems: [],
    shippingAddress1: "",
    shippingAddress2: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    
};
const CartDetail = () => {
    const [cartData, setCartData] = useState([]);
    const [form, setForm] = useState(initialState);
    const [toggle, setToggle] = useState(false);
    const [error, setError] = useState(initialState);
    const handleReset = () => {
        setForm(initialState);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setError({ ...error, [name]: "" });
    };
    const getcartData = async () => {
        try {
            const res = await getCartItems();
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                setCartData(data);
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }
    };
    const handlePlaceOrder= async(e)=>{
        e.preventDefault();
        try {
            let formData={
                ...form,
                orderItems:cartData.map((item)=>item.product._id)
                
            }
            const res = await placeOrder(formData);
            const { status, data } = res;
            if (status >= 200 && status <= 300) {
                toast.success(<ToastMsg title={'Order placed successfully'} />);
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }
    }
    useEffect(() => {
        getcartData();
    }, []);

    return (
        <div className="py-6">
            <div className="container">
                <div className="grid grid-cols-5  gap-10">
                    <div className="border-c col-span-3 rounded-md ">
                        <ul>
                            {cartData.map(({ product, quantity }) => (
                                <li
                                    key={product._id}
                                    className="flex items-center hover:bg-amber-100 gap-6 py-4 px-6 border-b border-b-zinc-200"
                                >
                                    <div className=" w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-zinc-300">
                                        <img
                                            className="w-full h-full object-contain hoverable-img"
                                            src={imageRender(
                                                product?.images?.[0]
                                            )}
                                            alt={product?.title}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="heading-6">
                                            {product?.name}
                                        </h3>
                                        <p className="text-muted font-bold">
                                            Rs.{" "}
                                            {numberWithCommas(product?.price)}
                                        </p>
                                        <p>
                                            {" "}
                                            <strong className="font-semibold">
                                                Quantity:
                                            </strong>{" "}
                                            <span className="font-medium">
                                                {quantity}
                                            </span>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="border-c col-span-2 rounded-md ">
                        <form onSubmit={handlePlaceOrder} action="">
                            <header className="py-4 border-b border-b-zinc-200 px-4">
                                <h4 className="heading-4 ">Enter shipping Details</h4>
                            </header>
                            <div className="space-y-2 px-4 py-4"> 
                                <TextInput
                                    label={"shipping Address 1"}
                                    type="text"
                                    placeholder="Enter shipping Address 1"
                                    name="shippingAddress1"
                                    value={form.shippingAddress1}
                                    onChange={handleChange}
                                    error={error.shippingAddress1}
                                />
                                <TextInput
                                    label={"shipping Address 2"}
                                    type="text"
                                    placeholder="Enter shipping Address 2"
                                    name="shippingAddress2"
                                    value={form.shippingAddress2}
                                    onChange={handleChange}
                                    error={error.shippingAddress2}
                                />
                                <TextInput
                                    label={"Country"}
                                    type="text"
                                    placeholder="Enter country name"
                                    name="country"
                                    value={form.country}
                                    onChange={handleChange}
                                    error={error.country}
                                />
                                <TextInput
                                    label={"City"}
                                    type="text"
                                    placeholder="Enter city name"
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    error={error.city}
                                />
                                <TextInput
                                    label={"Zip Code"}
                                    type="text"
                                    placeholder="Enter zip code"
                                    name="zip"
                                    value={form.zip}
                                    onChange={handleChange}
                                    error={error.zip}
                                />
                                <TextInput
                                    label={"Phone Number"}
                                    type="text"
                                    placeholder="Enter phone number"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    error={error.phone}
                                />
                                <button type="submit" className="btn-primary">Place Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetail;
