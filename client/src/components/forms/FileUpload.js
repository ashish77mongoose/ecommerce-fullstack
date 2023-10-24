import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { reactIcons } from "../../utils/icons";

export default function FileUpload({ setImage, image }) {
  const [imageUrl, setImageUrl] = useState(null);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles);
      setImageUrl(URL.createObjectURL(acceptedFiles[0]));
    }
  }, [acceptedFiles, setImage]);

  return (
    <div className="space-y-2">
      <div className="bg-amber-100 rounded-md p-2 border border-amber-500 cursor-pointer">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-2xl text-amber-700">{reactIcons.camera}</span>
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 my-2 flex-col">
        {imageUrl && (
          <img className="w-24 h-24 object-contain" src={imageUrl} alt="" />
        )}
        {image && image[0].name}
      </div>
    </div>
  );
}
