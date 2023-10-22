import React, { useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import TextInput from "../forms/TextInput";
import { addUserDetails } from "../../api/api";
import { updateUser } from "../../redux/features/authSlice";
import { toast } from "react-toastify";
import ToastMsg from "../toast/ToastMsg";
import { useDispatch } from "react-redux";
import TextArea from "../forms/TextArea";
const initialState = {
    address: "",
    description: "",
    mobile: "",
};
const AddDetails = ({ isOpen, closeModal,user, isExtraInfo }) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState(initialState);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };
    const handleUserDetailSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await addUserDetails(form);
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                toast.success(<ToastMsg title={`Added Successfully`} />);
                dispatch(updateUser(form));
                setForm(initialState);
                closeModal()
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
            console.log(error, "error");
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        }
    };
    useEffect(() => {
        if (isExtraInfo) {
            setForm({
                address: user?.address || "",
                description: user?.description || "",
                mobile: user?.mobile || "",
            });
        }
    }, [isExtraInfo]);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel onSubmit={handleUserDetailSubmit} as="form" className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h4"
                                    className="heading-4 text-center"
                                >
                                    Add Your Details
                                </Dialog.Title>
                                <div className="mt-2">
                                    <div
                                        
                                        className=" w-full"
                                    >
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                            <TextInput
                                                name="mobile"
                                                label={"Mobile"}
                                                placeholder="Enter mobile Number"
                                                value={form.mobile}
                                                onChange={handleChange}
                                            />
                                            <TextInput
                                                name="address"
                                                label={"Address"}
                                                placeholder="Enter your address"
                                                value={form.address}
                                                onChange={handleChange}
                                            />
                                            <div className="col-span-2">
                                                <TextArea
                                                    name="description"
                                                    label={"About"}
                                                    placeholder="Describe yourself"
                                                    value={form.description}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                <button className="btn-primary">
                                                    {isExtraInfo
                                                        ? "Update Details"
                                                        : "Add Details"}{" "}
                                                </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default AddDetails;
