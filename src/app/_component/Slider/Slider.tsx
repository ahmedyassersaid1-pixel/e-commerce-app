"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import image1 from "../../../assetes/Code_Generated_Image.jpg";
import Link from "next/link";

// Import Swiper styles
import Image from "next/image";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
export default function Slider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      loop
      pagination={{ clickable: true }}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className="relative">
        <div className="absolute inset-0 px-15 overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
          <div className="container h-full content-center">
            <h2
              className="text-white text-3xl font-bold mb-4 max-w-96"
              style={{ opacity: 1, transform: "none" }}
            >
              Fresh Products Delivered to your Door
            </h2>
            <p style={{ opacity: 1, transform: "none" }}>
              Get 20% off your first order
            </p>
            <div className="mt-4" style={{ opacity: 1, transform: "none" }}>
              <Link
                className="btn bg-white border-2 border-white/50 text-green-500 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                href="/products"
              >
                Shop Now
              </Link>
              <Link
                className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                href="/deals"
              >
                View Deals
              </Link>
            </div>
          </div>
        </div>
        <Image
          className="w-full h-100 object-cover"
          src={image1}
          alt="slider-image"
        />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <div className="absolute inset-0 px-15 overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
          <div className="container h-full content-center">
            <h2
              className="text-white text-3xl font-bold mb-4 max-w-96"
              style={{ opacity: 1, transform: "none" }}
            >
              Premium Quality Guaranteed{" "}
            </h2>
            <p style={{ opacity: 1, transform: "none" }}>
              Fresh from farm to your table{" "}
            </p>
            <div className="mt-4" style={{ opacity: 1, transform: "none" }}>
              <Link
                className="btn bg-white border-2 border-white/50 text-green-500 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                href="/products"
              >
                Shop Now
              </Link>
              <Link
                className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                href="/about"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        <Image
          className="w-full h-100 object-cover"
          src={image1}
          alt="slider-image"
        />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <div className="absolute inset-0 px-15 overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50">
          <div className="container h-full content-center">
            <h2
              className="text-white text-3xl font-bold mb-4 max-w-96"
              style={{ opacity: 1, transform: "none" }}
            >
              Fast & Free Delivery{" "}
            </h2>
            <p style={{ opacity: 1, transform: "none" }}>
              Same day delivery available{" "}
            </p>
            <div className="mt-4" style={{ opacity: 1, transform: "none" }}>
              <Link
                className="btn bg-white border-2 border-white/50 text-green-500 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                href="/products"
              >
                Order Now
              </Link>
              <Link
                className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                href="/deals"
              >
                Delivert Info
              </Link>
            </div>
          </div>
        </div>
        <Image
          className="w-full h-100 object-cover"
          src={image1}
          alt="slider-image"
        />
      </SwiperSlide>
    </Swiper>
  );
}
