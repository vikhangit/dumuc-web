"use client"
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { MdOutlineAdd } from 'react-icons/md';
import { auth } from '@utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ModalImageZoom from '@components/ModalImageZoom';

const Story = () => {
  const [swiper, setSwiper] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [user] = useAuthState(auth);
  const refStory = useRef()

  const handleChange =  (e) => {
    if(e?.target?.files){
    }
  };
  const [showImage, setShowImage] = useState(false)
  const [imageList, setImageList] = useState([]);
  const [indexImage, setIndexImage] = useState(0);

  return (
    <>
      <div className="bg-white rounded-lg shadow my-4 border border-gray-300 px-[30px] py-[10px] relative">
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        className="mySwiper"
        onSwiper={(swiper) => setSwiper(swiper)}
        onActiveIndexChange={(s) => setActiveSlide(s.realIndex)}
        breakpoints={{
          380: {
            slidesPerView: 3,
          },
          680: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 5,
          }
        }}
      >
        {
          user && 
          <SwiperSlide 
            style={{
              height: 200, 
              cursor: "pointer"
            }}
          >
            <div className='border border-gray-400 rounded-[10px] w-full h-full relative' onClick={() => refStory?.current?.click()}>
              <Image width={0} height={0} sizes="100vw" src={user?.photoURL} alt="" className='w-full h-2/3 rounded-t-[10px]' />
              <div className='h-1/3 bg-gray-100 rounded-b-[10px]'>
                <div className='border border-gray-100  mx-auto flex justify-center items-center bg-gray-100  -translate-y-4 w-[32px] h-[32px] rounded-full'>
                  <div className='rounded-full bg-indigo-600 flex justify-center items-center w-[28px] h-[28px]'>
                    <MdOutlineAdd color='#fff' size={24} />
                  </div>
                </div>
                <span className='absolute bottom-2 left-0 w-full text-center text-sm font-medium'>Tạo tin</span>
              </div>
            </div>
            <input
              type="file"
              id={`video`}
              ref={refStory}
              onChange={handleChange}
              style={{ display: "none" }}
              hidden
              accept="video/mp4"
            />
          </SwiperSlide>
        }
        {
          Array(10).fill().map((item, index) => 
            <SwiperSlide 
              style={{
                height: 200,
                cursor: "pointer"
              }}
            >
              <div 
                onClick={() => {
                  setShowImage(true)
                  // setIndexImage(indexC);
                }} 
                className='border border-gray-400 rounded-[10px] w-full h-full px-[10px] py-[20px] relative'
              >
                <Image width={0} height={0} sizes="100vw" src="/dumuc/avatar.png" alt="" className='absolute top-2 left-2 w-8 h-8 rounded-full' />
                <Image width={0} height={0} sizes="100vw" src="/icons/video-1.png" alt="" className='w-full h-full object-contain' />
                <span className='absolute bottom-2 left-2 text-sm font-medium'>Vỉ Khang</span>
              </div>
            </SwiperSlide>)
        }
      </Swiper>
      {
        activeSlide > 0 && 
        <button className='absolute top-1/2 left-1 -translate-y-1/2' 
          onClick={() => swiper.slidePrev() }
        >
          <HiChevronDoubleLeft size={18} />
        </button>
      }
      {
        activeSlide < 8 && 
        <button className='absolute top-1/2 right-1 -translate-y-1/2' onClick={() => swiper.slideNext()}>
          <HiChevronDoubleRight size={18} />
        </button>
      }
      </div>
      <ModalImageZoom 
        openImage={showImage} 
        setOpenImage={setShowImage} 
        imageList={[
          "/icons/video-1.png",
          "/icons/video-1.png",
          "/icons/video-1.png",
          "/icons/video-1.png",
          "/icons/video-1.png",
        ]} 
        index={indexImage}
      />
    </>
  );
}
export default Story;