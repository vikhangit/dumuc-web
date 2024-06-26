import Image from "next/image";

const FeedComment = ({ setShowComment, count }) => {
  return (
    <a
      onClick={setShowComment}
      title="Bình luận"
      className="flex items-center text-base sm:text-lg text-gray-500 hover:underline hover:text-gray-900 feed-tool cursor-pointer"
    >
      <Image
        width={0}
        height={0}
        sizes="100vw"
        src="/icons/comment-1.jpg"
        alt=""
        className="w-[16px] h-[20px] mr-1"
      />
      {count} Bình luận
    </a>
  );
};
export default FeedComment;
