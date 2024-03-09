import Image from "next/image";

const FeedComment = ({setShowComment, item}) => {
  return (
    <a
      onClick={setShowComment}
      title="Bình luận"
      className="flex items-center text-base sm:text-lg text-gray-500 hover:underline hover:text-gray-900 feed-tool cursor-pointer"
    >
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 mr-1 cmt"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg> */}
      <Image width={0} height={0} sizes="100vw" src="/icons/comment-1.jpg" alt="" className='w-[16px] h-[20px] mr-1' />
      {item?.commentsCount || "0"} Bình luận
    </a>
  );    
}
export default FeedComment;