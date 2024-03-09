
import React, { useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Modal, Progress } from 'antd';
import { useWindowSize } from '@hooks/useWindowSize';
import { useEffect } from 'react';
import Image from 'next/image';

export default function ModalImageZoom({openImage, setOpenImage, imageList, index}) {
    const [swiper, setSwiper] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const sizes = useWindowSize();
    const [start, setStart] = useState(false)
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
           {
            imageList.length > 1 &&  <button className='p-2 relative hover:bg-[#999999] pointer' onClick={() => setStart(!start)}>
            <Progress percent={percent} size="lg" showInfo={false} strokeColor="#666666" className='absolute z-[999] top-0 left-0 w-full h-full custom-progress'  />

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="relative z-[99999] w-8 h-8 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
            </button>
           }
            <button className='p-2 hover:bg-[#999999] pointer' onClick={() => {
                setOpenImage(false);
                setStart(false);
                setPercent(0)
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
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </button>
        <button 
        className='absolute z-[9999] right-0 top-1/2 -translate-y-1/2' 
        onClick={() => {
            swiper.slideNext()
            setStart(false);
            setPercent(0)
        }}
         >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
        </button>
        </>
        }
        <div className={`modal-image w-full sm:w-5/6 md:w-3/4 xl:w-1/2 ${sizes.height > 450 ? "h-full sm:h-5/6 xl:h-3/4" : "h-full"}  mx-auto`}>
            <div className='w-full h-full'>
                <Swiper 
                    className="mySwiper" 
                    onSwiper={(swiper) => setSwiper(swiper)}
                    onActiveIndexChange={(s) => setActiveSlide(s.realIndex)}
                    loop={true}
                    initialSlide={index}
                >
                    {
                        imageList?.map((x) => <SwiperSlide>
                            <Image src={x} alt='' width={0} height={0} sizes="100vw" className='w-full h-full object-contain' />
                        </SwiperSlide>)
                    }
                </Swiper>
        </div>
        {/* <div className='absolute z-[9999] bottom-2 py-2 left-0 w-full bg-black bg-black bg-opacity-50 flex justify-center gap-x-2'>
            {
                imageList.map((x, index) => <div className={`${activeSlide == index ? "border-2 border-white" : "border-2 border-black opacity-40"} relative z-[9999] ${sizes.height > 450 ? "h-[40px] md:h-60px lg:h-[80px]" : "h-[40px] md:h-60px lg:h-[80px]"}`} onClick={() => {
                    swiper.slideTo(index)
                }}>
                    <img src={x} className={`w-full h-full object-contain`} />
                </div>)
            }
        </div> */}
    </div>
    </div>
  )
}
