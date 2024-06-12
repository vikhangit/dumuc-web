import { useEffect, useState } from "react";
import { Comments } from "./FeedComment/Comments";
import { nestedComment } from "@utils/covertCommets";

const FeedComments = ({ feed, items, onCallback, setOpenLogin }) => {
  const [comments, setComments] = useState(items);
  useEffect(() => {
    setComments(items);
  }, [items]);
  return (
    <Comments
      comments={comments}
      setComments={setComments}
      feed={feed}
      onCallback={onCallback}
      setOpenLogin={setOpenLogin}
    />
  );
};

export default FeedComments;
