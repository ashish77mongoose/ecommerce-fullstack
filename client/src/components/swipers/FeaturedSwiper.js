import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper";
import { reactIcons } from "../../utils/icons";
import ProductCard from "../cards/ProductCard";
const FeaturedSwiper = ({ data }) => {
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
            nextEl: ".featured-right",
            prevEl: ".featured-left",
          }}
          modules={[Pagination, Navigation]}
          className=""
        >
          {data.map((product) => (
            <SwiperSlide className="shadow-card border-c rounded-lg">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="featured-left w-10 h-10 ay-center z-10 left-0 flex-center rounded-full bg-amber-500 text-20 disabled:opacity-50 disabled:pointer-events-none">
          {reactIcons.arrowleft}
        </button>
        <button className="featured-right w-10 h-10 ay-center z-10 right-0 flex-center rounded-full bg-amber-500 text-20 disabled:opacity-50 disabled:pointer-events-none">
          {reactIcons.arrowright}
        </button>
      </div>
    </div>
  );
};

export default FeaturedSwiper;
