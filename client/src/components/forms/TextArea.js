import React from "react";

const TextArea = ({ className, label, error, helperText, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor="">{label}</label>}
      <div className="relative">
        <textarea
          {...rest}
          className={`  input-field resize-none h-36 ${className}  ${
            error ? "border-red-500" : "border-zinc-200"
          }`}
        ></textarea>
      </div>
      {helperText && <p className="text-gray-600 text-xs">{helperText}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default TextArea;
