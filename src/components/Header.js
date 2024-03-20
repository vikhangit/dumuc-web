"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { MdEmojiEvents } from "react-icons/md";
import { auth } from 'utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
const Header = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname()
  return (
    <nav class={`bg-white border-gray-200 dark:bg-gray-900 p-4 relative z-40 shadow-md shadow-gray-400`}>
      <div class="w-full flex items-center justify-between gap-x-6 md:gap-x-8 xl:gap-x-0">
        <div className="w-auto xl:w-[280px] flex justify-center items-center">
          <div class="flex items-center">
            <div className="cursor-pointer" onClick={(e)=> router.push("/")}>
              <Image width={0} height={0} sizes="100vw" src="/dumuc/logo.png" class="w-full h-6 sm:h-10 mr-3 cursor-pointer" alt="DuMuc" />
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-end md:justify-between gap-x-2"> 
          <div className="flex items-center h-full gap-x-2">
            <div
              onClick={() => router.push("/featured?tab=knights")}
              className="cursor-pointer inline-flex flex-col items-center justify-center px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
            > 
              {
                pathname === "/featured" 
                ? <MdEmojiEvents  size={36} color="#c80000" />
                : <MdEmojiEvents  size={30} color="#9C9C9C" />
              }
            </div>
            <div
              onClick={() => router.push(user ? "/account" : "/auth")}
              className={
                user 
                  ? "cursor-pointer relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full text-center"
                  : "cursor-pointer ml-1 flex text-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm items-center justify-center text-center md:mr-0"
                }
            >
              {
                user 
                ? user?.photoURL 
                    && user?.photoURL?.length > 0 
                      ? <Image width={0} height={0} sizes="100vw" src={user?.photoURL} className="w-full h-full" alt="Avatar" /> 
                      : <span class="font-medium text-gray-600">
                          {user?.email?.charAt(0).toUpperCase()}
                        </span> 
                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
              }
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Header;
