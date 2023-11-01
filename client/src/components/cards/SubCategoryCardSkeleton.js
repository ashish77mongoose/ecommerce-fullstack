import React from 'react'

const SubCategoryCardSkeleton = () => {
  return (
    <div className="shadow-card border-c rounded-lg">
    <div className="h-60 w-full relative overflow-hidden rounded-t-lg skeleton ">
     
    </div>
    <div className="my-4 text-center bg-gray-50 px-4 ">
      <div className="skeleton h-8"></div>
    </div>
  </div>
  )
}

export default SubCategoryCardSkeleton
