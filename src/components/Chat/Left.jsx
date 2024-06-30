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
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  collection,
  deleteField,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import ModalAddFriend from "./ModalAddFriend";
import RequestFriend from "./RequestFriend";
import { set } from "lodash";
export default function ChatLeft({
  setUserRecieved,
  userRecieved,
  mobile,
  setMobile,
  authors,
  user,
  usingUser,
  friendListP,
  setFriendListp,
  activeMessage,
  myFriend,
  checkFriendType,
  typeFriend,
  setTypeFriend,
  setActiveMessage,

  data,
  tenGoiNho,
  setTenGoNho,
}) {
  const sizes = useWindowSize();
  const router = useRouter();
  const search = useSearchParams();
  const [valueSearch, setValueSearch] = useState("");
  const [searchFunction, setSearchFunction] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendList, setFriendList] = useState(
    friendListP?.filter((x) => x.status === 2)
  );
  const [messages, setMessage] = useState(data);
  const [requestFr, setRequestFr] = useState();
  const [tab, setTab] = useState(0);
  useEffect(() => {
    setFriendList(friendListP?.filter((x) => x.status === 2));
    setRequestFr(
      friendListP?.filter((x) => x.status === 1 && x.type === "recieve")
    );
  }, [friendListP]);
  useEffect(() => {
    const friendChat = data
      ?.filter((item) => item?.member?.find((x) => x?.userId === user?.uid))
      .filter((x) => {
        const findUserOrtherMe = x?.member?.find(
          (x) => x?.userId !== user?.uid
        );
        if (
          friendList?.find((aa) => aa?.authorId === findUserOrtherMe?.authorId)
        ) {
          return x;
        }
      });
    const anonymousChat = data
      ?.filter((item) => item?.member?.find((x) => x?.userId === user?.uid))
      .filter((x) => {
        const findUserOrtherMe = x?.member?.find(
          (x) => x?.userId !== user?.uid
        );
        if (
          friendList?.find((aa) => aa?.authorId === findUserOrtherMe?.authorId)
        ) {
        } else {
          return x;
        }
      });

    if (tab === 0) {
      setMessage(friendChat);
    } else {
      setMessage(anonymousChat);
    }
  }, [data, tab, friendList]);

  useEffect(() => {
    if (search.get("friendId")) {
      // setSearchFunction(true);
      const author = authors?.find(
        (x) => x?.authorId === search.get("friendId")
      );
      const findChat2 = data?.filter((item) =>
        item?.member?.find((x) => x?.userId === user?.uid)
      );
      const findChat = findChat2?.find((item) =>
        item?.member?.find((x) => x?.userId === author?.userId)
      );
      setMobile(true);
      if (!findChat) {
        setUserRecieved(author);
      } else {
        setUserRecieved();

        router.push(`/chat?chatId=${findChat?.id}`);
      }
    } else {
      setUserRecieved();
      setMobile(false);
    }
  }, [search, data, authors]);

  useEffect(() => {
    if (search.get("chatId")) {
      const chatDetail = data?.find((x) => x?.id === search.get("chatId"));
      if (chatDetail) {
        const userRecieveds = chatDetail?.member?.find(
          (x) => x?.userId !== user?.uid
        );
        const author = authors?.find(
          (item) => item?.authorId === userRecieveds?.authorId
        );

        setMobile(true);
        if (friendList?.find((x) => x?.authorId === author?.authorId)) {
          setTab(0);
        } else {
          setTab(1);
        }
        setUserRecieved(author);
        setTenGoNho(userRecieveds?.ten_goi_nho);
        router.push(`/chat?chatId=${chatDetail?.id}`);
      } else {
        setMobile(false);
        router.push(`/chat`);
      }
    } else {
      setUserRecieved();
      setMobile(false);
    }
  }, [search, data, friendList]);
  console.log("UserRecire", userRecieved);
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
  const selectFriend = (author) => {
    const findChat2 = data?.filter((item) =>
      item?.member?.find((x) => x?.userId === user?.uid)
    );
    const findChat = findChat2?.find((item) =>
      item?.member?.find((x) => x?.userId === author?.userId)
    );
    if (friendList?.find((x) => x?.authorId === author?.authorId)) {
      setTab(0);
    } else {
      setTab(1);
    }
    if (!findChat) {
      // const type = checkFriendType(author?.authorId);
      // setTypeFriend(type);
      setMobile(true);
      setUserRecieved(author);
    } else {
      setUserRecieved();

      router.push(`/chat?chatId=${findChat?.id}`);
    }
  };
  const [showRequesFriend, setShowRequesFriend] = useState(true);

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
            className="ml-[6px] text-[#fff] text-base placeholder-[#fff] bg-[#C82027] w-full focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
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
              className="absolute right-0"
            >
              <IoCloseCircle size={16} className="text-white" />
            </button>
          )}
        </div>
        {!searchFunction ? (
          <Link
            href={``}
            onClick={(e) => {
              e.preventDefault();
              setShowAddFriend(true);
              router.push("/chat");
            }}
            className={`flex justify-center rounded-[20px] bg-[#EB7F7F] items-center  gap-x-2 text-white  py-[5px] ${
              sizes.width > 380 ? "px-[15px] w-[150px]" : "w-[135px] gap-x-1"
            }`}
          >
            <MdOutlinePersonAddAlt size={24} color="#fff" />
            Thêm bạn
          </Link>
        ) : (
          <button
            onClick={() => {
              setSearchFunction(false);
              router.push("/chat");
            }}
            className={`rouded-[5px] text-white text-base font-semibold px-[20px] py-[5px] hover:bg-gray-200 hover:text-black cursor-pointer`}
          >
            Đóng
          </button>
        )}
      </div>
      <div
        className={`${
          sizes.width > 800 ? "h-[calc(100%-135px)]" : " h-[calc(100%-120px)]"
        } overflow-auto scroll-chat px-2 pb-4`}
      >
        <div>
          <button
            onClick={() => {
              setTab(0);
            }}
            className={`px-3 py-3 ${
              tab === 0 && "border-b-2 border-[#c80000]"
            }`}
          >
            Bạn bè
          </button>
          <button
            onClick={() => {
              setTab(1);
            }}
            className={`px-3 py-3 ${
              tab === 1 && "border-b-2 border-[#c80000]"
            }`}
          >
            Người lạ
          </button>
        </div>
        <div className="mt-2">
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
                      selectFriend(author);
                    }}
                    className={`${
                      userRecieved?.authorId === author?.authorId
                        ? "bg-[#0084ff] bg-opacity-30"
                        : "bg-white"
                    } rounded-md shadow shadow-gray-400  pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}
                  >
                    <div className="text-[12px] font-semibold w-fit"></div>
                    <div className="flex items-center gap-x-2">
                      <Image
                        src={
                          author?.user?.photo && author?.user?.photo?.length > 0
                            ? author?.user?.photo
                            : "/dumuc/avatar.jpg"
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
          ) : messages?.filter(
              (item) =>
                !item?.isDelete?.find((x) => x?.user === user?.uid) &&
                item?.member?.find((x) => x?.userId === user?.uid)
            ).length > 0 ? (
            messages
              ?.filter(
                (item) =>
                  !item?.isDelete?.find((x) => x?.user === user?.uid) &&
                  item?.member?.find((x) => x?.userId === user?.uid)
              )
              ?.sort((a, b) => b?.createdAt - a?.createdAt)
              ?.map((item, index) => {
                return item?.member?.map((itemChild, indexChild) => {
                  const author = authors?.find(
                    (x) => x?.authorId === itemChild?.authorId
                  );
                  const finIndexMessages = item?.messages?.findLastIndex(
                    (x) => {
                      if (!x?.isDelete) {
                        return x;
                      } else {
                        if (x?.isDelete?.find((aa) => aa?.user !== user?.uid)) {
                          return x;
                        }
                      }
                    }
                  );
                  return (
                    itemChild?.userId !== user?.uid && (
                      <div
                        key={indexChild}
                        onClick={async () => {
                          setMobile(true);
                          router.push(`/chat?chatId=${item.id}`);
                          const washingtonRef = doc(db, "chat-rooms", item?.id);
                          if (
                            item?.lastMessage?.formAuthor?.userId !== user?.uid
                          ) {
                            await updateDoc(washingtonRef, {
                              new: false,
                              lastMessagesCount: deleteField(),
                            });
                          }
                          // setTenGoNho(itemChild?.ten_goi_nho);
                        }}
                        className={`${
                          userRecieved?.authorId === itemChild?.authorId
                            ? "bg-[#0084ff] bg-opacity-30"
                            : "bg-white"
                        } rounded-md shadow shadow-gray-400 pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}
                      >
                        <div className="flex items-center gap-x-2 mt-2">
                          <Image
                            src={
                              author?.user?.photo &&
                              author?.user?.photo?.length > 0
                                ? author?.user?.photo
                                : "/dumuc/avatar.jpg"
                            }
                            width={0}
                            height={0}
                            sizes="100vw"
                            className={`${
                              sizes.width > 400
                                ? "w-[45px] h-[45px]"
                                : "w-[40px] h-[40px]"
                            }  rounded-full cursor-pointer`}
                          />
                          <div className="w-full">
                            <div className="flex justify-between">
                              <Link href="" className="text-base">
                                {itemChild?.ten_goi_nho &&
                                itemChild?.ten_goi_nho?.length > 0
                                  ? itemChild?.ten_goi_nho
                                  : author?.name}
                              </Link>
                              <span
                                className={`text-[13px] text-gray-600 ${
                                  item?.new === true &&
                                  item?.lastMessage?.formAuthor?.userId !==
                                    user?.uid &&
                                  "font-semibold text-gray-900"
                                }`}
                              >
                                {getTimeChat(
                                  item?.lastMessage?.createdAt?.toDate()
                                )}
                              </span>
                            </div>
                            <div className="flex justify-between mt-0.5">
                              <p className="text-[13px] text-gray-600  line-clamp-1">
                                {item?.lastMessage ? (
                                  item?.lastMessage?.recall ? (
                                    <span className="italic">
                                      Tin nhắn đã thu hồi
                                    </span>
                                  ) : item?.lastMessage?.isDelete?.find(
                                      (x) => x?.user === user?.uid
                                    ) ? (
                                    finIndexMessages > -1 ? (
                                      item?.messages[finIndexMessages]
                                        ?.recall ? (
                                        <span className="italic">
                                          Tin nhắn đã thu hồi
                                        </span>
                                      ) : item?.messages[
                                          finIndexMessages
                                        ]?.isDelete?.find(
                                          (x) => x?.user === userId
                                        ) ? (
                                        <span className="italic">
                                          Chưa có tin nhắn mới
                                        </span>
                                      ) : (
                                        <span>
                                          {item?.messages[finIndexMessages]
                                            ?.photos?.length > 0 &&
                                            "[Hình ảnh]"}
                                          {item?.messages[finIndexMessages]
                                            ?.files?.length > 0 && "[File]"}
                                          {
                                            item?.messages[finIndexMessages]
                                              ?.text
                                          }
                                        </span>
                                      )
                                    ) : (
                                      <span className="italic">
                                        Chưa có tin nhắn mới
                                      </span>
                                    )
                                  ) : (
                                    <span
                                      className={
                                        item?.new === true &&
                                        item?.lastMessage?.formAuthor
                                          ?.userId !== user?.uid &&
                                        "font-semibold text-gray-900"
                                      }
                                    >
                                      {item?.lastMessage?.text}
                                    </span>
                                  )
                                ) : (
                                  <span className="italic">
                                    Chưa có tin nhắn mới
                                  </span>
                                )}
                              </p>

                              {item?.new === true &&
                                item?.lastMessage?.formAuthor?.userId !==
                                  user?.uid && (
                                  <div className="rounded-full w-[20px] h-[20px] bg-[#C82027] text-white text-[10px] flex justify-center items-center">
                                    {item?.lastMessagesCount &&
                                    item?.lastMessagesCount > 5
                                      ? "+5"
                                      : item?.lastMessagesCount}
                                  </div>
                                )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  );
                });
              })
          ) : (
            <div className="h-full w-full flex justify-center items-center text-base">
              Danh người nhắn đang trống
            </div>
          )}
        </div>
      </div>
      <ModalAddFriend
        authors={authors}
        onCallback={() => {}}
        onCancel={() => setShowAddFriend(false)}
        visible={showAddFriend}
        onChooseUser={(author) => selectFriend(author)}
        user={user}
        usingUser={usingUser}
        checkFriendType={checkFriendType}
        setFriendList={setFriendListp}
      />
    </div>
  );
}
