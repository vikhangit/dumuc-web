import React, { useState } from 'react'
import SingleComment from './SingleComment';

export default function Comment({comment, feed, setComments, qoute, setQoute, onCallback}) {
  const [showReply, setShowReply] = useState(false)
  return (
    <div>
        <SingleComment 
          item={comment} 
          feed={feed} 
          setComments={setComments} 
          qoute={qoute} 
          setQoute={setQoute} 
          showReply={showReply}
          setShowReply={setShowReply}
          onCallback={onCallback}
        />
            {comment.children && comment.children.length > 0  && comment.children.map((item, index) => 
              <div className="pl-[35px] sm:pl-[40px] relative">
              <Comment comment={item} feed={feed} setComments={setComments} qoute={qoute} setQoute={setQoute} onCallback={onCallback} />
            </div>
         )}
    </div>
  );
}
