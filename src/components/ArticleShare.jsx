"use client";
import { CiShare2 } from "react-icons/ci";
import { FacebookShareButton } from "react-share";
const ArticleShare = ({ item }) => {
  const excerpt = item?.body?.blocks?.filter((x) => x.type === "paragraph")[0]
    ?.data?.text;

  return (
    <div className="mx-2 flex items-center font-semibold sm:font-normal text-xs sm:text-sm hover:underline hover:text-gray-900">
      <FacebookShareButton
        key="share"
        url={`${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/forum/post/${item?.slug}/${item?.postId}`}
        quote={excerpt}
        hashtag="#dumuc"
        className="gap-1 flex items-center text-center gap-1 article-tool"
      >
        <CiShare2 size={16} />
        Chia sẻ
      </FacebookShareButton>
    </div>
  );
};

export default ArticleShare;
