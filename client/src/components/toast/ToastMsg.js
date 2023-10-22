import React from "react";

const ToastMsg = ({ title, subtitle }) => {
  return (
    <div>
      <h6 className="font-dm font-semibold">{title}</h6>{" "}
      {subtitle && (
        <p className="text-14 font-dm font-medium leading-5 text-white/80">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default ToastMsg;
