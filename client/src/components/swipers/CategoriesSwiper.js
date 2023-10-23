import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper";
import { reactIcons } from "../../utils/icons";
import { imageRender } from "../../utils/helpers";
import { Link } from "react-router-dom";
const CategoriesSwiper = ({ categories }) => {
  return (
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
            slidesPerView: 3,
          },
          1536: {
            slidesPerView: 4,
          },
        }}
        spaceBetween={10}
        loop={false}
        grabCursor={true}
        navigation={{
          nextEl: ".dash-right",
          prevEl: ".dash-left",
        }}
        modules={[Pagination, Navigation]}
        className=""
      >
        {categories.map((category) => (
          <SwiperSlide className="shadow-card border-c rounded-lg">
            <Link to={`/category/${category._id}`}>
              <div className="h-60 w-full relative overflow-hidden rounded-t-lg ">
                <img
                  className="hoverable-img"
                  src={imageRender(category.icon)}
                  alt={category.title}
                />
              </div>
              <div className="py-4 text-center">
                <h4 className="heading-4">{category.name}</h4>
                <p className="text-muted">{category.description}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button className="dash-left w-10 h-10 ay-center z-10 left-0 flex-center rounded-full bg-amber-500 text-20 disabled:opacity-50 disabled:pointer-events-none">
        {reactIcons.arrowleft}
      </button>
      <button className="dash-right w-10 h-10 ay-center z-10 right-0 flex-center rounded-full bg-amber-500 text-20 disabled:opacity-50 disabled:pointer-events-none">
        {reactIcons.arrowright}
      </button>
    </div>
  );
};

export default CategoriesSwiper;
