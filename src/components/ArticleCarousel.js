"use client"
import React, {useRef } from "react";
import { Dropdown } from "flowbite-react";
import { Avatar } from "antd";

import ArticleBookmark from "@components/ArticleBookmark";
import moment from "moment";
import Image from "next/image";

const ArticleCarousel = ({items, title, moreAction, width = 200 }) => {
    const elementRef=useRef(null);
    const slideRight=(element)=>{
        element.scrollLeft+=500;
    }
    const slideLeft=(element)=>{
        element.scrollLeft-=500;
    }

    const arrowLeft = <svg xmlns="http://www.w3.org/2000/svg"  
        fill="none" viewBox="0 0 24 24" 
        onClick={()=>slideLeft(elementRef.current)} 
        strokeWidth={1.5} stroke="currentColor" 
        className="w-8 h-8 absolute rotate-180 top-[35%]
        bg-gray-300 cursor-pointer p-1 rounded-full text-white">
        <path strokeLinecap="round" 
        strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>

    const arrowRight = <svg xmlns="http://www.w3.org/2000/svg"
        onClick={()=>slideRight(elementRef.current)} 
        fill="none" viewBox="0 0 24 24" 
        strokeWidth={1.5} stroke="currentColor" 
        className="w-8 h-8 absolute right-0 top-[35%]
        bg-gray-300 cursor-pointer p-1 rounded-full text-white">
        <path strokeLinecap="round" 
        strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>

    return (
        <aside 
            aria-label="Related articles" 
            className="py-4 bg-white" 
            style={{backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)"}}
        >
            <div class="px-4 mx-auto max-w-screen-xl">
                <div className="flex justify-between">
                    {title && (
                        <h2 class="text-lg font-semibold text-gray-900">{title}</h2>
                    )}
                    {moreAction && (
                        <div className="mr-1">
                            Xem tất cả
                        </div>
                    )}
                </div>
                <div className="w-full relative">
                    {arrowLeft}
                    <div className='flex overflow-scroll overflow-x-auto gap-4 scrollbar-hide scroll-smooth' ref={elementRef}>
                        {items?.map((item, index) => {
                            const url = `/forum/post/${item?.slug}/${item?.postId}`;
                            const photos = item?.body?.blocks.filter(x => x.type === "image");
                            const photo = item?.photo ? item?.photo : photos[0]?.data?.file?.url
                            return (
                                <article className={`w-[${width}px] flex-shrink-0 rounded-lg bg-white hover:scale-110 transition-all mt-[20px] cursor-pointer`} key={index}>
                                    {photo && <a href={url}>
                                        <Image width={0} height={0} sizes="100vw" src={photo} className="mb-2 rounded-t-lg w-full h-32" alt={item?.title} />
                                    </a>
                                    }
                                    <div className="mx-2 flex justify-between">
                                        <div className="text-gray-500 text-xs">16 phút đọc</div>
                                        <div className="flex">
                                            <ArticleBookmark id={item?.postId} currentUrl={url} />
                                            <Dropdown 
                                                id="custom-dropdown" 
                                                placement="left-start"  
                                                renderTrigger={() =>
                                                <span>
                                                    <svg class="w-5 h-5 text-gray-900 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"/>
                                                    </svg>
                                                </span>
                                            }>
                                                <Dropdown.Item>
                                                    <div class="block px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Chặn người dùng</div>
                                                </Dropdown.Item>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    <a href={url} className="m-2 line-clamp-2 text-base font-semibold leading-tight text-gray-900">
                                        {item?.title}
                                    </a>
                                    <div className='flex my-2 mx-2'>
                                        <div className='flex items-center'>
                                            <Avatar shape='circle' src={item?.author?.photo ? item?.author?.photo : '/dumuc/avatar.png'} size={20} />
                                            <a className="text-xs font-medium px-2" href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}>{item?.author?.name}</a>
                                        </div>
                                        <li className='mt-0.5 text-xs font-normal text-gray-500 ml-0 sm:ml-2 list-none sm:list-disc'>{moment(item.publishDate).format("MMMM DD")}</li>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                    {arrowRight}
                </div>
            </div>
        </aside>
    )
}
export default ArticleCarousel;

