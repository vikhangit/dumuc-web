import { useMemo, useState } from "react"
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import { nestedComment } from "@utils/covertCommets"

export const Comments = ({ comments, setComments, feed, onCallback, setOpenLogin}) => {
    const [qoute, setQoute] = useState([])
    console.log(comments)

    return (
        <div>
            <CommentForm feed={feed} setComments={setComments} qoute={qoute} setQoute={setQoute} root={true} onCallback={onCallback} setOpenLogin />
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
                                    setOpenLogin={setOpenLogin}
                                />
                            )
                        })}
                    </div>
                </div>
            )
        }
