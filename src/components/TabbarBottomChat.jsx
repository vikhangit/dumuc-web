"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useWindowSize } from "@hooks/useWindowSize";
import {
  MdAccountCircle,
  MdOutlineSupervisedUserCircle,
  MdPending,
} from "react-icons/md";
import { useRouter } from "next/navigation";
import { GoHome, GoHomeFill } from "react-icons/go";
import { auth, db } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaUserFriends } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function TabbarBottomChat({ active = "home" }) {
  const [user] = useAuthState(auth);
  const userId = JSON.parse(localStorage.getItem("userId"));
  const router = useRouter();
  const sizes = useWindowSize();
  const [chats, setChats] = useState([]);
  const [groupPublic, setGroupPublic] = useState([]);
  const [groupPrivate, setGroupPrivate] = useState([]);
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "chat-rooms"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data()?.createdAt?.toDate(),
        });
      });
      setChats(
        fetchedMessages?.filter((a) =>
          a?.member?.find((x) => x?.userId === userId)
        )
      );
    });
    return () => unsubscribe;
  }, []);
  useEffect(() => {
    const q = query(
      collection(db, "chat-groups"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let fetchedGroup = [];
      QuerySnapshot.forEach((doc) => {
        let messages = [];
        fetchedGroup.push({
          ...doc.data(),
          id: doc.id,
          // member,
          messages,
          createdAt: doc.data()?.createdAt?.toDate(),
        });
      });
      setGroupPublic(
        fetchedGroup?.filter(
          (x) =>
            x?.isPrivate === false &&
            x?.member?.find((aa) => aa?.user === userId)
        )
      );
      setGroupPrivate(
        fetchedGroup?.filter(
          (x) =>
            x?.isPrivate === true &&
            x?.member?.find((aa) => aa?.user === userId)
        )
      );
    });
    return () => unsubscribe;
  }, []);
  useEffect(() => {
    const q = query(
      collection(db, "users", userId, "friendList"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let fetchedGroup = [];
      QuerySnapshot.forEach((doc) => {
        let messages = [];
        fetchedGroup.push({
          ...doc.data(),
          id: doc.id,
          // member,
          messages,
          createdAt: doc.data()?.createdAt?.toDate(),
        });
      });
      setFriendList(fetchedGroup);
    });
    return () => unsubscribe;
  }, []);
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
            <div className="relative">
              <MdPending size={32} color="#c80000" />
              {chats &&
                chats?.find(
                  (x) =>
                    x?.new === true &&
                    x?.lastMessage?.formAuthor?.userId !== userId
                ) && (
                  <div className="w-[10px] h-[10px] bg-amber-500 absolute -right-[5px] top-[1px] rounded-full"></div>
                )}
            </div>

            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden1">
              Chat
            </span>
          </Link>
        ) : (
          <Link
            href={"/chat"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <div className="relative">
              <MdPending size={32} color="#9C9C9C" />
              {chats &&
                chats?.find(
                  (x) =>
                    x?.new === true &&
                    x?.lastMessage?.formAuthor?.userId !== userId
                ) && (
                  <div className="w-[10px] h-[10px] bg-[#c80000] absolute -right-[5px] top-[1px] rounded-full"></div>
                )}
            </div>
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
            <div className="relative">
              <FaUserFriends size={32} color="#c80000" />
              {friendList &&
                friendList?.find(
                  (x) => x?.status === 1 && x?.type === "recieve"
                ) && (
                  <div className="w-[10px] h-[10px] bg-amber-500 absolute -right-[5px] top-[1px] rounded-full"></div>
                )}
            </div>
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden1">
              Bạn bè
            </span>
          </Link>
        ) : (
          <Link
            href={"/chat/friend"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <div className="relative">
              <FaUserFriends size={32} color="#9C9C9C" />
              {friendList &&
                friendList?.find(
                  (x) => x?.status === 1 && x?.type === "recieve"
                ) && (
                  <div className="w-[10px] h-[10px] bg-[#c80000] absolute -right-[5px] top-[1px] rounded-full"></div>
                )}
            </div>
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
            <div className="relative">
              <MdOutlineSupervisedUserCircle size={32} color="#c80000" />
              {groupPublic &&
                groupPublic?.find(
                  (x) =>
                    x?.new === true &&
                    x?.lastMessage?.formAuthor?.userId !== userId
                ) && (
                  <div className="w-[10px] h-[10px] bg-amber-500 absolute -right-[5px] top-[1px] rounded-full"></div>
                )}
            </div>
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden1">
              Nhóm cộng đồng
            </span>
          </Link>
        ) : (
          <Link
            href={"/chat/group-public"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <div className="relative">
              <MdOutlineSupervisedUserCircle size={32} color="#9C9C9C" />
              {groupPublic &&
                groupPublic?.find(
                  (x) =>
                    x?.new === true &&
                    x?.lastMessage?.formAuthor?.userId !== userId
                ) && (
                  <div className="w-[10px] h-[10px] bg-[#c80000] absolute -right-[5px] top-[1px] rounded-full"></div>
                )}
            </div>
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
            <div className="relative">
              <FaUsers size={32} color="#c80000" />
              {groupPrivate &&
                groupPrivate?.find(
                  (x) =>
                    x?.new === true &&
                    x?.lastMessage?.formAuthor?.userId !== userId
                ) && (
                  <div className="w-[10px] h-[10px] bg-amber-500 absolute -right-[5px] top-[1px] rounded-full"></div>
                )}
            </div>
            <span class="text-base md:text-lg font-semibold text-[#c80000] bottomTabBarHiden1">
              Nhóm riêng tư
            </span>
          </Link>
        ) : (
          <Link
            href={"/chat/group"}
            className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <div className="relative">
              <FaUsers size={32} color="#9C9C9C" />
              {groupPrivate &&
                groupPrivate?.find(
                  (x) =>
                    x?.new === true &&
                    x?.lastMessage?.formAuthor?.userId !== userId
                ) && (
                  <div className="w-[10px] h-[10px] bg-[#c80000] absolute -right-[5px] top-[1px] rounded-full"></div>
                )}
            </div>
            <span class="text-base md:text-lg font-semibold text-gray-500 bottomTabBarHiden1">
              Nhóm riêng tư
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
