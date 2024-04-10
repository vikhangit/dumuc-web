
"use client"
import { useWindowSize } from '@hooks/useWindowSize';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoMdSearch } from 'react-icons/io';
import { IoCloseCircle} from 'react-icons/io5';
import { MdOutlineGroupAdd, MdOutlinePersonAddAlt } from 'react-icons/md';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@utils/firebase';;
  import { getProfile } from '@apis/users';
import { useRouter } from 'next/navigation';
import ModalCreateGroup from './ModalCreateGroup';
import { FaCamera } from 'react-icons/fa6';
import moment from 'moment';

export default function ChatGroupLeft({activeGroup, setActiveGroup, mobile, setMobile, messages, authors}) {
    const [user] = useAuthState(auth)
    const sizes = useWindowSize()
    const router = useRouter()
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [groupList, setGroupList] = useState([])
    const [valueSearch, setValueSearch] = useState("");
    const [searchFunction, setSearchFunction] = useState(false)
    const [usingUser, setUsingUser] = useState()
    useEffect(() =>{
        getProfile(user?.accessToken).then((dataCall) => {
            setUsingUser(dataCall)
            
        }) 
      },[user])
    useEffect(() =>{
        setGroupList(messages)
    }, [messages])
   
    const searchField = (value) => {
        setValueSearch(value)
          if(value.trim() === ""){
            setGroupList(messages)
        }else{
            const searchList =   messages?.filter(x => x?.name?.toLowerCase()?.includes(value?.toLowerCase()))
            if(searchList && searchList.length > 0){
                setGroupList(searchList)
              }else{
                setGroupList([])
              }
        }
    }
  return (
    <div className={`h-full ${sizes.width > 992 ? "basis-1/3" : `${!mobile ? "basis-full" :"hidden"}`}`}>
    <div className='flex items-center bg-[#C82027] shadow-md shadow-gray-400 w-full justify-between px-[5px] h-[65px] gap-x-3'>
        <div className={`relative flex items-center pl-[15px] w-[calc(100%-170px)] ${sizes.width > 380 ? "pl-[15px]" : "pl-[5px]" }`}>
            <div className=''><IoMdSearch size={24} color='#fff' /></div>
            <input 
                placeholder='Tìm kiếm ...' 
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
        <button 
          onClick={() => {
            setShowModalCreate(true)
          }}
           className={`flex justify-center rounded-[20px] bg-[#EB7F7F] items-center  gap-x-2 text-white  py-[5px] ${sizes.width > 380 ? "px-[15px] w-[150px]" : "w-[135px] gap-x-1"}`}>
          <MdOutlineGroupAdd  size={24} color='#fff' />
          Tạo nhóm
      </button>
    </div>
    <div className='h-[calc(100%-150px)] overflow-auto scroll-chat px-2'>
        {
            groupList?.length > 0 ? groupList?.map((item, i) => 
            {  
              return  item?.member?.find(x => x?.user === user?.uid) ?  
              <div
                    onClick={() => {
                        setActiveGroup(item)
                        setMobile(true)
                    }}
                     className={`${activeGroup?.id ===  item?.id? "bg-[#0084ff] bg-opacity-30" : "bg-white"} rounded-md shadow-md shadow-gray-400 flex items-center gap-x-2 pl-[15px] pr-2 py-[20px] mt-[10px] cursor-pointer`}>
                        <div className='w-[45px] h-[45px] rounded-full flex justify-center items-center border border-gray-400'>
                            {
                                item?.avatar && item?.avatar?.length > 0 ? <Image src={item?.avatar} width={0} height={0} sizes='100vw' className='w-full h-full rounded-full' />
                                :
                               <FaCamera color="#999" size={20} />                    
                            }
                        </div>

                    <div className='flex justify-between w-full'>
                        <div>
                            <Link href="" className='text-base'>{item?.name}</Link>
                            {/* <p className='text-[13px] text-[#00000080] mt-2'>Tin nhắn mới nhất của bạn ....</p> */}
                        </div>
                    
                    </div>
                </div> : null
         }) : 
            <div className='h-full w-full flex justify-center items-center text-base'>Danh nhóm đang trống</div> 
        }
    </div>
    <ModalCreateGroup visible={showModalCreate} onCancel={() => setShowModalCreate(false)} authors={authors} onCallback={() => {
        return;
    }} />
</div>
  )
}
