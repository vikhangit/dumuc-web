import { createComment, createCommentReply, createCommentStories, getFeed, getStory, updateComment, updateCommentStories } from '@apis/feeds';
import { uploadImage } from '@apis/other';
import { getProfile } from '@apis/users';
import { useWindowSize } from '@hooks/useWindowSize';
import { nestedComment } from '@utils/covertCommets';
import { auth } from '@utils/firebase';
import { message } from 'antd';
import { Spinner } from 'flowbite-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoMdCloseCircle } from 'react-icons/io';
import { IoImageOutline, IoSend } from 'react-icons/io5';
import { MdFormatQuote } from 'react-icons/md';

export default function CommentForm({
  parentId, 
  feed, 
  replyToName, 
  setComments, 
  showReplyBox, 
  setShowReplyBox, 
  qoute, 
  setQoute, 
  root,
  item,
  onCallback,
  completed
}) {
  const [user] = useAuthState(auth)
  const router = useRouter();
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(false);
  const [usingUser, setUsingUser] = useState()
  useEffect(() =>{
    getProfile(user?.accessToken).then((res) => setUsingUser(res))
  },[user])

  const [body, setBody] = useState('');
  const [bodyError, setBodyError] = useState('');
  const [loadingImage, setLoadingImage] = useState(false)
  const [focusComment, setFocusComment] = useState(false)
  const sizes = useWindowSize()
  const refImage = useRef();
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
      if(user?.accessToken){
        uploadImage(x, user?.accessToken).then((data) => {
          newPhoto.push(`${data?.url}`)
          setPhotos([...photos, ...newPhoto]);
        }
        );
      }
      
    })
  }
  setLoadingImage(false)
  };
  useEffect(() => {
    if(item) {
      setBody(item?.body)
      setPhotos(item?.photos)
      setQoute(item?.qoute)
      setFocusComment(true)
    }
  }, [item])
  return (
    <div id="comments">
      <div className={`flex justify-between ${!focusComment && !qoute && qoute?.length > 0 && "items-center"}`}>
        <Image width={0} height={0} sizes="100vw"
            src={user?.photoURL || "/dumuc/avatar.png"}
            alt=""
            className="rounded-full w-8 h-8"
        />
        <div className={`flex flex-col cursor-text w-[calc(100%-40px)] border border-gray-300 rounded-lg p-2.5 bg-gray-100 ${!focusComment && "flex"}`}>
          <div>
            {
              !root ?
              (showReplyBox || item) && qoute && qoute.length > 0 &&
              <div className='mb-[10px]'>
                {
                  qoute.map((item, index) => 
                  <div className='bg-gray-200 flex mt-[5px] px-[10px] py-[8px] rounded-[10px]'> 
                    <div className='w-full border-l-2 border-indigo-800 pl-[10px] '>
                      <MdFormatQuote size={28} className='text-gray-600' />
                      <div className="text-sm font-semibold">{item?.user?.name}</div>
                      <div className="text-sm">{item?.body}</div>
                      <div className=''>{item?.photos?.length > 0 && <div className='italic'>[Hình ảnh]</div> }</div>
                    </div>
                    <div className='w-fit'>
                      <button 
                        onClick={() => {
                          qoute.splice(index, 1)
                          setQoute([...qoute])
                        }}
                      >
                        <IoMdCloseCircle size={14} color='#c80000' />
                      </button>
                    </div>
                  </div>
                )
                }
              </div> :
              qoute && qoute.length > 0 &&
              <div className='mb-[10px]'>
                {
                  qoute.map((item, index) => 
                  <div className='bg-gray-200 flex mt-[5px] px-[10px] py-[8px] rounded-[10px]'> 
                    <div className='w-full border-l-2 border-indigo-800 pl-[10px] '>
                      <MdFormatQuote size={28} className='text-gray-600' />
                      <div className="text-sm font-semibold">{item?.user?.name}</div>
                      <div className="text-sm">{item?.body}</div>
                      <div className=''>{item?.photos?.length > 0 && <div className='italic'>[Hình ảnh]</div> }</div>
                    </div>
                    <div className='w-fit'>
                      <button 
                        onClick={() => {
                          qoute.splice(index, 1)
                          setQoute([...qoute])
                        }}
                      >
                        <IoMdCloseCircle size={14} color='#c80000' />
                      </button>
                    </div>
                  </div>
                )
                }
              </div>
            }
          </div>
          <textarea 
            value={body}
            onClick={() => user ? setFocusComment(true) : router.push("/auth")}
            onChange={e => {
              setBody(e.target.value)
            }}
            id="message" 
            rows={focusComment ? "2" : "1"} 
            class="block w-full p-0 text-sm text-gray-900 border-0 shadow-none bg-gray-100" 
            style={{
              boxShadow: "none",
              resize: "none"
            }}
            placeholder="Bạn đang nghĩ gì?" 
          />
          <div className="flex justify-end gap-2">
            <label className='cursor-pointer' onClick={() =>  user ? refImage.current.click() : router.push("/auth")}>
              <IoImageOutline size={24} color="rgb(107 114 128)" />
            </label>
            {
              focusComment && 
              <button
                disabled={body === "" && photos.length === 0 ? true : false}
                className={`curor-pointer ${body === "" && photos.length === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => {
                  setLoading(true);
                  if(body === "" && photos.length === 0){
                    message.error("Vui lòng nhập bình luận hoặc hình ảnh")
                    return;
                  }else{
                    if(item){
                      updateCommentStories({
                        ...item,
                        qoute,
                        photos,
                        body,
                        storyId: feed?.storyId,
                        commentId: item?.commentId,
                      }, user?.accessToken)
                      .then((result) => {
                        console.log("Result", result)
                        setLoading(false);
                        message.success("Cập nhật luận thành công");
                        setBody('')
                        setPhotos([])
                        setQoute()
                        setFocusComment(false)
                        getStory({
                          storyId: feed?.storyId,
                        })
                        .then(results => {
                          completed()
                        })
                      });
                    }else{
                      createCommentStories({
                        qoute,
                        replyToName,
                        photos,
                        body,
                        storyId: feed?.storyId,
                        parentId
                      }, user?.accessToken)
                      .then((result) => {
                        setLoading(false);
                        message.success("Đăng bình luận thành công");
                        setBody('')
                        setPhotos([])
                        setQoute()
                        setFocusComment(false)
                        getStory({
                          storyId: feed?.storyId
                        })
                        .then(results => {
                          setShowReplyBox &&  setShowReplyBox(false)
                          onCallback()
                        })
                      });
                    }
                  }
                }}
              >
                {loading ? <Spinner /> : <IoSend size={20} color={body === "" && photos.length === 0 ?"rgb(153 147 240)" :"rgb(79 70 229)"} />}
              </button>
            }
            <input  type="file" id="comment" ref={refImage} className="hidden" multiple  onChange={handleChange()} />
          </div>
        </div>
      </div>
      {
        photos.length > 0 && <div className={`relative grid grid-cols-2 md:grid-cols-3 ${sizes.width > 410 ? "h-40" : sizes.width > 350 ? "h-36" : "h-28"} overflow-y-auto justify-center items-center gap-2 ${photos.length > 0 && "mt-5"} scroll-quick-post pr-2`}>
            
        {
          photos?.map((photo, index) => <div className={`w-full relative ${sizes.width > 410 ? "h-36" : sizes.width > 350 ? "h-32" :  "h-24"}`}>
            <button 
                    onClick={() => {
                      photos.splice(index, 1)
                      setPhotos([...photos])
                    }}
                    className='absolute top-1.5 right-1.5'>
                        <IoMdCloseCircle size={20} color="red" />
                    </button>
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
  )
}
