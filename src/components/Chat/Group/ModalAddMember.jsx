"use client"
import React, { useState, useEffect, useRef } from "react";
import { Modal} from "antd";
import { CaretDownOutlined} from '@ant-design/icons';
import { uploadImage } from "apis/other";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@utils/firebase';
import dynamic from 'next/dynamic';
import { useWindowSize } from "@hooks/useWindowSize";
import { createUserStories, getProfile, updateProfile } from "@apis/users";
import { createStoryByUser } from "@apis/feeds";
import { FaCamera, FaCheck } from "react-icons/fa6";
import { Spinner } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { IoMdCloseCircle } from "react-icons/io";

export default function ModalAddMember({ visible, onCancel, onCallback, authors,  activeGroup}) {
  const [user] = useAuthState(auth)
  const sizes = useWindowSize()
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("")
  const [usingUser, setUsingUser] = useState()
  const [active, setActive] = useState(0)
  const [avatar, setAvatar] = useState("")
  const refAvatar = useRef(null)
  const [loadingAvatar, setLoadingAvatar] = useState(false)
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const myAuthor = authors?.find(x => x?.userId === user?.uid)
  const [valueSearch, setValueSearch] = useState("");
  const [friendList, setFriendList] = useState([])
  const [memberList, setMemberList] = useState([])
  useEffect(() =>{
    getProfile(user?.accessToken).then((dataCall) =>{ setUsingUser(dataCall)
      setFriendList(dataCall?.friendList)})
  },[user])
  
  
  const save = () => {
    setLoading(true);
    memberList?.map(async(x) => await addDoc(collection(db, "chat-groups", `${activeGroup?.id}`, "member"), {
      user: x?.userId,
      createdAt: serverTimestamp(),
      createdBy: user?.uid
    }))
   setLoading(false);
   onCallback();
   setName("")
   setAvatar("")
   onCancel();
  }; 
  const searchField = (value) => {
    setValueSearch(value)
      if(value.trim() === ""){
        setFriendList(usingUser?.friendList)
    }else{
        const searchList = usingUser?.friendList?.filter(x => authors?.find(a => a?.authorId === x?.author?.authorId).name?.trim()?.toLowerCase()?.includes(value?.trim()?.toLowerCase()))
        if(searchList && searchList.length > 0){
            setFriendList(searchList)
          }else{
            setFriendList([])
          }
    }
}
  return (
    <Modal
      visible={visible}
      title={`Thêm thành viên`}
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose={true}
      footer={
        <div className="flex justify-end">
            {loading ? (
              <button
                disabled
                type="button"
                className={`text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5`}
              >
                <Spinner className="w-4 h-4" />
                Xác nhận
              </button>
            ) : (
              <button
                onClick={() => {
                  memberList.length > 0 && save();
                }}
                type="button"
                disabled={memberList.length === 0}
                class={`text-white bg-[#c80000] ${memberList.length === 0 && "bg-opacity-50"} hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5`}
              >
                Xác nhận
              </button>
            )}
        </div>
      }
      centered
      className="private"
    >
      <div className="mt-8 gap-x-2">
      <input onChange={(e) => searchField(e.target.value)} value={valueSearch} placeholder="Tìm kiếm....." aria-label="name" className={
          name === "" ? "bg-gray-50 border-b border-red-800 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5"
          : "bg-gray-50 border-b border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5"
        } type="text" />
        <div className="mt-5">
        {
          memberList.length > 0 && <>
          <div className=" font-semibold">Danh đã chọn</div>
          <div className="flex items-center gap-2 flex-wrap">
        {
          memberList?.map((item, index) => 
          {
           const author = authors?.find(x => x?.authorId === item?.authorId)
           return <div
           key={index}
          
            className={` shadow-md shadow-gray-400 rounded-full bg-gray-200 flex items-center gap-x-2 px-[4px] py-[3px]  cursor-pointer`}>
           <Image src={author?.user?.photo && author?.user?.photo?.length > 0 ? author?.user?.photo : "/dumuc/avatar.png"} width={0} height={0} sizes='100vw' className='w-[25px] h-[25px] rounded-full' />
           <div className='flex justify-between w-full items-center gap-2'>
                   <Link href="" className='text-sm font-medium'>{author?.name}</Link>
                   <IoMdCloseCircle className="text-gray-400" size={20} onClick={() => {
                    memberList.splice(index, 1)
                    setMemberList([...memberList])
                   }} />
           </div>
       </div>
       })
        }
          </div>
        </>
        }
          <div className=" font-semibold">Danh sách bạn bè</div>
          {
            friendList?.length > 0 ? friendList?.map((item, index) => 
            {
             const author = authors?.find(x => x?.authorId === item?.author?.authorId)
             return <div
             key={index}
             onClick={() => {
              const find = memberList?.findIndex(x => x?.authorId === author?.authorId)
              if(!activeGroup?.member?.find(x => x?.user === author?.userId)){
                if(find < 0){
                  memberList.unshift(author)
                }else{
                  memberList.splice(find, 1)
                }
                setMemberList([...memberList])
              }
             }}
              className={` rounded-md flex items-center gap-x-2 pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}>
                <div className="w-5 h-4 flex items-center justify-center border border-gray-400 rounded-[2px] text-sky-500 mr-3">
                {memberList?.find(x => x?.authorId === author?.authorId) || activeGroup?.member?.find(x => x?.user === author?.userId) && <FaCheck size={12} />}
                </div>
             <Image src={author?.user?.photo && author?.user?.photo?.length > 0 ? author?.user?.photo : "/dumuc/avatar.png"} width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
             <div className='flex justify-between w-full'>
                 <div>
                     <Link href="" className='text-base'>{author?.name}</Link>
                     {/* <p className='text-[13px] text-[#00000080] mt-2'>Tin nhắn mới nhất của bạn ....</p> */}
                 </div>
                 {/* <span className='text-[13px] text-[#00000080]'>13 phút</span> */}
             </div>
         </div>
         }): <div className='h-full w-full flex justify-center items-center text-base'>Danh bạn đang trống</div>
          }
        </div>
      </div> 
    </Modal>
    
  );
    
}
