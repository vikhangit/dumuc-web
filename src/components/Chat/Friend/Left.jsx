"use client";
import { useWindowSize } from "@hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@utils/firebase";
import { getProfile } from "@apis/users";
import moment from "moment";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ModalAddFriend from "./ModalAddFriend";
export default function ChatLeft({
  setUserRecieved,
  userRecieved,
  mobile,
  setMobile,
  messages,
  authors,
}) {
  const [user] = useAuthState(auth);
  const sizes = useWindowSize();
  const router = useRouter();
  const search = useSearchParams();
  const path = usePathname();
  const [friendList, setFriendList] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [searchFunction, setSearchFunction] = useState(true);
  const [usingUser, setUsingUser] = useState();
  const [userTo, setUserTo] = useState();
  const [activeMessage, setActiveMessage] = useState([]);
  const [showAddFriend, setShowAddFriend] = useState(false);
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
      setFriendList(dataCall?.friendList?.filter((x) => x.status === 2));
    });
  }, [user]);
  useEffect(() => {
    if (search.get("chatId")) {
      const q = query(
        collection(db, "chat-rooms", search.get("chatId"), "messages"),
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
    if (search.get("chatId")) {
      const chatDetail = messages?.find((x) => x?.id === search.get("chatId"));
      const userRecieveds = chatDetail?.member?.find(
        (x) => x?.userId !== user.uid
      );
      const author = authors?.find(
        (item) => item?.authorId === userRecieveds?.authorId
      );
      setUserTo(author);
    } else if (userRecieved) {
      setUserTo(userRecieved);
    } else {
      setUserTo();
    }
  }, [messages, search, userRecieved]);
  const searchField = (value) => {
    setValueSearch(value);
    if (value.trim() === "") {
      setFriendList(usingUser?.friendList?.filter((x) => x.status === 2));
    } else {
      const searchList = usingUser?.friendList?.filter(
        (x) =>
          x?.status === 2 &&
          authors
            ?.find((a) => a?.authorId === x?.author?.authorId)
            ?.name?.toLowerCase()
            ?.includes(value?.toLowerCase())
      );
      if (searchList && searchList.length > 0) {
        setFriendList(searchList);
      } else {
        setFriendList([]);
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
  return (
    <div
      className={`h-full ${
        sizes.width > 992 ? "basis-1/3" : `${!mobile ? "basis-full" : "hidden"}`
      }`}
    >
      <div className="flex items-center bg-[#C82027] shadow-md shadow-gray-400 w-full justify-between px-[5px] h-[65px] gap-x-3">
        <div
          className={`relative flex items-center pl-[15px] ${
            searchFunction ? "w-full pr-[22px]" : "w-[calc(100%-170px)]"
          } ${sizes.width > 380 ? "pl-[15px]" : "pl-[5px]"}`}
        >
          <div className="">
            <IoMdSearch size={24} color="#fff" />
          </div>
          <input
            placeholder="Tìm kiếm ..."
            onFocus={() => {
              setSearchFunction(true);
              if (valueSearch.trim() === "")
                setFriendList(
                  usingUser?.friendList?.filter((x) => x.status === 2)
                );
            }}
            value={valueSearch}
            // autoFocus={searchFunction}
            className="pl-[6px] text-[#fff] text-base placeholder-[#fff] bg-[#C82027] w-full focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
            onChange={(e) => searchField(e.target.value)}
          />
          {valueSearch.trim() !== "" && searchFunction && (
            <button
              onClick={() => {
                setValueSearch("");
                setFriendList(
                  usingUser?.friendList?.filter((x) => x.status === 2)
                );
              }}
              className="absolute right-[10px]"
            >
              <IoCloseCircle size={20} className="text-white" />
            </button>
          )}
        </div>
      </div>
      <div className="h-[calc(100%-150px)] overflow-auto scroll-chat px-2">
        {searchFunction ? (
          friendList?.length > 0 ? (
            friendList?.map((item, index) => {
              const author = authors?.find(
                (x) => x?.authorId === item?.author?.authorId
              );
              return (
                <div
                  key={index}
                  onClick={() => {
                    setMobile(true);
                    const findChat2 = messages?.filter((item) =>
                      item?.member?.find((x) => x?.userId === user?.uid)
                    );
                    const findChat = findChat2?.find((item) =>
                      item?.member?.find((x) => x?.userId === author?.userId)
                    );
                    router.push(`/chat?friendId=${author?.authorId}`);
                  }}
                  className={`${
                    userTo?.authorId === author?.authorId
                      ? "bg-[#0084ff] bg-opacity-30"
                      : "bg-white"
                  } rounded-md shadow-md shadow-gray-400 flex items-center gap-x-2 pl-[15px] pr-2 py-[20px] mt-[10px] cursor-pointer`}
                >
                  <Image
                    src={
                      author?.user?.photo && author?.user?.photo?.length > 0
                        ? author?.user?.photo
                        : "/dumuc/avatar.png"
                    }
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-[45px] h-[45px] rounded-full"
                  />
                  <div className="flex justify-between w-full">
                    <div>
                      <Link href="" className="text-base">
                        {author?.name}
                      </Link>
                      {/* <p className='text-[13px] text-[#00000080] mt-2'>Tin nhắn mới nhất của bạn ....</p> */}
                    </div>
                    {/* <span className='text-[13px] text-[#00000080]'>13 phút</span> */}
                  </div>
                </div>
              );
            })
          ) : valueSearch.trim() === "" ? (
            <div className="h-full w-full flex justify-center items-center text-base">
              Danh sách bạn bè trống
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center text-base">
              Không tìm thấy kết quả vui lòng thử từ khóa khác
            </div>
          )
        ) : messages?.length > 0 ? (
          messages?.map((item, index) => {
            return item?.member?.find((x) => x?.userId === user?.uid)
              ? item?.member?.map((itemChild, indexChild) => {
                  const author = authors?.find(
                    (x) => x?.authorId === itemChild?.authorId
                  );
                  return (
                    itemChild?.userId !== user.uid && (
                      <div
                        key={indexChild}
                        onClick={() => {
                          setMobile(true);
                          router.push(`/chat?chatId=${item.id}`);
                        }}
                        className={`${
                          userTo?.authorId === itemChild?.authorId
                            ? "bg-[#0084ff] bg-opacity-30"
                            : "bg-white"
                        } rounded-md shadow-md shadow-gray-400 flex items-center gap-x-2 pl-[15px] pr-2 py-[20px] mt-[10px] cursor-pointer`}
                      >
                        <Image
                          src={
                            author?.user?.photo &&
                            author?.user?.photo?.length > 0
                              ? author?.user?.photo
                              : "/dumuc/avatar.png"
                          }
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-[45px] h-[45px] rounded-full"
                        />
                        <div className="flex justify-between w-full">
                          <div>
                            <Link href="" className="text-base">
                              {author?.name}
                            </Link>
                            {search.get("chatId") === item?.id &&
                            activeMessage?.length > 0 ? (
                              <p className="text-[13px] text-gray-600 mt-2">
                                {activeMessage[activeMessage?.length - 1]?.files
                                  ?.length > 0
                                  ? "[File]"
                                  : activeMessage[activeMessage?.length - 1]
                                      ?.photos?.length > 0
                                  ? "[Hình ảnh]"
                                  : activeMessage[activeMessage?.length - 1]
                                      ?.text?.length > 0
                                  ? [
                                      `${
                                        activeMessage[activeMessage?.length - 1]
                                          ?.text
                                      }`,
                                    ]
                                  : "[Chưa có tin nhắn mới]"}
                              </p>
                            ) : (
                              <p className="text-[13px] text-gray-600 mt-2">
                                {item?.messages[item?.messages.length - 1]
                                  ?.files?.length > 0
                                  ? ["File"]
                                  : item?.messages[item?.messages.length - 1]
                                      ?.photos?.length > 0
                                  ? ["Hình ảnh"]
                                  : item?.messages[item?.messages.length - 1]
                                      ?.text?.length > 0
                                  ? [
                                      `${
                                        item?.messages[
                                          item?.messages.length - 1
                                        ]?.text
                                      }`,
                                    ]
                                  : ["Chưa có tin nhắn mới"]}
                              </p>
                            )}
                          </div>
                          {search.get("chatId") === item?.id &&
                          activeMessage?.length > 0 ? (
                            <span className="text-[13px] text-gray-600">
                              {getTimeChat(
                                activeMessage[activeMessage?.length - 1]
                                  ?.createdAt
                              )}
                            </span>
                          ) : (
                            <span className="text-[13px] text-gray-600">
                              {getTimeChat(
                                item?.messages[item?.messages.length - 1]
                                  ?.createdAt
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  );
                })
              : null;
          })
        ) : (
          <div className="h-full w-full flex justify-center items-center text-base">
            Danh người nhắn đang trống
          </div>
        )}
      </div>
      {/* <ModalAddFriend
        authors={authors}
        onCallback={() => {}}
        onCancel={() => setShowAddFriend(false)}
        visible={showAddFriend}
      /> */}
    </div>
  );
}
