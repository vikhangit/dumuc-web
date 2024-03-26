"use client"
import React from "react";
import Link from 'next/link';

const ArticleTopTen = ({ items, tiltle = 'BÀI VIẾT NỔI BẬT', limit = 10, inDetailPage = false}) => {
  return (
    <div>
      {tiltle && (
        <h3 class="mb-2 text-base font-bold text-gray-900 flex">
          <svg class="w-5 h-5 text-gray-800 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"/>
          </svg>
          BÀI VIẾT NỔI BẬT
        </h3>
      )}
            
      <ul class="divide-y divide-gray-200">
        {items && items?.map((item, index) => {
          if (index < limit) {
            return (
              <Link
                key={index}
                href={`/forum/post/${item?.slug}/${item?.postId}`}
              >
                <li class="flex items-center pb-4 space-x-4">
                  <div
                    className={`flex items-center justify-center flex-shrink-0 w-10 h-10 bg-white rounded-lg shadow-sm shadow-gray-300`}
                  >
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="line-clamp-2 text-base font-semibold text-gray-900">
                      {item?.title}
                    </div>
                  </div>
                </li>
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ArticleTopTen;
