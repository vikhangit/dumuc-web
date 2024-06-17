"use client";
import React from "react";
import CategoryItem from "./CategoryItem";
export default function CategoryList({ categories, parent, user }) {
  return (
    <div>
      {parent?.map((item) => {
        let child = categories?.filter(
          (x) => x.categoryParentId === item.categoryId
        );
        return (
          <div
            key={item.categoryId}
            class="sm:w-full w-[96%] mx-auto my-4 font-normal text-gray-900 bg-white shadow shadow rounded-lg"
          >
            <div className="block text-base w-full px-4 py-2 text-white bg-[#c80000] border-b border-gray-200 rounded-t-lg">
              {item?.name.toUpperCase()}
            </div>
            {child?.map((sub) => {
              return <CategoryItem key={sub} sub={sub} user={user} />;
            })}
          </div>
        );
      })}
    </div>
  );
}
