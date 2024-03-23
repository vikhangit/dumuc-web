"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { MdOutlineAdd } from 'react-icons/md';
import { auth } from '@utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ModalImageZoom from '@components/ModalImageZoom';
import { createStoryByUser, getStoriesLoadMore } from '@apis/feeds';
import { useRouter } from 'next/navigation';
import { uploadImage } from '@apis/other';
import QuickAddStory from '@components/QuickAddStory';
import { useWindowSize } from '@hooks/useWindowSize';
import ModalPlayVideos from '@components/ModalPlayVideos';
import { message } from 'antd';

const Story = ({stories, onCallback}) => {
  const sizes = useWindowSize()
  const [loading, setLoading] = useState(false)
  const [swiper, setSwiper] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [user] = useAuthState(auth);
  const [video, setVideo] = useState("")
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const refStory = useRef()
  const videoEl = useRef(null);
  const canvasRef = useRef(null)

  const handleLoadedMetadata = () => {
    const video = videoEl.current;
    if (!video) return;
    console.log(`The video is ${video.duration} seconds long.`);
  };
  const handleChange =  (e) => {
    setLoading(true)
    if(e?.target?.files){
      uploadImage(e?.target?.files[0], user?.accessToken).then((data) => {
        setVideo(data?.url)
      }).then((res) => {
        console.log(res)
        setLoading(false)
        setShowModal(true)
      })
        .catch((err) => {
          setLoading(false)
          setShowModal(false)
          message.error("Video kích thước quá lớn")
        })
    }
    };
    const [showImage, setShowImage] = useState(false)
  const [imageList, setImageList] = useState([]);
  const [indexImage, setIndexImage] = useState(0);
  React.useCallback(() => {
    const timeToStart = (7 * 60) + 12.6;
    videoEl.current.seekTo(timeToStart, 'seconds');
  }, [videoEl.current])

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
        {user && <SwiperSlide 
            style={{
              height: 250, 
              cursor: "pointer"
            }}
          >
            <div className='border border-gray-400 rounded-[10px] w-full h-full relative' onClick={() => user ? refStory?.current?.click() : router.push("/auth")}>
              <Image width={0} height={0} sizes="100vw" src={user ? user?.photoURL : "/dumuc/avatar.png"} alt="" className='w-full h-2/3 rounded-t-[10px]' />
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
        </SwiperSlide>}
        {
         stories?.length > 0 && stories?.map((item, index) => 
         <SwiperSlide 
              style={{
                height: 250,
                cursor: "pointer"
              }}
            >
              <div 
                onClick={() => {
                  setShowImage(true)
                  setIndexImage(index);
                }} 
                className='border border-gray-400 rounded-[10px] w-full h-full relative flex flex-col'
              >
                 <Image width={0} height={0} sizes="100vw" src={item?.author?.user?.photo || "/dumuc/avatar.png"} alt="" className='absolute z-20 top-2 left-2 w-8 h-8 rounded-full' />
                <video className={`w-full h-full rounded-t-[10px] relative z-10`}  
                // controls
                loop
                ref={videoEl}
                >
                  <source src={`${item.photos}`} type="video/mp4" />
                </video>
                <span className='absolute bottom-2 left-2 text-sm font-medium z-20'>{item?.author?.name || "No name"}</span>
              </div>
            </SwiperSlide> 
          )
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
        activeSlide < 8 && stories.length > 0 &&
        <button className='absolute top-1/2 right-1 -translate-y-1/2' onClick={() => swiper.slideNext()}>
          <HiChevronDoubleRight size={18} />
        </button>
      }
      </div>
      <ModalPlayVideos 
        openImage={showImage} 
        setOpenImage={setShowImage} 
        imageList={stories} 
        index={indexImage}
      />
      <QuickAddStory 
        onCallback={onCallback}
        onCancel={() => setShowModal(false)}
        visible={showModal}
        url={video}
      />
    </>
  );
}
export default Story;