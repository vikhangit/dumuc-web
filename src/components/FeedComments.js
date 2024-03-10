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
import { IoMdCloseCircle, IoMdMore } from "react-icons/io";
import { useWindowSize } from "@hooks/useWindowSize";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const FeedComments = ({ feed, items, onCallback}) => {
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
  const [showReply, setShowReply] = useState([])
  const [repFor, setRepFor] = useState(-1);
  const [showReplyC, setShowReplyC] = useState([])
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
      setShowReplyC([])
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
  console.log("first", comments)
  console.log("user", user)
  return (
    <div>
      {user ? 
        <div id="comments">
          {/* <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Bình luận</label> */}
         <div className="flex justify-between">
         <Image width={0} height={0} sizes="100vw"
              src={user?.phototoURL || "/dumuc/avatar.png"}
              alt=""
              className="rounded-full w-8 h-8"
            />
          <div className={`w-[calc(100%-40px)] border border-gray-300 rounded-lg p-2.5 bg-gray-100 ${!focusComment && "flex"}`}>
          <textarea 
            value={body}
            onClick={() => setFocusComment(true)}
            onChange={e => {
              setBody(e.target.value)
              // if (e.target.value === '') {
              //     setBodyError('Vui lòng nhập bình luận!')
              // } else {
              //   setBodyError('')
              // }
            }}
            id="message" 
            rows={focusComment ? "2" : "1"} 
            class="block w-full p-0 text-sm text-gray-900 border-0 shadow-none bg-gray-100" 
            style={{
              boxShadow: "none",
              resize: "none"
            }}
            placeholder="Bạn đang nghỉ gì?" 
          />
          <div className="flex justify-end gap-2">
            <label onClick={() => refImage.current.click()}>
              <IoImageOutline size={24} color="rgb(107 114 128)" />
            </label>
            {
              focusComment && <button onClick={() => {
                setLoading(true);
                if(body === "" && photos.length === 0){
                  message.error("Vui lòng nhập bình luận hoặc hình ảnh")
                  return;
                }else{
                  createComment({
                    photos,
                    body,
                    feedId: feed?.feedId,
                  }, user?.accessToken)
                  .then(() => {
                    
                    setLoading(false);
                    message.success("Đăng bình luận thành công");
                    setBody('')
                    setPhotos([])
                    setFocusComment(false)
                    onCallback();
                    setShowReply([])
                    getFeed({
                      feedId: feed?.feedId,
                    })
                    .then(results => {
                      setComments(results?.comments);
                    })
                  });
                }
              }}
              >
              <IoSend size={20} color="rgb(79 70 229)" />
              </button>
            }
            <input  type="file" id="comment" ref={refImage} className="hidden" multiple  onChange={handleChange()} />
            </div>
          </div>
         </div>
       {
        photos.length > 0 && <div className={`relative grid grid-cols-2 sm:grid-cols-3 ${sizes.width > 410 ? "h-40" : sizes.width > 350 ? "h-36" : "h-28"} overflow-y-auto justify-center items-center gap-2 ${photos.length > 0 && "mt-5"} scroll-quick-post pr-2`}>
            
        {
          photos?.map((photo, index) => <div className={`w-full relative ${sizes.width > 410 ? "h-36" : sizes.width > 350 ? "h-32" :  "h-24"}`}>
            <button 
                    onClick={() => {
                      photos.splice(index, 1)
                      setPhotos([...photos])
                    }}
                    className='absolute top-1.5 right-1.5'><IoMdCloseCircle size={20} color="red" /></button>
           <Image alt="" width={0} height={0} sizes="100vw" src={photo} className="w-full h-full rounded-lg object-cover" />
          </div> )
        }
        {
              photos.length > 0 &&  <button
              for={`comment`}
              htmlFor='comment'
              onClick={() => refImage.current.click()}
              className="cursor-pointer rounded-md bg-gray-200 rounded-md hover:bg-gray-300 flex justify-center items-center"
            >
              {
                  loadingImage ? <Spinner /> :
                <div className={`flex  justify-center items-center flex-col  ${sizes.width > 410 ? "h-36" : sizes.width > 350 ? "h-32" :  "h-24"} `}><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>Thêm ảnh</div>
                }
            </button>
            }
        <div className="w-full h-full flex justify-center items-center">{loadingImage && <Spinner />}</div>
      </div>
       }   
          
        </div>
        :
        <button 
          id="comments"
          onClick={() => router.push('/auth')}
            type="button" 
            class="my-4 px-5 py-2.5 text-sm font-medium text-center text-white bg-[#c80000] rounded-lg hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
          >Đăng nhập để bình luận</button>
      }

        <h3 className="mt-4">{feed?.commentsCount} Bình luận</h3>
        <div>
          {comments &&
            comments?.map((item, index) => {              
             return <div className="flex flex-row my-4 w-full" key={index}>
                <div className="flex justify-between my-2 w-full">
                  <Image width={0} height={0} sizes="100vw" className="w-10 h-10 rounded-full" src={item?.user?.photo ? item?.user?.photo : '/dumuc/avatar.png'} alt={item?.user?.name} />
                  <div className="mx-2 w-[calc(100%-45px)]">
                    <div className="relative">
                    {item?.replies && item?.replies.length > 0 && <div className={`absolute w-[0.5px] h-[calc(100%-10px)] bg-gray-400 -left-[30px] top-[50px]`} style={{
                    }}></div>}
                    <div className="text-sm font-semibold">{item?.user?.name}</div>
                    {item?.photos?.length > 0 && (
        <div
          className={`w-full grid grid-cols-3  gap-2 mt-4 ${item?.photos?.length > 0 && "mb-2 mt-2"}`}
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
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      {moment(item.createdAt).fromNow()} 
                      <button 
                        className="text-[#c80000] font-bold cursor-pointer ml-2" 
                        type="button" 
                        onClick={() => {
                          if (user) {
                            let rep = [];
                            setCommentId(item?.commentId)
                            setReplyToName(item?.user?.name)
                            setIsCommentModal(true)
                            if(showReply.length <= 0){
                              showReply?.push(index)
                            }else{
                              let a = showReply.findIndex(x => x === index)
                              if(a >=0){

                              }else{
                                showReply?.push(index)
                              }
                            }
                            setShowReply([...showReply])
                          } else {
                            router.push('/auth')
                          }
                        }}
                      >Trả lời</button>
                      <div className="relative cursor-pointer group flex items-center">
                        <IoMdMore size={18} />
                        <div className="absolute hidden group-hover:flex flex-col top-full -right-10 z-50 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[80px] rounded p-1">
                        <Link href="" className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Trích dẫn</Link>
                       { user?.email === item?.user?.email && <Link href={`/forum/post?id=${item?.postId}`} className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Sửa</Link>}
                       { user?.email === item?.user?.email &&  <Link href="" className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Xóa</Link>}
                        </div>
                        </div>
                    </div>
                    {
                      showReply.map(x => x === index && <FeedCommentReplyModal
                        commentId={commentId}
                        replyToName={replyToName}
                        visible={isCommentModal}
                        setIsCommentModal={setIsCommentModal}
                        onCreateReply={onCreateReply}
                        onCancel={() => setIsCommentModal(false)}
                        onCallback={onCallback}
                        user={user}
                      />) 
                    }
                    </div>
                    {item?.replies &&
                      item?.replies.map((reply, indexa) => {
                     return <div className="flex relative mt-4" key={indexa}>
                      {index < item?.replies?.length -1 &&<div className="absolute w-[0.5px] h-full bg-gray-400 -left-[30px] top-[25px]"></div>}
                      <div className="absolute w-[20px] h-[0.5px] bg-gray-400 top-[25px] -left-[30px]"></div>
                        <div className="flex justify-between my-2 w-full">
                            <Image width={0} height={0} sizes="100vw" className="w-10 h-10 rounded-full" src={reply?.user?.photo ? reply?.user?.photo : '/dumuc/avatar.png'} alt={reply?.user?.name} />
                            <div className="mx-2 w-full">
                              <div className="text-sm font-semibold">{reply?.name}</div>
                              <div className="text-sm"><strong>@{reply?.replyToName}</strong></div>
                              {reply?.photos?.length > 0 && (
        <div
          className={`w-full grid grid-cols-3
            }  gap-2 mt-4 ${reply?.photos?.length > 0 && "mb-2 mt-2"}`}
          id="photo"
        >
          {reply?.photos?.slice(0, 3).map((photo, indexC) => {
            return (
              <div
                key={indexC}
                className={`rounded-md w-full h-full`}
              >  
                <a
                  onClick={() => {
                    setOpenImage(true);
                    setImageList(reply?.photos)
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
                  {reply?.photos?.length > 3 &&
                    indexC === reply?.photos?.slice(0, 3).length - 1 && (
                      <div className="absolute top-0 right-0 bg-black bg-opacity-60 w-full h-full flex justify-center items-center rounded-lg">
                        <p className="text-xl text-white text-center">
                          +{reply?.photos?.length - 3}
                        </p>
                      </div>
                    )}
                </a>
              </div>
            );
          })}
          
        </div>
      )}
                              <div className="text-sm">{reply?.body}</div>
                              <div className={`text-gray-500 ${sizes.width > 321 ? "flex" : ""} gap-2 items-center`}>
                                {moment(reply?.createdAt).fromNow()} 
                               <div className={`flex items-center gap-2 ${sizes.width <= 321 && "mt-1"}`}>
                               <button 
                                  className="text-[#c80000] font-bold cursor-pointer" 
                                  type="button" 
                                  onClick={() => {
                                    if (user) {
                                      setCommentId(item?.commentId)
                                      setReplyToName(reply?.name)
                                      setIsCommentModal(true)
                                      setRepFor(index)
                                      if(showReplyC.length <= 0){
                                        showReplyC?.push(indexa)
                                      }else{
                                        let a = showReplyC.findIndex(x => x === indexa)
                                        if(a >=0){
          
                                        }else{
                                          showReplyC?.push(indexa)
                                        }
                                      }
                                      setShowReplyC([...showReplyC])
                                    } else {
                                      router.push('/auth')
                                    }
                                  }}
                                >Trả lời</button>
                                <div className="relative cursor-pointer group flex items-center">
                        <IoMdMore size={18} />
                        <div className="absolute hidden group-hover:flex flex-col top-full -right-10 z-50 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[80px] rounded p-1">
                        <Link href="" className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Trích dẫn</Link>
                       { user?.email === item?.user?.email && <Link href={`/forum/post?id=${item?.postId}`} className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Sửa</Link>}
                       { user?.email === item?.user?.email &&  <Link href="" className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Xóa</Link>}
                        </div>
                        </div>
                               </div>
                              </div>
                              {
                     repFor === index && showReplyC.map(x => x === indexa && <FeedCommentReplyModal
                        commentId={commentId}
                        replyToName={replyToName}
                        visible={isCommentModal}
                        setIsCommentModal={setIsCommentModal}
                        onCreateReply={onCreateReply}
                        onCancel={() => setIsCommentModal(false)}
                        onCallback={onCallback}
                        user={user}
                      />) 
                    }
                            </div>
                          </div>
                      </div>
            })}
                  </div>
                </div>
              </div>
})}
        </div>
        
        <ModalImageZoom openImage={openImage} setOpenImage={setOpenImage} imageList={imageList} index={index}/>

    </div>
  );
};

export default FeedComments;
