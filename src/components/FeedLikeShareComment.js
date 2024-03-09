import React, { useEffect, useState } from "react";
import FeedLike from "./FeedLike";
import FeedComment from "./FeedComment";
import FeedShare from "./FeedShare";
import {  Modal} from 'flowbite-react';
import Image from "next/image";
import { useRecoilValue } from 'recoil';
import { message } from "antd";
import { useWindowSize } from "@hooks/useWindowSize";
import {createUserFollow, deleteUserFollow, getProfile, updateProfile} from '@apis/users';
import Link from "next/link";
import FeedComments from "./FeedComments";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const FeedLikeShareComment = ({ item, url, index, onCallback}) => {
  const sizes = useWindowSize();
  const [user] = useAuthState(auth)
  const [setUser, updating, error] = useUpdateProfile(auth);
  const [showLike, setShowLike] = useState(false)
  const [showComment, setShowComment] = useState(
   false
  );
  const [usingUser, setUsingUser] = useState()
  useEffect(() =>{
    (async () => {
      try {
        const dataCall = await getProfile(user?.accessToken) 
        setUsingUser(dataCall)
      } catch (e) {
        console.log(e)
      }
    })();
  },[user])
  const renderCountComment = () => {
    if(!item?.likesCount){
      return "0 Lượt thích";
    }else{
      if(item?.likesCount === 0){
        return "0 Lượt thích"
      }else{
        if(item?.likesUser){
          if(item?.likesUser?.length > 1){
            return `${item?.likesUser[0]?.name || "No name"} và ${item?.likesUser?.length - 1} người khác đã thích`
          }else{
            return `${item?.likesUser[0]?.name || "No name"} đã thích`
          }
        }
      }
    }
  }
  return (
    <div>
     <div class="flex py-3 space-x-6 justify-between">
       {/* <span className="text-gray-500 text-base sm:text-lg cursor-pointer hover:underline" onClick={() => setShowLike(true)}>
        {
          sizes.width > 440 ? renderCountComment() : `${item?.likesCount || "0"} Lượt thích`
        }
        </span> */}
        <Modal show={showLike} onClose={() => setShowLike(false)} style={{
          padding: sizes.width > 376 ? 4 : 0
        }}>
          <Modal.Header className="bg-[#c80000] bg-opacity-60 rounded-b-xl justify-center text-center  text-white [&>h3]:text-white [&>h3]:w-full [&>h3]:text-base [&>h3]:sm:text-xl  [&>button]:ml-auto p-2.5 [&>button]:text-white">
            Lượt thích
          </Modal.Header>
          <Modal.Body className="px-4 py-0 pb-6">
          <div className='bg-white px-0 sm:px-4'>
             {item?.likesUser && item?.likesUser.map((item, index) => {
              return (
                <div  key={index} class={`flex justify-between items-center sm:gap-x-4 py-3 ${index !==0  ? "border-t" : "border-0"} border-gray-400`}>
                    <Link
                 
                  href={`/author/${item?.slug}/${item?.authorId}`}
                >
                  <div class="flex items-center gap-x-2">
                    <div class="flex-shrink-0">
                    <Image width={0} height={0} sizes="100vw"
                          class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full"
                          src={item?.photo ? item?.photo : "/dumuc/avatar.png"}
                          alt={item?.name}
                        />
                    </div>
                    <div className="md:flex-1 md:min-w-0 text-sm font-medium text-gray-900">
                      <div className="text-xs sm:text-sm md:text-lg font-medium">{item?.name}</div>
                      {/* <div className="text-xs sm:text-sm font-light mt-1">Tham gia <span className=''>{moment(item?.createdAt)?.format('DD/MM/YYYY')}</span></div> */}
                    </div>
                    
                  </div>
                </Link>
                <div className="flex flex-col justify-center">
                        {user?.email ?
                            usingUser?.follows?.map(x => x?.authorId)?.includes(item?.userId) ?
                            <button 
                                //unfollow
                                onClick={() => {
                                    deleteUserFollow({
                                        authorId: item?.userId,
                                        }, user?.accessToken)
                                        .then(async () => {
                                        //update recoil
                                        updateProfile({
                                            ...usingUser,
                                            follows: usingUser.follows.filter(x => x.authorId !== item?.userId)
                                        }, user?.accessToken)
                                        const dataCall = await getProfile(user?.accessToken) 
                                        setUsingUser(dataCall)
                                            message.success('Đã bỏ theo dõi thành công');
                                    });
                                }}
                                type="button" 
                                class=" py-2 w-[105px] text-xs font-medium text-center text-white bg-[#c80000] rounded-lg hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >Đang theo dõi</button>            
                            :
                            <button 
                                onClick={() => {
                                    createUserFollow({
                                        authorId: item?.authorId
                                    }, user?.accessToken)
                                    .then(async () => {
                                        //update recoil
                                        updateProfile({
                                        ...usingUser,
                                        follows: [...usingUser?.follows, {
                                            authorId: item?.userId,
                                        }]
                                        }, user?.accessToken )
                                        const dataCall = await getProfile(user?.accessToken) 
                                        setUsingUser(dataCall)
                                        message.success('Đã theo dõi thành công.')
                                    });
                                }} 
                                type="button" 
                                class=" py-2 w-[70px] text-xs font-medium text-center text-white bg-[#c80000] rounded-lg hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >Theo dõi</button>            
                            :
                            <button 
                                onClick={() => {
                                    router.push(`/auth?url_return=${currentUrl}`);
                                }}
                                type="button" 
                                class=" py-2 w-[70px] text-xs font-medium text-center text-white bg-[#c80000] rounded-lg hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >Theo dõi</button>
                        }
                        </div>
                </div>
              );
      })}
        </div>
          </Modal.Body>
      </Modal>
      {/* <span className="text-gray-500 text-base sm:text-lg cursor-pointer hover:underline" onClick={() => {
         setShowComment(true)
      }}>
     {item?.commentsCount || "0"} Bình luận
        </span> */}
     </div>
      <div class="flex space-x-6 justify-between">
      <FeedComment
        item={item}
          setShowComment={() => {
            setShowComment(!showComment)
          }}
          count={item?.commentsCount}
        />
        <FeedLike
          style={"feed"}
          id={item?.feedId}
          currentUrl={url}
          count={item?.likesCount}
          onCallback={onCallback}
          renderCountComment={renderCountComment}
          item={item}
        />

          <FeedShare item={item} />
      </div>
      {
         showComment &&
      <div className="mt-5">
        <div className="flex justify-end mb-3">
          <button onClick={() => setShowComment(false)} className="text-xs font-semibold sm:text-sm hover:underline text-blue-600">
            Ẩn
          </button>
        </div>
          <FeedComments items={item?.comments} feed={item} onCallback={onCallback} />
      </div>
      }
    </div>
    // <div className="relative">
    //   <div
    //     class={`flex gap-x-2 justify-end items-center absolute right-2 sm:right-4 top-0 -translate-y-10`}
    //   >
    //     <NewFeedComment
    //       onClick={setShowComment}
    //     />
    //     <NewFeedShare item={item} />
    //     <NewFeeLike
    //       style={"feed"}
    //       id={item?.feedId}
    //       currentUrl={url}
    //       count={item?.likesCount}
    //     />
    //   </div>
    //   <div class="flex items-center justify-between mt-4">
    //     <div className="flex items-center">
    //       <div className="flex items-center">
    //         {item?.likesUser?.length === 0 ?
    //           <>
    //             <div className="p-1 bg-white rounded-full">
    //               <Image width={0} height={0} sizes="100vw"
    //                 className="w-10 h-10 rounded-full"
    //                 src={`/dumuc/avatar.png`}
    //                 alt={""}
    //               />
    //             </div>
    //             <div className="p-1 -translate-x-4 bg-white rounded-full">
    //               <Image width={0} height={0} sizes="100vw"
    //                 className="w-10 h-10 rounded-full"
    //                 src={`/dumuc/avatar.png`}
    //                 alt={""}
    //               />
    //             </div>
    //           </>
    //           :
    //           item?.likesUser?.map(user => {
    //            return <div className="p-1 bg-white rounded-full">
    //               <Image width={0} height={0} sizes="100vw"
    //                 className="w-10 h-10 rounded-full"
    //                 src={user?.photo}
    //                 alt={user?.name}
    //               />
    //             </div>
    //           })
    //         }
    //       </div>
    //       <div className="text-xs  hidden sm:block">
    //         <strong>{item?.likesUser?.length > 0 && item?.likesUser[0]?.name} {(item?.likesUser?.length > 1 && item?.likesUser[1]?.name) && `, ${item?.likesUser[1]?.name}`}</strong> <br /> and {item?.likesCount} more liked this
    //       </div>
    //     </div>
    //     <div className="flex gap-x-4 items-center">
    //       <span className="text-gray-500 text-sm flex items-center">
    //         <Image width={0} height={0} sizes="100vw" alt="" src="/icons/heart-b.png" className="w-5 h-5 mr-1.5" />
    //         {item?.likesCount || "0"}
    //       </span>
    //       <span className="text-gray-500 text-sm flex items-center">
    //         <Image width={0} height={0} sizes="100vw" alt="" src="/icons/link.png" className="w-5 h-5 mr-1.5" />{" "}
    //         {item?.shareCount || "0"}
    //       </span>
    //       <span className="text-gray-500 text-sm flex items-center">
    //         <Image width={0} height={0} sizes="100vw" alt="" src="/icons/message-2.png" className="w-5 h-5 mr-1.5" />
    //         {item?.commentsCount || "0"}
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default FeedLikeShareComment;