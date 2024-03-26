"use client"

import Image from "next/image";

const NewFeedComment = ({onClick}) => {
  return (
    <a
      onClick={() => onClick(true)}
      title="Bình luận"
      className="flex items-center justify-center text-sm font-medium text-white bg-[#c80000] w-10 h-10 rounded-full cursor-pointer"
    >
      <Image width={0} height={0} sizes="100vw" className='w-4 h-4' alt="" src="/icons/message-2-white.png" />
    </a>
  );
        
}
export default NewFeedComment;