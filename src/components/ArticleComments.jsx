"use client"
import React, { useEffect, useRef, useState } from "react";
import { Comments } from "./ForumsComment/Comments";
import { nestedComment } from "@utils/covertCommets";

const ArticleComments = ({ post, items, onCallback}) => {
  const [comments, setComments] = useState(nestedComment(items))
  useEffect(() => {
    setComments(nestedComment(items))
  }, [items])
  return (
    <Comments comments={comments} setComments={setComments} post={post} onCallback={onCallback}/>
  );
};

export default ArticleComments;
