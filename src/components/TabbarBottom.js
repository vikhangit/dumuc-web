"use client"
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import Image from 'next/image';
import { Modal, Spinner } from 'flowbite-react';
import PostSOSWithModal from './PostSOSWithModal';
import { useWindowSize } from '@hooks/useWindowSize';
import { getSossByUser } from '@apis/soss';
import moment from 'moment';
import { DateTimeLog } from "@utils/dateFormat";
import { MdPeople } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { generateCustomToken } from '@apis/users';

import { auth } from 'utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function TabbarBottom({ active = 'home' }) {
  const [user, loading, error] = useAuthState(auth);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const sizes = useWindowSize();
  const [soss, setSoss] = useState([]);
  
  const [check, setCheck] = useState(false);
  const router = useRouter();
  let now = moment();
  useEffect(() => {
    (async () => {
      setCheck(true);
      try {
        if (user) {  
          //soss
          const [soosData] = await Promise.all([
            getSossByUser(user?.accessToken),
          ]);
          setSoss(soosData);
        }
        setCheck(false);
      } catch (e) {}
    })();
  }, [user])
  return (
    <div className="tabbarBottom fixed bottom-0 w-full z-50 py-[10px] bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full mx-auto grid-cols-5 font-medium">
        {active === "home" ? (
          <Link
            href={"/"}
            className="inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Image width={0} height={0} sizes="100vw" src="/icons/bottom/Home1.png" alt="" className='w-8 h-8' />
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden">Trang chủ</span>
          </Link>
        ) : (
          <Link
            href={"/"}
            className="inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Image width={0} height={0} sizes="100vw" src="/icons/bottom/Home.png" alt="" className='w-8 h-8' />
            <span class="text-base md:text-lg font-semibold text-[#9C9C9C] bottomTabBarHiden">Trang chủ</span>
          </Link>
        )}

        {active === "forum" ? (
          <Link
            href={"/forum"}
            className="inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdPeople size={32} color='#c80000' />
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden">
              Forum
            </span>
          </Link>
        ) : (
          <Link
            href={"/forum"}
            className="inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdPeople size={32} color='#9C9C9C' />
            <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden">Forum</span>
          </Link>
        )}
        <div class="flex items-center justify-center">
          <button
            onClick={() => setIsOpenMenu(true)}
            data-tooltip-target="tooltip-new"
            type="button"
            class="inline-flex items-center justify-center w-[60px] h-[60px] rounded-full hover:bg-black group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
          >
            <Image width={0} height={0} sizes="100vw" src="/icons/bottom/Vector.png" alt="" className='w-full h-full' />
            <span class="sr-only">New item</span>
          </button>
        </div>
        <div
          id="tooltip-new"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Create new item
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        {active === "sos" ? (
          <Link
            href={"/sos"}
            className="inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Image width={0} height={0} sizes="100vw" src="/icons/bottom/Sos1.png" alt="" className='w-8 h-8' />
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden">S.O.S</span>
          </Link>
        )
          : (
            <Link
              href={"/sos"}
              className="inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <Image width={0} height={0} sizes="100vw" src="/icons/bottom/Sos.png" alt="" className='w-8 h-8' />
              <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden">S.O.S</span>
            </Link>
          )}
          <Link
          href={"/chat"}
            className="inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Image width={0} height={0} sizes="100vw" src="/icons/comment-1.jpeg" alt="" className='w-8 h-8' />
            <span class="text-base md:text-lg font-semibold text-[#9C9C9C] text-center bottomTabBarHiden">
              Chat
            </span>
          </Link>
      </div>
      <div id="modal-bottom">
        <Drawer
          placement={"bottom"}
          closable={false}
          onClose={() => setIsOpenMenu(false)}
          visible={isOpenMenu}
          key={"right"}
          height={"auto"}
          style={{
            backgroundColor: "#FFFCFC"
          }}
        > 
        {
          check ? <div class="w-full relative mb-5 text-gray-500 flex justify-center md:gap-x-8 sm:gap-x-4 sm:gap-y-4 gap-2 text-base sm:text-xl uppercase">
          <div className='absolute w-full h-[50px] sm:h-20 top-5 sm:top-0 left-[0px] flex justify-center' ></div>
          <Spinner />
        </div> :  soss.length > 0 && soss.filter(x => now.isBefore(moment(DateTimeLog(x.createdAt, x?.deadline), 'DD/MM/YYYY hh:mm:ss'))).length > 0
          ? <div class="w-full relative mb-5 text-gray-500 flex justify-center md:gap-x-8 sm:gap-x-4 sm:gap-y-4 gap-2 text-base sm:text-xl uppercase">
          <div className='absolute w-full h-[50px] sm:h-20 top-5 sm:top-0 left-[0px] flex justify-center' >
          <div className='w-1/2 sm:w-1/4 h-[50px] sm:h-20 bg-white rounded-[50%] shadow-md shadow-gray-300'>
            </div>
          </div>
          <Link className='bottom-link relative flex items-center justify-center basis-full sm:basis-1/2 bg-[#c80000] bg-opacity-40 shadow-lg shadow-gray-500 text-white text-center h-[50px] rounded-xl hover:text-white' href={user ? "/account/library/sos?status=0": "/auth"}>
            S O S ĐANG GỬI CỦA BẠN ...           
          </Link>
        </div>
        :
      <div class="w-full relative mb-5 text-gray-500 flex md:gap-x-8 sm:gap-x-4 sm:gap-y-4 gap-2 text-base sm:text-xl uppercase">
        <div className='absolute w-full h-[50px] sm:h-20 top-5 sm:top-0 left-[0px] flex justify-between' >
        <div className='w-1/4 h-[50px] sm:h-20 bg-white rounded-[50%] shadow-md shadow-gray-300 flex justify-center ml-[12.5%]'>
          </div>
          <div className='w-1/4 h-[50px] sm:h-20 bg-white rounded-[50%] shadow-md shadow-gray-300 flex justify-center mr-[12.5%]'>
          </div>
        </div>
      <Link className='bottom-link relative flex items-center justify-center basis-1/2 bg-[#c80000] bg-opacity-40 shadow-lg shadow-gray-500 text-white text-center h-[50px] rounded-xl hover:text-white' href={user ? "/sos" : "/auth"} onClick={(e) => {
          e.preventDefault();
          setIsOpenMenu(false)
          setOpenModal(true);
        }}>
         <span> Gửi SOS </span>
        </Link>
        <Link className='bottom-link  relative flex items-center justify-center basis-1/2 bg-[#c80000] bg-opacity-40 shadow-lg shadow-gray-500 text-white text-center h-[50px] rounded-xl hover:text-white' href={user ? "/forum/post": "/auth"}>
          Đăng bài           
        </Link>
      </div>
        }
          
        </Drawer>
        <Modal show={openModal} onClose={() => setOpenModal(false)} style={{
          padding: sizes.width > 376 ? 4 : 0
        }}>
          <Modal.Header className="bg-[#c80000] bg-opacity-60 rounded-b-xl justify-center text-center  text-white [&>h3]:text-white [&>h3]:w-full [&>h3]:text-base [&>h3]:sm:text-xl  [&>button]:ml-auto p-2.5 [&>button]:text-white">
            Tạo SOS mới
          </Modal.Header>
          <Modal.Body className="px-0 sm:px-2 sm:px-4">
            <PostSOSWithModal  setModalSuccess={setModalSuccess} setCloseForm={setOpenModal} />
          </Modal.Body>
        </Modal>
        <Modal show={modalSuccess} onClose={() => {
        setModalSuccess(false);
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
            <div className="text-[#525050] text-xs text-center">***Bạn có thể <Link className="underline px-1" href="/sos">xem lại</Link> tình trạng SOS qua cảnh báo trang chủ</div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
