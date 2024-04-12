import {  useState } from "react"
import Comment from "./Comment"
import dynamic from "next/dynamic";
const CommentForm = dynamic( () => {
    return import( './CommentForm' );
  }, { ssr: false } );

export const Comments = ({ comments, setComments, feed, onCallback}) => {
    const [qoute, setQoute] = useState([])
    console.log(comments)

    return (
        <div>
            <CommentForm feed={feed} setComments={setComments} qoute={qoute} setQoute={setQoute} root={true} onCallback={onCallback} />
            <div className="mt-[10px]">
                {comments?.length > 0 &&
                    comments.map((comment, index) => {
                            return (
                                <Comment
                                    key={comment?.commentId} 
                                    comment={comment}
                                    feed={feed}
                                    setComments={setComments}
                                    qoute={qoute}
                                    setQoute={setQoute}
                                    onCallback={onCallback}
                                />
                            )
                        })}
                    </div>
                </div>
            )
        }
