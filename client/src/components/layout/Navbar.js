import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reactIcons } from "../../utils/icons";
import { setLogout } from "../../redux/features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };
  return (
    <nav className="flex items-center  shadow-navbar  py-3 sticky top-0 w-full bg-white z-[50]">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="">
            <Link to="/" className="font-extrabold text-3xl text-amber-600">
              Ashish AK47
            </Link>
          </div>
          <div className="flex gap-2 items-center">
            {user && (
              <div className="flex">
                <Menu as="div" className="relative">
                  <Menu.Button
                    className={
                      "flex gap-1 text-right items-center px-2 py-2 cursor-pointer hover:bg-zinc-100 rounded-md"
                    }
                  >
                    <img
                      className="w-10 h-10 object-cover rounded-full"
                      src={ user.profileImage?`${process.env.REACT_APP_DEV_API}${user.profileImage}`:'/images/user.png'}
                      alt=""
                    />
                    <span>{user?.fullName}</span>
                    <span className="ml-2">{reactIcons?.arrowDown}</span>
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1 ">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate("/my-post")}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                            >
                              My Posts
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => navigate(`/profile/${user._id}`)}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                            >
                              Profile
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active
                                  ? "bg-violet-500 text-white"
                                  : "text-gray-900"
                              } group flex w-full items-center rounded-md px-2 py-2 text-base`}
                            >
                              Log out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
            <div className="flex gap-2">
              {!user && (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="btn-primary"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="btn-primary"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
