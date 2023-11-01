import React from 'react'
import { imageRender } from '../../utils/helpers'

const SubCategoryCard = ({category}) => {
  return (
    <div className="shadow-card border-c rounded-lg">
    <div className="h-60 w-full relative overflow-hidden rounded-t-lg ">
      <img
        className="hoverable-img"
        src={imageRender(category.icon)}
        alt={category.title}
      />
    </div>
    <div className="py-4 text-center px-4">
      <h4 className="heading-4">{category.name}</h4>
    </div>
  </div>
  )
}

export default SubCategoryCard
