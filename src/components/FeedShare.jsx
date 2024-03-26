"use client";
import { FacebookShareButton } from "react-share";
import { PiShareFatLight } from "react-icons/pi";
import Image from "next/image";
import { CiShare2 } from "react-icons/ci";
const FeedShare = ({ item }) => {
  return (
    <div className="flex items-center text-base sm:text-lg text-gray-500 hover:underline hover:text-gray-900">
      <FacebookShareButton
        key="share"
        url={`${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/forum/post/${item?.slug}/${item?.postId}`}
        quote={item?.description}
        hashtag="#dumuc"
        className="flex items-center feed-tool text-xs sm:text-sm"
      >
        {/* <PiShareFatLight size={20} /> */}
        {/* <Image width={0} height={0} sizes="100vw" src="/icons/share-1.png" alt="" className='w-7 h-7' /> */}
        <CiShare2 size={20} />
        <span className="ml-1">
        Chia sẻ
        </span>
      </FacebookShareButton>
    </div>
  );
};

export default FeedShare;
