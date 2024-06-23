import { getPostsByCategory } from "@apis/posts";
import { auth } from "@utils/firebase";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function CategoryItem({ sub, user }) {
  const [posts, setPosts] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    getPostsByCategory({
      category: sub?.categoryId,
    }).then((x) => {
      const myPost = x?.filter((a) => a?.userId === user?.uid);
      if (myPost && myPost?.length > 0) {
        setPosts(x);
      } else {
        const publishPosts = x?.filter((a) => a?.isPrivate === false);
        setPosts(publishPosts);
      }
    });
  }, []);
  useEffect(() => {
    posts &&
      posts?.map((post) => {
        setCommentsCount(commentsCount + post?.commentsCount);
      });
  }, [posts]);
  const url = `/forum/topic/${sub.slug}/${sub.categoryId}`;

  return (
    <div
      key={sub?.categoryId}
      className="grid grid-cols-1 items-center overflow-y-hidden xl:grid-cols-2 p-4 border-b border-gray-200 gap-2"
    >
      <div class="">
        <div class="flex items-center gap-x-2">
          <div className="h-full pl-2 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-[#c80000]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          </div>
          <div class="font-medium">
            <Link
              href={url}
              className="text-base capitalize hover:underline text-[#2A2727]"
            >
              {sub?.name}
            </Link>
            <div className="line-clamp-3 text-sm text-[#2A2727]">
              {sub?.description}
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row sm:gap-x-4 ml-[42px] sm:ml-0">
        <div className="flex flex-none gap-x-6 sm:gap-x-4 sm:justify-between items-center px-0 sm:px-2 sm:px-0">
          <Link
            href={url}
            className="w-auto text-xs sm:text-sm  items-start sm:items-center flex sm:flex-col gap-1 font-normal text-[#838383] hover:underline hover:text-gray-900"
          >
            <div>{posts?.length}</div>
            <div>Bài viết</div>
          </Link>
          <Link
            href={url}
            className="w-auto text-xs sm:text-sm  items-start sm:items-center flex gap-1 sm:flex-col font-normal text-[#838383] cursor-pointer hover:underline hover:text-gray-900"
          >
            <div>{commentsCount}</div>
            <div>Bình luận</div>
          </Link>
        </div>
        <div className="w-full mt-2 sm:mt-0 hidden sm:block">
          {posts[0] && (
            <div className="w-full items-center bg-gray-100 p-2.5 rounded text-xs font-medium text-gray-500">
              <Link
                className="line-clamp-2 text-justify hover:underline"
                href={`/forum/post/${posts[0]?.slug}/${posts[0]?.postId}`}
              >
                {posts[0]?.title}
              </Link>
              <div className="text-xs">
                <Link
                  className="text-[#c80000] hover:underline"
                  href={`/author/${posts[0]?.author?.slug}/${posts[0]?.author?.authorId}`}
                >
                  {posts[0]?.user?.name}
                </Link>
                {" - "}
                {moment(posts[0]?.publishDate).format("DD.MM")}{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
