import React, { useState } from "react";
import SingleComment from "./SingleComment";

export default function Comment({
  comment,
  feed,
  setComments,
  qoute,
  setQoute,
  onCallback,
  setOpenLogin,
}) {
  const [showReply, setShowReply] = useState(false);
  const [showChild, setShowChild] = useState(true);
  return (
    <div className="relative ">
      {/* {comment?.children && comment?.children.length > 0 && (
        <div className="w-[2px] h-full absolute top-6 sm:top-8 xl:top-10 left-5 bg-black"></div>
      )} */}
      {comment?.children && comment?.children?.length > 0 && (
        <div
          className={`absolute w-[20px] left-[20px] bottom-[15px] bg-black z-20 h-[1px]`}
        ></div>
      )}
      <SingleComment
        item={comment}
        feed={feed}
        setComments={setComments}
        qoute={qoute}
        setQoute={setQoute}
        showReply={showReply}
        setShowReply={setShowReply}
        onCallback={onCallback}
        setOpenLogin={setOpenLogin}
        showChild={showChild}
      />
      {showChild &&
        comment.children &&
        comment.children.length > 0 &&
        comment.children.map((item, index) => (
          <div key={index} className="pl-[35px] sm:pl-[40px] relative h-full">
            <div className="w-[25px] h-[1px] absolute top-[30px] left-[20px] bg-black"></div>

            <Comment
              comment={item}
              feed={feed}
              setComments={setComments}
              qoute={qoute}
              setQoute={setQoute}
              onCallback={onCallback}
              setOpenLogin={setOpenLogin}
              showChild={showChild}
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
