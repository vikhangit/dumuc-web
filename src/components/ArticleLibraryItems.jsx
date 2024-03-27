"use client"
import React from "react";
import Link from 'next/link';
import moment from "moment";
import ArticleMeta from "@components/ArticleMeta";
import Image from "next/image";
import { useWindowSize } from "@hooks/useWindowSize";

const ArticleLibraryItems = ({ items, status = 0,onCallback }) => {
  const sizes = useWindowSize()
    return (
      <div className="post-list">
        <div>
            {items &&
            items?.map((item, index) => {
            const url = `/forum/post/${item?.slug}/${item?.postId}`;
            
            const photos = item?.body?.blocks?.filter(x => x.type === "image");
            const photo =photos && photos?.length > 0 && photos[0]?.data?.file?.url
            const photosLink = item?.body?.blocks?.filter(x => x.type === "imageInline");
            const photoLink = photosLink && photosLink?.length > 0 && photosLink[0]?.data?.url

            return (
              item?.isActive &&
              <div className='my-8 mx-4' key={index}>
                <article className="article-item mb-14 flex gap-x-8 gap-y-4 flex-col sm:flex-row">
                  <div className="">
                    {
                      photo ? <a href={url}>
                      <Image
                      width={0} height={0} sizes="100vw"
                        alt={item?.title}
                        className="w-full sm:w-[180px] h-full sm:h-[135px] object-cover"
                        src={photo}
                      />
                    </a> : photoLink && <a href={url}>
                      <img
                        alt={item?.title}
                        className="w-full sm:w-[180px] h-full sm:h-[135px] object-cover"
                        src={photoLink}
                      />
                    </a>
                    }
                  </div>
                  <div className='flex flex-col pr-4 w-full'>
                    <a href={url} className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-gray-900">
                      {item?.title}
                    </a>
                    <div className="line-clamp-3 font-light text-base">{item?.description}</div>
                    <ArticleMeta item={item} onCallback={onCallback} />
                  </div>
                </article>
              </div>
            )
            })}
        </div>
      </div>
    );
};

export default ArticleLibraryItems;
