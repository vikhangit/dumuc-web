"use client"
import { useWindowSize } from '@hooks/useWindowSize';
import Link from "next/link"
import { getPopularAuthors, getPopularPosts } from '@apis/posts';
import { getUsersRanking } from '@apis/users';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dropdown, Modal, Select } from 'flowbite-react';
import PostSOSWithModal from './PostSOSWithModal';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@recoils/atoms';
import LoginWithModal from './LoginWithModal';
import { message } from 'antd';
import moment from "moment";
import { DateTimeLog } from "@utils/dateFormat";
import { getSossByUser } from '@apis/soss'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@utils/firebase';

const SOSTab = ({ active, setActive, callBack }) => {
  let now = moment();
  const sizes = useWindowSize();
  const [openModal, setOpenModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const list = [
    "All",
    "Mới nhất",
    "Đang hỗ trợ",
    "Hoàn thành",
    "Hết hạn"
  ]
  const [user, loading, error] = useAuthState(auth);
  const [soss, setSoss] = useState()
  useEffect(() => {
    (async () => {
      try {
        if (user) {  
          //soss
          const [soosData] = await Promise.all([
            getSossByUser(user?.accessToken),
          ]);
          setSoss(soosData);
        }
      } catch (e) {}
    })();
  }, [user])
  return (
    <>
      <div className="flex gap-x-1 sm:gap-x-4 py-4 sm:py-6 mx-2 sm:mx-6 border-b border-dashed border-[#FF0000]">
        <div className='relative basis-3/5 sm:basis-2/3'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-1/2 right-5 text-white -translate-y-1/2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
          <select
            style={{
              paddingTop: 1,
              paddingBottom: 1,
              outline: "none",
              border: "none"
            }}
            className="px-4 sm:px-6 w-full h-full rounded-full bg-[#D15156] shadow-md shadow-gray-500 focus-shadow-0 bg-opacity-70 text-white [&:not([size])]:bg-none"
            onChange={(e) => setActive(Number(e.target.value))}
          >

            {
              list.map((item, index) => <option className="bg-white text-gray-900" key={index} value={index}>{item}</option>)
            }
          </select>
        </div>
        <div onClick={() => {
          if (soss.length > 0 && soss?.filter(x => now.isBefore(moment(DateTimeLog(x?.createdAt, x?.deadline), 'DD/MM/YYYY hh:mm:ss'))).length > 0) {
            message.warning("Bạn đang có sos đang thực hiện")
          } else {
            setOpenModal(true)
          }
        }}
          className="cursor-pointer basis-2/5  sm:basis-1/3 text-center bottom-link bg-[#D15156] shadow-md shadow-gray-500 bg-opacity-70 text-white text-base sm:text-xl md:text-2xl rounded-full uppercase" style={{ lineHeight: 2.5 }}>Gửi sos mới</div>
      </div>
      {/* <div className="bg-[#c80000] px-2 sm:px-4 py-4 relative">
        {
          sizes.width > 510 ? <div className="flex flex-nowrap gap-x-2 sm:gap-x-6 overflow-auto">
            {
              list.map((item, index) => {
                if (index === 4) {
                  return <span
                    className={`cursor-pointer ${(active === index) ? "bg-white text-gray-600" : "text-white bg-gray-700"}
          basis-1/5 whitespace-nowrap py-1.5 border border-white rounded-full text-center text-sm flex items-center justify-center`}
                    onClick={() => setActive(4)}>
                    <button type="button">{item}</button>
                  </span>
                } else {
                  return <span
                    className={`cursor-pointer ${active === index ? "bg-white text-gray-600" : "text-white "}
          basis-1/5 whitespace-nowrap py-1.5 border border-white rounded-full text-center text-sm flex items-center justify-center`}
                    onClick={() => setActive(index)}>
                    <button type="button">{item}</button>
                  </span>
                }
              })
            }
          </div> :
            
        }
      </div> */}
      <div>
        <Modal show={openModal} onClose={() => setOpenModal(false)} style={{
          padding: sizes.width > 376 ? 4 : 0
        }}>
          <Modal.Header className="bg-[#c80000] bg-opacity-60 rounded-b-xl justify-center text-center  text-white [&>h3]:text-white [&>h3]:w-full [&>h3]:text-base [&>h3]:sm:text-xl  [&>button]:ml-auto p-2.5 [&>button]:text-white">
            {user ? "Tạo SOS mới" : "Xin mời đăng nhập"}
          </Modal.Header>
          <Modal.Body className="px-2 sm:px-4">
            {
              user ?
                <PostSOSWithModal setModalSuccess={setModalSuccess} setCloseForm={setOpenModal} />
                : <LoginWithModal setClose={() => setOpenModal(false)} />
            }
          </Modal.Body>
        </Modal>
        <Modal show={modalSuccess} onClose={() => {
          setModalSuccess(false);
          callBack()
        }} style={{
          padding: sizes.width > 376 ? 4 : 0
        }}>
          <Modal.Header className="bg-[#c80000] bg-opacity-60 rounded-b-xl justify-center text-center  text-white [&>h3]:text-white [&>h3]:w-full [&>h3]:text-base [&>h3]:sm:text-xl  [&>button]:ml-auto p-2.5 [&>button]:text-white">
            Thông báo SOS
          </Modal.Header>
          <Modal.Body className="px-4 py-0 pb-6 flex flex-col items-center">
            <div className="text-2xl text-[#525050] mt-4">Bạn đã gửi <span className="text-[#D15156]">SOS</span> thành công !</div>
            <div className="text-[#525050] mt-4">Chúng tôi đang tìm Hiệp Sĩ cho bạn ...</div>
            <button className="mt-4 w-[200px] h-[30px] text-sm font-semibold bg-[#D15156] text-white rounded-full leading-normal flex justify-center items-center"
              onClick={() => router.push("/")}
            >Quay về trang chủ</button>
          </Modal.Body>
          <Modal.Footer className="flex justify-center items-center">
            <div className="text-[#525050] text-xs text-center">***Bạn có thể <span className="underline px-1" onClick={() => {
              setModalSuccess(false);
              callBack()
            }}>xem lại</span> tình trạng SOS qua cảnh báo trang chủ</div>
          </Modal.Footer>
        </Modal>
        {/* <div className={`flex justify-between ${sizes.width > 340 ? "px-2 sm:px-4" : "px-0.5"} gap-x-1 sm:gap-x-4 bg-gray-200`}>
      <div className="basis-1/4">
      <select 
      style={{
       boxShadow: "0 0 #0000", 
       paddingRight: sizes.width > 500 ? "2.5rem" : "0.5rem",
       paddingLeft: sizes.width > 500 ? "0.75rem" : "0.5rem"
      }} 
      className={`w-full border-0 text-[#c80000] bg-transparent ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[10px] font-medium"} cursor-pointer focus:border-0 focus:outline-0 
      ${sizes.width > 500 ? "[&:not([size])]:bg-[url('/icons/MdKeyboardArrowDown.png')]" : "[&:not([size])]:bg-none"} [&:not([size])]:bg-[length:1.75rem]`}>
        <option className="text-xs">Tuần này</option>
        <option className="text-xs">Tuần trước</option>
      </select>
      </div>
      <div className="basis-1/4">
      <select 
      style={{
       boxShadow: "0 0 #0000", 
       paddingRight: sizes.width > 500 ? "2.5rem" : "0.5rem",
       paddingLeft: sizes.width > 500 ? "0.75rem" : "0.5rem"
      }} 
      className={`w-full border-0 text-[#c80000] bg-transparent ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[10px] font-medium"} cursor-pointer focus:border-0 focus:outline-0 
      ${sizes.width > 500 ? "[&:not([size])]:bg-[url('/icons/MdKeyboardArrowDown.png')]" : "[&:not([size])]:bg-none"} [&:not([size])]:bg-[length:1.75rem]`}>
        <option className="text-xs">Tháng này</option>
        <option className="text-xs">Tháng trước</option>
      </select>
      </div>
      <div className="basis-1/4">
      <select 
      style={{
       boxShadow: "0 0 #0000", 
       paddingRight: sizes.width > 500 ? "2.5rem" : "0.5rem",
       paddingLeft: sizes.width > 500 ? "0.75rem" : "0.5rem"
      }} 
      className={`w-full border-0 text-[#c80000] bg-transparent ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[10px] font-medium"} cursor-pointer focus:border-0 focus:outline-0 
      ${sizes.width > 500 ? "[&:not([size])]:bg-[url('/icons/MdKeyboardArrowDown.png')]" : "[&:not([size])]:bg-none"} [&:not([size])]:bg-[length:1.75rem]`}>
        <option className="text-xs">Qúy này</option>
        <option className="text-xs">Quý trước</option>
      </select>
      </div>
      <div className="basis-1/4">
      <select 
      style={{
       boxShadow: "0 0 #0000", 
       paddingRight: sizes.width > 500 ? "2.5rem" : "0.5rem",
       paddingLeft: sizes.width > 500 ? "0.75rem" : "0.5rem"
      }} 
      className={`w-full border-0 text-[#c80000] bg-transparent ${sizes.width > 350 ? "text-xs sm:text-sm" : "text-[10px] font-medium"} cursor-pointer focus:border-0 focus:outline-0 
      ${sizes.width > 500 ? "[&:not([size])]:bg-[url('/icons/MdKeyboardArrowDown.png')]" : "[&:not([size])]:bg-none"} [&:not([size])]:bg-[length:1.75rem]`}>
        <option className="text-xs">Năm này</option>
        <option className="text-xs">Năm trước</option>
      </select>
      </div>
    </div> */}
      </div>
    </>
  );
}

export default SOSTab;
