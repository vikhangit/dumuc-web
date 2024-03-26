"use client";
import Image from "next/image";
import { FacebookShareButton } from "react-share";
const NewFeedShare = ({ item }) => {
  return (
    <div className="flex items-center justify-center text-sm font-medium text-white w-10 h-10 rounded-full bg-[#c80000]">
      <FacebookShareButton
        key="share"
        url={`${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/forum/post/${item?.slug}/${item?.postId}`}
        quote={item?.description}
        hashtag="#dumuc"
        style={{ display: "flex", flexDirection: "row" }}
        className="flex items-center"
      >
        <Image width={0} height={0} sizes="100vw" className='w-4 h-4' alt="" src="/icons/link-white.png" />
      </FacebookShareButton>
    </div>
  );
};

export default NewFeedShare;
