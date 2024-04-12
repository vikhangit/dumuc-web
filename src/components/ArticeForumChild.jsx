"use client"
import Link from "next/link";
import moment from "moment";

import Image from "next/image";
import { CiShare2 } from "react-icons/ci";
import {  useState } from "react";

export default function ArticeForumChild({item}) {
    const [label, setLabel] = useState([])
    const url = `/forum/post/${item?.slug}/${item?.postId}`;
              let comments = item?.comments;
              const expert = item?.body?.blocks?.filter(x => x.type ===
                "paragraph")[0]?.data?.text;
    return (
        <div
          key={item?.postId}
          className="overflow-y-hidden px-6 py-4 border-b border-gray-300 gap-x-0 xl:gap-x-2 space-none"
        >
          <div class="">
            <div class="flex items-center xl:space-x-4">
              <div class="font-medium dark:text-white">
                <div className="flex xl:items-center flex-col xl:flex-row justify-start">
                {item?.label && Object.keys(item?.label).length > 0 &&  <span style={{
                    color: item?.label?.color
                }} class="bg-white shadow-md shadow-gray-500 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded text-center w-fit">{item?.label?.name}</span>}
                <Link href={url} className="font-bold text-xl hover:underline text-[#605F5F]" >
                   {item?.title?.charAt(0).toUpperCase()}{item?.title?.slice(1, item?.title?.length).toLowerCase()}
                </Link>
                </div>
                <div className="text-sm text-[#747272]">
                  {"Người đăng: "}
                  <Link
                    className=" text-sm text-[#c80000] hover:underline"
                    href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
                  >
                    {item?.author?.name}
                  </Link>
                  {" - Ngày: "}
                  {moment(item?.publishDate).format("DD/MM/YYYY")}
                </div>
                <div className="font-normal text-xl mt-3 text-justify line-clamp-2 text-[#747272]" dangerouslySetInnerHTML={{
                  __html: expert
                }}>
                </div>
              </div>
            </div>
          </div>
          <div class="flex items-center mt-5">
            <div class="w-full flex pt-3 border-t border-gray-300 justify-between">
              <a
                href={url}
                class="gap-1 article-tool flex items-center text-xs sm:text-sm font-medium text-gray-500 hover:underline hover:text-gray-900"
              >
                <Image alt="" src="/icons/MdFlare.png" width={0} height={0} sizes="100vw" className="w-4 h-4" />
                Đọc thêm
              </a>
              <a
                href="#"
                class="gap-1 article-tool flex items-center text-sm font-medium text-gray-500 hover:underline hover:text-gray-900"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {item?.likesCount || "0"} Lượt thích
              </a>
              <a
                href={`${url}#comments`}
                class="gap-1 article-tool flex items-center text-sm font-medium text-gray-500 hover:underline hover:text-gray-900"
              >
                <Image width={0} height={0} sizes="100vw" src="/icons/comment-1.jpg" alt="" className='w-[16px] h-[16px]' />
                {item?.commentsCount} Bình luận
              </a>
              <a
                href={`${url}#comments`}
                class="gap-1 article-tool flex items-center text-sm font-medium text-gray-500 hover:underline hover:text-gray-900"
              >
                <CiShare2 size={16} />
                Chia sẻ
              </a>
            </div>
          </div>
        </div>
      );
}
