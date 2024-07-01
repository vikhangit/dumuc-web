"use client";
import { useWindowSize } from "@hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal, HiVideoCamera } from "react-icons/hi";
import { IoIosCall, IoMdClose, IoMdShareAlt } from "react-icons/io";
import {
  IoChevronBackOutline,
  IoImageOutline,
  IoInformationCircleSharp,
  IoSend,
} from "react-icons/io5";
import { RiFileVideoFill } from "react-icons/ri";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@utils/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  onSnapshot,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  deleteField,
} from "firebase/firestore";
import { uploadImage } from "@apis/other";
import ModalWating from "@components/Dumuc/ModalWating";
import { Button, Dropdown, Popconfirm, message } from "antd";
const ModalImageZoom = dynamic(
  () => {
    return import("@components/ModalImageZoom");
  },
  { ssr: false }
);
import { MdAttachFile, MdDelete, MdReplay, MdReply } from "react-icons/md";
import {
  FaFile,
  FaFileAudio,
  FaFileImage,
  FaFileLines,
  FaUserPlus,
} from "react-icons/fa6";
import { BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { BsEmojiSmile, BsFileEarmarkWordFill } from "react-icons/bs";
import { SiMicrosoftpowerpoint } from "react-icons/si";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import { getTimeChat } from "@utils/dateFormat";
import EmojiPicker from "emoji-picker-react";
import {
  deleteAddFriend,
  deleteRecieveFriend,
  getProfile,
  receiveRequestAddFriend,
  sendRequestAddFriend,
} from "@apis/users";
import { Spinner } from "flowbite-react";
import { Textarea } from "@nextui-org/input";
import ModalForwardMessage from "./ModalForwardMessage";
import { set } from "lodash";
import { HiPencil } from "react-icons/hi2";
import ModalNickame from "./ModalChangeEmail";

export default function ChatRight({
  userRecieved,
  setUserRecieved,
  mobile,
  setMobile,
  messages,
  authors,
  activeMessage,
  checkFriendType,
  tenGoiNho,
  friendList,
  setFriendList,
  usingUser,
  setUsingUser,
}) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const search = useSearchParams();
  const refImg = useRef();
  const refVideo = useRef();
  const scroll = useRef();
  const sizes = useWindowSize();
  const [newMessage, setNewMessage] = useState("");
  const [showWatting, setShowWating] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [chooseQuote, setChooseQuote] = useState();
  const [loadingAdd, setLoadingAdd] = useState(false);
  const sendRef = useRef(null);
  const textareaRef = useRef(null);
  const quoteRef = useRef(null);
  const addFriend = useRef(null);
  const [height, setHeight] = useState(textareaRef.current?.offsetHeight);
  const [quoteHeight, setQuoteHeight] = useState(0);
  const [sendHeight, setSendHeight] = useState(0);
  const [addFriendHeight, setaddFriendHeight] = useState(0);
  const [showForward, setShowForward] = useState(false);
  const [messageForward, setMessageForward] = useState("");
  const [photoForward, setPhotoForward] = useState([]);
  const [fileForward, setFieldForward] = useState([]);
  const [typeFriend, setTypeFriend] = useState(1);
  const [myMessage, setMyMessage] = useState(activeMessage);
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
      setFriendList(dataCall?.friendList);
    });
  }, [user]);
  useEffect(() => {
    setMyMessage(activeMessage);
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeMessage]);
  const read = async () => {
    if (
      messages?.find((x) => x?.id === search.get("chatId"))?.lastMessage
        ?.formAuthor?.userId !== user?.uid
    ) {
      const washingtonRef = doc(db, "chat-rooms", search.get("chatId"));
      await updateDoc(washingtonRef, {
        new: false,
        lastMessagesCount: deleteField(),
      });
    }
  };
  useEffect(() => {
    if (search.get("chatId")) {
      read();
    }
  });
  const findRoom = messages?.find((x) => x?.id === search.get("chatId"));
  useEffect(() => {
    setHeight(textareaRef.current?.offsetHeight);
    setSendHeight(sendRef.current?.offsetHeight);
    setaddFriendHeight(addFriend.current ? addFriend.current?.offsetHeight : 0);
    setQuoteHeight(quoteRef.current ? quoteRef.current?.offsetHeight : 0);
  });
  const ref = useRef(null);
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setShowEmoji(false);
      }
    };
    window.addEventListener("mousedown", handleOutSideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);
  const handleSendImage = async (e) => {
    setShowWating(true);
    if (e?.target?.files) {
      let array = [];
      for (let index = 0; index < e?.target?.files?.length; index++) {
        array.push(e?.target?.files[index]);
      }
      let newPhoto = [];
      array.map((x) => {
        uploadImage(x, user?.accessToken)
          .then(async (data) => {
            newPhoto.push(data?.url);
            if (newPhoto.length === array.length) {
              const myAuthor = authors?.find((x) => x?.userId === user?.uid);
              let dataItem = {
                text: newMessage,
                photos: newPhoto,
                files: [],
                createdAt: serverTimestamp(),
                formAuthor: myAuthor,
                recall: false,
                read: false,
              };
              if (myMessage?.length > 0) {
                await addDoc(
                  collection(
                    db,
                    "chat-rooms",
                    search.get("chatId"),
                    "messages"
                  ),
                  dataItem
                ).then(async (data) => {
                  const washingtonRef = doc(
                    db,
                    "chat-rooms",
                    search.get("chatId")
                  );
                  await updateDoc(washingtonRef, {
                    lastMessage: {
                      ...dataItem,
                      messageId: data?.id,
                      text: "[Hình ảnh]",
                    },
                    new: true,
                    isDelete: deleteField(),
                    lastMessagesCount: findRoom?.lastMessagesCount
                      ? findRoom?.lastMessagesCount + 1
                      : 1,
                    createdAt: serverTimestamp(),
                  });
                });
              } else {
                await addDoc(collection(db, "chat-rooms"), {
                  member: [userRecieved, myAuthor],
                  createdAt: serverTimestamp(),
                }).then(async (data) => {
                  await addDoc(
                    collection(db, "chat-rooms", `${data?.id}`, "messages"),
                    dataItem
                  ).then(async (dataMessage) => {
                    const washingtonRef = doc(db, "chat-rooms", `${data?.id}`);
                    await updateDoc(washingtonRef, {
                      lastMessage: {
                        ...dataItem,
                        messageId: dataMessage?.id,
                        text: "[Hình ảnh]",
                      },
                      new: true,
                      lastMessagesCount: 1,
                      isDelete: deleteField(),
                      createdAt: serverTimestamp(),
                    });
                  });
                  router.push(`/chat?chatId=${data.id}`);
                });
              }
              setNewMessage("");
              setPhotos([]);
              scroll.current?.scrollIntoView({ behavior: "smooth" });
            }
            setShowWating(false);
          })
          .catch((err) => {
            message.error("Đã có lỗi do kích thước file quá lớn");
            setShowWating(false);
          });
      });
    }
  };
  const handleSendVideo = async (e) => {
    setShowWating(true);
    if (e?.target?.files) {
      let array = [];
      for (let index = 0; index < e?.target?.files?.length; index++) {
        array.push(e?.target?.files[index]);
      }
      let newPhoto = [];
      array.map((x) => {
        uploadImage(x, user?.accessToken)
          .then(async (data) => {
            newPhoto.push({
              url: data?.url,
              name: x?.name,
              type: x?.type,
            });
            if (newPhoto.length === array.length) {
              const myAuthor = authors?.find((x) => x?.userId === user?.uid);
              if (myMessage?.length > 0) {
                newPhoto.map(async (x) => {
                  let dataItem = {
                    text: newMessage,
                    photos,
                    files: [x],
                    createdAt: serverTimestamp(),
                    formAuthor: myAuthor,
                    recall: false,
                    read: false,
                  };
                  await addDoc(
                    collection(
                      db,
                      "chat-rooms",
                      search.get("chatId"),
                      "messages"
                    ),
                    dataItem
                  ).then(async (data) => {
                    const washingtonRef = doc(
                      db,
                      "chat-rooms",
                      search.get("chatId")
                    );
                    await updateDoc(washingtonRef, {
                      lastMessage: {
                        ...dataItem,
                        messageId: data?.id,
                        text: "[File]",
                      },
                      isDelete: deleteField(),
                      new: true,
                      lastMessagesCount: findRoom?.lastMessagesCount
                        ? findRoom?.lastMessagesCount + 1
                        : 1,
                      createdAt: serverTimestamp(),
                    });
                  });
                });
              } else {
                newPhoto.map(async (x) => {
                  let dataItem = {
                    text: newMessage,
                    photos,
                    files: [x],
                    createdAt: serverTimestamp(),
                    formAuthor: myAuthor,
                    recall: false,
                    read: false,
                  };
                  await addDoc(collection(db, "chat-rooms"), {
                    member: [userRecieved, myAuthor],
                    createdAt: serverTimestamp(),
                  }).then(async (data) => {
                    await addDoc(
                      collection(db, "chat-rooms", `${data?.id}`, "messages"),
                      dataItem
                    ).then(async (dataMessage) => {
                      const washingtonRef = doc(
                        db,
                        "chat-rooms",
                        `${data?.id}`
                      );
                      await updateDoc(washingtonRef, {
                        lastMessage: {
                          ...dataItem,
                          messageId: dataMessage?.id,
                          text: "[File]",
                        },
                        new: true,
                        lastMessagesCount: 1,
                        isDelete: deleteField(),
                        createdAt: serverTimestamp(),
                      });
                    });
                    router.push(`/chat?chatId=${data.id}`);
                  });
                });
              }
              setNewMessage("");
              scroll.current?.scrollIntoView({ behavior: "smooth" });
            }
            setShowWating(false);
          })
          .catch((err) => {
            message.error("Đã có lỗi do kích thước file quá lớn");
            setShowWating(false);
          });
      });
    }
  };
  const [openImage, setOpenImage] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [indexImage, setIndexImage] = useState(0);
  const [type, setType] = useState("image");
  const [editName, setEditName] = useState(false);
  const [nameActive, setNameActive] = useState(userRecieved?.name);
  useEffect(() => {
    setNameActive(tenGoiNho ? tenGoiNho : userRecieved?.name);
  }, [userRecieved, tenGoiNho]);
  const itemsInfo = [
    {
      label: friendList?.find(
        (item) =>
          item?.authorId === userRecieved?.authorId && item?.status === 2
      ) ? (
        <button
          onClick={async (e) => {
            e.preventDefault();
            deleteAddFriend(
              {
                authorId: userRecieved?.authorId,
              },
              user?.accessToken
            );
            deleteRecieveFriend(
              {
                authorUserId: userRecieved?.userId,
              },
              user?.accessToken
            ).then(() =>
              getProfile(user?.accessToken).then((dataCall) => {
                setUsingUser(dataCall);
                setFriendList(dataCall?.friendList);
              })
            );
            message.success("Đã xóa bạn");
          }}
        >
          Xóa bạn
        </button>
      ) : friendList?.find(
          (item) =>
            item?.authorId === userRecieved?.authorId &&
            item?.status === 1 &&
            item?.type === "send"
        ) ? (
        <button
          onClick={async (e) => {
            e.preventDefault();
            deleteAddFriend(
              {
                authorId: userRecieved?.authorId,
              },
              user?.accessToken
            );
            deleteRecieveFriend(
              {
                authorUserId: userRecieved?.userId,
              },
              user?.accessToken
            ).then(() =>
              getProfile(user?.accessToken).then((dataCall) => {
                setUsingUser(dataCall);
                setFriendList(dataCall?.friendList);
              })
            );
            message.success("Đã hủy kết bạn");
          }}
        >
          Hủy lời mời
        </button>
      ) : friendList?.find(
          (item) =>
            item?.authorId === userRecieved?.authorId &&
            item?.status === 1 &&
            item?.type === "recieve"
        ) ? (
        <button
          onClick={async (e) => {
            e.preventDefault();
            await deleteAddFriend(
              {
                authorId: userRecieved?.authorId,
              },
              user?.accessToken
            ).then(() => {
              deleteRecieveFriend(
                {
                  authorUserId: userRecieved?.userId,
                },
                user?.accessToken
              );
            });
            await sendRequestAddFriend(
              {
                authorId: userRecieved?.authorId,
                status: 2,
              },
              user?.accessToken
            )
              .then(() => {
                receiveRequestAddFriend(
                  {
                    authorUserId: userRecieved?.userId,
                    status: 2,
                  },
                  user?.accessToken
                );
              })
              .then(() =>
                getProfile(user?.accessToken).then((dataCall) => {
                  setUsingUser(dataCall);
                  setFriendList(dataCall?.friendList);
                })
              );
            message.success("Bạn đã đồng ý lời mời kết bạn");
          }}
        >
          Chấp nhận kết bạn
        </button>
      ) : (
        <button
          onClick={async (e) => {
            e.preventDefault();
            sendRequestAddFriend(
              {
                authorId: userRecieved?.authorId,
              },
              user?.accessToken
            );
            receiveRequestAddFriend(
              {
                authorUserId: userRecieved?.userId,
              },
              user?.accessToken
            ).then(() =>
              getProfile(user?.accessToken).then((dataCall) => {
                setUsingUser(dataCall);
                setFriendList(dataCall?.friendList);
              })
            );
            message.success("Đã gữi yêu cầu kết bạn.");
          }}
        >
          Kết bạn
        </button>
      ),
      key: "0",
    },
    {
      label: (
        <Popconfirm
          placement="bottomRight"
          title="Xóa tin nhắn"
          description="Toàn bộ tin nhắn sẽ bị xóa vĩnh viễn. Bạn có chắc chắn xóa"
          onConfirm={async () => {
            myMessage?.map(async (x) => {
              const washingtonRef = doc(
                db,
                "chat-rooms",
                search.get("chatId"),
                "messages",
                x?.id
              );
              await updateDoc(washingtonRef, {
                isDelete: arrayUnion({
                  user: user?.uid,
                }),
              });
            });
            const chatRef = doc(db, "chat-rooms", search.get("chatId"));
            await updateDoc(chatRef, {
              isDelete: arrayUnion({
                user: user?.uid,
              }),
            });
            message.success("Đã xóa tin nhắn thành công!!");
            router.push("/chat");
          }}
          onCancel={() => {}}
          okText="Đồng ý"
          cancelText="Hủy bỏ"
          style={{
            width: 200,
          }}
        >
          <button>Xóa tin nhắn</button>
        </Popconfirm>
      ),

      key: "1",
      disable: myMessage?.length > 0 ? false : true,
    },
    // {
    //   label: (
    //     <button
    //       onClick={(e) => {
    //         e.preventDefault();
    //       }}
    //     >
    //       Báo cáo
    //     </button>
    //   ),
    //   key: "2",
    // },
  ];
  const myAuthor = authors?.find((x) => x?.userId === user?.uid);
  console.log(userRecieved);
  return (
    <div
      className={`h-full  ${
        sizes.width > 992
          ? "basis-2/3"
          : `${mobile ? "basis-full" : "hidden"} overflow-x-hidden`
      }`}
    >
      <div className="h-[75px] flex justify-between items-center px-[15px] pl-[0px] sm:px-[20px] border-b border-gray-300">
        {userRecieved && (
          <>
            <div className="flex items-center gap-x-2 sm:gap-x-4">
              <button
                className={`${sizes.width > 992 ? "hidden" : ""}`}
                onClick={() => {
                  if (search.get("friendId")) {
                    router.back();
                    return;
                  }
                  router.push("/chat");
                  setMobile(false);
                  setNewMessage("");
                }}
              >
                <IoChevronBackOutline size={32} />
              </button>
              <Image
                src={
                  userRecieved &&
                  userRecieved?.user?.photo &&
                  userRecieved?.user?.photo?.length > 0
                    ? userRecieved?.user?.photo
                    : "/dumuc/avatar.jpg"
                }
                onClick={() => {
                  router.push(
                    `/author/${userRecieved?.slug}/${userRecieved?.authorId}`
                  );
                }}
                width={0}
                height={0}
                sizes="100vw"
                className={`${
                  sizes.width > 400 ? "w-[45px] h-[45px]" : "w-[40px] h-[40px]"
                }  rounded-full cursor-pointer`}
              />
              <div>
                <div
                  href={``}
                  className="text-base font-semibold cursor-pointer flex items-center gap-x-2"
                >
                  <button
                    onClick={() => {
                      router.push(
                        `/author/${userRecieved?.slug}/${userRecieved?.authorId}`
                      );
                    }}
                  >
                    {nameActive}
                  </button>
                  {myMessage?.length > 0 && (
                    <HiPencil size={12} onClick={() => setEditName(true)} />
                  )}
                </div>
                {/* <p className='text-sm'>Đang hoạt động</p> */}
              </div>
            </div>
            <div className="flex items-center gap-x-3 pr-0 sm:pr-5">
              <IoIosCall color="#0084ff" size={28} />
              <HiVideoCamera color="#0084ff" size={28} />

              <Dropdown
                menu={{
                  items: itemsInfo,
                }}
                placement="bottomRight"
              >
                <IoInformationCircleSharp color="#0084ff" size={28} />
              </Dropdown>
            </div>
          </>
        )}
      </div>
      <div ref={addFriend}></div>

      {userRecieved ? (
        <>
          <div
            className={`overflow-auto scroll-chat px-3 py-5  bg-gray-200`}
            style={{
              height:
                sizes.width > 992
                  ? `calc(100% - ${addFriendHeight}px - ${sendHeight}px - 75px - ${quoteHeight}px - 70px)`
                  : `calc(100% - ${addFriendHeight}px - ${sendHeight}px - 75px - ${quoteHeight}px)`,
            }}
          >
            <ul>
              {myMessage
                ?.filter(
                  (ele, ind) =>
                    ind ===
                    myMessage?.findLastIndex(
                      (elem) => elem.id === ele.id && elem.text === ele.text
                    )
                )
                ?.map((item, index) => {
                  const author = authors?.find(
                    (x) => x.authorId === item?.formAuthor?.authorId
                  );
                  const abc = item?.reply?.formAuthor?.authorId;
                  const authorReply =
                    item?.reply &&
                    authors?.find((item) => item?.authorId === abc);

                  return item?.isDelete?.find((x) => x?.user === user?.uid) ? (
                    <div></div>
                  ) : (
                    <div
                      key={index}
                      className={`flex gap-x-2 cursor-pointer sm:gap-x-4 ${
                        item?.formAuthor?.userId === user?.uid
                          ? "flex-row-reverse"
                          : "flex-row"
                      } ${index !== 0 && "mt-3"}`}
                    >
                      <Image
                        onClick={() =>
                          router.push(
                            `/author/${author?.slug}/${author?.authorId}`
                          )
                        }
                        src={
                          author?.user?.photo && author?.user?.photo?.length > 0
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
                      <div
                        className={`w-2/3 sm-w-1/2 flex items-center gap-x-2 ${
                          item?.formAuthor?.userId === user?.uid
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        {item?.photos?.length > 0 &&
                          (item?.recall ? (
                            <div
                              id={item?.id}
                              className={`w-fit text-sm ${
                                item?.formAuthor?.userId === user?.uid
                                  ? "ml-auto"
                                  : ""
                              }`}
                            >
                              <div
                                className={`w-full text-sm ${
                                  item?.formAuthor?.userId === user?.uid
                                    ? "bg-[#e5efff]"
                                    : "bg-white"
                                }  rounded-[10px] px-[10px] py-[20px] ${
                                  item?.recall
                                    ? "text-gray-400"
                                    : "text-gray-900"
                                }`}
                              >
                                Tin nhắn đã thu hồi
                              </div>
                            </div>
                          ) : (
                            <div
                              id={item?.id}
                              className={`w-full sm:w-3/4 ${
                                author?.userId === user?.uid ? "ml-auto" : ""
                              }`}
                            >
                              <div
                                className={`w-full flex items-center gap-x-2 flex-wrap ${
                                  item?.formAuthor?.userId === user?.uid
                                    ? "justify-end"
                                    : ""
                                } `}
                              >
                                {item?.formAuthor?.userId === user?.uid &&
                                  !item?.recall && (
                                    <button className="relative group w-fit mr-1">
                                      <Dropdown
                                        placement="bottomLeft"
                                        menu={{
                                          items: [
                                            {
                                              label: (
                                                <button
                                                  onClick={async (e) => {
                                                    const washingtonRef = doc(
                                                      db,
                                                      "chat-rooms",
                                                      search.get("chatId"),
                                                      "messages",
                                                      item?.id
                                                    );
                                                    await updateDoc(
                                                      washingtonRef,
                                                      {
                                                        recall: true,
                                                      }
                                                    );

                                                    if (
                                                      messages?.find(
                                                        (x) =>
                                                          x?.id ===
                                                          search.get("chatId")
                                                      )?.lastMessage
                                                        ?.messageId === item?.id
                                                    ) {
                                                      const wRef = doc(
                                                        db,
                                                        "chat-rooms",
                                                        search.get("chatId")
                                                      );
                                                      await updateDoc(wRef, {
                                                        lastMessage: {
                                                          recall: true,
                                                        },
                                                      });
                                                    }
                                                  }}
                                                  className={`flex items-center gap-x-2  w-full`}
                                                >
                                                  <MdReplay size={20} /> Thu hồi
                                                </button>
                                              ),
                                            },
                                            {
                                              label: item?.formAuthor
                                                ?.userId === user?.uid && (
                                                <Popconfirm
                                                  placement="bottomRight"
                                                  title="Xóa tin nhắn"
                                                  description="Tin nhắn này sẽ bị xóa vĩnh viễn. Bạn có chắc chắn xóa?"
                                                  onConfirm={async () => {
                                                    const washingtonRef = doc(
                                                      db,
                                                      "chat-rooms",
                                                      search.get("chatId"),
                                                      "messages",
                                                      item?.id
                                                    );
                                                    await updateDoc(
                                                      washingtonRef,
                                                      {
                                                        isDelete: arrayUnion({
                                                          user: user?.uid,
                                                        }),
                                                      }
                                                    );
                                                    if (
                                                      findRoom?.lastMessage
                                                        ?.messageId === item?.id
                                                    ) {
                                                      const wRef = doc(
                                                        db,
                                                        "chat-rooms",
                                                        search.get("chatId")
                                                      );
                                                      await updateDoc(wRef, {
                                                        lastMessage: {
                                                          ...item,
                                                          messageId: item?.id,
                                                          isDelete: arrayUnion({
                                                            user: user?.uid,
                                                          }),
                                                        },
                                                      });
                                                    }
                                                  }}
                                                  onCancel={() => {}}
                                                  okText="Đồng ý"
                                                  cancelText="Hủy bỏ"
                                                  style={{
                                                    width: 200,
                                                  }}
                                                >
                                                  <button className="flex items-center gap-x-2 w-full">
                                                    <MdDelete size={20} /> Xóa
                                                  </button>
                                                </Popconfirm>
                                              ),
                                            },
                                            {
                                              label: (
                                                <button
                                                  onClick={async (e) => {
                                                    setChooseQuote(item);
                                                  }}
                                                  className={`flex items-center gap-x-2 w-full`}
                                                >
                                                  <MdReply size={20} /> Trả lời
                                                </button>
                                              ),
                                            },
                                            {
                                              label: (
                                                <button
                                                  onClick={async (e) => {
                                                    setPhotoForward(
                                                      item?.photos
                                                    );
                                                    setMessageForward("");
                                                    setFieldForward([]);
                                                    setShowForward(true);
                                                  }}
                                                  className={`flex items-center gap-x-2 w-full`}
                                                >
                                                  <IoMdShareAlt size={20} />
                                                  Chuyển tiếp
                                                </button>
                                              ),
                                            },
                                          ],
                                        }}
                                      >
                                        <HiOutlineDotsHorizontal />
                                      </Dropdown>
                                    </button>
                                  )}
                                {item?.photos?.map((photo, indexC) => {
                                  return (
                                    <div
                                      key={indexC}
                                      className={`rounded-md h-full relative w-1/2 sm:w-1/3 2xl:w-1/4`}
                                    >
                                      <button
                                        onClick={() => {
                                          setImageList(item?.photos);
                                          setIndexImage(indexC);
                                          setOpenImage(true);
                                          setType("image");
                                        }}
                                        className="w-full h-full"
                                      >
                                        <Image
                                          width={0}
                                          height={0}
                                          style={{
                                            objectFit: "cover",
                                          }}
                                          sizes="100vw"
                                          className={`px-[3px] py-[2px] rounded-lg w-full ${
                                            sizes.width > 450
                                              ? "h-[110px] sm:h-[105px] md:h-[105px] lg:h-[90px] 2xl:h-[110px]"
                                              : "h-[70px]"
                                          }`}
                                          src={photo}
                                          alt=""
                                        />
                                      </button>
                                    </div>
                                  );
                                })}
                                {item?.formAuthor?.userId !== user?.uid && (
                                  <Dropdown
                                    placement="bottomRight"
                                    menu={{
                                      items: [
                                        {
                                          label: (
                                            <Link
                                              href={``}
                                              onClick={async (e) => {
                                                e.preventDefault();
                                                setChooseQuote(item);
                                              }}
                                              className={`flex items-center gap-x-2 w-full`}
                                            >
                                              <MdReply size={20} /> Trả lời
                                            </Link>
                                          ),
                                        },
                                        {
                                          label: (
                                            <Link
                                              href={``}
                                              onClick={async (e) => {
                                                e.preventDefault();
                                                setPhotoForward(item?.photos);
                                                setMessageForward("");
                                                setFieldForward([]);
                                                setShowForward(true);
                                              }}
                                              className={`flex items-center gap-x-2 w-full`}
                                            >
                                              <IoMdShareAlt size={20} />
                                              Chuyển tiếp
                                            </Link>
                                          ),
                                        },
                                      ],
                                    }}
                                  >
                                    <HiOutlineDotsHorizontal />
                                  </Dropdown>
                                )}
                              </div>
                              <div
                                className={`w-fit ${
                                  author?.userId === user?.uid && "ml-auto"
                                } text-[10px] text-white px-[8px] pt-[3px] pb-[2px]  rounded-full font-normal mt-[4px] bg-black bg-opacity-40`}
                              >
                                {moment(item?.createdAt).isBefore(
                                  new Date(),
                                  "days"
                                )
                                  ? `${moment(item?.createdAt).format(
                                      "hh:mm DD/MM/yyyy"
                                    )}`
                                  : `${moment(item?.createdAt).format(
                                      "hh:mm"
                                    )}`}
                              </div>
                            </div>
                          ))}

                        {item?.files?.length > 0 &&
                          (item?.recall ? (
                            <div
                              id={item?.id}
                              className={`w-fit  text-sm ${
                                item?.formAuthor?.userId === user?.uid
                                  ? "ml-auto"
                                  : ""
                              }`}
                            >
                              <div
                                className={`w-full text-sm ${
                                  item?.formAuthor?.userId === user?.uid
                                    ? "bg-[#e5efff]"
                                    : "bg-white"
                                }  rounded-[10px] px-[10px] py-[20px] ${
                                  item?.recall
                                    ? "text-gray-400"
                                    : "text-gray-900"
                                }`}
                              >
                                Tin nhắn đã thu hồi
                              </div>
                            </div>
                          ) : (
                            <div
                              id={item?.id}
                              className={`flex items-start gap-x-2 w-full ${
                                item?.formAuthor?.userId === user?.uid
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              } sm:w-3/4 lg:w-2/3 xl:w-7/12 2xl:w-1/2`}
                            >
                              <div className="w-full flex flex-col">
                                {item?.files?.map((photo, indexC) => {
                                  return (
                                    <div className="w-full" key={indexC}>
                                      <div
                                        className={`w-full flex gap-x-2 items-center ${
                                          item?.formAuthor?.userId === user?.uid
                                            ? "flex-row"
                                            : "flex-row-reverse"
                                        }`}
                                      >
                                        <Link
                                          className="w-full"
                                          href={photo?.url}
                                          target="_blank"
                                        >
                                          <div
                                            className={`cursor-pointer w-full text-sm  sm:text-base font-medium cursor-pointer ${
                                              item?.formAuthor?.userId ===
                                              user?.uid
                                                ? "bg-[#e5efff] ml-auto"
                                                : "bg-white"
                                            }  rounded-[10px] px-[10px] py-[20px] mb-2`}
                                          >
                                            <div className="flex items-center gap-x-2">
                                              {photo?.type?.includes(
                                                "image"
                                              ) ? (
                                                <FaFileImage
                                                  className="text-amber-500"
                                                  size={
                                                    sizes.width > 440
                                                      ? 48
                                                      : sizes.width > 320
                                                      ? 40
                                                      : 32
                                                  }
                                                />
                                              ) : photo?.name?.includes(
                                                  "pptx"
                                                ) ? (
                                                <SiMicrosoftpowerpoint
                                                  className="text-rose-700"
                                                  size={
                                                    sizes.width > 440
                                                      ? 48
                                                      : sizes.width > 320
                                                      ? 40
                                                      : 32
                                                  }
                                                />
                                              ) : photo?.name?.includes(
                                                  "xlsx"
                                                ) ? (
                                                <FaFileLines
                                                  className="text-green-600"
                                                  size={
                                                    sizes.width > 440
                                                      ? 48
                                                      : sizes.width > 320
                                                      ? 40
                                                      : 32
                                                  }
                                                />
                                              ) : photo?.type?.includes(
                                                  "video"
                                                ) ? (
                                                <RiFileVideoFill
                                                  size={
                                                    sizes.width > 440
                                                      ? 48
                                                      : sizes.width > 320
                                                      ? 40
                                                      : 32
                                                  }
                                                  className="text-yellow-300"
                                                />
                                              ) : photo?.type?.includes(
                                                  "pdf"
                                                ) ? (
                                                <BiSolidFilePdf
                                                  size={
                                                    sizes.width > 440
                                                      ? 48
                                                      : sizes.width > 320
                                                      ? 40
                                                      : 32
                                                  }
                                                  className="text-rose-500"
                                                />
                                              ) : photo?.type?.includes(
                                                  "doc"
                                                ) ? (
                                                <BsFileEarmarkWordFill
                                                  size={
                                                    sizes.width > 440
                                                      ? 48
                                                      : sizes.width > 320
                                                      ? 40
                                                      : 32
                                                  }
                                                  className="text-[#4367A5]"
                                                />
                                              ) : photo?.type?.includes(
                                                  "audio/mpeg"
                                                ) ? (
                                                <FaFileAudio
                                                  size={
                                                    sizes.width > 440
                                                      ? 48
                                                      : sizes.width > 320
                                                      ? 40
                                                      : 32
                                                  }
                                                  className="text-purple-600"
                                                />
                                              ) : photo?.type?.includes(
                                                  "text/plain"
                                                ) ? (
                                                <BiSolidFileTxt
                                                  size={
                                                    sizes.width > 440
                                                      ? 48
                                                      : sizes.width > 320
                                                      ? 40
                                                      : 32
                                                  }
                                                  className="text-sky-400"
                                                />
                                              ) : (
                                                <FaFile
                                                  size={
                                                    sizes.width > 440
                                                      ? 48
                                                      : sizes.width > 320
                                                      ? 40
                                                      : 32
                                                  }
                                                  className="text-sky-400"
                                                />
                                              )}
                                              <div className="">
                                                {" "}
                                                {photo?.name?.slice(
                                                  0,
                                                  sizes.width > 500
                                                    ? 20
                                                    : sizes.width > 380
                                                    ? 10
                                                    : 5
                                                )}
                                                {photo?.name?.length >
                                                  (sizes.width > 450
                                                    ? 20
                                                    : 6) && (
                                                  <>
                                                    ...
                                                    {photo?.name?.slice(
                                                      photo?.name?.length -
                                                        (sizes.width > 450
                                                          ? 8
                                                          : 5),
                                                      photo?.name?.length
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                      </div>
                                      <div
                                        className={`w-fit ${
                                          author?.userId === user?.uid &&
                                          "ml-auto"
                                        } text-[10px] text-white px-[8px] pt-[3px] pb-[2px]  rounded-full font-normal mt-[4px] bg-black bg-opacity-40`}
                                      >
                                        {moment(item?.createdAt).isBefore(
                                          new Date(),
                                          "days"
                                        )
                                          ? `${moment(item?.createdAt).format(
                                              "hh:mm DD/MM/yyyy"
                                            )}`
                                          : `${moment(item?.createdAt).format(
                                              "hh:mm"
                                            )}`}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              {!item?.recall && (
                                <Dropdown
                                  placement="bottomRight"
                                  menu={{
                                    items: [
                                      {
                                        label: item?.formAuthor?.userId ===
                                          user?.uid && (
                                          <button
                                            href={``}
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              const washingtonRef = doc(
                                                db,
                                                "chat-rooms",
                                                search.get("chatId"),
                                                "messages",
                                                item?.id
                                              );
                                              await updateDoc(washingtonRef, {
                                                recall: true,
                                              });
                                              if (
                                                messages?.find(
                                                  (x) =>
                                                    x?.id ===
                                                    search.get("chatId")
                                                )?.lastMessage?.messageId ===
                                                item?.id
                                              ) {
                                                const wRef = doc(
                                                  db,
                                                  "chat-rooms",
                                                  search.get("chatId")
                                                );
                                                await updateDoc(wRef, {
                                                  lastMessage: {
                                                    recall: true,
                                                  },
                                                });
                                              }
                                            }}
                                            className={`flex items-center gap-x-2 w-full`}
                                          >
                                            <MdReplay size={20} /> Thu hồi
                                          </button>
                                        ),
                                      },
                                      {
                                        label: item?.formAuthor?.userId ===
                                          user?.uid && (
                                          <Popconfirm
                                            placement="bottomRight"
                                            title="Xóa tin nhắn"
                                            description="Tin nhắn này sẽ bị xóa vĩnh viễn. Bạn có chắc chắn xóa?"
                                            onConfirm={async () => {
                                              const washingtonRef = doc(
                                                db,
                                                "chat-rooms",
                                                search.get("chatId"),
                                                "messages",
                                                item?.id
                                              );
                                              await updateDoc(washingtonRef, {
                                                isDelete: arrayUnion({
                                                  user: user?.uid,
                                                }),
                                              });
                                              if (
                                                findRoom?.lastMessage
                                                  ?.messageId === item?.id
                                              ) {
                                                const wRef = doc(
                                                  db,
                                                  "chat-rooms",
                                                  search.get("chatId")
                                                );
                                                await updateDoc(wRef, {
                                                  lastMessage: {
                                                    ...item,
                                                    messageId: item?.id,
                                                    isDelete: arrayUnion({
                                                      user: user?.uid,
                                                    }),
                                                  },
                                                });
                                              }
                                            }}
                                            onCancel={() => {}}
                                            okText="Đồng ý"
                                            cancelText="Hủy bỏ"
                                            style={{
                                              width: 200,
                                            }}
                                          >
                                            <button className="flex items-center gap-x-2 w-full">
                                              <MdDelete size={20} /> Xóa
                                            </button>
                                          </Popconfirm>
                                        ),
                                      },
                                      {
                                        label: (
                                          <button
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              setChooseQuote(item);
                                            }}
                                            className={`flex items-center gap-x-2 w-full`}
                                          >
                                            <MdReply size={20} /> Trả lời
                                          </button>
                                        ),
                                      },
                                      {
                                        label: (
                                          <button
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              setFieldForward(item?.files);
                                              setMessageForward("");
                                              setPhotoForward([]);
                                              setShowForward(true);
                                            }}
                                            className={`flex items-center gap-x-2 w-full`}
                                          >
                                            <IoMdShareAlt size={20} />
                                            Chuyển tiếp
                                          </button>
                                        ),
                                      },
                                    ],
                                  }}
                                >
                                  <HiOutlineDotsHorizontal />
                                </Dropdown>
                              )}
                            </div>
                          ))}
                        {item?.text?.trim() !== "" && (
                          <div
                            id={item?.id}
                            className={`${
                              item?.recall
                                ? "w-fit"
                                : item?.text?.length < 30
                                ? `${item?.reply ? "w-[250px]" : "w-[170px]"}`
                                : "w-fit"
                            } text-sm ${
                              item?.formAuthor?.userId === user?.uid
                                ? "ml-auto"
                                : ""
                            }`}
                          >
                            <div
                              className={`flex gap-x-2 items-center ${
                                item?.formAuthor?.userId === user?.uid
                                  ? "flex-row"
                                  : "flex-row-reverse"
                              }`}
                            >
                              {!item?.recall && (
                                <Dropdown
                                  placement="bottomRight"
                                  menu={{
                                    items: [
                                      {
                                        label: item?.formAuthor?.userId ===
                                          user?.uid && (
                                          <button
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              const washingtonRef = doc(
                                                db,
                                                "chat-rooms",
                                                search.get("chatId"),
                                                "messages",
                                                item?.id
                                              );
                                              await updateDoc(washingtonRef, {
                                                recall: true,
                                              });
                                              if (
                                                messages?.find(
                                                  (x) =>
                                                    x?.id ===
                                                    search.get("chatId")
                                                )?.lastMessage?.messageId ===
                                                item?.id
                                              ) {
                                                const wRef = doc(
                                                  db,
                                                  "chat-rooms",
                                                  search.get("chatId")
                                                );
                                                await updateDoc(wRef, {
                                                  lastMessage: {
                                                    recall: true,
                                                  },
                                                });
                                              }
                                            }}
                                            className="flex items-center gap-x-2 w-full"
                                          >
                                            <MdReplay size={20} /> Thu hồi
                                          </button>
                                        ),
                                      },
                                      {
                                        label: item?.formAuthor?.userId ===
                                          user?.uid && (
                                          <Popconfirm
                                            placement="bottomRight"
                                            title="Xóa tin nhắn"
                                            description="Tin nhắn này sẽ bị xóa vĩnh viễn. Bạn có chắc chắn xóa?"
                                            onConfirm={async () => {
                                              const washingtonRef = doc(
                                                db,
                                                "chat-rooms",
                                                search.get("chatId"),
                                                "messages",
                                                item?.id
                                              );
                                              await updateDoc(washingtonRef, {
                                                isDelete: arrayUnion({
                                                  user: user?.uid,
                                                }),
                                              });
                                              if (
                                                findRoom?.lastMessage
                                                  ?.messageId === item?.id
                                              ) {
                                                const wRef = doc(
                                                  db,
                                                  "chat-rooms",
                                                  search.get("chatId")
                                                );
                                                await updateDoc(wRef, {
                                                  lastMessage: {
                                                    ...item,
                                                    messageId: item?.id,
                                                    isDelete: arrayUnion({
                                                      user: user?.uid,
                                                    }),
                                                  },
                                                });
                                              }
                                            }}
                                            onCancel={() => {}}
                                            okText="Đồng ý"
                                            cancelText="Hủy bỏ"
                                            style={{
                                              width: 200,
                                            }}
                                          >
                                            <button className="flex items-center gap-x-2 w-full">
                                              <MdDelete size={20} /> Xóa
                                            </button>
                                          </Popconfirm>
                                        ),
                                      },
                                      {
                                        label: (
                                          <button
                                            className="flex items-center gap-x-2 w-full"
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              setChooseQuote(item);
                                            }}
                                          >
                                            <MdReply size={20} /> Trả lời
                                          </button>
                                        ),
                                      },
                                      {
                                        label: (
                                          <button
                                            className="flex items-center gap-x-2 w-full"
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              setMessageForward(item?.text);
                                              setPhotoForward([]);
                                              setFieldForward([]);
                                              setShowForward(true);
                                            }}
                                          >
                                            <IoMdShareAlt size={20} />
                                            Chuyển tiếp
                                          </button>
                                        ),
                                      },
                                    ],
                                  }}
                                >
                                  <HiOutlineDotsHorizontal />
                                </Dropdown>
                              )}

                              <div
                                className={`w-full text-sm ${
                                  item?.formAuthor?.userId === user?.uid
                                    ? "bg-[#e5efff]"
                                    : "bg-white"
                                }  rounded-[10px] px-[10px] py-[20px] ${
                                  item?.recall
                                    ? "text-gray-400"
                                    : "text-gray-900"
                                }`}
                              >
                                {item?.recall ? (
                                  "Tin nhắn đã thu hồi"
                                ) : (
                                  <div>
                                    {item?.reply && (
                                      <div className="">
                                        <Link
                                          href={`#${item?.reply?.id}`}
                                          className="flex w-full"
                                        >
                                          <div className="cursor-pointer px-2  border-l-2 border-l-indigo-800 w-full flex items-center gap-x-2">
                                            {item?.reply?.files?.length > 0 ? (
                                              item?.reply?.files[
                                                item?.reply?.files?.length - 1
                                              ]?.type?.includes("image") ? (
                                                <FaFileImage
                                                  className="text-amber-500"
                                                  size={28}
                                                />
                                              ) : item?.reply?.files[
                                                  item?.reply?.files?.length - 1
                                                ]?.name?.includes("pptx") ? (
                                                <SiMicrosoftpowerpoint
                                                  className="text-rose-700"
                                                  size={28}
                                                />
                                              ) : item?.reply?.files[
                                                  item?.reply?.files?.length - 1
                                                ]?.name?.includes("xlsx") ? (
                                                <FaFileLines
                                                  className="text-green-600"
                                                  size={28}
                                                />
                                              ) : item?.reply?.files[
                                                  item?.reply?.files?.length - 1
                                                ]?.type?.includes("video") ? (
                                                <RiFileVideoFill
                                                  size={28}
                                                  className="text-yellow-300"
                                                />
                                              ) : item?.reply?.files[
                                                  item?.reply?.files?.length - 1
                                                ]?.type?.includes("pdf") ? (
                                                <BiSolidFilePdf
                                                  size={28}
                                                  className="text-rose-500"
                                                />
                                              ) : item?.reply?.files[
                                                  item?.reply?.files?.length - 1
                                                ]?.type?.includes("doc") ? (
                                                <BsFileEarmarkWordFill
                                                  size={28}
                                                  className="text-[#4367A5]"
                                                />
                                              ) : item?.reply?.files[
                                                  item?.reply?.files?.length - 1
                                                ]?.type?.includes(
                                                  "audio/mpeg"
                                                ) ? (
                                                <FaFileAudio
                                                  size={28}
                                                  className="text-purple-600"
                                                />
                                              ) : item?.reply?.files[
                                                  item?.reply?.files?.length - 1
                                                ]?.type?.includes(
                                                  "text/plain"
                                                ) ? (
                                                <BiSolidFileTxt
                                                  size={28}
                                                  className="text-sky-400"
                                                />
                                              ) : (
                                                <FaFile
                                                  size={28}
                                                  className="text-sky-400"
                                                />
                                              )
                                            ) : (
                                              ""
                                            )}
                                            {item?.reply?.photos?.length > 0 ? (
                                              <div>
                                                <Image
                                                  src={item?.reply?.photos[0]}
                                                  width={0}
                                                  height={0}
                                                  className="w-[28px] h-[24px]"
                                                  objectFit="contain"
                                                  sizes="100vw"
                                                />
                                              </div>
                                            ) : (
                                              ""
                                            )}

                                            <div className="w-full">
                                              <div className="font-bold">
                                                {authorReply?.name}
                                              </div>
                                              <div className="mt-1 line-clamp-1 text-xs">
                                                {item?.reply?.text?.length >
                                                  0 && item?.reply?.text}
                                                {item?.reply?.files?.length >
                                                  0 &&
                                                  `${
                                                    sizes.width > 450
                                                      ? item?.reply?.files[
                                                          item?.reply?.files
                                                            ?.length - 1
                                                        ]?.name
                                                      : `${item?.reply?.files[
                                                          item?.reply?.files
                                                            ?.length - 1
                                                        ]?.name?.slice(
                                                          0,
                                                          10
                                                        )}...${
                                                          item?.reply?.files[
                                                            item?.reply?.files
                                                              ?.length - 1
                                                          ]?.name?.length > 5 &&
                                                          item?.reply?.files[
                                                            item?.reply?.files
                                                              ?.length - 1
                                                          ]?.name?.slice(
                                                            item?.reply?.files[
                                                              item?.reply?.files
                                                                ?.length - 1
                                                            ]?.name?.length - 5,
                                                            item?.reply?.files[
                                                              item?.reply?.files
                                                                ?.length - 1
                                                            ]?.name?.length
                                                          )
                                                        }`
                                                  }`}
                                                {item?.reply?.photos?.length >
                                                  0 && "[Hình ảnh]"}
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                      </div>
                                    )}
                                    <div className="mt-1">{item?.text}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div
                              className={`w-fit ${
                                author?.userId === user?.uid && "ml-auto"
                              } text-[10px] text-white px-[8px] py-[0px]  rounded-full font-normal mt-[4px] bg-black bg-opacity-40`}
                            >
                              {moment(item?.createdAt).isBefore(
                                new Date(),
                                "days"
                              )
                                ? `${moment(item?.createdAt).format(
                                    "hh:mm DD/MM/yyyy"
                                  )}`
                                : `${moment(item?.createdAt).format("hh:mm")}`}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              <span ref={scroll}></span>
            </ul>
          </div>
          <div>
            {chooseQuote && (
              <div
                ref={quoteRef}
                className=" px-4 py-2 border-b border-l border-b-gray-300 bg-white flex gap-x-2"
              >
                <Link href={`#${chooseQuote?.id}`} className="flex w-full">
                  <div className="cursor-pointer px-2  border-l-2 border-l-indigo-800 w-full flex items-center gap-x-2">
                    {chooseQuote?.files?.length > 0 ? (
                      chooseQuote?.files[
                        chooseQuote?.files?.length - 1
                      ]?.type?.includes("image") ? (
                        <FaFileImage className="text-amber-500" size={28} />
                      ) : chooseQuote?.files[
                          chooseQuote?.files?.length - 1
                        ]?.name?.includes("pptx") ? (
                        <SiMicrosoftpowerpoint
                          className="text-rose-700"
                          size={28}
                        />
                      ) : chooseQuote?.files[
                          chooseQuote?.files?.length - 1
                        ]?.name?.includes("xlsx") ? (
                        <FaFileLines className="text-green-600" size={28} />
                      ) : chooseQuote?.files[
                          chooseQuote?.files?.length - 1
                        ]?.type?.includes("video") ? (
                        <RiFileVideoFill
                          size={28}
                          className="text-yellow-300"
                        />
                      ) : chooseQuote?.files[
                          chooseQuote?.files?.length - 1
                        ]?.type?.includes("pdf") ? (
                        <BiSolidFilePdf size={28} className="text-rose-500" />
                      ) : chooseQuote?.files[
                          chooseQuote?.files?.length - 1
                        ]?.type?.includes("doc") ? (
                        <BsFileEarmarkWordFill
                          size={28}
                          className="text-[#4367A5]"
                        />
                      ) : chooseQuote?.files[
                          chooseQuote?.files?.length - 1
                        ]?.type?.includes("audio/mpeg") ? (
                        <FaFileAudio size={28} className="text-purple-600" />
                      ) : chooseQuote?.files[
                          chooseQuote?.files?.length - 1
                        ]?.type?.includes("text/plain") ? (
                        <BiSolidFileTxt size={28} className="text-sky-400" />
                      ) : (
                        <FaFile size={28} className="text-sky-400" />
                      )
                    ) : (
                      ""
                    )}
                    {chooseQuote?.photos?.length > 0 ? (
                      <div>
                        <Image
                          src={chooseQuote?.photos[0]}
                          width={0}
                          height={0}
                          className="w-[28px] h-[28px]"
                          objectFit="contain"
                          sizes="100vw"
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="w-full">
                      <div className="font-bold">
                        {
                          authors?.find(
                            (item) =>
                              item?.authorId ===
                              chooseQuote?.formAuthor?.authorId
                          )?.name
                        }
                      </div>
                      <div className="mt-1 line-clamp-1 text-xs">
                        {chooseQuote?.text?.length > 0 && chooseQuote?.text}
                        {chooseQuote?.files?.length > 0 &&
                          `[File] ${
                            sizes.width > 450
                              ? chooseQuote?.files[
                                  chooseQuote?.files?.length - 1
                                ]?.name
                              : `${chooseQuote?.files[
                                  chooseQuote?.files?.length - 1
                                ]?.name?.slice(0, 10)}...${
                                  chooseQuote?.files[
                                    chooseQuote?.files?.length - 1
                                  ]?.name?.length > 5 &&
                                  chooseQuote?.files[
                                    chooseQuote?.files?.length - 1
                                  ]?.name?.slice(
                                    chooseQuote?.files[
                                      chooseQuote?.files?.length - 1
                                    ]?.name?.length - 5,
                                    chooseQuote?.files[
                                      chooseQuote?.files?.length - 1
                                    ]?.name?.length
                                  )
                                }`
                          }`}
                        {chooseQuote?.photos?.length > 0 && "[Hình ảnh]"}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setChooseQuote();
                      }}
                    >
                      <IoMdClose size={20} />
                    </button>
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div
            ref={sendRef}
            className={`bg-white ${""} w-full ${
              sizes.width > 992 ? "" : ""
            } relative z-[888] border-l pb-2`}
          >
            <div className="flex items-center px-4 py-2 gap-x-4 relative">
              <div className="absolute bottom-full">
                <EmojiPicker
                  open={showEmoji}
                  searchDisabled={true}
                  onEmojiClick={(emojiData, e) => {
                    setNewMessage(newMessage + emojiData?.emoji);
                    setShowEmoji(false);
                  }}
                />
              </div>
              <div ref={ref} onClick={() => setShowEmoji(true)}>
                <BsEmojiSmile color="#999" size={sizes.width > 992 ? 30 : 22} />
              </div>
              <button onClick={() => refImg.current?.click()}>
                <IoImageOutline
                  color="#999"
                  size={sizes.width > 992 ? 32 : 24}
                />
              </button>
              <button onClick={() => refVideo.current?.click()}>
                <MdAttachFile color="#999" size={sizes.width > 992 ? 28 : 22} />
              </button>
              <input
                className="hidden"
                onChange={(e) => {
                  handleSendImage(e);
                }}
                type="file"
                accept="image/*"
                ref={refImg}
                multiple
              />
              <input
                className="hidden"
                onChange={(e) => {
                  handleSendVideo(e);
                }}
                type="file"
                ref={refVideo}
                multiple
              />
            </div>
            <div
              className={`flex items-center px-4 border-t border-indigo-600 gap-2 ${
                newMessage.trim().length > 0 && height > 20
                  ? "flex-col"
                  : "flex-row"
              }`}
            >
              <div className="w-full">
                <Textarea
                  ref={textareaRef}
                  minRows={1}
                  maxRows={4}
                  value={newMessage}
                  onChange={(event) => {
                    setNewMessage(event.target.value);
                  }}
                  // onFocus={() => {
                  //   setHeight(textareaRef.current?.height);
                  // }}
                  placeholder={`Nhắn tin tới ${userRecieved?.name}`}
                  className={`px-0 ${
                    sizes.width > 992
                      ? "placeholder:text-lg text-lg"
                      : "placeholder:text-sm text-sm sm:placeholder:text-base sm:text-base"
                  } w-full border-none bg-white focus-visible:border-none  focus-visible:shadow-none focus-visible:outline-none focus:border-none focus:shadow-none focus:outline-none`}
                  style={{
                    resize: "none",
                    boxShadow: "none",
                    background: "white",
                  }}
                />
              </div>
              <div className="ml-auto flex justify-end">
                {newMessage.trim() !== "" ? (
                  <button
                    onClick={async (event) => {
                      event.preventDefault();
                      // if (newMessage.trim() === "") {
                      //   message.error("Bạn chưa nhập nội dung hoặc ");
                      //   return;
                      // }
                      const myAuthor = authors?.find(
                        (x) => x?.userId === user?.uid
                      );
                      let dataItem = {
                        text: newMessage,
                        photos,
                        files: [],
                        createdAt: serverTimestamp(),
                        formAuthor: myAuthor,
                        recall: false,
                        read: false,
                        reply: chooseQuote || null,
                      };
                      if (myMessage?.length > 0) {
                        await addDoc(
                          collection(
                            db,
                            "chat-rooms",
                            search.get("chatId"),
                            "messages"
                          ),
                          dataItem
                        ).then(async (data) => {
                          const washingtonRef = doc(
                            db,
                            "chat-rooms",
                            search.get("chatId")
                          );
                          await updateDoc(washingtonRef, {
                            lastMessage: {
                              messageId: data?.id,
                              ...dataItem,
                            },
                            new: true,
                            lastMessagesCount: findRoom?.lastMessagesCount
                              ? findRoom?.lastMessagesCount + 1
                              : 1,
                            isDelete: deleteField(),
                            createdAt: serverTimestamp(),
                          });
                        });

                        setChooseQuote();
                      } else {
                        await addDoc(collection(db, "chat-rooms"), {
                          member: [userRecieved, myAuthor],
                          createdAt: serverTimestamp(),
                        }).then(async (data) => {
                          await addDoc(
                            collection(
                              db,
                              "chat-rooms",
                              `${data?.id}`,
                              "messages"
                            ),
                            dataItem
                          ).then(async (dataMessage) => {
                            const washingtonRef = doc(
                              db,
                              "chat-rooms",
                              `${data?.id}`
                            );
                            await updateDoc(washingtonRef, {
                              lastMessage: {
                                messageId: dataMessage?.id,
                                ...dataItem,
                              },
                              new: true,
                              isDelete: deleteField(),
                              lastMessagesCount: 1,
                              createdAt: serverTimestamp(),
                            });
                          });
                          router.push(`/chat?chatId=${data?.id}`);
                          setChooseQuote();
                        });
                      }
                      setNewMessage("");
                      setPhotos([]);
                      scroll.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`text-[#0084ff] w-fit ${
                      sizes.width > 992 ? "text-[20px]" : "text-base"
                    }  `}
                  >
                    <IoSend />
                  </button>
                ) : (
                  <button
                    className={`text-[#0084ff] w-fit text-opacity-60 ${
                      sizes.width > 992 ? "text-[20px]" : "text-base"
                    } cursor-not-allowed`}
                  >
                    <IoSend />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-full w-full flex justify-center items-center text-base">
          Danh tin nhắn đang trống
        </div>
      )}
      <ModalWating openModal={showWatting} setOpenModal={setShowWating} />
      <ModalImageZoom
        imageList={imageList}
        index={indexImage}
        openImage={openImage}
        setOpenImage={setOpenImage}
        type={type}
      />
      <ModalForwardMessage
        authors={authors}
        onCallback={() => {}}
        visible={showForward}
        onCancel={() => setShowForward(false)}
        messageForward={messageForward}
        photForward={photoForward}
        fileForward={fileForward}
        listmessage={messages}
      />
      <ModalNickame
        visible={editName}
        onCancel={() => setEditName(false)}
        nameActive={nameActive}
        setNameActive={setNameActive}
        myAuthor={myAuthor}
        userRecieved={userRecieved}
        chatId={search.get("chatId")}
        userId={user?.uid}
        friendList={friendList}
      />
    </div>
  );
}
