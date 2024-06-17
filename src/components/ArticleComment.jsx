"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const ArticleComment = ({ url = "#comments", count }) => {
  const [counts, setCounts] = useState(count);
  useEffect(() => {
    setCounts(count);
  }, [count]);
  const icon = () => (
    <Image
      width={0}
      height={0}
      sizes="100vw"
      src="/icons/comment-1.jpg"
      alt=""
      className="w-[16px] h-[16px]"
    />
  );

  return (
    <Link
      href={url}
      title="Bình luận"
      className="flex items-center text-center gap-1 article-tool"
    >
      {icon()}
      <span className="font-semibold sm:font-normal text-xs sm:text-sm">
        {counts} Bình luận
      </span>
    </Link>
  );
};
export default ArticleComment;
