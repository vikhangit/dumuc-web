import { useMemo, useState } from "react"
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import { nestedComment } from "@utils/covertCommets"

export const Comments = ({ comments, setComments, post, onCallback}) => {
    const [qoute, setQoute] = useState([])
    console.log(comments)

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
