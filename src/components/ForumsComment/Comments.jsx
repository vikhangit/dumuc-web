import {  useState } from "react"
import Comment from "./Comment"
import dynamic from "next/dynamic";
const CommentForm = dynamic( () => {
    return import( './CommentForm' );
  }, { ssr: false } );

export const Comments = ({ comments, setComments, post, onCallback}) => {
    const [qoute, setQoute] = useState([])

    return (
        <div>
            <CommentForm post={post} setComments={setComments} qoute={qoute} setQoute={setQoute} root={true} onCallback={onCallback} />
            <div className="mt-[10px]">
                {comments?.length > 0 &&
                    comments.map((comment, index) => {
                            return (
                                <Comment
                                    key={comment?.commentId} 
                                    comment={comment}
                                    post={post}
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
