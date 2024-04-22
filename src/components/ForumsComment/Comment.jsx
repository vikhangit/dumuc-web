import React, { useState } from "react";
import SingleComment from "./SingleComment";

export default function Comment({
  comment,
  post,
  setComments,
  qoute,
  setQoute,
  onCallback,
}) {
  const [showReply, setShowReply] = useState(false);
  return (
    <div>
      <SingleComment
        item={comment}
        post={post}
        setComments={setComments}
        qoute={qoute}
        setQoute={setQoute}
        showReply={showReply}
        setShowReply={setShowReply}
        onCallback={onCallback}
      />
      {comment.children &&
        comment.children.length > 0 &&
        comment.children.map((item, index) => (
          <div key={index} className="pl-[15px] sm:pl-[20px] md:pl-10 relative">
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
    </div>
  );
}
