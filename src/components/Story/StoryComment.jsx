import Image from "next/image";

const StoryComment = ({setShowComment, item}) => {
  return (
    <a
      onClick={setShowComment}
      title="Bình luận"
      className="flex items-center text-base sm:text-lg text-gray-500 hover:underline hover:text-gray-900 feed-tool cursor-pointer"
    >
      <Image width={0} height={0} sizes="100vw" src="/icons/comment-1.jpg" alt="" className='w-[16px] h-[20px] mr-1' />
      {item?.commentsCount || "0"} Bình luận
    </a>
  );    
}
export default StoryComment;