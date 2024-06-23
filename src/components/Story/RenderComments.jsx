import { useEffect, useState } from "react";
import { Comments } from "./StoryComment/Comments";

export default function RenderComments({
  story,
  items,
  onCallback,
  setShowComment,
}) {
  const [comments, setComments] = useState(items);
  useEffect(() => {
    setComments(items);
  }, [items]);
  return (
    <div className=" fixed w-full h-full left-0 top-0 z-[99999] bg-white  pb-2 pl-2 pr-2 pt-2">
      <div className="flex text-indigo-500 font-medium hover:underline">
        <button onClick={() => setShowComment(false)}>Đóng</button>
      </div>
      <div className="pr-4 mt-6 pb-[30px]">
        <Comments
          comments={comments}
          setComments={setComments}
          feed={story}
          onCallback={onCallback}
        />
      </div>
    </div>
  );
}
