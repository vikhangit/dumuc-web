"use client"
import { useWindowSize } from '@hooks/useWindowSize';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

const FeaturedPost = ({ items, limit }) => {
  const sizes = useWindowSize()
  return (
    <div className='px-4 bg-white'>
      {items && items?.map((item, index) => {
        if (index < limit && item.isActive) {
          return (
            <div
              key={index}
            >
              <Link href={`/forum/post/${item?.slug}/${item?.postId}`} class={`flex items-center py-4 gap-x-4 ${index !== 0 ? "border-t" : "border-0"} border-gray-400`}>
                <div className="flex flex-col items-center justify-center w-20 gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF0808]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <Link href={`/forum/post/${item?.slug}/${item?.postId}`} className='w-full py-0 sm:py-0.5 text-xs text-center font-medium border border-[#FF0808] hover:bg-[#FF0808] hover:text-white rounded-full text-[#FF0808]'>Xem</Link>
                </div>
                <div className="w-[calc(100%-5rem)]">
                  {/* <Link href={`/forum/topic/${item?.categoryObj?.slug}/${item?.categoryObj?.categoryId}`} className="line-clamp-1 text-sm sm:text-base text-gray-800 hover:underline">
                    {item?.categoryObj?.name}
                  </Link> */}
                  <Link href={`/forum/post/${item?.slug}/${item?.postId}`} className="line-clamp-2 font-semibold text-[#363535] text-sm sm:text-base text-gray-800 hover:underline">
                    {item?.title}
                  </Link>
                  <div className={`mt-1 flex ${sizes.width > 420 ? "gap-x-4" : "gap-x-2"} text-xs sm:text-sm flex items-center`}>
                    <Link href={`/forum/post/${item?.slug}/${item?.postId}`} className="featured-total flex items-center gap-1">
                      <span>Lượt xem{sizes.width > 420 && ":"}</span>
                      <span className="text-[#c80000]">{item?.viewsCount || "0"}</span>
                    </Link>
                    <Link href={`/forum/post/${item?.slug}/${item?.postId}`} className="featured-total flex items-center gap-1">
                      <span>Lượt thích{sizes.width > 420 && ":"}</span>
                      <span className="text-[#c80000]">{item?.likesCount || "0"}</span>
                    </Link>
                    <Link href={`/forum/post/${item?.slug}/${item?.postId}`} className="featured-total flex items-center gap-1">
                      <span>Lượt chia sẻ{sizes.width > 420 && ":"}</span>
                      <span className="text-[#c80000]">{item?.shareCount || "0"}</span>
                    </Link>
                  </div>
                  <div className={`text-xs mt-1 sm:text-sm text-[#747272] flex ${sizes.width > 361 ? "flex-row" : "flex-col"} gap-1`}>
                      <div>{"Người đăng: "}
                      <Link
                        className="text-[#FF0808] hover:underline"
                        href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
                      >
                        {item?.user?.name}
                      </Link></div>
                      {sizes.width > 361 && "-"}
                      <div>
                      {"Ngày: "}
                      {moment(item?.publishDate).format("DD/MM/YYYY")}
                      </div>
                    </div>
                </div>
              </Link>
            </div>
          );
        }
      })}
    </div>
  );
}

export default FeaturedPost;
