
"use client"
import { useWindowSize } from '@hooks/useWindowSize';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';
import { MdOutlinePersonAddAlt } from 'react-icons/md';;
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@utils/firebase';;
  import { getProfile } from '@apis/users';
;

export default function ChatLeft({setUserRecieved, userRecieved, mobile, setMobile, messages, authors}) {
    const [user] = useAuthState(auth)
    const sizes = useWindowSize()
    const [friendList, setFriendList] = useState([])
    const [valueSearch, setValueSearch] = useState("");
    const [searchFunction, setSearchFunction] = useState(false)
    const [usingUser, setUsingUser] = useState()
    useEffect(() =>{
        getProfile(user?.accessToken).then((dataCall) => {
            setUsingUser(dataCall)
            setFriendList(dataCall?.friendList)
        }) 
      },[user])
   
    const searchField = (value) => {
        setValueSearch(value)
          if(value.trim() === ""){
            setFriendList(usingUser?.friendList)
        }else{
            const searchList = usingUser?.friendList?.filter(x => authors?.find(a => a?.authorId === x?.author?.authorId)?.name?.toLowerCase()?.includes(value?.toLowerCase()))
            if(searchList && searchList.length > 0){
                setFriendList(searchList)
              }else{
                setFriendList([])
              }
        }
    }
  return (
    <div className={`h-full ${sizes.width > 992 ? "basis-1/3" : `${!mobile ? "basis-full" :"hidden"}`}`}>
    <div className='flex items-center bg-[#C82027] shadow-md shadow-gray-400 w-full justify-between px-[5px] h-[65px] gap-x-3'>
        <div className={`relative flex items-center pl-[15px] ${searchFunction ? "w-full pr-[22px]" : "w-[calc(100%-170px)]"} ${sizes.width > 380 ? "pl-[15px]" : "pl-[5px]" }`}>
            <div className=''><IoMdSearch size={24} color='#fff' /></div>
            <input 
                placeholder='Tìm kiếm ...' 
                onFocus={() => {
                    setSearchFunction(true)
                    setUserRecieved()
                    if(valueSearch.trim() === "") setFriendList(usingUser?.friendList)
                }}
                value={valueSearch}
                // autoFocus={searchFunction}
                className='ml-[6px] text-[#fff] text-base placeholder-[#fff] bg-[#C82027] w-full focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none' 
                onChange={(e) => searchField(e.target.value)}
            />
            {
                valueSearch.trim() !== "" && searchFunction && <button onClick={() => {
                    setValueSearch("")
                    setFriendList(usingUser?.friendList)
                }} 
                className='absolute right-0'><IoCloseCircle size={16} className='text-white' /></button>
            }
        </div>
        {
          !searchFunction ? <Link href={`/account/recent-members`} className={`flex justify-center rounded-[20px] bg-[#EB7F7F] items-center  gap-x-2 text-white  py-[5px] ${sizes.width > 380 ? "px-[15px] w-[150px]" : "w-[135px] gap-x-1"}`}>
          <MdOutlinePersonAddAlt size={24} color='#fff' />
          Thêm bạn
      </Link> : 
        <button 
            onClick={() => {
                setSearchFunction(false)
                setUserRecieved()
            }}
            className={`rouded-[5px] text-white text-base font-semibold px-[20px] py-[5px] hover:bg-gray-200 hover:text-black cursor-pointer`}
        >
            Đóng
        </button>
        }
    </div>
    <div className='h-[calc(100%-150px)] overflow-auto scroll-chat px-2'>

        {
        searchFunction ? friendList?.length > 0 ? friendList?.map((item, index) => 
           {
            const author = authors?.find(x => x?.authorId === item?.author?.authorId)
            return <div
            key={index}
            onClick={() => {
                setUserRecieved(author)
                setMobile(true)
            }}
             className={`${userRecieved?.authorId === author?.authorId ? "bg-[#0084ff] bg-opacity-30" : "bg-white"} rounded-md shadow-md shadow-gray-400 flex items-center gap-x-2 pl-[15px] pr-2 py-[20px] mt-[10px] cursor-pointer`}>
            <Image src={author?.user?.photo && author?.user?.photo?.length > 0 ? author?.user?.photo : "/dumuc/avatar.png"} width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
            <div className='flex justify-between w-full'>
                <div>
                    <Link href="" className='text-base'>{author?.name}</Link>
                    {/* <p className='text-[13px] text-[#00000080] mt-2'>Tin nhắn mới nhất của bạn ....</p> */}
                </div>
                {/* <span className='text-[13px] text-[#00000080]'>13 phút</span> */}
            </div>
        </div>
        }
        
        ) 
        : valueSearch.trim() === "" 
        ? <div className='h-full w-full flex justify-center items-center text-base'>Danh sách bạn bè trống</div>  
        :<div className='h-full w-full flex justify-center items-center text-base'>Không tìm thấy kết quả vui lòng thử từ khóa khác</div>
        : 
         messages?.length > 0 ? messages?.map((item, i) => 
        {   
          return  item?.member?.find(x => x?.userId === user?.uid) ?  item?.member?.map((itemChild, indexChild) => {
                const author = authors?.find(x => x?.authorId === itemChild?.authorId)
                return itemChild?.userId !== user.uid && <div
                key={indexChild}
                onClick={() => {
                    setUserRecieved(author)
                    setMobile(true)
                }}
                 className={`${userRecieved?.authorId === itemChild?.authorId ? "bg-[#0084ff] bg-opacity-30" : "bg-white"} rounded-md shadow-md shadow-gray-400 flex items-center gap-x-2 pl-[15px] pr-2 py-[20px] mt-[10px] cursor-pointer`}>
                <Image src={author?.user?.photo && author?.user?.photo?.length > 0 ? author?.user?.photo : "/dumuc/avatar.png"} width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
                <div className='flex justify-between w-full'>
                    <div>
                        <Link href="" className='text-base'>{author?.name}</Link>
                        {/* <p className='text-[13px] text-[#00000080] mt-2'>Tin nhắn mới nhất của bạn ....</p> */}
                    </div>
                    {/* <span className='text-[13px] text-[#00000080]'>13 phút</span> */}
                </div>
            </div>
             }) : null
     }) : 
        <div className='h-full w-full flex justify-center items-center text-base'>Danh người nhắn đang trống</div> 
        }

    </div>
</div>
  )
}
