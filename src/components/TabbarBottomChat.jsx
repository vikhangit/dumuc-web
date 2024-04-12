"use client"
import Link from 'next/link';
import React from "react";
import Image from 'next/image';
import { useWindowSize } from '@hooks/useWindowSize';
import { MdAccountCircle, MdOutlineSupervisedUserCircle, MdPending } from 'react-icons/md';
import { useRouter } from 'next/navigation';

import { auth } from 'utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function TabbarBottomChat({ active = 'home' }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const sizes = useWindowSize()

  return (
    <div className={`fixed bottom-0 w-full z-50 ${sizes.width > 410 ? "h-[70px]" : "h-[45px]"} bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600`}>
      <div className="grid h-full mx-auto grid-cols-4 font-medium">
      <div className="w-auto xl:w-[280px] flex justify-center items-center pl-2">
          <div  class="flex items-center">
              <a onClick={(e)=> {
              e.preventDefault();
              router.push("/");
            }}>
              <Image width={0} height={0} sizes="100vw" src="/dumuc/logo.png" class="w-full h-6 sm:h-10 mr-3 cursor-pointer" alt="DuMuc" />
              </a>
            </div>
          </div>

        {active === "chat" ? (
          <Link
            href={"/chat"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdPending size={32} color='#c80000' />
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden">
              Chat
            </span>
          </Link>
        ) : (
          <Link
            href={"/chat"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdPending size={32} color='#9C9C9C' />
            <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden">Chat</span>
          </Link>
        )}
        {active === "group" ? (
          <Link
            href={"/chat/group"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdOutlineSupervisedUserCircle size={32} color='#c80000' />
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden">Nhóm</span>
          </Link>
        )
          : (
            <Link
              href={"/chat/group"}
              className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            >
              <MdOutlineSupervisedUserCircle size={32} color='#9C9C9C' />
              <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden">Nhóm</span>
            </Link>
          )}
          {active === "list" ? (
          <Link
            href={"/account"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdAccountCircle size={32} color='#c80000' />
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden">
              Tài khoản
            </span>
          </Link>
        ) : (
          <Link
            href={"/account"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdAccountCircle size={32} color='#9C9C9C' />
            <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden">Tài khoản</span>
          </Link>
        )}
      </div>
    </div>
  );
};
