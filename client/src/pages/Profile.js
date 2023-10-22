import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import ToastMsg from "../components/toast/ToastMsg";
import { reactIcons } from "../utils/icons";
import Spinner from "../components/loaders/Spinner";


const Profile = () => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    

    useEffect(() => {
    }, []);

    return (
        <>
            {isLoading && <Spinner />}

            <div className="py-10">
                <div className="container relative">
                    <div className="relative">
                        <div className=" h-96 rounded-lg overflow-hidden">
                        <div className="flex-center w-full h-full bg-zinc-300">
                                    <h6 className="heading-4">
                                        Add your cover Image
                                    </h6>
                                </div>
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
                            
                        </div>
                    </div>

                    
                </div>
            </div>
        
        </>
    );
};

export default Profile;
