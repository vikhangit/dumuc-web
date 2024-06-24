"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useWindowSize } from "@hooks/useWindowSize";
import {
  MdAccountCircle,
  MdOutlineSupervisedUserCircle,
  MdPending,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import { GoHome, GoHomeFill } from "react-icons/go";
import { auth } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

export default function TabbarBottomChat({ active = "home" }) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const sizes = useWindowSize();

  return (
    <div
      className={`fixed bottom-0 w-full z-50 ${
        sizes.width > 800 ? "h-[70px]" : "h-[55px]"
      } bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600`}
    >
      <div className="grid h-full mx-auto grid-cols-5 font-medium">
        <div class="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group">
          <Link href={"/"}>
            <GoHomeFill size={32} color="#9C9C9C" />
          </Link>
          <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden1">
            Trang chủ
          </span>
        </div>

        {active === "chat" ? (
          <Link
            href={"/chat"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdPending size={32} color="#c80000" />
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden1">
              Chat
            </span>
          </Link>
        ) : (
          <Link
            href={"/chat"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdPending size={32} color="#9C9C9C" />
            <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden1">
              Chat
            </span>
          </Link>
        )}
        {active === "friend" ? (
          <Link
            href={"/chat/friend"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FaUserFriends size={32} color="#c80000" />
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden1">
              Bạn bè
            </span>
          </Link>
        ) : (
          <Link
            href={"/chat/friend"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FaUserFriends size={32} color="#9C9C9C" />
            <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden1">
              Bạn bè
            </span>
          </Link>
        )}
        {active === "group-public" ? (
          <Link
            href={"/chat/group-public"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdOutlineSupervisedUserCircle size={32} color="#c80000" />
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden1">
              Nhóm cộng đồng
            </span>
          </Link>
        ) : (
          <Link
            href={"/chat/group-public"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <MdOutlineSupervisedUserCircle size={32} color="#9C9C9C" />
            <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden1">
              Nhóm cộng đồng
            </span>
          </Link>
        )}
        {active === "group" ? (
          <Link
            href={"/chat/group"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FaUsers size={32} color="#c80000" />
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden1">
              Nhóm riêng tư
            </span>
          </Link>
        ) : (
          <Link
            href={"/chat/group"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <FaUsers size={32} color="#9C9C9C" />
            <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden1">
              Nhóm riêng tư
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
