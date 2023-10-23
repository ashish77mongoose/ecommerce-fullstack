import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper";
import { reactIcons } from "../../utils/icons";
import { imageRender } from "../../utils/helpers";
const ImagesSwiper = ({ data ,active,setActive}) => {
  return (
    <div>
      <div className="relative px-8">
        <Swiper
          breakpoints={{
            200: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
            1366: {
              slidesPerView: 5,
            },
            1536: {
              slidesPerView: 5,
            },
          }}
          spaceBetween={10}
          loop={false}
          grabCursor={true}
          navigation={{
            nextEl: ".image-right",
            prevEl: ".image-left",
          }}
          modules={[Pagination, Navigation]}
          className=""
        >
          {data?.map((image,index) => (
            <SwiperSlide className={`shadow-card cursor-pointer overflow-hidden rounded-md p-[2px] ${active===index? 'border-[2px]  border-amber-700' :'border-2 border-transparent'}`}>
             <div onClick={()=>setActive(index)} className="w-full h-28 rounded-sm overflow-hidden">
                <img className="w-full h-full object-cover" src={imageRender(image)} alt={image} />
             </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="image-left w-8 h-8 disabled:hidden ay-center z-10 left-0 flex-center rounded-full bg-amber-500 text-base disabled:opacity-50 disabled:pointer-events-none">
          {reactIcons.arrowleft}
        </button>
        <button className="image-right w-8 h-8 disabled:hidden ay-center z-10 right-0 flex-center rounded-full bg-amber-500 text-base disabled:opacity-50 disabled:pointer-events-none">
          {reactIcons.arrowright}
        </button>
      </div>
    </div>
  );
};

export default ImagesSwiper;
