import React, { useEffect, useState } from "react";
import FeedLike from "./FeedLike";
import FeedComment from "./FeedComment";
import FeedShare from "./FeedShare";
import { Modal } from "flowbite-react";
import Image from "next/image";
import { message } from "antd";
import dynamic from "next/dynamic";
import {
  createUserFollow,
  deleteUserFollow,
  getProfile,
  updateProfile,
} from "@apis/users";
import Link from "next/link";
import FeedComments from "./FeedComments";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import { useWindowSize } from "@hooks/useWindowSize";
import { nestedComment } from "@utils/covertCommets";
import { getFeed } from "@apis/feeds";

const FeedLikeShareComment = ({ item, url, setOpenLogin, user, usingUser }) => {
  const sizes = useWindowSize();
  const [showLike, setShowLike] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comments, setComments] = useState(nestedComment(item?.comments));
  const [commentsCount, setCommentsCount] = useState(item?.commentsCount || 0);
  useEffect(() => {
    setComments(nestedComment(item?.comments));
  }, [item]);
  const onCallback = (feedId) => {
    getFeed({ feedId }).then((data) => {
      setComments(nestedComment(data?.comments));
      setCommentsCount(data?.commentsCount || 0);
    });
  };
  return (
    <div>
      <div class="flex space-x-6 justify-between">
        <FeedComment
          setShowComment={() => {
            setShowComment(!showComment);
          }}
          count={commentsCount}
        />
        <FeedLike
          item={item}
          setOpenLogin={setOpenLogin}
          user={user}
          usingUser={usingUser}
        />

        <FeedShare item={item} />
      </div>
      {showComment && (
        <div className="mt-5">
          <div className="flex justify-end mb-3">
            <button
              onClick={() => setShowComment(false)}
              className="text-xs font-semibold sm:text-sm hover:underline text-blue-600"
            >
              Ẩn
            </button>
          </div>
          <FeedComments
            items={comments}
            feed={item}
            onCallback={onCallback}
            setOpenLogin={setOpenLogin}
          />
        </div>
      )}
    </div>
  );
};

export default FeedLikeShareComment;
