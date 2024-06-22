"use client";
import { useWindowSize } from "@hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineGroupAdd, MdOutlinePersonAddAlt } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@utils/firebase";
import { getProfile } from "@apis/users";
import { useRouter, useSearchParams } from "next/navigation";
import ModalCreateGroup from "./ModalCreateGroup";
import { FaCamera } from "react-icons/fa6";
import moment from "moment";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function ChatGroupLeft({
  activeGroup,
  setActiveGroup,
  mobile,
  setMobile,
  messages,
  authors,
  user,
  usingUser,
}) {
  const sizes = useWindowSize();
  const search = useSearchParams();
  const [groupTo, setGroupTo] = useState();
  const router = useRouter();
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [searchFunction, setSearchFunction] = useState(false);
  const [activeList, setActiveList] = useState();
  const [avatar, setAvatar] = useState([]);
  const [activeMessage, setActiveMessage] = useState([]);
  useEffect(() => {
    setGroupList(
      messages?.filter(
        (item) => !item?.isDelete?.find((x) => x?.user === user?.uid)
      )
    );
  }, [messages]);
  console.log(groupList);
  useEffect(() => {
    if (search.get("groupId")) {
      const q = query(
        collection(db, "chat-groups", search.get("groupId"), "messages"),
        orderBy("createdAt", "asc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let allMess = [];
        querySnapshot.forEach((doc) =>
          allMess.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate(),
          })
        );
        setActiveMessage(allMess);
      });
      return () => unsubscribe;
    } else {
      setActiveMessage([]);
    }
  }, [search]);
  useEffect(() => {
    if (search.get("groupId")) {
      const q = query(
        collection(db, "chat-groups", search.get("groupId"), "member"),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let allMess = [];
        querySnapshot.forEach((doc) =>
          allMess.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate(),
          })
        );
        setActiveList(allMess);
      });
      return () => unsubscribe;
    } else {
      setActiveList([]);
    }
  }, [search]);
  useEffect(() => {
    if (search.get("groupId")) {
      const chatDetail = messages?.find((x) => x?.id === search.get("groupId"));
      setGroupTo(chatDetail);
    } else {
      setGroupTo();
    }
  }, [messages, search]);

  const searchField = (value) => {
    setValueSearch(value);
    if (value.trim() === "") {
      setGroupList(
        messages?.filter(
          (item) => !item?.isDelete?.find((x) => x?.user === user?.uid)
        )
      );
    } else {
      const searchList = messages?.filter((x) =>
        x?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );
      if (searchList && searchList.length > 0) {
        setGroupList(searchList);
      } else {
        setGroupList([]);
      }
    }
  };
  const getTimeChat = (date) => {
    moment.locale("vi");
    return moment(date)
      .fromNow()

      .replace("seconds", "giây")
      .replace("second", "giây")
      .replace("minutes", "phút")
      .replace("minute", "phút")
      .replace("hours", "giờ")
      .replace("hour", "giờ")
      .replace("days", "ngày")
      .replace("day", "ngày")
      .replace("a ", "1 ")
      .replace("an ", "1 ")
      .replace("month", "tháng")
      .replace("year", "năm")
      .replace("in", "")
      .replace("ago", "")
      .replace("few", "");
  };
  console.log(user);
  return (
    <div
      className={`h-full ${
        sizes.width > 992 ? "basis-1/3" : `${!mobile ? "basis-full" : "hidden"}`
      }`}
    >
      <div className="flex items-center bg-[#C82027] shadow-md shadow-gray-400 w-full justify-between px-[5px] h-[65px] gap-x-3">
        <div
          className={`relative flex items-center pl-[15px] w-[calc(100%-170px)] ${
            sizes.width > 380 ? "pl-[15px]" : "pl-[5px]"
          }`}
        >
          <div className="">
            <IoMdSearch size={24} color="#fff" />
          </div>
          <input
            placeholder="Tìm kiếm ..."
            value={valueSearch}
            // autoFocus={searchFunction}
            className="ml-[6px] text-[#fff] text-base placeholder-[#fff] bg-[#C82027] w-full focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
            onChange={(e) => searchField(e.target.value)}
          />
          {valueSearch.trim() !== "" && searchFunction && (
            <button
              onClick={() => {
                setValueSearch("");
                setFriendList(usingUser?.friendList);
              }}
              className="absolute right-0"
            >
              <IoCloseCircle size={16} className="text-white" />
            </button>
          )}
        </div>
        <button
          onClick={() => {
            setShowModalCreate(true);
          }}
          className={`flex justify-center rounded-[20px] bg-[#EB7F7F] items-center  gap-x-2 text-white  py-[5px] ${
            sizes.width > 380 ? "px-[15px] w-[150px]" : "w-[135px] gap-x-1"
          }`}
        >
          <MdOutlineGroupAdd size={24} color="#fff" />
          Tạo nhóm
        </button>
      </div>
      <div className="h-[calc(100%-150px)] overflow-auto scroll-chat px-2">
        {user &&
        groupList?.length > 0 &&
        groupList?.filter(
          (x) => x?.isPrivate === false
          // &&
          //   !x?.isDelete?.find((ab) => ab?.user === user?.uid)
        )?.length > 0 ? (
          groupList
            ?.filter(
              (x) => x?.isPrivate === false
              // &&
              //   !x?.isDelete?.find((ab) => ab?.user === user?.uid)
            )
            ?.map((item, i) => {
              const author = authors?.find(
                (x) => x?.authorId === item?.lastMessage?.formAuthor?.authorId
              );
              return (
                <div
                  key={i}
                  onClick={() => {
                    // setActiveGroup(item);
                    setMobile(true);
                    router.push(`/chat/group-public?groupId=${item?.id}`);
                  }}
                  className={`${
                    groupTo?.id === item?.id
                      ? "bg-[#0084ff] bg-opacity-30"
                      : "bg-white"
                  } rounded-md shadow-md shadow-gray-400 flex items-center gap-x-2 pl-[15px] pr-2 py-[12px] mt-[10px] cursor-pointer`}
                >
                  <div className="w-[45px] h-[45px] rounded-full flex justify-center items-center border border-gray-400">
                    <Image
                      src={
                        item?.avatar?.length > 0
                          ? item?.avatar
                          : "/dumuc/avatar.png"
                      }
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-full rounded-full"
                    />
                  </div>

                  <div className=" w-full">
                    <div className="flex justify-between w-full">
                      <Link href="" className="text-base">
                        {item?.name}
                      </Link>

                      {item?.isDelete?.find((ab) => ab?.user === user?.uid) ? (
                        <div></div>
                      ) : (
                        item?.member?.find((x) => x?.user === user?.uid) && (
                          <span className="text-[13px] text-gray-600">
                            {item?.lastMessage &&
                              getTimeChat(
                                item?.lastMessage?.createdAt?.toDate()
                              )}
                          </span>
                        )
                      )}
                    </div>
                    {item?.isDelete?.find((ab) => ab?.user === user?.uid) ? (
                      <p className="text-[13px] text-gray-600 mt-0.5 italic">
                        Chưa có tin nhắn mới
                      </p>
                    ) : (
                      item?.member?.find((x) => x?.user === user?.uid) && (
                        <div className="flex justify-between w-full">
                          {item?.lastMessage ? (
                            <>
                              <p className="text-[13px] text-gray-600 mt-0.5">
                                {item?.lastMessage?.recall ? (
                                  <span className="italic">
                                    Tin nhắn đã thu hồi
                                  </span>
                                ) : (
                                  `${author?.name}: ${item?.lastMessage?.text}`
                                )}
                              </p>
                              {item?.new === true &&
                                item?.lastMessage?.formAuthor?.userId !==
                                  user?.uid && (
                                  <div className="rounded-full w-[10px] h-[10px] bg-[#C82027] text-white text-xs flex justify-center items-center"></div>
                                )}
                            </>
                          ) : (
                            <p className="text-[13px] text-gray-600 mt-0.5 italic">
                              Chưa có tin nhắn mới
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })
        ) : (
          <div className="h-full w-full flex justify-center items-center text-base">
            Danh nhóm đang trống
          </div>
        )}
      </div>
      <ModalCreateGroup
        visible={showModalCreate}
        onCancel={() => setShowModalCreate(false)}
        authors={authors}
        onCallback={() => {
          return;
        }}
      />
    </div>
  );
}
