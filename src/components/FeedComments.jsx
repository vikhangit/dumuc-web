import { useEffect, useState } from "react";
import { Comments } from "./FeedComment/Comments";
import { nestedComment } from "@utils/covertCommets";

const FeedComments = ({ feed, items, onCallback}) => {
  const [comments, setComments] = useState(nestedComment(items))
  useEffect(() => {
    setComments(nestedComment(items))
  }, [items])
  return (
    <Comments comments={comments} setComments={setComments} feed={feed} onCallback={onCallback}/>
  );
};

export default FeedComments;
