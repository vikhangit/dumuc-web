import React, { useState } from "react";
import SingleComment from "./SingleComment";

export default function Comment({
  comment,
  post,
  setComments,
  qoute,
  setQoute,
  onCallback,
  user,
}) {
  const [showReply, setShowReply] = useState(false);
  const [showChild, setShowChild] = useState(true);
  return (
    <div className="relative">
      {comment?.children && comment?.children?.length > 0 && (
        <div
          className={`absolute w-[20px] left-[20px] bottom-[15px] bg-black z-20 h-[1px]`}
        ></div>
      )}
      <SingleComment
        item={comment}
        post={post}
        setComments={setComments}
        qoute={qoute}
        setQoute={setQoute}
        showReply={showReply}
        setShowReply={setShowReply}
        onCallback={onCallback}
        user={user}
      />
      {showChild &&
        comment.children &&
        comment.children.length > 0 &&
        comment.children.map((item, index) => (
          <div key={index} className="pl-10 relative">
            <div className="w-[25px] h-[1px] absolute top-[30px] left-[20px] bg-black"></div>
            <Comment
              comment={item}
              post={post}
              setComments={setComments}
              qoute={qoute}
              setQoute={setQoute}
              onCallback={onCallback}
            />
          </div>
        ))}

      {comment?.children && comment?.children?.length > 0 && (
        <button
          className="px-12 text-sm font-semibold my-1 hover:underline"
          onClick={() => {
            setShowChild(!showChild);
          }}
        >
          {showChild ? "Ẩn bớt" : `Xem thêm`} bình luận
        </button>
      )}
    </div>
  );
}
