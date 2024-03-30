
import React, { useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Modal, Progress } from 'antd';
import { useWindowSize } from '@hooks/useWindowSize';
import { useEffect } from 'react';
import Image from 'next/image';
import StoryLikeShareComment from './Story/StoryLikeShareComment';
import RenderComments from './Story/RenderComments';
import { useRouter } from 'next/navigation';

export default function ModalPlayVideos({openImage, setOpenImage, imageList, index, onCallback}) {
    const [swiper, setSwiper] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const router = useRouter();
    const sizes = useWindowSize();
    const [start, setStart] = useState(false)
    const [showComment, setShowComment] = useState(false);
    const [percent, setPercent] = useState(0);
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
                                paddingBottom: showComment ? 20 : "inherit"
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
                               <div className='flex justify-end text-indigo-500 font-medium hover:underline mb-4'>
                                    <button onClick={() => router.push(`/author/${x?.author?.slug}/${x?.author?.authorId}`)}>Trang cá nhân tác giả</button>
                                </div>
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
