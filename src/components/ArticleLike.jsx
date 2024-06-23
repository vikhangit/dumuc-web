"use client";
import {
  createUserLike,
  deleteUserLike,
  getProfile,
  updateProfile,
} from "@apis/users";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

const ArticleLike = ({ item, currentUrl, user, usingUser }) => {
  const router = useRouter();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item?.likesCount || 0);
  useEffect(() => {
    setLikesCount(item?.likesCount);
    const find = item?.likesUser?.find((x) => x?.userId === user?.uid);
    if (find) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [item, user]);
  const icon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );

  const iconActive = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4 text-[#c80000]"
    >
      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
    </svg>
  );
  if (user) {
    if (liked) {
      return (
        <button
          type="button"
          onClick={() => {
            deleteUserLike(
              {
                likeType: "post",
                likeValue: item?.postId,
              },
              user?.accessToken
            ).then(() => {
              setLiked(false);
              setLikesCount(
                likesCount ? (likesCount > 0 ? likesCount - 1 : 0) : 0
              );
            });
          }}
          tooltip="Bỏ like"
        >
          <div className="flex items-center text-center gap-1 text-center text-[#c80000] article-tool font-semibold sm:font-normal text-xs sm:text-sm">
            {iconActive()}
            <span className="text-[#c80000]">{likesCount} lượt thích</span>
          </div>
        </button>
      );
    } else {
      return (
        <button
          type="button"
          onClick={() => {
            createUserLike(
              {
                likeType: "post",
                likeValue: item?.postId,
                user: usingUser,
              },
              user?.accessToken
            ).then(() => {
              setLiked(true);
              setLikesCount(likesCount + 1);
            });
          }}
          tooltip="Like"
        >
          <div className="flex items-center text-center gap-1 text-center font-semibold sm:font-normal text-xs sm:text-sm article-tool">
            {icon()}
            <span className="">{likesCount} lượt thích</span>
          </div>
        </button>
      );
    }
  } else {
    return (
      <button
        type="button"
        onClick={() => {
          router.push(`/auth?url_return=${currentUrl}`);
        }}
        tooltip="Thích"
      >
        <div className="flex items-center text-center gap-1 text-center font-semibold sm:font-normal text-xs sm:text-sm article-tool">
          {icon()}
          <span className="">{likesCount} lượt thích</span>
        </div>
      </button>
    );
  }
};
export default ArticleLike;
