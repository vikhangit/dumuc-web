"use client";
import { deletePostByUser, getPost, updatePostByUser } from "@apis/posts";
import ArticleBookmark from "@components/ArticleBookmark";
import { useWindowSize } from "@hooks/useWindowSize";
import { message } from "antd";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdMore } from "react-icons/io";
import ArticleComment from "./ArticleComment";
import ArticleLike from "./ArticleLike";
import ArticleShare from "./ArticleShare";
import { useRouter, useSearchParams } from "next/navigation";

const ArticleMeta = ({ item, user, usingUser, onCallback, commentsCount }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sizes = useWindowSize();
  const [postItem, setPostItem] = useState(item);
  const [commentCount, setCommentCount] = useState(commentsCount);
  useEffect(() => {
    setCommentCount(commentsCount);
  }, [commentsCount]);
  useEffect(() => {
    setPostItem(item);
  }, [item]);
  const onCallbackData = () => {
    getPost({ postId: postItem?.postId }).then((data) => {
      setPostItem(data);
    });
  };
  const url = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/forum/post/${postItem?.slug}/${postItem?.postId}`;

  return (
    <div
      className={`flex ${
        sizes.width > 365
          ? "flex-row items-center justify-between"
          : "flex-col-reverse items-end"
      } w-full mt-2 py-3 border-b border-t border-[#BFAEAE]"`}
    >
      <div className="w-full">
        <div className="flex items-center gap-x-4">
          <div className="flex items-center">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              className="w-10 h-10 rounded-full"
              src={
                postItem?.author?.photo
                  ? postItem?.author?.photo
                  : postItem?.author?.user?.photo
                  ? postItem?.author?.user?.photo
                  : "/dumuc/avatar.jpg"
              }
            />
          </div>
          <div>
            <div className="font-semibold sm:font-normal text-xs sm:text-sm text-[#747272]">
              <a
                className="text-[#FC1A1A] pr-2 font-medium"
                href={`/author/${postItem?.author?.slug}/$postItem?.author?.authorId}`}
              >
                {postItem?.author?.name}
              </a>
              Ngày {moment(postItem?.publishDate).format("DD/MM/YYYY")}
            </div>
            <div className="flex items-start flex-row gap-x-4 gap-y-2 mt-1">
              <ArticleComment count={commentCount} url={`${url}#comments`} />
              <ArticleLike
                currentUrl={url}
                item={postItem}
                user={user}
                usingUser={usingUser}
              />
              <ArticleShare item={postItem} />
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-end  ${sizes.width > 365 ? "w-auto" : "w-auto"}`}
      >
        {
          <div className="relative cursor-pointer group">
            <IoMdMore size={24} />
            <div className="absolute hidden group-hover:flex flex-col top-full right-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[80px] rounded p-1">
              {postItem.userId === user?.uid && (
                <Link
                  href={`/forum/post?id=${postItem?.postId}`}
                  className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                >
                  Sửa
                </Link>
              )}
              {postItem?.userId === user?.uid && (
                <Link
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    if (postItem?.isPrivate) {
                      return updatePostByUser(
                        {
                          ...postItem,
                          isPrivate: false,
                        },
                        user?.accessToken
                      ).then((result) => {
                        message.success("Công khai bài viết thành công");
                        onCallbackData();
                      });
                    } else {
                      return updatePostByUser(
                        {
                          ...postItem,
                          isPrivate: true,
                        },
                        user?.accessToken
                      ).then((result) => {
                        message.success("Ẩn bài viết thành công");
                        onCallbackData();
                      });
                    }
                  }}
                  className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                >
                  {postItem?.isPrivate ? "Hủy ẩn" : "Ẩn"}
                </Link>
              )}
              {postItem?.userId !== user?.uid && (
                <Link
                  href={``}
                  onClick={(e) => {
                    e.preventDefault();
                    let data = {
                      ...postItem,
                      isReport: true,
                    };
                    return updatePostByUser(data, user?.accessToken).then(
                      (result) => {
                        message.success(
                          "Chúng tôi sẽ xem xét báo cáo của bạn về bài viết này. Xin cảm ơn"
                        );
                        onCallbackData();
                      }
                    );
                  }}
                  className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                >
                  Báo cáo
                </Link>
              )}

              {postItem?.userId === user?.uid && (
                <Link
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    return deletePostByUser(
                      postItem?.postId,
                      user?.accessToken
                    ).then((result) => {
                      message.success("Xóa bài viết thành công");
                      router.push("/forum");
                    });
                  }}
                  className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                >
                  Xóa
                </Link>
              )}
            </div>
          </div>
        }
        <ArticleBookmark
          id={postItem?.postId}
          onCallback={onCallbackData}
          currentUrl={url}
        />
      </div>
    </div>
  );
};

export default ArticleMeta;
