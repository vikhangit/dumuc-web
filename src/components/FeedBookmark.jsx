"use client";
import { createUserBookmark, deleteUserBookmark } from "@apis/users";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FeedBookmark = ({ currentUrl = "/", item, user, usingUser }) => {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const find = usingUser?.bookmarks?.find(
      (x) => x?.bookmarkValue === item?.feedId
    );
    if (find) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [usingUser]);

  const icon = () => (
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"
      />
    </svg>
  );

  const iconActive = () => (
    <svg
      class="w-5 h-5 sm:w-6 sm:h-6 text-[#c80000]"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 14 20"
    >
      <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z" />
    </svg>
  );

  const router = useRouter();
  //dot not login
  if (user) {
    if (saved) {
      return (
        <button
          key={item?.feedId}
          className="hover:bg-gray-100 mx-1"
          type="button"
          onClick={() => {
            setSaved(false);
            deleteUserBookmark(
              {
                bookmarkType: "feed",
                bookmarkValue: item?.feedId,
              },
              user?.accessToken
            );
          }}
          tooltip="Bỏ lưu"
        >
          {iconActive()}
        </button>
      );
    } else {
      return (
        <button
          className="hover:bg-gray-100 mx-1"
          type="button"
          onClick={() => {
            setSaved(true);
            createUserBookmark(
              {
                bookmarkType: "feed",
                bookmarkValue: item?.feedId,
                bookmark: item,
              },
              user?.accessToken
            );
          }}
          tooltip="Lưu lại"
        >
          {icon()}
        </button>
      );
    }
  } else {
    return (
      <button
        className="hover:bg-gray-100 mx-1"
        type="button"
        onClick={() => {
          router.push(`/auth?url_return=${currentUrl}`);
        }}
        tooltip="Lưu lại"
      >
        {icon()}
      </button>
    );
  }
};
export default FeedBookmark;
