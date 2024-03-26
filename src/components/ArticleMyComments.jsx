"use client"
import React, { useState } from "react";
import _ from "lodash";
import moment from "moment";
import Image from "next/image";

const MyComments = ({items}) => {            
  return (
    items &&
      items?.map((item, index) => {
        const url = `/forum/post/${item?.post?.slug}/${item?.post?.postId}`;
        return (
          <div key={index} className="p-6">
            <a href={url} className="line-clamp-2 text-base font-medium leading-tight text-gray-900 hover:text-[#c80000]">
              {item?.post?.title}
            </a>
            <div className="flex flex-row my-4">
              <div className="flex justify-between my-2">
                <Image width={0} height={0} sizes="100vw" className="w-10 h-10 rounded-full" src={item?.user?.photo ? item?.user?.photo : '/dumuc/avatar.png'} alt={item?.user?.name} />
                <div className="mx-4">
                  <div className="text-sm font-semibold">{item?.user?.name}</div>
                  <div className="text-sm">{item?.body}</div>
                  <div className="text-sm text-gray-500">
                    {moment(item.createdAt).fromNow()} 
                  </div>
                  {item?.replies &&
                    item?.replies.map((reply, index) => (
                    <div className="flex mb-2" key={index}>
                      <div className="flex justify-between my-2">
                          <Image width={0} height={0} sizes="100vw" className="w-10 h-10 rounded-full" src={reply?.user?.photo ? reply?.user?.photo : '/dumuc/avatar.png'} alt={reply?.user?.name} />
                          <div className="mx-2">
                            <div className="text-sm font-semibold">{reply?.name}</div>
                            <div className="text-sm"><strong>@{reply?.replyToName}</strong> {reply?.body}</div>
                            <div className="text-sm text-gray-500">
                              {moment(reply?.createdAt).fromNow()}
                            </div>
                          </div>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        )
      })
  );
};

export default MyComments;
