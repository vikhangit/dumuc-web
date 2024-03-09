"use client"
import React from "react";
import Link from 'next/link';

const TrendingTopFive = ({ items, tiltle = 'XU HƯỚNG HÀNG ĐẦU', limit = 10}) => {
  return (
    <div>        
      <ul class="flex flex-nowrap xl:flex-wrap overflow-auto xl:overflow-none gap-x-6 gap-y-2 pb-4 scroll-trend">
        {items && items?.map((item, index) => {
          if (index < limit) {
            return (
              <Link
                key={index}
                href={`/search?q=${item?.name}`}
                className="hover:underline whitespace-nowrap font-medium text-base"
              >
              #{item?.name}
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default TrendingTopFive;
