import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { deletePost } from "../../api/api";
import ToastMsg from "../toast/ToastMsg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateMyPosts } from "../../redux/features/postSlice";

const DeleteConfirmation = ({ isOpen, closeModal, id }) => {
    const dispatch=useDispatch()
  const handleDelete = async (id) => {
    try {
      const res = await deletePost(id);
      const { status, data } = res;
      if (status >= 200 && status < 300) {
        toast.success(<ToastMsg title={data.message} />);
        closeModal();
        dispatch(updateMyPosts(id))
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    }
  };
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
              <Dialog.Panel
                as="div"
                className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <Dialog.Title as="h4" className="heading-4 text-center">
                  Are you sure you want to delete this post?
                </Dialog.Title>

                <div className="mt-4 flex justify-center gap-6 items-center">
                  <button
                    onClick={() => {
                      handleDelete(id);
                    }}
                    className="btn-primary"
                  >
                    Yes
                  </button>
                  <button onClick={closeModal} className="btn-red">
                    No
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

export default DeleteConfirmation;
