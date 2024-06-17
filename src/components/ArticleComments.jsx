"use client";
import React, { useEffect, useRef, useState } from "react";
import { Comments } from "./ForumsComment/Comments";
import { nestedComment } from "@utils/covertCommets";
import { getPost } from "@apis/posts";

const ArticleComments = ({ post, user }) => {
  const [comments, setComments] = useState(nestedComment(post?.comments));
  useEffect(() => {
    setComments(nestedComment(post?.comments));
  }, [post]);
  const onCallback = () => {
    getPost({ postId: post?.postId }).then((data) =>
      setComments(nestedComment(data?.comments))
    );
  };
  return (
    <Comments
      comments={comments}
      setComments={setComments}
      post={post}
      onCallback={onCallback}
      user={user}
    />
  );
};

export default ArticleComments;
