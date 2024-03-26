"use client"
import { useWindowSize } from '@hooks/useWindowSize';
import Link from 'next/link';
import { getPopularAuthors, getPopularPosts } from '@apis/posts';
import { getUsersRanking } from '@apis/users';
import React, { useState } from 'react';
import Image from 'next/image';
import { Dropdown, Select } from 'flowbite-react';

const FeaturedTab = ({ searchParams }) => {
  const sizes = useWindowSize()
  return (
    <>
    <div className="bg-[#c80000] px-2 sm:px-4 py-4">
      <div className="mt-2 mb-8">
        <h2 class="text-base font-semibold  sm:text-lg text-white dark:text-white text-center">BẢNG PHONG THẦN Dumuc.me!</h2>
        <div className="flex justify-center items-end mt-2 gap-x-2">
          {
            Array(5).fill().map((item, index) =>
              <Image key={index} alt="" width={0} height={0} sizes='100vw' src="/icons/Vector1.png" className={index === 2 ? 'w-6 h-6' : 'w-5 h-5'} />
            )
          }
        </div>
      </div>
      <div className="flex gap-x-2 sm:gap-x-6 mb-2 overflow-auto">
      <Link
          href={`/featured?tab=knights`}
          className={`${(searchParams?.tab === "knights") ? "bg-white text-gray-600" : "text-white "}
          basis-1/3 py-1.5 border border-white rounded-full text-center ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[11px]"} flex items-center justify-center`}>
          <button type="button">Top hiệp sĩ</button>
        </Link>
        <Link
          href={`/featured?tab=members`}
          className={`${(searchParams?.tab === "members") ? "bg-white text-gray-600" : "text-white "}
          basis-1/3 py-1.5 border border-white rounded-full text-center ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[11px]"} flex items-center justify-center`}>
          <button type="button" className="break-keep">Top thành viên</button>
        </Link>
        <Link
          href={`/featured?tab=posts`}
          className={`${(searchParams?.tab === "posts") ? "bg-white text-gray-600" : "text-white "}
          basis-1/3 py-1.5 border border-white rounded-full text-center ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[11px]"} flex items-center justify-center`}>
          <button type="button">Top bài viết</button>
        </Link>
      </div>
    </div>
    <div>
    {/* <div className={`flex justify-between ${sizes.width > 340 ? "px-2 sm:px-4" : "px-0.5"} gap-x-1 sm:gap-x-4 bg-gray-200`}>
      <div className="basis-1/4">
      <select 
      style={{
       boxShadow: "0 0 #0000", 
       paddingRight: sizes.width > 500 ? "2.5rem" : "0.5rem",
       paddingLeft: sizes.width > 500 ? "0.75rem" : "0.5rem"
      }} 
      className={`w-full border-0 text-[#c80000] bg-transparent ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[10px] font-medium"} cursor-pointer focus:border-0 focus:outline-0 
      ${sizes.width > 500 ? "[&:not([size])]:bg-[url('/icons/MdKeyboardArrowDown.png')]" : "[&:not([size])]:bg-none"} [&:not([size])]:bg-[length:1.75rem]`}>
        <option className="text-xs">Tuần này</option>
        <option className="text-xs">Tuần trước</option>
      </select>
      </div>
      <div className="basis-1/4">
      <select 
      style={{
       boxShadow: "0 0 #0000", 
       paddingRight: sizes.width > 500 ? "2.5rem" : "0.5rem",
       paddingLeft: sizes.width > 500 ? "0.75rem" : "0.5rem"
      }} 
      className={`w-full border-0 text-[#c80000] bg-transparent ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[10px] font-medium"} cursor-pointer focus:border-0 focus:outline-0 
      ${sizes.width > 500 ? "[&:not([size])]:bg-[url('/icons/MdKeyboardArrowDown.png')]" : "[&:not([size])]:bg-none"} [&:not([size])]:bg-[length:1.75rem]`}>
        <option className="text-xs">Tháng này</option>
        <option className="text-xs">Tháng trước</option>
      </select>
      </div>
      <div className="basis-1/4">
      <select 
      style={{
       boxShadow: "0 0 #0000", 
       paddingRight: sizes.width > 500 ? "2.5rem" : "0.5rem",
       paddingLeft: sizes.width > 500 ? "0.75rem" : "0.5rem"
      }} 
      className={`w-full border-0 text-[#c80000] bg-transparent ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[10px] font-medium"} cursor-pointer focus:border-0 focus:outline-0 
      ${sizes.width > 500 ? "[&:not([size])]:bg-[url('/icons/MdKeyboardArrowDown.png')]" : "[&:not([size])]:bg-none"} [&:not([size])]:bg-[length:1.75rem]`}>
        <option className="text-xs">Qúy này</option>
        <option className="text-xs">Quý trước</option>
      </select>
      </div>
      <div className="basis-1/4">
      <select 
      style={{
       boxShadow: "0 0 #0000", 
       paddingRight: sizes.width > 500 ? "2.5rem" : "0.5rem",
       paddingLeft: sizes.width > 500 ? "0.75rem" : "0.5rem"
      }} 
      className={`w-full border-0 text-[#c80000] bg-transparent ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[10px] font-medium"} cursor-pointer focus:border-0 focus:outline-0 
      ${sizes.width > 500 ? "[&:not([size])]:bg-[url('/icons/MdKeyboardArrowDown.png')]" : "[&:not([size])]:bg-none"} [&:not([size])]:bg-[length:1.75rem]`}>
        <option className="text-xs">Năm này</option>
        <option className="text-xs">Năm trước</option>
      </select>
      </div>
    </div> */}
    </div>
    </>
  );
}

export default FeaturedTab;
