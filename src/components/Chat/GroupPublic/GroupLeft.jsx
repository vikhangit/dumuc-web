"use client";
import { useWindowSize } from "@hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import {
  MdArrowDropDown,
  MdOutlineArrowDropDown,
  MdOutlineArrowRight,
  MdOutlineGroupAdd,
  MdOutlinePersonAddAlt,
} from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@utils/firebase";
import { getProfile } from "@apis/users";
import { useRouter, useSearchParams } from "next/navigation";
import ModalCreateGroup from "./ModalCreateGroup";
import { FaCamera, FaCaretDown } from "react-icons/fa6";
import moment from "moment";
import {
  collection,
  deleteField,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

export default function ChatGroupLeft({
  activeGroup,
  setActiveGroup,
  mobile,
  setMobile,
  messages,
  authors,
  // user,
  // usingUser,
  reset,
}) {
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const sizes = useWindowSize();
  const search = useSearchParams();
  const [groupTo, setGroupTo] = useState();
  const router = useRouter();
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [searchFunction, setSearchFunction] = useState(false);
  const [activeList, setActiveList] = useState();
  const [activeMessage, setActiveMessage] = useState();
  const [typeMessage, setTypeMessage] = useState([]);
  const [mamageGroup, setManageGroup] = useState([]);
  const [joinedGroup, setJoinedGroup] = useState([]);
  const [requestGroup, setRequestGroup] = useState([]);
  const [notJoined, setNotjoined] = useState([]);
  const [show1, setShow1] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [show4, setShow4] = useState(true);
  useEffect(() => {
    // type 1= "Sáng lập"
    // 2 = Đã tham gia
    // 3 = Đã yêu cầu tham gia
    // 4 = Chưa tham gia
    setTypeMessage(
      messages
        ?.map((item) => {
          if (item?.isPrivate === false) {
            if (
              item?.member?.find((x) => x?.user === userId) &&
              (item?.leader === userId || item?.deputyLeader === userId)
            ) {
              return { ...item, typeGroup: 1 };
            } else if (
              item?.member?.find((x) => x?.user === userId) &&
              item?.leader !== userId
            ) {
              return {
                ...item,
                typeGroup: 2,
              };
            } else if (
              !item?.member?.find((x) => x?.user === userId) &&
              item?.requestList?.find((x) => x?.user === userId)
            ) {
              return {
                ...item,
                typeGroup: 3,
              };
            } else if (
              !item?.member?.find((x) => x?.user === userId) &&
              !item?.requestList?.find((x) => x?.user === userId)
            ) {
              return {
                ...item,
                typeGroup: 4,
              };
            }
          }
        })
        ?.filter((x) => x !== undefined)
        ?.sort((a, b) => a?.name?.localeCompare(b?.name))
    );
  }, [messages]);
  useEffect(() => {
    const showMessage = typeMessage;
    const myGroupAndLeader = showMessage?.filter(
      (item) => item?.typeGroup === 1
    );
    const myGroupAndMember = showMessage?.filter(
      (item) => item?.typeGroup === 2
    );
    const ortherGroupRequest = showMessage?.filter(
      (item) => item?.typeGroup === 3
    );
    const ortherGroup = showMessage?.filter((item) => item?.typeGroup === 4);
    setGroupList([
      ...myGroupAndLeader,
      ...myGroupAndMember,
      ...ortherGroupRequest,
      ...ortherGroup,
    ]);
    setManageGroup(myGroupAndLeader);
    setJoinedGroup(myGroupAndMember);
    setRequestGroup(ortherGroupRequest);
    setNotjoined(ortherGroup);
  }, [typeMessage]);
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
      setMobile(true);
      setGroupTo(chatDetail);
    } else {
      setMobile(false);
      setGroupTo();
    }
  }, [messages, search]);

  const searchField = (value) => {
    setValueSearch(value);
    const showMessage = typeMessage;
    const myGroupAndLeader = showMessage?.filter(
      (item) => item?.typeGroup === 1
    );
    const myGroupAndMember = showMessage?.filter(
      (item) => item?.typeGroup === 2
    );
    const ortherGroupRequest = showMessage?.filter(
      (item) => item?.typeGroup === 3
    );
    const ortherGroup = showMessage?.filter((item) => item?.typeGroup === 4);

    if (value.trim() === "") {
      setShow1(true);
      setShow2(true);
      setShow3(true);
      setShow4(true);
      setGroupList([
        ...myGroupAndLeader,
        ...myGroupAndMember,
        ...ortherGroupRequest,
        ...ortherGroup,
      ]);
      setManageGroup(myGroupAndLeader);
      setJoinedGroup(myGroupAndMember);
      setRequestGroup(ortherGroupRequest);
      setNotjoined(ortherGroup);
    } else {
      const searchList = typeMessage?.filter((x) =>
        x?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );
      const searchList1 = myGroupAndLeader?.filter((x) =>
        x?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );
      const searchList2 = myGroupAndMember?.filter((x) =>
        x?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );
      const searchList3 = ortherGroupRequest?.filter((x) =>
        x?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );
      const searchList4 = ortherGroup?.filter((x) =>
        x?.name?.toLowerCase()?.includes(value?.toLowerCase())
      );

      setShow1(true);
      setShow2(true);
      setShow3(true);
      setShow4(true);
      setGroupList(searchList);
      setManageGroup(searchList1);
      setJoinedGroup(searchList2);
      setRequestGroup(searchList3);
      setNotjoined(searchList4);
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
      {/* <div className="mt-[10px] ml-2 mr-3 font-semibold pb-[10px] border-b border-gray-400">
        Nhóm công khai
      </div> */}
      <div
        className={`${
          sizes.width > 800 ? "h-[calc(100%-175px)]" : "h-[calc(100%-130px)]"
        } overflow-auto scroll-chat px-2 pb-4`}
      >
        <div
          className="mt-2 font-semibold flex justify-between items-center cursor-pointer"
          onClick={() => {
            setShow1(!show1);
          }}
        >
          Nhóm quản lý{" "}
          <button className="">
            {show1 ? (
              <MdOutlineArrowRight size={20} />
            ) : (
              <MdOutlineArrowDropDown size={20} />
            )}
          </button>
        </div>
        {!show1 ? (
          <div></div>
        ) : mamageGroup?.length > 0 ? (
          mamageGroup?.map((item, i) => {
            const author = authors?.find(
              (x) => x?.authorId === item?.lastMessage?.formAuthor?.authorId
            );
            const finIndexMessages = item?.messages?.findLastIndex((x) => {
              if (!x?.isDelete) {
                return x;
              } else {
                if (x?.isDelete?.find((aa) => aa?.user !== userId)) {
                  return x;
                }
              }
            });

            return (
              <div
                key={i}
                onClick={async () => {
                  // setActiveGroup(item);
                  setMobile(true);
                  const washingtonRef = doc(db, "chat-groups", item?.id);
                  if (groupTo?.lastMessage?.formAuthor?.userId !== userId) {
                    await updateDoc(washingtonRef, {
                      new: false,
                      lastMessagesCount: deleteField(),
                    });
                  }
                  router.push(`/chat/group-public?groupId=${item?.id}`);
                }}
                className={`${
                  groupTo?.id === item?.id
                    ? "bg-[#0084ff] bg-opacity-30"
                    : "bg-white"
                } rounded-md shadow shadow-gray-400  pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}
              >
                <div className="flex items-center gap-x-2 mt-[10px]">
                  <div className="w-[45px] h-[45px] rounded-full flex justify-center items-center border border-gray-400">
                    <Image
                      src={
                        item?.avatar?.length > 0
                          ? item?.avatar
                          : "/dumuc/avatar.jpg"
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
                      {item?.isDelete?.find((ab) => ab?.user === userId) ? (
                        <div></div>
                      ) : (
                        item?.member?.find((x) => x?.user === userId) && (
                          <span className="text-[13px] text-gray-600">
                            {item?.lastMessage &&
                              getTimeChat(
                                item?.lastMessage?.createdAt?.toDate()
                              )}
                          </span>
                        )
                      )}
                    </div>
                    {item?.isDelete?.find((ab) => ab?.user === userId) ? (
                      <p className="text-[13px] text-gray-600 mt-0.5 italic">
                        Chưa có tin nhắn mới
                      </p>
                    ) : (
                      item?.member?.find((x) => x?.user === userId) && (
                        <div className="flex justify-between w-full">
                          {item?.lastMessage ? (
                            <>
                              <p className="text-[13px] text-gray-600 mt-0.5 line-clamp-1">
                                {item?.lastMessage?.recall ? (
                                  <span className="italic">
                                    Tin nhắn đã thu hồi
                                  </span>
                                ) : item?.lastMessage?.isDelete?.find(
                                    (x) => x?.user === user?.uid
                                  ) ? (
                                  finIndexMessages > -1 ? (
                                    item?.messages[finIndexMessages]?.recall ? (
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
                                        {author?.name}:{" "}
                                        {item?.messages[finIndexMessages]
                                          ?.photos?.length > 0 && "[Hình ảnh]"}
                                        {item?.messages[finIndexMessages]?.files
                                          ?.length > 0 && "[File]"}
                                        {item?.messages[finIndexMessages]?.text}
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
                                      item?.lastMessage?.formAuthor?.userId !==
                                        user?.uid &&
                                      "font-semibold text-gray-900"
                                    }
                                  >
                                    {author?.name}: {item?.lastMessage?.text}
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
              </div>
            );
          })
        ) : (
          <div className="p-2 italic">Chưa có nhóm quản lý</div>
        )}
        <div
          className="mt-2 font-semibold flex justify-between items-center cursor-pointer"
          onClick={() => {
            setShow2(!show2);
          }}
        >
          Nhóm tham gia
          <button className="">
            {show2 ? (
              <MdOutlineArrowRight size={20} />
            ) : (
              <MdOutlineArrowDropDown size={20} />
            )}
          </button>
        </div>
        {!show2 ? (
          <div></div>
        ) : joinedGroup?.length > 0 ? (
          joinedGroup?.map((item, i) => {
            const author = authors?.find(
              (x) => x?.authorId === item?.lastMessage?.formAuthor?.authorId
            );
            const finIndexMessages = item?.messages?.findLastIndex((x) => {
              if (!x?.isDelete) {
                return x;
              } else {
                if (x?.isDelete?.find((aa) => aa?.user !== userId)) {
                  return x;
                }
              }
            });

            return (
              <div
                key={i}
                onClick={async () => {
                  // setActiveGroup(item);
                  setMobile(true);
                  const washingtonRef = doc(db, "chat-groups", item?.id);
                  if (groupTo?.lastMessage?.formAuthor?.userId !== userId) {
                    await updateDoc(washingtonRef, {
                      new: false,
                      lastMessagesCount: deleteField(),
                    });
                  }
                  router.push(`/chat/group-public?groupId=${item?.id}`);
                }}
                className={`${
                  groupTo?.id === item?.id
                    ? "bg-[#0084ff] bg-opacity-30"
                    : "bg-white"
                } rounded-md shadow shadow-gray-400  pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}
              >
                <div className="flex items-center gap-x-2 mt-[10px]">
                  <div className="w-[45px] h-[45px] rounded-full flex justify-center items-center border border-gray-400">
                    <Image
                      src={
                        item?.avatar?.length > 0
                          ? item?.avatar
                          : "/dumuc/avatar.jpg"
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
                      {item?.isDelete?.find((ab) => ab?.user === userId) ? (
                        <div></div>
                      ) : (
                        item?.member?.find((x) => x?.user === userId) && (
                          <span className="text-[13px] text-gray-600">
                            {item?.lastMessage &&
                              getTimeChat(
                                item?.lastMessage?.createdAt?.toDate()
                              )}
                          </span>
                        )
                      )}
                    </div>
                    {item?.isDelete?.find((ab) => ab?.user === userId) ? (
                      <p className="text-[13px] text-gray-600 mt-0.5 italic">
                        Chưa có tin nhắn mới
                      </p>
                    ) : (
                      item?.member?.find((x) => x?.user === userId) && (
                        <div className="flex justify-between w-full">
                          {item?.lastMessage ? (
                            <>
                              <p className="text-[13px] text-gray-600 mt-0.5 line-clamp-1">
                                {item?.lastMessage?.recall ? (
                                  <span className="italic">
                                    Tin nhắn đã thu hồi
                                  </span>
                                ) : item?.lastMessage?.isDelete?.find(
                                    (x) => x?.user === user?.uid
                                  ) ? (
                                  finIndexMessages > -1 ? (
                                    item?.messages[finIndexMessages]?.recall ? (
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
                                        {author?.name}:{" "}
                                        {item?.messages[finIndexMessages]
                                          ?.photos?.length > 0 && "[Hình ảnh]"}
                                        {item?.messages[finIndexMessages]?.files
                                          ?.length > 0 && "[File]"}
                                        {item?.messages[finIndexMessages]?.text}
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
                                      item?.lastMessage?.formAuthor?.userId !==
                                        user?.uid &&
                                      "font-semibold text-gray-900"
                                    }
                                  >
                                    {author?.name}: {item?.lastMessage?.text}
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
              </div>
            );
          })
        ) : (
          <div className="p-2 italic">Chưa có nhóm tham gia</div>
        )}

        <div
          className="mt-2 font-semibold flex justify-between items-center cursor-pointer"
          onClick={() => {
            setShow3(!show3);
          }}
        >
          Nhóm yêu cầu tham gia
          <button className="">
            {show3 ? (
              <MdOutlineArrowRight size={20} />
            ) : (
              <MdOutlineArrowDropDown size={20} />
            )}
          </button>
        </div>
        {!show3 ? (
          <div></div>
        ) : requestGroup?.length > 0 ? (
          requestGroup?.map((item, i) => {
            const author = authors?.find(
              (x) => x?.authorId === item?.lastMessage?.formAuthor?.authorId
            );
            const finIndexMessages = item?.messages?.findLastIndex((x) => {
              if (!x?.isDelete) {
                return x;
              } else {
                if (x?.isDelete?.find((aa) => aa?.user !== userId)) {
                  return x;
                }
              }
            });

            return (
              <div
                key={i}
                onClick={async () => {
                  // setActiveGroup(item);
                  setMobile(true);
                  const washingtonRef = doc(db, "chat-groups", item?.id);
                  if (groupTo?.lastMessage?.formAuthor?.userId !== userId) {
                    await updateDoc(washingtonRef, {
                      new: false,
                      lastMessagesCount: deleteField(),
                    });
                  }
                  router.push(`/chat/group-public?groupId=${item?.id}`);
                }}
                className={`${
                  groupTo?.id === item?.id
                    ? "bg-[#0084ff] bg-opacity-30"
                    : "bg-white"
                } rounded-md shadow shadow-gray-400  pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}
              >
                <div className="flex items-center gap-x-2 mt-[10px]">
                  <div className="w-[45px] h-[45px] rounded-full flex justify-center items-center border border-gray-400">
                    <Image
                      src={
                        item?.avatar?.length > 0
                          ? item?.avatar
                          : "/dumuc/avatar.jpg"
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
                      {item?.isDelete?.find((ab) => ab?.user === userId) ? (
                        <div></div>
                      ) : (
                        item?.member?.find((x) => x?.user === userId) && (
                          <span className="text-[13px] text-gray-600">
                            {item?.lastMessage &&
                              getTimeChat(
                                item?.lastMessage?.createdAt?.toDate()
                              )}
                          </span>
                        )
                      )}
                    </div>
                    {item?.isDelete?.find((ab) => ab?.user === userId) ? (
                      <p className="text-[13px] text-gray-600 mt-0.5 italic">
                        Chưa có tin nhắn mới
                      </p>
                    ) : (
                      item?.member?.find((x) => x?.user === userId) && (
                        <div className="flex justify-between w-full">
                          {item?.lastMessage ? (
                            <>
                              <p className="text-[13px] text-gray-600 mt-0.5 line-clamp-1">
                                {item?.lastMessage?.recall ? (
                                  <span className="italic">
                                    Tin nhắn đã thu hồi
                                  </span>
                                ) : item?.lastMessage?.isDelete?.find(
                                    (x) => x?.user === user?.uid
                                  ) ? (
                                  finIndexMessages > -1 ? (
                                    item?.messages[finIndexMessages]?.recall ? (
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
                                        {author?.name}:{" "}
                                        {item?.messages[finIndexMessages]
                                          ?.photos?.length > 0 && "[Hình ảnh]"}
                                        {item?.messages[finIndexMessages]?.files
                                          ?.length > 0 && "[File]"}
                                        {item?.messages[finIndexMessages]?.text}
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
                                      item?.lastMessage?.formAuthor?.userId !==
                                        user?.uid &&
                                      "font-semibold text-gray-900"
                                    }
                                  >
                                    {author?.name}: {item?.lastMessage?.text}
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
              </div>
            );
          })
        ) : (
          <div className="p-2 italic">Chưa có nhóm yêu cầu tham gia</div>
        )}
        <div
          className="mt-2 font-semibold flex justify-between items-center cursor-pointer"
          onClick={() => {
            setShow4(!show4);
          }}
        >
          Nhóm chưa tham gia
          <button className="">
            {show4 ? (
              <MdOutlineArrowRight size={20} />
            ) : (
              <MdOutlineArrowDropDown size={20} />
            )}
          </button>
        </div>
        {!show4 ? (
          <div></div>
        ) : notJoined?.length > 0 ? (
          notJoined?.map((item, i) => {
            const author = authors?.find(
              (x) => x?.authorId === item?.lastMessage?.formAuthor?.authorId
            );
            const finIndexMessages = item?.messages?.findLastIndex((x) => {
              if (!x?.isDelete) {
                return x;
              } else {
                if (x?.isDelete?.find((aa) => aa?.user !== userId)) {
                  return x;
                }
              }
            });

            return (
              <div
                key={i}
                onClick={async () => {
                  // setActiveGroup(item);
                  setMobile(true);
                  const washingtonRef = doc(db, "chat-groups", item?.id);
                  if (groupTo?.lastMessage?.formAuthor?.userId !== userId) {
                    await updateDoc(washingtonRef, {
                      new: false,
                      lastMessagesCount: deleteField(),
                    });
                  }
                  router.push(`/chat/group-public?groupId=${item?.id}`);
                }}
                className={`${
                  groupTo?.id === item?.id
                    ? "bg-[#0084ff] bg-opacity-30"
                    : "bg-white"
                } rounded-md shadow shadow-gray-400  pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}
              >
                <div className="flex items-center gap-x-2 mt-[10px]">
                  <div className="w-[45px] h-[45px] rounded-full flex justify-center items-center border border-gray-400">
                    <Image
                      src={
                        item?.avatar?.length > 0
                          ? item?.avatar
                          : "/dumuc/avatar.jpg"
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
                      {item?.isDelete?.find((ab) => ab?.user === userId) ? (
                        <div></div>
                      ) : (
                        item?.member?.find((x) => x?.user === userId) && (
                          <span className="text-[13px] text-gray-600">
                            {item?.lastMessage &&
                              getTimeChat(
                                item?.lastMessage?.createdAt?.toDate()
                              )}
                          </span>
                        )
                      )}
                    </div>
                    {item?.isDelete?.find((ab) => ab?.user === userId) ? (
                      <p className="text-[13px] text-gray-600 mt-0.5 italic">
                        Chưa có tin nhắn mới
                      </p>
                    ) : (
                      item?.member?.find((x) => x?.user === userId) && (
                        <div className="flex justify-between w-full">
                          {item?.lastMessage ? (
                            <>
                              <p className="text-[13px] text-gray-600 mt-0.5 line-clamp-1">
                                {item?.lastMessage?.recall ? (
                                  <span className="italic">
                                    Tin nhắn đã thu hồi
                                  </span>
                                ) : item?.lastMessage?.isDelete?.find(
                                    (x) => x?.user === user?.uid
                                  ) ? (
                                  finIndexMessages > -1 ? (
                                    item?.messages[finIndexMessages]?.recall ? (
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
                                        {author?.name}:{" "}
                                        {item?.messages[finIndexMessages]
                                          ?.photos?.length > 0 && "[Hình ảnh]"}
                                        {item?.messages[finIndexMessages]?.files
                                          ?.length > 0 && "[File]"}
                                        {item?.messages[finIndexMessages]?.text}
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
                                      item?.lastMessage?.formAuthor?.userId !==
                                        user?.uid &&
                                      "font-semibold text-gray-900"
                                    }
                                  >
                                    {author?.name}: {item?.lastMessage?.text}
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
              </div>
            );
          })
        ) : (
          <div className="p-2 italic">Không có nhóm chưa tham gia</div>
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
