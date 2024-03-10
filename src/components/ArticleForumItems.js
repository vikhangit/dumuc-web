"use client";
import { useState } from "react";
import Link from "next/link";
import moment from "moment";

import { getPostsLoadMore } from "@apis/posts";
import Image from "next/image";
import { PiShareFatLight } from "react-icons/pi";
import { CiShare2 } from "react-icons/ci";
import { useWindowSize } from "@hooks/useWindowSize";

const ArticleForumItems = ({
  data,
  title,
  authorId,
  category,
  tagId,
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [posts, setPosts] = useState(data?.items);
  const [last, setLast] = useState(data?.last);
  const [isLastResult, setIsLastResult] = useState(
    data?.last === data?.lastest
  );
  const sizes = useWindowSize()
  const loadMore = () => {
    setLoadingMore(true);
    let payload = {};

    if (category) {
      if (category?.categoryParentId === "") {
        payload["categoryParent"] = category.categoryId;
      } else {
        payload["category"] = category.categoryId;
      }
    }

    if (authorId) {
      payload["author"] = authorId;
    }

    if (tagId) {
      payload["tag"] = tagId;
    }

    payload["limit"] = 10;
    payload["last"] = last;

    getPostsLoadMore(payload).then((result) => {
      setLast(result?.last);
      setIsLastResult(result?.last === result?.lastest);
      setLoadingMore(false);
      setPosts([...posts, ...result?.items]);
    });
  };

  return (
    <>
      {title && (
        <h2 class="pt-2 px-4 text-2xl font-bold text-gray-900">{title}</h2>
      )}
      {posts && (
        posts.map(async (item) => {
          const url = `/forum/post/${item?.slug}/${item?.postId}`;
          let comments = item?.comments;
          const expert = item?.body?.blocks?.filter(x => x.type ===
            "paragraph")[0]?.data?.text;
          return (
            <div
              key={item?.postId}
              className="overflow-y-hidden px-6 py-4 border-b border-gray-300 gap-x-0 xl:gap-x-2 space-none"
            >
              <div class="">
                <div class="flex items-center xl:space-x-4">
                  {/* <Image width={0} height={0} sizes="100vw"
                        className="hidden lg:inline w-10 h-10 rounded-full"
                        src={
                          item?.author?.photo
                            ? item?.author?.photo
                            : "/dumuc/avatar.png"
                        }
                        alt=""
                      /> */}
                  <div class="font-medium dark:text-white">
                    <div className="flex xl:items-center flex-col xl:flex-row justify-start">
                    <span class="bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded text-center w-fit">[Chủ đề]</span>
                    <Link href={url} className="font-bold text-xl hover:underline text-[#605F5F]">
                      {/* <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 xl:px-2.5 py-0.5 rounded">
                            Nổi bật
                          </span>{" "} */}
                       {item?.title?.charAt(0).toUpperCase()}{item?.title?.slice(1, item?.title?.length).toLowerCase()}
                    </Link>
                    </div>
                    <div className="text-sm text-[#747272]">
                      {"Người đăng: "}
                      <Link
                        className=" text-sm text-[#c80000] hover:underline"
                        href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
                      >
                        {item?.author?.name}
                      </Link>
                      {" - Ngày: "}
                      {moment(item?.publishDate).format("DD/MM/YYYY")}
                    </div>
                    <div className="font-normal text-xl mt-3 text-justify line-clamp-2 text-[#747272]" dangerouslySetInnerHTML={{
                      __html: expert
                    }}>

                      {/* {" "}<Link
                className="font-semibold text-xs sm:text-sm cursor-pointer hover:underline"
              href={url}
              >
                ...Xem thêm
              </Link> */}
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex items-center mt-5">
                <div class="w-full flex pt-3 border-t border-gray-300 justify-between">
                  <a
                    href={url}
                    class="gap-1 article-tool flex items-center text-xs sm:text-sm font-medium text-gray-500 hover:underline hover:text-gray-900"
                  >
                    <Image alt="" src="/icons/MdFlare.png" width={0} height={0} sizes="100vw" className="w-4 h-4" />
                    Đọc thêm
                  </a>
                  <a
                    href="#"
                    class="gap-1 article-tool flex items-center text-sm font-medium text-gray-500 hover:underline hover:text-gray-900"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    {item?.likesCount || "0"} Lượt thích
                  </a>
                  <a
                    href={`${url}#comments`}
                    class="gap-1 article-tool flex items-center text-sm font-medium text-gray-500 hover:underline hover:text-gray-900"
                  >
                    <Image width={0} height={0} sizes="100vw" src="/icons/comment-1.jpg" alt="" className='w-[16px] h-[16px]' />
                    {item?.commentsCount} Bình luận
                  </a>
                  <a
                    href={`${url}#comments`}
                    class="gap-1 article-tool flex items-center text-sm font-medium text-gray-500 hover:underline hover:text-gray-900"
                  >
                    <CiShare2 size={16} />
                    Chia sẻ
                  </a>
                </div>
                {/* <div className="w-full mt-2 sm:mt-0">
                  {comments?.length > 0 && (
                    <div className="items-center bg-gray-100 p-2.5 rounded text-xs font-medium text-gray-500 space-none">
                      <Link
                        className="line-clamp-2"
                        href={`${url}#comments`}
                      >
                        <svg
                          class="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                        {comments[0]?.body}
                      </Link>
                      <div className="text-xs">
                        {moment(comments[0].createdAt).format("MMMM DD")}{" "}
                        {comments[0]?.user?.name.toUpperCase()}
                      </div>
                    </div>
                  )}
                </div> */}
              </div>
            </div>
          );
        })
      )}
      {!isLastResult && loadMore && (
        <div className="text-center mx-10 mt-6 mb-4">
          {loadingMore ? (
            <button
              onClick={() => loadMore()}
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Đang tải
            </button>
          ) : (
            <button
              onClick={() => loadMore()}
              type="button"
              className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Xem thêm
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ArticleForumItems;
