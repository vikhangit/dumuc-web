"use client"
import React from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";

const TrendingTopFive = ({ items, tiltle = 'XU HƯỚNG HÀNG ĐẦU', limit = 10}) => {
  const router = useRouter()
  return (
    <div>        
      <ul class="flex flex-nowrap xl:flex-wrap overflow-auto xl:overflow-none gap-x-6 gap-y-2 pb-1 scroll-trend">
        {items && items?.map((item, index) => {
          if (index < limit) {
            return (
              <div
                key={index}
                onClick={() => router.push(`/search?q=${item?.name}`)}
                className="curor-pointer hover:underline whitespace-nowrap font-medium text-base"
              >
                #{item?.name}
              </div>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default TrendingTopFive;
