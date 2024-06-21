import { useState } from "react";
import Comment from "./Comment";
import dynamic from "next/dynamic";
const CommentForm = dynamic(
  () => {
    return import("./CommentForm");
  },
  { ssr: false }
);

export const Comments = ({
  comments,
  setComments,
  feed,
  onCallback,
  setOpenLogin,
}) => {
  const [qoute, setQoute] = useState([]);
  const [showChild, setShowChild] = useState(true);
  console.log(comments);

  return (
    <div>
      <CommentForm
        feed={feed}
        setComments={setComments}
        qoute={qoute}
        setQoute={setQoute}
        root={true}
        onCallback={onCallback}
        setOpenLogin
      />
      <div className="mt-[20px]">
        {/* {item?.children && item?.children.length > 0 && (
        <div className="w-[2px] h-full absolute top-6 sm:top-8 xl:top-10 left-5 bg-black"></div>
      )} */}
        {comments?.length > 0 &&
          comments.map((comment, index) => {
            return (
              <Comment
                showChild={showChild}
                key={comment?.commentId}
                comment={comment}
                feed={feed}
                setComments={setComments}
                qoute={qoute}
                setQoute={setQoute}
                onCallback={onCallback}
                setOpenLogin={setOpenLogin}
              />
            );
          })}
      </div>
    </div>
  );
};
