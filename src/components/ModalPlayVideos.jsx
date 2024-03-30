
import React, { useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Modal, Progress, message } from 'antd';
import { useWindowSize } from '@hooks/useWindowSize';
import { useEffect } from 'react';
import Image from 'next/image';
import StoryLikeShareComment from './Story/StoryLikeShareComment';
import RenderComments from './Story/RenderComments';
import { useRouter } from 'next/navigation';
import { FaUserCheck, FaUserPlus } from "react-icons/fa6";
import { FaUserTimes } from "react-icons/fa";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@utils/firebase';
import { createUserFollow, createUserToFollowerList, deleteAddFriend, deleteRecieveFriend, deleteUserFollow, deleteUserInFollowerList, getProfile, receiveRequestAddFriend, sendRequestAddFriend } from '@apis/users';
import Link from 'next/link';
import { Spinner } from 'flowbite-react';

export default function ModalPlayVideos({openImage, setOpenImage, imageList, index, onCallback}) {
    const [user] = useAuthState(auth)
    const [swiper, setSwiper] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const router = useRouter();
    const sizes = useWindowSize();
    const [start, setStart] = useState(false)
    const [showComment, setShowComment] = useState(false);
    const [percent, setPercent] = useState(0);
    const [loading1, setLoading1] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [usingUser, setUsingUser] = useState()
    useEffect(() =>{
      getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall)) 
    },[user])
    useEffect(() => {
        if(start){
            const timeOut = setTimeout(() => {
                setPercent(percent + 10)
            }, 200);
            if(percent === 100){
                setPercent(0)
                swiper.slideNext();
            }
            return () => clearTimeout(timeOut);
        }
    })
  return (
    openImage &&
    <div className='wrap-modal-image fixed w-full h-full left-0 top-0 z-[999] bg-black bg-opacity-90 flex justify-center items-center py-2 '
    style={{
        margin: "0px"
    }}>
        <div className='absolute right-0 top-0 z-[9999]'>
           {/* {
            imageList.length > 1 &&  <button className='p-2 relative hover:bg-[#999999] pointer' onClick={() => setStart(!start)}>
            <Progress percent={percent} size="lg" showInfo={false} strokeColor="#666666" className='absolute z-[999] top-0 left-0 w-full h-full custom-progress'  />

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="relative z-[99999] w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
            </button>
           } */}
            <button className='p-2 hover:bg-[#999999] pointer' onClick={() => {
                setOpenImage(false);
                setStart(false);
                setPercent(0)
                setShowComment(false)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        {
            imageList.length > 1 && <>
            <button className='absolute z-[9999] left-0 top-1/2 -translate-y-1/2' onClick={() => {
            swiper.slidePrev();
            setStart(false);
            setPercent(0)
            setShowComment(false)
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 sm:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
        <button 
        className='absolute z-[9999] right-0 top-1/2 -translate-y-1/2' 
        onClick={() => {
            swiper.slideNext()
            setStart(false);
            setPercent(0)
            setShowComment(false)
        }}
         >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 sm:text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </button>
        </>
        }
        <div className={`modal-image w-full sm:w-5/6 md:w-3/4 xl:w-1/2 ${sizes.height > 450 ? "h-full sm:h-5/6 xl:h-3/4 my-auto" : "h-full"}  mx-auto overflow-y-auto`}>
            <div className='w-full h-full px-2 sm:px-0'>
                <Swiper 
                    className="mySwiper" 
                    onSwiper={(swiper) => setSwiper(swiper)}
                    onActiveIndexChange={(s) => setActiveSlide(s.realIndex)}
                    loop={true}
                    spaceBetween={20}
                    initialSlide={index}
                >
                    {
                        imageList?.map((x, index) => 
                        <SwiperSlide 
                            key={index} 
                            style={{
                                display: "flex",
                                alignItems: "center",
                                overflow: "auto", 
                                background: showComment ? "white" : "inherit", 
                                paddingBottom: showComment ? 20 : "inherit",
                                position: "relative",
                                zIndex: 2000
                            }}
                            className='scroll-quick-post'
                        >
                            <div className='bg-white w-full'>
                                {
                                x?.type === "file" ? <video 
                                className='w-full h-full object-contain' 
                                 controls loop
                                >
                                <source src={x.photos} type="video/mp4" />
                                </video> : 
                                <div dangerouslySetInnerHTML={{__html: x?.description}}></div>
                                }
                               <div className='py-2 px-4'>
                                <div className='flex justify-between mb-4 items-center'>
                                <div className='flex items-center gap-x-2'>
                                <Image
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    class="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
                                    src={
                                    x?.author?.photo
                                        ? x?.author?.photo
                                        : x?.author?.user?.photo ? x?.author?.user?.photo: "/dumuc/avatar.png"
                                    }
                                    alt={x?.author?.name}
                                />
                                <a
                                class="text-base sm:text-lg font-semibold leading-none text-gray-900 dark:text-white"
                                href={`/author/${x?.author?.slug}/${x?.author?.authorId}`}
                                >
                                {x?.author?.name} 
                                </a>
                                </div>
                                {
                                            x?.author?.user?.email !== user?.email && <div className="flex items-center gap-x-2 mt-2">
                                                {
                                                 usingUser?.friendList?.length > 0 ?   usingUser?.friendList?.map((item, index) => {
                                                        if(item?.type === "send" && item.authorId === x?.author?.authorId && item?.status === 1){
                                                            return <button onClick={() => {
                                                                setLoading1(true)
                                                                deleteAddFriend({
                                                                    authorId: x?.author?.authorId,
                                                                    }, user?.accessToken)
                                                                    .then(async(result) => {
                                                                      console.log(result)
                                                                    //update recoil
                                                                    deleteRecieveFriend({
                                                                      authorUserId: x?.author?.userId
                                                                    }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                    const dataCall = await getProfile(user?.accessToken) 
                                                                    setUsingUser(dataCall)
                                                                        message.success('Đã hủy kết bạn.');
                                                                        setLoading1(false)
                                                                });
                                                           }} 
                                                            type="button" 
                                                            class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                            >
                                                                {
                                                                    loading1 ? <Spinner className='w-4 h-4' /> : 
                                                                    <>
                                                                    <FaUserTimes size={16} />Hủy lời mời
                                                                    </>
                                                                }
                                                            </button>
                                                        }else if(item?.type === "recieve" && item?.authorId === x?.author?.authorId && item?.status === 1){
                                                            return <button 
                                                            type="button" 
                                                            class="flex items-center gap-x-1 relative cursor-pointer group px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                            >
                                                                <FaUserCheck size={16} />Phản hồi
                                                                <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                                                <Link href={``} 
                                                                 onClick={async (e) => {
                                                                    setLoading1(true)
                                                                    e.preventDefault();
                                                                    await deleteAddFriend({
                                                                        authorId: x?.author?.authorId,
                                                                        }, user?.accessToken)
                                                                        .then(async(result) => {
                                                                          console.log(result)
                                                                        //update recoil
                                                                        await deleteRecieveFriend({
                                                                          authorUserId: x?.author?.userId
                                                                        }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                    });
                                                                    await sendRequestAddFriend({
                                                                        authorId: x?.author?.authorId,
                                                                        status: 2
                                                                    }, user?.accessToken)
                                                                    .then(async(result) => {
                                                                    console.log(result)
                                                                    await receiveRequestAddFriend({
                                                                    authorUserId: x?.author?.userId,
                                                                    status: 2
                                                                    }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                    setLoading1(false)
                                                                  
                                                                });
                                                            
                                                                await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                                                
                                                                    }} 
                                                                  className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                                                >
                                                                    {
                                                                    loading1 ? <Spinner className='w-4 h-4' /> : 
                                                                    <>
                                                                    Xác nhận
                                                                    </>
                                                                }
                                                                    
                                                                </Link>
                                                                <Link href={``} 
                                                                    onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setLoading1(true)
                                                                    deleteAddFriend({
                                                                        authorId: x?.author?.authorId,
                                                                        }, user?.accessToken)
                                                                        .then(async(result) => {
                                                                          console.log(result)
                                                                        //update recoil
                                                                        deleteRecieveFriend({
                                                                          authorUserId: x?.author?.userId
                                                                        }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                        const dataCall = await getProfile(user?.accessToken) 
                                                                        setUsingUser(dataCall)
                                                                            message.success('Đã xóa yêu cầu kết bạn');
                                                                            setLoading1(false)
                                                                    });
                                                                    }} 
                                                                    className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left">
                                                                        {
                                                                            loading1 ? <Spinner className='w-4 h-4' /> : 
                                                                            <>
                                                                            Xóa lời mời
                                                                    </>
                                                                }
                                                                    </Link>
                                                                </div>
                                                            </button>
                                                        }else  if(item?.authorId === x?.author?.authorId && item?.status === 2){
                                                            return <button onClick={() => {
                                                                
                                                           }} 
                                                            type="button" 
                                                            class="flex items-center group gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                           >
                                                            <FaUserCheck size={16} />
                                                                Bạn bè
                                                           </button>
                                                        }
                                                        
                                                    })
                                                    :<button onClick={async () => {
                                                        if(user){
                                                            setLoading1(true)

                                                            await sendRequestAddFriend({
                                                                authorId: x?.author?.authorId
                                                            }, user?.accessToken)
                                                            .then(async(result) => {
                                                            console.log(result)
                                                            await receiveRequestAddFriend({
                                                            authorUserId: x?.author?.userId
                                                            }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                            });
                                                            
                                                            await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                                            
                                                            message.success('Đã gữi yêu cầu kết bạn.')
                                                            setLoading1(false)
                                                        }else{
                                                            router.push(`/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/author/${slug}/${id}`)
                                                        }
                                                   }} 
                                                    type="button" 
                                                    class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                    >
                                                        {
                                                                    loading1 ? <Spinner className='w-4 h-4' /> : 
                                                                    <>
                                                                     <FaUserPlus size={16} />Thêm bạn bè
                                                                    </>
                                                                }
                                                       
                                                    </button>
                                                }
                                                {
                                                                    usingUser?.follows?.find(a => a.authorId === x?.author?.authorId) ? 
                                                                    <Link href={``} 
                                                                 onClick={async (e) => {
                                                                    e.preventDefault();
                                                                    setLoading2(true)
                                                                   await deleteUserFollow({
                                                                        authorId: x?.author?.authorId,
                                                                        }, user?.accessToken)
                                                                        .then(async(result) => {
                                                                          console.log(result)
                                                                        //update recoil
                                                                     await   deleteUserInFollowerList({
                                                                          authorUserId: x?.author?.userId
                                                                        }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                    });
                                                                    await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                                                    
                                                                    message.success('Hủy theo dõi thành công');
                                                                setLoading2(false)
                                                                    }} 
                                                                    className="flex items-center gap-x-2 px-2 py-1 text-xs font-medium text-center text-white bg-indigo-500 rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                                >
                                                                    
                                                                    {
                                                    loading2 ? <Spinner className='w-4 h-4'/> : "Hủy theo dõi"
                                                }
                                                                </Link>
                                                                : 
                                                                <Link href={``} 
                                                                 onClick={async (e) => {
                                                                     setLoading2(true)
                                                                    e.preventDefault();
                                                                   await createUserFollow({
                                                                        authorId: x?.author?.authorId
                                                                    }, user?.accessToken)
                                                                    .then(async(result) => {
                                                                      console.log(result)
                                                                    await createUserToFollowerList({
                                                                      authorUserId: x?.author?.userId
                                                                     }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                    });
                                                                await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                                                message.success('Theo dõi thành công');
                                                                setLoading2(false)
                                                            }} 
                                                                    className="flex items-center gap-x-2 px-2 py-1 text-xs font-medium text-center text-black bg-gray-300 rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                                >
                                                {
                                                    loading2 ? <Spinner className='w-4 h-4'/> : "Theo dõi"
                                                }
                                                                </Link>
                                                                }
                                        </div>
                                        }
                                </div>
                               {/* <div className='flex justify-end text-indigo-500 font-medium hover:underline mb-4'>
                                    <button onClick={() => router.push(`/author/${x?.author?.slug}/${x?.author?.authorId}`)}>Trang cá nhân tác giả</button>
                                </div> */}
                                     <StoryLikeShareComment 
                                    item={x} 
                                    index={index} 
                                    onCallback={onCallback} 
                                    url={"/"} 
                                    showComment={showComment} 
                                    setShowComment={setShowComment}  
                                /> 
                               </div>
                            </div>
                            {
                                showComment && 
                                <RenderComments 
                                    items={x?.comments} 
                                    story={x} 
                                    onCallback={onCallback} 
                                    setShowComment={setShowComment}
                                />
                            }
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
    </div>
    </div>
  )
}
