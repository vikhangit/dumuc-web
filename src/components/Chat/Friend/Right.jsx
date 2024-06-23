"use client";
import dynamic from "next/dynamic";

export default function ChatRight() {
  return (
    <div className={`h-full hidden lg:basis-2/3`}>
      <div className="h-[75px] flex justify-between items-center px-[15px] pl-[0px] sm:px-[20px] shadow-md shadow-gray-400"></div>
      <div className="h-full w-full flex justify-center items-center text-base">
        Danh tin nhắn đang trống
      </div>
    </div>
  );
}
