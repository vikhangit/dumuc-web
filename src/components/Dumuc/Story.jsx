"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiLink, HiOutlineVideoCamera } from 'react-icons/hi';
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
import ModalWating from './ModalWating';
import { IoVideocam, IoVideocamOutline } from 'react-icons/io5';
import { IoIosLink, IoMdCloseCircle } from 'react-icons/io';

const Story = ({data, onCallback}) => {
  const sizes = useWindowSize()
  const [stories, setStories] = useState(data)
  const [loading, setLoading] = useState(false)
  const [swiper, setSwiper] = useState(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const [user] = useAuthState(auth);
  const [video, setVideo] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [type, setType] = useState("file")
  const router = useRouter()
  const refStory = useRef()
  const videoEl = useRef(null);
  const [showTool, setShowTool] = useState(false)
  useEffect(() => {
    setStories(data);
  }, [data])
  const handleChange =  (e) => {
    setLoading(true)
    if(e?.target?.files){
      uploadImage(e?.target?.files[0], user?.accessToken).then((data) => {
        setVideo(data?.url)
        setType("file")
      }).then((res) => {
        setShowModal(true)
        setLoading(false)
        setShowTool(false)
      })
        .catch((err) => {
          message.error("Video kích thước quá lớn")
          setShowModal(false)
          setLoading(false)
          setShowTool(true)
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
  console.log(stories.filter(x => {
    if(user?.email === x?.author?.user?.email){
      return x;
    }else if(!x.isPrivate){
      return x;
    }
  }))

  return (
    <>
      <div className="bg-white rounded-lg shadow my-4 border border-gray-300 px-[30px] py-[10px] relative">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        className="mySwiper"
        onSwiper={(swiper) => setSwiper(swiper)}
        onActiveIndexChange={(s) => setActiveSlide(s.realIndex)}
        breakpoints={{
          380: {
            slidesPerView: 2,
          },
          680: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          },
          1366: {
            slidesPerView: 5,
          },
          3000: {
            slidesPerView: 6,
          }
        }}
      >
        {user && <SwiperSlide 
            style={{
              height: 250, 
              cursor: "pointer"
            }}
          >
            
            <div className='border border-gray-400 rounded-[10px] w-full h-full relative' onClick={() => setShowTool(!showTool)}>
            {
              showTool ? <div className='flex flex-col gap-4 justify-center items-center h-full w-full px-[10px] relative z-20'>
                <button className='absolute top-2 right-2 z-50' onClick={() => setShowTool(false)}><IoMdCloseCircle size={18} /></button>
                <button 
                  className='flex justify-center items-center bg-[#c80000] text-white w-full text-base font-medium gap-x-2 py-2 rounded-full'
                  onClick={() => user ? refStory?.current?.click() : router.push("/auth")}
                >
                  <HiOutlineVideoCamera size={24} />File video
                </button>
                <button 
                  className='flex justify-center items-center bg-sky-500 text-white w-full text-base font-medium gap-x-2 py-2 rounded-full'
                  onClick={() => {
                    setShowTool(false)
                    setShowModal(true);
                    setType("link")
                  }}
                >
                <HiLink size={24} />Link video
                </button>
              </div>
              :
              <>
                <Image width={0} height={0} sizes="100vw" src={user && user?.photoURL && user?.photoURL.length > 0 ? user?.photoURL : "/dumuc/avatar.png"} alt="" className='w-full h-2/3 rounded-t-[10px]' />
              <div className='h-1/3 bg-gray-100 rounded-b-[10px]'>
                <div className='border border-gray-100  mx-auto flex justify-center items-center bg-gray-100  -translate-y-4 w-[32px] h-[32px] rounded-full'>
                  <div className='rounded-full bg-indigo-600 flex justify-center items-center w-[28px] h-[28px]'>
                    <MdOutlineAdd color='#fff' size={24} />
                  </div>
                </div>
                <span className='absolute bottom-2 left-0 w-full text-center text-sm font-medium'>Tạo tin</span>
              </div>
              </>
            }
              
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
         stories?.length > 0 && stories?.sort((a, b) => b?.no - a?.no).map((item, index) => 
         user?.email === item?.author?.user?.email ?
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
                 <Image width={0} height={0} sizes="100vw" src={item?.author?.user?.photo || "/dumuc/avatar.png"} alt="" className='absolute z-20 top-2 left-2 w-10 h-10 rounded-full border border-sky-700 p-0.5' />
                 {
                item.type === "file" ?
                   <video className={`w-full h-full rounded-t-[10px] relative z-10 h-[210px]`}  
                  // controls
                  loop
                  ref={videoEl}
                  >
                    <source src={`${item.photos}`} type="video/mp4" />
                  </video>
                  :
                  <div className='w-full h-full story' dangerouslySetInnerHTML={{__html: item.description}}></div>
                 }
                  <span className={`absolute bottom-2 left-2 text-sm font-medium z-20 ${type === "link" ? "text-white" : "text-black"}`}>{item?.author?.name || "No name"}</span>
              </div>
              
          </SwiperSlide> 
          : !item.isPrivate ? <SwiperSlide 
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
                 <Image width={0} height={0} sizes="100vw" src={item?.author?.user?.photo || "/dumuc/avatar.png"} alt="" className='absolute z-20 top-2 left-2 w-10 h-10 rounded-full border border-sky-700 p-0.5' />
                 {
                item.type === "file" ?
                   <video className={`w-full h-full rounded-t-[10px] relative z-10 h-[210px]`}  
                  // controls
                  loop
                  ref={videoEl}
                  >
                    <source src={`${item.photos}`} type="video/mp4" />
                  </video>
                  :
                  <div className='w-full h-full story' dangerouslySetInnerHTML={{__html: item.description}}></div>
                 }
                  <span className={`absolute bottom-2 left-2 text-sm font-medium z-20 ${type === "link" ? "text-white" : "text-black"}`}>{item?.author?.name || "No name"}</span>
              </div>
      </SwiperSlide> 
          : <div></div>
          
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
       stories.length > 0 && activeSlide < stories?.length - 1 &&
        <button className='absolute top-1/2 right-1 -translate-y-1/2' onClick={() => swiper.slideNext()}>
          <HiChevronDoubleRight size={18} />
        </button>
      }
      </div>
      <ModalPlayVideos 
        openImage={showImage} 
        setOpenImage={setShowImage} 
        imageList={stories.map(x => {
          if(user?.email === x?.author?.user?.email){
            return x;
          }else if(!x.isPrivate){
            return x;
          }
        })} 
        index={indexImage}
        onCallback={onCallback}
      />
      <QuickAddStory 
        onCallback={ () => {
          setVideo("")
          onCallback();
        }
        }
        onCancel={() => setShowModal(false)}
        visible={showModal}
        url={video}
        type={type}
      />
      <ModalWating openModal={loading} setOpenModal={setLoading} />
    </>
  );
}
export default Story;