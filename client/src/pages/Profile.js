import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addFollower,
    addUserDetails,
    getUser,
    getUsers,
    removeFollower,
    uploadImage,
    uploadProfileImage,
} from "../api/api";
import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { reactIcons } from "../utils/icons";
import { setUser, updateUser } from "../redux/features/authSlice";
import Spinner from "../components/loaders/Spinner";
import AddDetails from "../components/modals/AddDetails";

const Profile = () => {
    const [isAddDetailsModalOpen, setIsAddDetailsModalOpen] = useState(false);
    const [isSkeletonLoading, setIsSkeletonLoading] = useState(true);
    const [allUsers, setAllUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const handleUploadProfileImage = async (e, type) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        try {
            const uploadRes = await uploadImage(formData);
            const { status } = uploadRes;
            console.log(uploadRes);
            if (status >= 200 && status < 300) {
                const res = await uploadProfileImage(user._id, {
                    type,
                    image: uploadRes.data,
                });
                const { status, data } = res;
                if (status >= 200 && status < 300) {
                    toast.success(
                        <ToastMsg title={"Image uploaded successfully"} />
                    );
                    let UpdateImg;
                    if (type === "cover") {
                        UpdateImg = { coverImage: uploadRes.data };
                    } else {
                        UpdateImg = { profileImage: uploadRes.data };
                    }
                    dispatch(updateUser(UpdateImg));
                } else {
                    toast.error(<ToastMsg title={data.message} />);
                }
            } else {
                toast.error(<ToastMsg title={uploadRes.data.message} />);
            }
        } catch (error) {
            toast.error(<ToastMsg title={error?.response?.data?.message} />);
        } finally {
            setIsLoading(false);
        }
    };

    const isExtraInfo = user?.mobile || user?.description || user?.address;
    const getUserData = async () => {
        try {
            const res = await getUser();
            const { status, data } = res;
            if (status >= 200 && status < 300) {
                dispatch(setUser(data));
            } else {
                toast.error(<ToastMsg title={"Something went wrong"} />);
            }
        } catch (error) {
            console.log(error, "error");
        }
    };
    const getAllUsers = async () => {
        try {
            const res = await getUsers();
            const { data, status } = res;
            if (status >= 200 && status < 300) {
                setAllUsers(data);
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {}
    };
    const handleAddFollower = async (e, id) => {
        setIsLoading(true);
        try {
            const res = await addFollower({ followingUser: id });
            const { data, status } = res;
            if (status >= 200 && status < 300) {
                getAllUsers();
                getUserData();
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    const handleRemoveFollower = async (e, id) => {
        setIsLoading(true);
        try {
            const res = await removeFollower({ followingUser: id });
            const { data, status } = res;
            console.log(res);
            if (status >= 200 && status < 300) {
                getAllUsers();
                getUserData();
            } else {
                toast.error(<ToastMsg title={data.message} />);
            }
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <>
            {isLoading && <Spinner />}

            <div className="py-10">
                <div className="container relative">
                    <div className="relative">
                        <div className=" h-96 rounded-lg overflow-hidden">
                            {user?.coverImage ? (
                                <img
                                    className=" hoverable-img w-full"
                                    src={`${process.env.REACT_APP_DEV_API}${user?.coverImage}`}
                                    alt="cover"
                                />
                            ) : (
                                <div className="flex-center w-full h-full bg-zinc-300">
                                    <h6 className="heading-4">
                                        Add your cover Image
                                    </h6>
                                </div>
                            )}
                        </div>
                        <label
                            htmlFor="cover"
                            className="w-10 h-10 rounded-full cursor-pointer absolute top-2 right-4 bg-amber-200 text-black flex-center"
                        >
                            {reactIcons.camera}
                            <input
                                type="file"
                                name=""
                                id="cover"
                                hidden
                                onChange={(e) =>
                                    handleUploadProfileImage(e, "cover")
                                }
                            />
                        </label>
                    </div>
                    <div className="relative top-[-50px] px-4  flex gap-6 items-start">
                        <div className="w-32 relative h-32 flex-shrink-0 rounded-full bg-amber-500 p-[2px] ">
                            <img
                                className="w-full h-full rounded-full object-cover"
                                src={
                                    user?.profileImage
                                        ? `${process.env.REACT_APP_DEV_API}${user?.profileImage}`
                                        : "/images/user.png"
                                }
                                alt=""
                            />
                            <label
                                htmlFor="profile"
                                className="w-10 h-10 rounded-full cursor-pointer absolute bottom-0 right-0 bg-amber-200 text-black flex-center"
                            >
                                {reactIcons.camera}
                                <input
                                    type="file"
                                    name=""
                                    id="profile"
                                    hidden
                                    onChange={(e) =>
                                        handleUploadProfileImage(e, "profile")
                                    }
                                />
                            </label>
                        </div>
                        <div className="pt-16 flex-1">
                            <h4 className="heading-4">{user?.fullName}</h4>
                            <p className="text-base leading-[1] text-gray-600">
                                {user?.email}
                            </p>
                            <div className=" my-2 ">
                                {user?.mobile && (
                                    <div className="flex gap-2">
                                        <strong className="font-medium flex-shrink-0 min-w-[75px] text-black">
                                            Mobile
                                        </strong>
                                        <span>:</span>
                                        <span className="text-gray-700">
                                            {user?.mobile}
                                        </span>
                                    </div>
                                )}
                                {user?.address && (
                                    <div className="flex gap-2">
                                        <strong className="font-medium flex-shrink-0 min-w-[75px] text-black">
                                            Address
                                        </strong>
                                        <span>:</span>
                                        <span className="text-gray-700">
                                            {user?.address}
                                        </span>
                                    </div>
                                )}
                                {user?.description && (
                                    <div className="flex gap-2">
                                        <strong className="font-medium flex-shrink-0 min-w-[75px] text-black">
                                            About Me
                                        </strong>
                                        <span>:</span>
                                        <span className="text-gray-700">
                                            {user?.description}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <button
                                onClick={() => setIsAddDetailsModalOpen(true)}
                                className="btn-primary"
                            >
                                Add More Details
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-8 mb-10 mt-2  mx-auto">
                        <div>
                            <h4 className="heading-4 text-center mb-2">
                                My Friends
                            </h4>
                            <ul className="space-y-2 bg-white shadow-card border border-zinc-200 py-6 px-4 rounded-md">
                                {user?.followers.map(
                                    ({ followingUser: friend }) => (
                                        <li className="py-3 duration-150 cursor-pointer px-4 gap-6 rounded-md border border-zinc-200 bg-gray-50   flex hover:bg-amber-100">
                                            <div className="flex-shrink-0 w-16 h-16  p-[1px] bg-amber-500 rounded-full overflow-hidden shadow-card">
                                                <img
                                                    className="w-full rounded-full h-full object-cover"
                                                    src={
                                                        friend?.profileImage
                                                            ? `${process.env.REACT_APP_DEV_API}${friend?.profileImage}`
                                                            : "/images/user.png"
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h6 className="heading-6">
                                                    {friend?.fullName}
                                                </h6>
                                                <p className="text-muted leading-[1] mb-2">
                                                    {friend?.email}
                                                </p>
                                                <button
                                                    onClick={(e) =>
                                                        handleRemoveFollower(
                                                            e,
                                                            friend._id
                                                        )
                                                    }
                                                    className="btn-red btn-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className=""></div>
                        <div>
                            <h4 className="heading-4 text-center mb-2">
                                Add Friends
                            </h4>
                            <ul className="space-y-2 bg-white shadow-card border border-zinc-200 py-6 px-4 rounded-md">
                                {allUsers.map((friend) => (
                                    <li className="py-3 duration-150 cursor-pointer px-4 gap-6 rounded-md border border-zinc-200 bg-gray-50   flex hover:bg-amber-100">
                                        <div className="flex-shrink-0 w-16 h-16  p-[1px] bg-amber-500 rounded-full overflow-hidden shadow-card">
                                            <img
                                                className="w-full rounded-full h-full object-cover"
                                                src={
                                                    friend?.profileImage
                                                        ? `${process.env.REACT_APP_DEV_API}${friend?.profileImage}`
                                                        : "/images/user.png"
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h6 className="heading-6">
                                                {friend?.fullName}
                                            </h6>
                                            <div className="flex">
                                                {friend.isFollowed ? (
                                                    <p className="text-muted">Your friend</p>
                                                ) : (
                                                    <button
                                                        onClick={(e) =>
                                                            handleAddFollower(
                                                                e,
                                                                friend._id
                                                            )
                                                        }
                                                        className="btn-primary btn-sm"
                                                    >
                                                        Add Friend
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <AddDetails
                isOpen={isAddDetailsModalOpen}
                user={user}
                closeModal={() => setIsAddDetailsModalOpen(false)}
                isExtraInfo={isExtraInfo}
            />
        </>
    );
};

export default Profile;
