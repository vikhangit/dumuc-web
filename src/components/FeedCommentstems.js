"use client"
import React, { useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import { message} from "antd";

import { createComment, createCommentReply, getFeed } from "@apis/feeds";
import _ from "lodash";
import { IoImageOutline, IoSend } from "react-icons/io5";

import moment from "moment";

import FeedCommentReplyModal from "./FeedCommentReplyModal";
import Image from "next/image";
import { uploadImage } from "@apis/other";
import { Spinner } from "flowbite-react";
import ModalImageZoom from "./ModalImageZoom";
import { IoMdCloseCircle } from "react-icons/io";
import { useWindowSize } from "@hooks/useWindowSize";
import FeedCommentReplyItems from "./FeedCommentReplyItems";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
export default function FeedCommentstems({items, onCallback,feed}) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(items);
  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [loadingImage, setLoadingImage] = useState(false)
  const [focusComment, setFocusComment] = useState(false)
  const sizes = useWindowSize()
  const refImage = useRef();

  //comments
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [commentId, setCommentId] = useState();
  const [replyToName, setReplyToName] = useState();
  const [openImage, setOpenImage] = useState();
  const [imageList, setImageList] = useState([])
  const [index, setIndex] = useState(0);
  const [showReply, setShowReply] = useState(-1)
  const handleChange = () => (e) => {
    setFocusComment(true)
    setLoadingImage(true);
   if(e?.target?.files){
    let array = []
    for (let index = 0; index < e?.target?.files?.length; index++) {
      array.push(e?.target?.files[index])
    }
    let newPhoto = [];
    array.map(async (x) => {
      uploadImage(x, user?.accessToken).then((data) => {
        console.log(data?.url)
        newPhoto.push(`${data?.url}`)
        setPhotos([...photos, ...newPhoto]);
      }
      );
    })
  }
  setLoadingImage(false)
  };

  const onCreateReply = (values, next) => {
  
    createCommentReply({
      ...values, 
      feedId: feed?.feedId,
    }, user?.accessToken)
    .then((result) => {
      if (result?.status === "error") {
        message.error(result.message);
      } else {
        getFeed({
          feedId: feed?.feedId,
        })
        .then(results => {
          setComments(results?.comments);
          onCallback()
        })
        next();
      }
    });
  };
  return (
    <div>
        <div>
          {comments &&
            comments?.map((item, index) => {              
             return <div className="flex flex-row my-4" key={index}>
                <div className="flex justify-between my-2">
                  <Image width={0} height={0} sizes="100vw" className="w-10 h-10 rounded-full" src={item?.user?.photo ? item?.user?.photo : '/dumuc/avatar.png'} alt={item?.user?.name} />
                  <div className="mx-2 ">
                    <div className="relative">
                    {item?.replies && item?.replies.length > 0 && <div className="absolute w-[0.5px] h-[calc(100%-25px)] bg-gray-400 -left-[30px] top-[50px]"></div>}
                    <div className="text-sm font-semibold">{item?.user?.name}</div>
                    {/* <div className={`grid grid-cols-3 justify-center items-center gap-x-2 ${item?.photos?.length > 0 && "mb-2 mt-2"}`}>
                      {
                        item?.photos?.map((photo, index) => <div className="w-full h-full" 
                        onClick={() => {
                          setOpenImage(true);
                          setImageList(item?.photos)
                          setIndex(index)
                        }}
                        >
                          {
                            <Image alt="" width={0} height={0} sizes="100vw" src={photo} className="w-full h-full rounded-lg" />
                          }
                        </div> )
                      }
                    </div> */}
                    {item?.photos?.length > 0 && (
        <div
          className={`w-full grid ${
            item.photos?.slice(0, 3).length === 3
              ? "grid-cols-3" :
              item.photos?.slice(0, 3).length === 2 ? "grid-cols-2"
              : "grid-cols-1"
            }  gap-2 mt-4 ${item?.photos?.length > 0 && "mb-2 mt-2"}`}
          id="photo"
        >
          {item?.photos?.slice(0, 3).map((photo, indexC) => {
            return (
              <div
                key={indexC}
                className={`rounded-md w-full h-full`}
              >  
                <a
                  onClick={() => {
                    setOpenImage(true);
                    setImageList(item?.photos)
                    setIndex(index)
                  }}
                  className={`w-full relative cursor-pointer h-full`}
                >
                  <Image
                    width={0}
                    height={0}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    sizes="100vw"
                    className="rounded-lg w-full h-full"
                    src={photo}
                    alt={photo}
                  />
                  {item?.photos?.length > 3 &&
                    indexC === item.photos?.slice(0, 3).length - 1 && (
                      <div className="absolute top-0 right-0 bg-black bg-opacity-60 w-full h-full flex justify-center items-center rounded-lg">
                        <p className="text-xl text-white text-center">
                          +{item?.photos?.length - 3}
                        </p>
                      </div>
                    )}
                </a>
              </div>
            );
          })}
          
        </div>
      )}
                    <div className="text-sm">{item?.body}</div>
                    <div className="text-sm text-gray-500">
                      {moment(item.createdAt).fromNow()} 
                      <button 
                        className="text-[#c80000] font-bold cursor-pointer ml-2" 
                        type="button" 
                        onClick={() => {
                          if (user) {
                            setCommentId(item?.commentId)
                            setReplyToName(item?.user?.name)
                            setIsCommentModal(true)
                            setShowReply(index)
                          } else {
                            router.push('/auth')
                          }
                        }}
                      >Trả lời</button>
                    </div>
                    <div className="mt-4"></div>
                    {
                      showReply === index && <FeedCommentReplyModal
                      commentId={commentId}
                      replyToName={replyToName}
                      visible={isCommentModal}
                      setIsCommentModal={setIsCommentModal}
                      onCreateReply={onCreateReply}
                      onCancel={() => setIsCommentModal(false)}
                      onCallback={onCallback}
                      user={user}
                    />
                    }
                    </div>
                    <div>{item?.replies &&
        item?.replies.map((reply, index) => {
       return <FeedCommentReplyItems />
      })}</div>
                  </div>
                </div>
              </div>
})}
        </div>
        <ModalImageZoom openImage={openImage} setOpenImage={setOpenImage} imageList={imageList} index={index}/>
    </div>
  )
}
