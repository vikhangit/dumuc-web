"use client";
import Link from "next/link";
import { register } from "swiper/element/bundle";
import React, { useEffect } from "react";
import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

const AuthorPopularItemsMobile = ({
  items = [],
  tiltle = "THÀNH VIÊN NỔI BẬT",
}) => {
  useEffect(() => {
    register();
  }, []);
  return (
    <>
      {tiltle && (
        <h3 class="mb-2 text-base font-bold text-gray-900 flex">
          <svg
            class="w-5 h-5 text-gray-800 mr-1.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 21 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m11.479 1.712 2.367 4.8a.532.532 0 0 0 .4.292l5.294.769a.534.534 0 0 1 .3.91l-3.83 3.735a.534.534 0 0 0-.154.473l.9 5.272a.535.535 0 0 1-.775.563l-4.734-2.49a.536.536 0 0 0-.5 0l-4.73 2.487a.534.534 0 0 1-.775-.563l.9-5.272a.534.534 0 0 0-.154-.473L2.158 8.48a.534.534 0 0 1 .3-.911l5.294-.77a.532.532 0 0 0 .4-.292l2.367-4.8a.534.534 0 0 1 .96.004Z"
            />
          </svg>
          {tiltle}
        </h3>
      )}
      <div className="relative" id="author-popular">
        <Swiper
          className="relative"
          // install Swiper modules
          modules={[Navigation]}
          slidesPerView={4}
          navigation={true}
          freeMode={true}
          grabCursor={true}
          keyboard={true}
          // mousewheel={true}
          breakpoints={{
            480: {
              slidesPerView: 4,
            },
            576: {
              slidesPerView: 5,
            },
            992: {
              slidesPerView: 6,
            },
          }}
        >
          {items?.map((item, index) => (
            <SwiperSlide key={index}>
              <Link href={`/author/${item?.slug}/${item?.authorId}`}>
                <div class="flex flex-col items-center my-2 relative z-10">
                  <div className="w-14 h-14 p-1 rounded-full border border-black">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      class="w-full h-full rounded-full"
                      src={item?.photo ? item?.photo : "/dumuc/avatar.jpg"}
                      alt={item?.name}
                    />
                  </div>
                  <div class="font-medium mt-2 text-center">
                    <div>{item?.name}</div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default AuthorPopularItemsMobile;
