
"use client"
import { useWindowSize } from '@hooks/useWindowSize';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { HiVideoCamera } from 'react-icons/hi';
import { IoIosCall, IoMdPersonAdd} from 'react-icons/io';
import { IoChevronBackOutline, IoImageOutline, IoInformationCircleSharp} from 'react-icons/io5';
import { RiFileVideoFill } from 'react-icons/ri';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@utils/firebase';;
import { collection, addDoc, serverTimestamp} from 'firebase/firestore';;
import { uploadImage } from '@apis/other';
import ModalWating from '@components/Dumuc/ModalWating';
import {message} from "antd";
import ModalImageZoom from '@components/ModalImageZoom';
import { MdAttachFile } from 'react-icons/md';
import { FaFile, FaFileAudio, FaFileImage, FaFileLines } from 'react-icons/fa6';
import { BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { BsFileEarmarkWordFill } from "react-icons/bs";
import { SiMicrosoftpowerpoint } from "react-icons/si";
import ModalViewFile from '@components/ModalViewFile';
import ModalAddMember from './ModalAddMember';
import { FaInfoCircle } from 'react-icons/fa';
import ModalAbout from './ModalAbout';

export default function ChatGroupRight({userRecieved, setUserRecieved, mobile, setMobile, messages, authors, activeGroup, setActiveGroup}) {
    const [user] = useAuthState(auth)
    const refImg = useRef();
    const refVideo = useRef();
    const refFile = useRef();
    const scroll = useRef();
    const sizes = useWindowSize()
    const [newMessage, setNewMessage] = useState("");
    const [showWatting, setShowWating] = useState(false)
    const [photos, setPhotos] = useState([])
    const [videos, setVideos] = useState([])
    const [myMessage, setMyMessage] = useState(
      []
    )
    useEffect(() => {
      setMyMessage([])
      const chat2 = messages?.filter( item => item?.member?.find(x => x?.user === user?.uid))
      console.log(chat2)
      const chat = chat2?.find( item => item?.id === activeGroup?.id)
      console.log(chat)
      if(chat){
        setMyMessage(chat?.messages)
      }
     },[messages, activeGroup])
    const handleSendImage = async (e) => {
      setShowWating(true)
      if(e?.target?.files){
        let array = []
        for (let index = 0; index < e?.target?.files?.length; index++) {
          array.push(e?.target?.files[index])
        }
        let newPhoto = [];
        array.map(async (x) => 
          {
         await uploadImage(x, user?.accessToken).then(async (data) => {
              newPhoto.push(data?.url)
              if(newPhoto.length === array.length){
                const myAuthor = authors?.find(x => x?.userId === user?.uid)
                await addDoc(collection(db, "chat-groups", `${activeGroup?.id}`, "messages"), {
                  text: newMessage,
                  photos: newPhoto,
                  files: [],
                  createdAt: serverTimestamp(),
                  formAuthor: myAuthor
                })
                setNewMessage("");
                setPhotos([])
                scroll.current?.scrollIntoView({ behavior: "smooth" })
              }
              setShowWating(false) 
            }
            )
            .catch((err) => {
              message.error("Đã có lỗi do kích thước file quá lớn")
              setShowWating(false)
            })
          }
        )
      } 
    }
    const handleSendVideo = async (e) => {
      setShowWating(true)
      if(e?.target?.files){
        let array = []
        for (let index = 0; index < e?.target?.files?.length; index++) {
          array.push(e?.target?.files[index])
        }
        let newPhoto = [];
        array.map(async (x) => 
          {
         await uploadImage(x, user?.accessToken).then(async (data) => {
              newPhoto.push({
                url: data?.url,
                name: x?.name,
                type: x?.type
              })
              if(newPhoto.length === array.length){
                const myAuthor = authors?.find(x => x?.userId === user?.uid)
                await addDoc(collection(db, "chat-groups", `${activeGroup?.id}`, "messages"), {
                  text: newMessage,
                  photos,
                  files: newPhoto,
                  createdAt: serverTimestamp(),
                  formAuthor: myAuthor
                })
                setNewMessage("");
                scroll.current?.scrollIntoView({ behavior: "smooth" })
              }
              setShowWating(false)
            }
            )
            .catch((err) => {
              message.error("Đã có lỗi do kích thước file quá lớn")
              setShowWating(false)
            })
          }
        )
      } 
    }
    const [openImage, setOpenImage] = useState(false)
    const [imageList, setImageList] = useState([]);
    const [indexImage, setIndexImage] = useState(0);
    const [type, setType] = useState("image");
    const [showModalAddMember, setShowModalAddMember]  =useState(false)
    const [openAbout, setOpenAbout] = useState(false)
    const [typeAbout, setTypeAbout] = useState("about")
    const [activeAbout, setActiveAbout] = useState()
  return (
    <div className={`h-full ${sizes.width > 992 ? "basis-2/3" : `${mobile ? "basis-full" :"hidden"}`}`}>
      <div className='h-[75px] flex justify-between items-center px-[15px] pl-[0px] sm:px-[20px] shadow-md shadow-gray-400'>
          {
            activeGroup && <>
            <div className='flex items-center gap-x-2 sm:gap-x-4'>
              <button className={`${sizes.width > 992 ? "hidden" : ""}`}
              onClick={() => {
                  setMobile(false)
                  setActiveGroup()
              }}
              >
              <IoChevronBackOutline size={32} />
              </button>
          <Image src={ activeGroup && activeGroup?.avatar && activeGroup?.avatar?.length > 0 ? activeGroup?.avatar : "/dumuc/avatar.png" } width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
            <div>
          <Link href="" className='text-base font-semibold'>{activeGroup?.name}</Link>
          {/* <p className='text-sm'>Đang hoạt động</p> */}
          </div>
          </div>
          <div className='flex items-center gap-x-3 pr-0 sm:pr-5'>
          <IoMdPersonAdd color='#0084ff' size={24} onClick={() => setShowModalAddMember(true)} />
          <button className='group relative'>
          <IoInformationCircleSharp color='#0084ff' size={28} />
          <div className="absolute z-[99999] hidden group-hover:flex flex-col justify-start items-start top-full right-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[125px] rounded p-1">
                                                                <Link href={``} 
                                                                 onClick={async (e) => {
                                                                    e.preventDefault();
                                                                   setOpenAbout(true)
                                                                   setTypeAbout("member")
                                                                    }} 
                                                                  className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left`}
                                                                >
                                                                   Xem thành viên
                                                                </Link>
                                                                <Link href={``} 
                                                                    onClick={(e) => {
                                                                  e.preventDefault();
                                                                  setOpenAbout(true)
                                                                  setTypeAbout("about")
                                                                    }} 
                                                                    className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left`}>Thông tin nhóm</Link>
                                        </div>
          </button>
          </div></>
          }
        </div>
        {
          activeGroup? 
          <>
            <div className={`${sizes.width > 992 ?  photos?.length > 0 ? "h-[calc(100%-520px)]" : "h-[calc(100%-335px)]" : photos?.length > 0 ? "h-[calc(100%-450px)]" : "h-[calc(100%-275px)]"} overflow-auto scroll-chat px-3 py-5`}>
              <ul>
                {
                  myMessage?.filter( (ele, ind) => ind === myMessage?.findIndex( elem => elem.id === ele.id && elem.text === ele.text))?.map((item, index) => {
                    const author = authors?.find(x => x.authorId === item?.formAuthor?.authorId)
                    return  <div className={`flex gap-x-2 sm:gap-x-4 ${author?.userId === user?.uid ? "flex-row-reverse" : "flex-row"}`}>
                    <Image src={author?.user?.photo && author?.user?.photo?.length > 0 ? author?.user?.photo : "/dumuc/avatar.png"} width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                    <div className='w-2/3 sm-w-1/2'>
                    {
                      item?.photos?.length > 0 &&
                      <div className={`w-full flex ${author?.userId === user?.uid ? "justify-end" : "justify-start"} gap-2 mt-2`}
                      >
                        {
                          item?.photos?.map((photo, indexC) => {
                            return (
                              <div
                                key={indexC}
                                className={`rounded-md h-full w-full relative w-1/2 sm:w-1/3 md:w-1/4`}
                              >
                               
                                <button
                                onClick={() => {
                                  setImageList(item?.photos)
                                  setIndexImage(indexC)
                                  setOpenImage(true)
                                  setType("image")
                                }}
                                className="w-full h-full"
                                >
                                 <Image
                                    width={0}
                                    height={0}
                                    style={{
                                    
                                      objectFit: "cover",
                                    }}
                                    sizes="100vw"
                                    className={`rounded-md w-full ${sizes.width > 450 ? "h-[110px] sm:h-[125px] md:h-[115px] xl:h-[110px] 2xl:h-[125px]" : "h-[70px]"}`}
                                    src={photo}
                                    alt=""
                                  />
                                </button>
                              </div>
                            );
                          })
                        }
                      </div>
                    }
                    {
                      item?.files?.length > 0 &&
                      <div className={`w-full mt-2`}>
                        {
                           item?.files?.map((photo, indexC) => {
                            return (
                              <Link
                              href={photo?.url} 
                              target='_blank'>
                              <div 
                              
                              className={`cursor-pointer w-full sm:w-3/4 lg:w-2/3 xl:w-7/12 2xl:w-1/2  text-base font-medium cursor-pointer ${item?.formAuthor?.userId === user?.uid ? "bg-[#e5efff] ml-auto" : "bg-gray-100"}  rounded-[10px] px-[10px] py-[20px] mb-2`}>
                                
                                <div className='flex items-center gap-x-2'>
                                {
                                  photo?.type?.includes("image") ? 
                                  <FaFileImage className='text-amber-500' size={48}  /> : 
                                  photo?.name?.includes("pptx") ? 
                                  <SiMicrosoftpowerpoint className='text-rose-700' size={48}  /> : 
                                  photo?.name?.includes("xlsx") ? 
                                  <FaFileLines  className='text-green-600' size={48}  /> : 
                                  photo?.type?.includes("video") ? 
                                  <RiFileVideoFill size={48} className='text-yellow-300' /> : 
                                  photo?.type?.includes("pdf") ? 
                                  <BiSolidFilePdf size={48} className='text-rose-500' /> : 
                                  photo?.type?.includes("doc") ?  
                                  <BsFileEarmarkWordFill size={48} className='text-[#4367A5]' /> :
                                  photo?.type?.includes("audio/mpeg") ?  
                                  <FaFileAudio size={48} className='text-purple-600' /> :
                                  photo?.type?.includes("text/plain") ?  
                                  <BiSolidFileTxt size={48} className='text-sky-400' /> :
                                  <FaFile size={48} className='text-sky-400' />
                                }
                              <div className=''> {photo?.name?.slice(0, 20)}{photo?.name?.length > 20 && <>...{photo?.name?.slice(photo?.name?.length-8, photo?.name?.length)}</> }</div>
                                </div>
                        
                              </div>

                              </Link>
                             
                            );
                          })
                        }
                      </div>
                    }
                    {
                      item?.text?.trim() !== "" && <div className={`w-fit  text-base font-medium ${item?.formAuthor?.userId === user?.uid ? "bg-[#e5efff] ml-auto" : "bg-gray-100"}  rounded-[10px] px-[10px] py-[20px] mb-2`}>
                      {item?.text}
                    </div>
                    }
                    </div>
                  </div>
                  })
                }
                <span ref={scroll}></span>
              </ul>
            </div>
          <div className={`bg-gray-200 ${photos?.length > 0 ? "h-[400px]" : " h-[400px]"} w-full py-[16px] relative`}>          
            <div className='flex items-center px-4 gap-x-4'>
              <button onClick={() => refImg.current?.click()}>
                <IoImageOutline color='#999' size={32} />
              </button>
              <button onClick={() => refVideo.current?.click()}>
                <MdAttachFile color='#999' size={28}  />
              </button>
              <input className='hidden' onChange={(e) => {
                handleSendImage(e)
              }} type='file' accept='image/*' ref={refImg} multiple />
              <input className='hidden'  onChange={(e) => {
                handleSendVideo(e)
              }}  type='file' ref={refVideo} multiple />
              {/* <input className='hidden' type='file' accept='' ref={refFile} multiple /> */}
            </div>
            <div className='my-2 flex flex-col'>
            {/* {
              photos?.length > 0 && <div className={`bg-gray-200 w-full grid ${sizes.width > 425 ? "grid-cols-3 sm:grid-cols-4 xl:grid-cols-5" : "grid-cols-2"} gap-2 px-4 h-[175px] overflow-auto scroll-quick-post`}>
              {
               photos?.map((photo, indexC) => {
                return (
                  <div
                    key={indexC}
                    className={`rounded-md h-full w-full relative ml-auto`}
                  >
                    <button 
                    onClick={() => {
                      photos.splice(indexC, 1)
                      setPhotos([...photos])
                    }}
                    className='absolute top-1 right-1 z-10'><IoMdCloseCircle size={18} color="red" /></button>
                    <a
                    className="w-full h-full"
                    >
                     <Image
                        width={0}
                        height={0}
                        style={{
                        
                          objectFit: "cover",
                        }}
                        sizes="100vw"
                        className={`rounded-md w-full ${sizes.width > 320 ? "h-[125px] sm:h-[150px]" : "h-[100px]"}`}
                        src={photo}
                        alt=""
                      />
                    </a>
                  </div>
                );
              })
              }
            </div>
            } */}
              <textarea
                value={newMessage}
                onChange={(event) => {
                  setNewMessage(event.target.value);
                }}
                placeholder="Type your message here..."
                className='px-4 placeholder:text-lg text-lg w-full border-none bg-gray-200 focus-visible:border-none  focus-visible:shadow-none focus-visible:outline-none focus:border-none focus:shadow-none focus:outline-none'
                style={{
                  resize: "none",
                  boxShadow: "none"
                }}
                ></textarea>
            </div>
            <div className='flex justify-end items-center pr-[30px]'>
              {
                newMessage.trim() !== "" ? 
                <button 
                  onClick={async (event) => {
                    event.preventDefault();
                    // if (newMessage.trim() === "") {
                    //   message.error("Bạn chưa nhập nội dung hoặc ");
                    //   return;
                    // }
                    const myAuthor = authors?.find(x => x?.userId === user?.uid)
                    
                    await addDoc(collection(db, "chat-groups", `${activeGroup?.id}`, "messages"), {
                      text: newMessage,
                      photos,
                      files: [],
                      createdAt: serverTimestamp(),
                      formAuthor: myAuthor
                    })
                    setNewMessage("");
                    setPhotos([])
                    scroll.current?.scrollIntoView({ behavior: "smooth" })
                  }} 
                  className='bg-[#0084ff] text-white px-[30px] rounded-[10px] pt-[4px] pb-[6px] text-lg'
                >
                    Gửi
                </button> : 
                <button 
                  className='bg-[#0084ff] bg-opacity-60 text-white px-[30px] rounded-[10px] pt-[4px] pb-[6px] text-lg cursor-not-allowed'
                >
                  Gửi
                </button>
              }
            </div>
          </div>
        </>:
        <div className='h-full w-full flex justify-center items-center text-base'>Danh tin nhắn đang trống</div>
        } 
        <ModalWating openModal={showWatting} setOpenModal={setShowWating} />
        <ModalImageZoom imageList={imageList} index={indexImage} openImage={openImage} setOpenImage={setOpenImage} type={type}   />
        <ModalAddMember authors={authors} onCallback={() => {}} visible={showModalAddMember} onCancel={() => setShowModalAddMember(false)}  activeGroup={activeGroup}/>
        <ModalAbout visible={openAbout} onCancel={() => setOpenAbout(false)} about={activeGroup} authors={authors} type={typeAbout} />
    </div>
  )
}
