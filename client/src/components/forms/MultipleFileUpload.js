import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { reactIcons } from "../../utils/icons";

export default function MultipleFileUpload({ setImages, images}) {
  const [imageUrls, setImageUrls] = useState([]);
  const [isFront, setIsFront] = useState(0);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
        let files=[...images,...acceptedFiles]
      setImages(files);
      let urls=[]

      files.forEach((file)=>{
        urls.push(URL.createObjectURL(file));
      })
      setImageUrls(urls)
     
    }
  }, [acceptedFiles, setImages]);

  const handleFrontImage=(indexF)=>{
    let tempImage=images[indexF];
    setImages([tempImage,...images.filter((item,index)=>index!==indexF)])
    setIsFront(indexF)
  }
  const handleRemoveImage=(indexF)=>{
    setImages(images.filter((item,index)=>index!==indexF))
    setImageUrls(imageUrls.filter((item,index)=>index!==indexF))
  }

  return (
    <div className="space-y-2">
        <div {...getRootProps({ className: "dropzone" })} className="bg-amber-100 rounded-md p-6 border border-amber-500 cursor-pointer">
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-1 text-center">
            <span className="text-2xl text-amber-700">{reactIcons.camera}</span>
            <p>Drag 'n' drop upto 10 files here, or click to select files</p>
            
          </div>
        </div>
      <div className="flex gap-4  flex-wrap my-4">
        {imageUrls.length>0 && (
          imageUrls.map((url ,index)=>(
            <div   key={index} className="flex flex-col gap-1 relative bg-gray-300 p-1 rounded-md">
                <button type="button" onClick={()=>handleFrontImage(index)} className="text-2xl flex-center bg-pink-100 rounded-full w-8 h-8 text-red-500 absolute top-2 right-2">{ isFront===index? reactIcons.heartFill :  reactIcons.heartOutline}</button>
                <button type="button" onClick={()=>handleRemoveImage(index)} className="text-xl flex-center bg-pink-100 rounded-full w-8 h-8 text-red-500 absolute left-2 top-2">{ reactIcons.delete}</button>
                <img className="w-32 h-32 object-contain cursor-pointer" src={url} alt="" />
            </div>
          ))
        )}
      </div>
     {imageUrls.length>0 && <p className="text-muted">click on heart to make it a front image (only 10 images are allowed)</p>}
    </div>
  );
}
