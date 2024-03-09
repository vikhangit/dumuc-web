
"use client"
import TabbarBottom from '@components/TabbarBottom';
import TabbarBottomChat from '@components/TabbarBottomChat';
import { useWindowSize } from '@hooks/useWindowSize';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { HiVideoCamera } from 'react-icons/hi';
import { IoIosCall, IoMdSearch } from 'react-icons/io';
import { IoCall, IoChevronBackOutline, IoImageOutline, IoImages, IoSend, IoVideocam } from 'react-icons/io5';
import { MdEmojiEmotions, MdOutlinePersonAddAlt } from 'react-icons/md';
import { RiFolderVideoFill, RiFolderVideoLine } from 'react-icons/ri';
import { GoFileDirectory, GoFileDirectoryFill } from "react-icons/go";
import { LuFileVideo } from "react-icons/lu";
import { HiArrowLongLeft } from "react-icons/hi2";



export default function Chat() {
    const sizes = useWindowSize()
    const [show, setShow] = useState(0)
    const [mobile, setMobile] = useState(false)
    const refImg = useRef();
    const refVideo = useRef();
    const refFile = useRef();
    useEffect(() => {
        if(sizes.width < 992){
            setShow(-1)
        }
    }, [sizes])
    const [body, setBody] = useState()
  return (
    <main className="w-full h-full fixed left-0 top-0">
      <div className={`w-full h-full relative flex ${sizes.width > 992 ? "flex-row" : "flex-col"}`}>
        <div className={`h-full ${sizes.width > 992 ? "basis-1/3" : `${!mobile ? "basis-full" :"hidden"}`}`}>
            <div className='flex items-center bg-[#C82027] shadow-md shadow-gray-400 w-full justify-between px-[5px] h-[65px] gap-x-3'>
                <div className={`flex items-center pl-[15px] w-[calc(100%-170px)] ${sizes.width > 380 ? "pl-[15px]" : "pl-[5px]" }`}>
                    <div className=''><IoMdSearch size={24} color='#fff' /></div>
                    <input placeholder='Tìm kiếm ...' className='ml-[6px] text-[#fff] text-base placeholder-[#fff] bg-[#C82027] w-full focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none' />
                </div>
                <Link href={`/account/recent-members`} className={`flex justify-center rounded-[20px] bg-[#EB7F7F] items-center text-base gap-x-2 text-white  py-[5px] ${sizes.width > 380 ? "px-[15px] w-[150px]" : "w-[135px] gap-x-1"}`}>
                    <MdOutlinePersonAddAlt size={24} color='#fff' />
                    Thêm bạn
                </Link>
            </div>
            <div className='h-[calc(100%-150px)] overflow-auto scroll-chat pb-[10px]'>

                {
                    Array(20).fill().map((item, index) => 
                    <div
                    onClick={() => {
                        setShow(index);
                        setMobile(true)
                    }}
                     className={`${index === show ? "bg-[#0084ff] bg-opacity-30" : "bg-white"} shadow-md shadow-gray-400 flex items-center gap-x-2 pl-[15px] pr-2 py-[20px] mt-[10px] cursor-pointer`}>
                    <Image src="/dumuc/avatar.png" width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                    <div className='flex justify-between w-full'>
                        <div>
                            <Link href="" className='text-base text-[#00000080]'>User {index + 1}</Link>
                            <p className='text-[13px] text-[#00000080] mt-2'>Tin nhắn mới nhất của bạn ....</p>
                        </div>
                        <span className='text-[13px] text-[#00000080]'>13 phút</span>
                    </div>
                </div>)
                }

            </div>
        </div>
        <div className={`h-full ${sizes.width > 992 ? "basis-2/3" : `${mobile ? "basis-full" :"hidden"}`}`}>
            <div className='h-[75px] flex justify-between items-center px-[15px] pl-[0px] sm:px-[20px] shadow-md shadow-gray-400'>
                <div className='flex items-center gap-x-2 sm:gap-x-4'>
                    <button className={`${sizes.width > 992 ? "hidden" : ""}`}
                    onClick={() => {
                        setMobile(false)
                        setShow(-1)
                    }}
                    >
                    <IoChevronBackOutline size={32} />
                    </button>
                <Image src="/dumuc/avatar.png" width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                <div>
                <Link href="" className='text-base font-semibold'>User {show === -1 ? 1: show + 1}</Link>
                <p className='text-sm'>Đang hoạt động</p>
                </div>
                </div>
                <div className='flex items-center gap-x-3 pr-0 sm:pr-5'>
                <IoIosCall color='#0084ff' size={28} />
                <HiVideoCamera  color='#0084ff' size={28} />
                </div>
            </div>
            <div className={`${sizes.width > 992 ? "h-[calc(100%-370px)]" : "h-[calc(100%-300px)]"} overflow-auto scroll-chat px-3 py-5`}>
                <div>
                    <div className='flex gap-x-2 sm:gap-x-4'>
                        <Image src="/dumuc/avatar.png" width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                        <div className='w-1/2 sm:w-auto'>
                        <div className='text-base font-medium bg-gray-200 rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Bạn có rảnh để nói chuyện không
                        </div>
                        <div className='text-base font-medium bg-gray-200 rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Bạn có rảnh để nói chuyện không
                        </div>
                        </div>
                    </div>
                    <div className='flex  gap-x-2 sm:gap-x-4 justify-end'>
                        <div className='w-1/2 sm:w-auto'>
                        <div className='text-base font-medium bg-[#0084ff] text-white rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Tối đang rảnh bạn cứ nói đi
                        </div>
                        <div className='text-base font-medium bg-[#0084ff] text-white rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Tối đang rảnh bạn cứ nói đi
                        </div>
                        </div>
                        <Image src="/dumuc/avatar.png" width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                    </div>
                    
                </div>
                <div>
                    <div className='flex  gap-x-2 sm:gap-x-4'>
                        <Image src="/dumuc/avatar.png" width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                        <div className='w-1/2 sm:w-auto'>
                        <div className='text-base font-medium bg-gray-200 rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Bạn có rảnh để nói chuyện không
                        </div>
                        </div>
                    </div>
                    <div className='flex  gap-x-2 sm:gap-x-4 justify-end'>
                        <div className='w-1/2 sm:w-auto'>
                        <div className='text-base font-medium bg-[#0084ff] text-white rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Tối đang rảnh bạn cứ nói đi
                        </div>
                        <div className='text-base font-medium bg-[#0084ff] text-white rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Tối đang rảnh bạn cứ nói đi
                        </div>
                        </div>
                        <Image src="/dumuc/avatar.png" width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                    </div>
                    
                </div>
                <div>
                    <div className='flex  gap-x-2 sm:gap-x-4'>
                        <Image src="/dumuc/avatar.png" width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                        <div className='w-1/2 sm:w-auto'>
                        <div className='text-base font-medium bg-gray-200 rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Bạn có rảnh để nói chuyện không
                        </div>
                        <div className='text-base font-medium bg-gray-200 rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Bạn có rảnh để nói chuyện không
                        </div>
                        </div>
                    </div>
                    <div className='flex gap-x-2 sm:gap-x-4 justify-end'>
                        <div className='w-1/2 sm:w-auto'>
                        <div className='text-base font-medium bg-[#0084ff] text-white rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Tối đang rảnh bạn cứ nói đi
                        </div>
                        </div>
                        <Image src="/dumuc/avatar.png" width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                    </div>
                    
                </div>
                <div>
                    <div className='flex  gap-x-2 sm:gap-x-4'>
                        <Image src="/dumuc/avatar.png" width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                        <div className='w-1/2 sm:w-auto'>
                        <div className='text-base font-medium bg-gray-200 rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Bạn có rảnh để nói chuyện không
                        </div>
                        <div className='text-base font-medium bg-gray-200 rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Bạn có rảnh để nói chuyện không
                        </div>
                        </div>
                    </div>
                    <div className='flex  gap-x-2 sm:gap-x-4 justify-end'>
                        <div className='w-1/2 sm:w-auto'>
                        <div className='text-base font-medium bg-[#0084ff] text-white rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Tối đang rảnh bạn cứ nói đi
                        </div>
                        <div className='text-base font-medium bg-[#0084ff] text-white rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Tối đang rảnh bạn cứ nói đi
                        </div>
                        <div className='text-base font-medium bg-[#0084ff] text-white rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Tối đang rảnh bạn cứ nói đi
                        </div>
                        <div className='text-base font-medium bg-[#0084ff] text-white rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Tối đang rảnh bạn cứ nói đi
                        </div>
                        <div className='text-base font-medium bg-[#0084ff] text-white rounded-[10px] px-[10px] py-[20px] mb-2'>
                            Hello, Tối đang rảnh bạn cứ nói đi
                        </div>
                        </div>
                        <Image src="/dumuc/avatar.png" width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                    </div>
                    
                </div>
            </div>
            <div className='bg-gray-200 h-[225px] w-full py-[16px]'>
                    <div className='flex items-center px-4 gap-x-4'>
                    <button onClick={() => refImg.current?.click()}>
                    <IoImageOutline color='#999' size={32} />
                    </button>
                    <button onClick={() => refVideo.current?.click()}><RiFolderVideoLine color='#999' size={32}  /></button>
                    <button onClick={() => refFile.current?.click()}><GoFileDirectory color='#999' size={32} /></button>
                    <input className='hidden' type='file' accept='image/*' ref={refImg} />
                    <input className='hidden' type='file' accept='video/*' ref={refVideo} />
                    <input className='hidden' type='file' accept='' ref={refFile} />
                    </div>
                    <div className='my-2'>
                        <textarea
                        onChange={(e) => setBody(e.target.value)}
                        placeholder='Gửi tin nhắn...'
                        className='px-4 placeholder:text-lg text-lg w-full border-none bg-gray-200 focus-visible:border-none  focus-visible:shadow-none focus-visible:outline-none focus:border-none focus:shadow-none focus:outline-none'
                         style={{
                        resize: "none",
                        boxShadow: "none"
                    }}
                    rows={3}
                    ></textarea>
                    </div>
                   <div className='flex justify-end items-center pr-[30px]'>
                   
                    {/* <button><MdEmojiEmotions color='#0084ff' size={28} /></button> */}
                    {
                        body && body.length > 0 ? <button className='bg-[#0084ff] text-white px-[30px] rounded-[10px] pt-[4px] pb-[6px] text-lg'>
                        Gửi
                    </button> : <button className='bg-[#0084ff] bg-opacity-60 text-white px-[30px] rounded-[10px] pt-[4px] pb-[6px] text-lg cursor-not-allowed'>
                        Gửi
                    </button>
                    }
                   </div>
            </div>
        </div>
      </div>
    {/* <div className={sizes.width > 411 ? "mb-24" :  "mb-16"} /> */}
    {
        sizes.width > 992 ? <TabbarBottomChat active="chat" /> : show < 0 && !mobile && <TabbarBottomChat active="chat" />
    }
    </main>
  )
}
