"use client"
import { useWindowSize } from '@hooks/useWindowSize';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';

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
    </>
  );
}

export default FeaturedTab;
