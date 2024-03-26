"use client"
import { Avatar } from "antd";
import moment from "moment";
import Image from "next/image";

// author, published date of post
const ArticleAuthor = ({ item, authorSize = 40 }) => {
  return (
    <div className='flex items-center'>
      <div className='flex items-center'>
        <Image width={0} height={0} sizes="100vw" className="w-10 h-10" src={item?.author?.photo ? item?.author?.photo : '/dumuc/avatar.png'}/>
      </div>
      <a className="text-xs font-medium px-2" href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}>{item?.author?.name}</a>
      <div className='mt-0.5 text-xs font-normal text-gray-500 ml-0 sm:ml-2'>Ngày{moment(item.publishDate).format("DD/MM/YYYY")}</div>
    </div>
  );
};

export default ArticleAuthor;
