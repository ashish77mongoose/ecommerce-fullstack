import React from "react";
import { createPortal } from "react-dom";
import BeatLoader from "react-spinners/BeatLoader";
const Spinner = () => {
  return (
    <>
      {createPortal(
        <div className="fixed inset-0 flex-center drop-shadow-md bg-black bg-opacity-30 z-[1000]">
          <BeatLoader color="#ffffff" size={20} />
        </div>,
        document.getElementById("modals")
      )}
    </>
  );
};

export default Spinner;
