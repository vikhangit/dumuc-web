"use client";
import { useWindowSize } from "@hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal, HiVideoCamera } from "react-icons/hi";
import { IoIosCall, IoMdClose, IoMdShareAlt } from "react-icons/io";
import { IoChevronBackOutline, IoImageOutline, IoSend } from "react-icons/io5";
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
} from "firebase/firestore";
import { uploadImage } from "@apis/other";
import ModalWating from "@components/Dumuc/ModalWating";
import { message } from "antd";
const ModalImageZoom = dynamic(
  () => {
    return import("@components/ModalImageZoom");
  },
  { ssr: false }
);
import { MdAttachFile, MdReplay, MdReply } from "react-icons/md";
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

export default function ChatRight({
  userRecieved,
  setUserRecieved,
  mobile,
  setMobile,
  messages,
  authors,
}) {
  const router = useRouter();
  const search = useSearchParams();
  const [user] = useAuthState(auth);
  const [usingUser, setUsingUser] = useState();
  const [friendList, setFriendList] = useState([]);
  const refImg = useRef();
  const refVideo = useRef();
  const scroll = useRef();
  const sizes = useWindowSize();
  const [newMessage, setNewMessage] = useState("");
  const [showWatting, setShowWating] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [myMessage, setMyMessage] = useState([]);
  const [userTo, setUserTo] = useState();
  const [showEmoji, setShowEmoji] = useState(false);
  const [chooseEmoji, setChooseEmoji] = useState("");
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
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [search, myMessage]);
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
      setFriendList(dataCall?.friendList);
    });
  }, [user]);
  useEffect(() => {
    setHeight(textareaRef.current?.offsetHeight);
    setSendHeight(sendRef.current?.offsetHeight);
    setaddFriendHeight(addFriend.current ? addFriend.current?.offsetHeight : 0);
    setQuoteHeight(quoteRef.current ? quoteRef.current?.offsetHeight : 0);
  });
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
        setMyMessage(allMess);
      });
      return () => unsubscribe;
    } else {
      setMyMessage([]);
    }
  }, [search]);
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
    } else {
      setUserTo(userRecieved);
    }
  }, [messages, search, userRecieved, user]);
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
              if (myMessage.length > 0) {
                await addDoc(
                  collection(
                    db,
                    "chat-rooms",
                    search.get("chatId"),
                    "messages"
                  ),
                  {
                    text: newMessage,
                    photos: newPhoto,
                    files: [],
                    createdAt: serverTimestamp(),
                    formAuthor: myAuthor,
                    recall: false,
                  }
                );
              } else {
                await addDoc(collection(db, "chat-rooms"), {
                  member: [userRecieved, myAuthor],
                  createdAt: serverTimestamp(),
                }).then(async (data) => {
                  await addDoc(
                    collection(db, "chat-rooms", `${data?.id}`, "messages"),
                    {
                      text: newMessage,
                      photos: newPhoto,
                      files: [],
                      createdAt: serverTimestamp(),
                      formAuthor: myAuthor,
                      recall: false,
                    }
                  );
                  router.push(`/chat?chatId=${data.id}`);
                });
              }
              setNewMessage("");
              setPhotos([]);
              setUserRecieved();
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
                  await addDoc(
                    collection(
                      db,
                      "chat-rooms",
                      search.get("chatId"),
                      "messages"
                    ),
                    {
                      text: newMessage,
                      photos,
                      files: [x],
                      createdAt: serverTimestamp(),
                      formAuthor: myAuthor,
                    }
                  );
                });
              } else {
                newPhoto.map(async (x) => {
                  await addDoc(collection(db, "chat-rooms"), {
                    member: [userRecieved, myAuthor],
                    createdAt: serverTimestamp(),
                  }).then(async (data) => {
                    await addDoc(
                      collection(db, "chat-rooms", `${data?.id}`, "messages"),
                      {
                        text: newMessage,
                        photos,
                        files: [x],
                        createdAt: serverTimestamp(),
                        formAuthor: myAuthor,
                      }
                    );
                    router.push(`/chat?chatId=${data.id}`);
                  });
                });
              }
              setNewMessage("");
              setUserRecieved();
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
  return (
    <div
      className={`h-full  ${
        sizes.width > 992 ? "basis-2/3" : `${mobile ? "basis-full" : "hidden"}`
      }`}
    >
      <div className="h-[75px] flex justify-between items-center px-[15px] pl-[0px] sm:px-[20px] border-b border-gray-300">
        {userTo && (
          <>
            <div className="flex items-center gap-x-2 sm:gap-x-4">
              <button
                className={`${sizes.width > 992 ? "hidden" : ""}`}
                onClick={() => {
                  setMobile(false);
                  setNewMessage("");
                  router.push("/chat");
                }}
              >
                <IoChevronBackOutline size={32} />
              </button>
              <Image
                src={
                  userTo &&
                  userTo?.user?.photo &&
                  userTo?.user?.photo?.length > 0
                    ? userTo?.user?.photo
                    : "/dumuc/avatar.png"
                }
                onClick={() => {
                  router.push(`/author/${userTo?.slug}/${userTo?.authorId}`);
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
                  className="text-base font-semibold cursor-pointer"
                  onClick={() => {
                    router.push(`/author/${userTo?.slug}/${userTo?.authorId}`);
                  }}
                >
                  {userTo?.name}
                </div>
                {/* <p className='text-sm'>Đang hoạt động</p> */}
              </div>
            </div>
            <div className="flex items-center gap-x-3 pr-0 sm:pr-5">
              <IoIosCall color="#0084ff" size={28} />
              <HiVideoCamera color="#0084ff" size={28} />
            </div>
          </>
        )}
      </div>
      {userTo &&
        (!friendList?.find((x) => x?.authorId === userTo?.authorId) ||
          friendList?.find(
            (x) => x?.authorId === userTo?.authorId && x?.status === 1
          )) && (
          <div
            ref={addFriend}
            className="flex justify-between items-center px-[15px]  sm:px-[20px] border-b py-2 border-gray-300"
          >
            <div>
              {friendList?.find(
                (item) =>
                  item?.type === "recieve" &&
                  item?.authorId === userTo?.authorId &&
                  item?.status === 1
              )
                ? "Đã gửi"
                : "Gửi"}{" "}
              lời mời kết bạn
            </div>
            <div className="flex items-center gap-x-2">
              {usingUser?.friendList?.length > 0 ? (
                usingUser?.friendList?.map((item, index) => {
                  if (
                    item?.type === "send" &&
                    item?.authorId === userTo?.authorId &&
                    item?.status === 1
                  ) {
                    return loadingAdd ? (
                      <button
                        key={index}
                        onClick={async () => {
                          message.warning("Thao tác đang được thực hiện.");
                        }}
                        type="button"
                        class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        <Spinner className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        key={index}
                        onClick={async () => {
                          setLoadingAdd(true);
                          await deleteAddFriend(
                            {
                              authorId: userTo?.authorId,
                            },
                            user?.accessToken
                          ).then(async (result) => {
                            //update recoil
                            await deleteRecieveFriend(
                              {
                                authorUserId: userTo?.userId,
                              },
                              user?.accessToken
                            )
                              .then((e) => console.log(e))
                              .catch((e) => console.log(e));
                            const dataCall = await getProfile(
                              user?.accessToken
                            );
                            setUsingUser(dataCall);
                            message.success("Đã hủy kết bạn.");
                            setLoadingAdd(false);
                          });
                        }}
                        type="button"
                        class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        Hủy lời mời
                      </button>
                    );
                  } else if (
                    item?.type === "recieve" &&
                    item?.authorId === userTo?.authorId &&
                    item?.status === 1
                  ) {
                    return loadingAdd ? (
                      <button
                        key={index}
                        onClick={async () => {
                          message.warning("Thao tác đang được thực hiện.");
                        }}
                        type="button"
                        class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        <Spinner className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        key={index}
                        onClick={async () => {
                          setLoadingAdd(true);
                          await deleteAddFriend(
                            {
                              authorId: userTo?.authorId,
                            },
                            user?.accessToken
                          ).then(async (result) => {
                            //update recoil
                            await deleteRecieveFriend(
                              {
                                authorUserId: x?.userId,
                              },
                              user?.accessToken
                            )
                              .then((e) => console.log(e))
                              .catch((e) => console.log(e));
                          });
                          await sendRequestAddFriend(
                            {
                              authorId: userTo?.authorId,
                              status: 2,
                            },
                            user?.accessToken
                          ).then(async (result) => {
                            await receiveRequestAddFriend(
                              {
                                authorUserId: x?.userId,
                                status: 2,
                              },
                              user?.accessToken
                            )
                              .then((e) => console.log(e))
                              .catch((e) => console.log(e));
                          });

                          await getProfile(user?.accessToken).then((dataCall) =>
                            setUsingUser(dataCall)
                          );

                          setLoadingAdd(false);
                        }}
                        type="button"
                        class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                      >
                        Đồng ý
                      </button>
                    );
                  }
                })
              ) : (
                <div></div>
              )}
              {usingUser?.friendList?.length > 0 &&
                !usingUser?.friendList?.find(
                  (y) => y?.authorId === userTo?.authorId
                ) &&
                (loadingAdd ? (
                  <button
                    onClick={async () => {
                      message.warning("Thao tác đang thực hiện");
                    }}
                    type="button"
                    class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    {<Spinner className="w-4 h-4" />}
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      setLoadingAdd(true);
                      await sendRequestAddFriend(
                        {
                          authorId: userTo?.authorId,
                        },
                        user?.accessToken
                      ).then(async (result) => {
                        await receiveRequestAddFriend(
                          {
                            authorUserId: userTo?.userId,
                          },
                          user?.accessToken
                        )
                          .then((e) => console.log(e))
                          .catch((e) => console.log(e));
                      });

                      await getProfile(user?.accessToken).then((dataCall) =>
                        setUsingUser(dataCall)
                      );

                      setLoadingAdd(false);
                      message.success("Đã gữi yêu cầu kết bạn.");
                    }}
                    type="button"
                    class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    {loadingAdd ? (
                      <Spinner className="w-4 h-4" />
                    ) : (
                      <>Kết bạn</>
                    )}
                  </button>
                ))}
              {usingUser?.friendList?.length === 0 &&
                (loadingAdd ? (
                  <button
                    onClick={async () => {
                      message.warning("Thao tác đang được thực hiện");
                    }}
                    type="button"
                    class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    {<Spinner className="w-4 h-4" />}
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      setLoadingAdd(true);
                      await sendRequestAddFriend(
                        {
                          authorId: userTo?.authorId,
                        },
                        user?.accessToken
                      ).then(async (result) => {
                        await receiveRequestAddFriend(
                          {
                            authorUserId: userTo?.userId,
                          },
                          user?.accessToken
                        )
                          .then((e) => console.log(e))
                          .catch((e) => console.log(e));
                      });

                      await getProfile(user?.accessToken).then((dataCall) =>
                        setUsingUser(dataCall)
                      );

                      setLoadingAdd(false);
                      message.success("Đã gữi yêu cầu kết bạn.");
                    }}
                    type="button"
                    class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    {loadingAdd ? (
                      <Spinner className="w-4 h-4" />
                    ) : (
                      <>Kết bạn</>
                    )}
                  </button>
                ))}
            </div>
          </div>
        )}
      {userTo ? (
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
                    myMessage?.findIndex(
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

                  return (
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
                            : "/dumuc/avatar.png"
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
                                      <HiOutlineDotsHorizontal />
                                      <div
                                        className={`absolute z-[9999] hidden group-hover:flex flex-col justify-start items-start top-full ${
                                          item?.formAuthor?.userId === user?.uid
                                            ? "left-0"
                                            : "right-0"
                                        } bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1`}
                                      >
                                        {item?.formAuthor?.userId ===
                                          user?.uid && (
                                          <Link
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
                                            }}
                                            className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left flex items-center gap-x-2 text-black`}
                                          >
                                            <MdReplay size={20} /> Thu hồi
                                          </Link>
                                        )}
                                        <Link
                                          href={``}
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            setChooseQuote(item);
                                          }}
                                          className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left  flex items-center gap-x-2 text-black`}
                                        >
                                          <MdReply size={20} /> Trả lời
                                        </Link>
                                        <Link
                                          href={``}
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            setPhotoForward(item?.photos);
                                            setMessageForward("");
                                            setFieldForward([]);
                                            setShowForward(true);
                                          }}
                                          className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left  flex items-center gap-x-2 text-black`}
                                        >
                                          <IoMdShareAlt size={20} />
                                          Chuyển tiếp
                                        </Link>
                                      </div>
                                    </button>
                                  )}
                                {item?.photos?.map((photo, indexC) => {
                                  return (
                                    <div
                                      key={indexC}
                                      className={`rounded-md h-full relative w-1/2 sm:w-1/3 2xl:w-1/4 `}
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
                                {item?.formAuthor?.userId !== user?.uid &&
                                  !item?.recall && (
                                    <button className="relative group w-fit mr-1">
                                      <HiOutlineDotsHorizontal />
                                      <div
                                        className={`absolute z-[9999] hidden group-hover:flex flex-col justify-start items-start top-full ${
                                          item?.formAuthor?.userId === user?.uid
                                            ? "left-0"
                                            : "right-0"
                                        } bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1`}
                                      >
                                        {item?.formAuthor?.userId ===
                                          user?.uid && (
                                          <Link
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
                                              console.log(
                                                moment(item?.createdAt).isAfter(
                                                  new Date()
                                                )
                                              );
                                            }}
                                            className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left flex items-center gap-x-2 text-black`}
                                          >
                                            <MdReplay size={20} /> Thu hồi
                                          </Link>
                                        )}
                                        <Link
                                          href={``}
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            setChooseQuote(item);
                                          }}
                                          className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left  flex items-center gap-x-2 text-black`}
                                        >
                                          <MdReply size={20} /> Trả lời
                                        </Link>
                                        <Link
                                          href={``}
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            setPhotoForward(item?.photos);
                                            setMessageForward("");
                                            setFieldForward([]);
                                            setShowForward(true);
                                          }}
                                          className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left  flex items-center gap-x-2 text-black`}
                                        >
                                          <IoMdShareAlt size={20} />
                                          Chuyển tiếp
                                        </Link>
                                      </div>
                                    </button>
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
                                <button className="relative group w-fit  pt-[40px]">
                                  <HiOutlineDotsHorizontal />
                                  <div
                                    className={`absolute z-[9999] hidden group-hover:flex flex-col justify-start items-start top-full ${
                                      item?.formAuthor?.userId === user?.uid
                                        ? "left-0"
                                        : "right-0"
                                    } bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1`}
                                  >
                                    {item?.formAuthor?.userId === user?.uid && (
                                      <Link
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
                                          console.log(
                                            moment(item?.createdAt).isAfter(
                                              new Date()
                                            )
                                          );
                                        }}
                                        className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left flex items-center gap-x-2 text-black`}
                                      >
                                        <MdReplay size={20} /> Thu hồi
                                      </Link>
                                    )}
                                    <Link
                                      href={``}
                                      onClick={async (e) => {
                                        e.preventDefault();
                                        setChooseQuote(item);
                                      }}
                                      className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left  flex items-center gap-x-2 text-black`}
                                    >
                                      <MdReply size={20} /> Trả lời
                                    </Link>
                                    <Link
                                      href={``}
                                      onClick={async (e) => {
                                        e.preventDefault();
                                        setFieldForward(item?.files);
                                        setMessageForward("");
                                        setPhotoForward([]);
                                        setShowForward(true);
                                      }}
                                      className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left  flex items-center gap-x-2 text-black`}
                                    >
                                      <IoMdShareAlt size={20} />
                                      Chuyển tiếp
                                    </Link>
                                  </div>
                                </button>
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
                                <button className="relative group w-fit">
                                  <HiOutlineDotsHorizontal />
                                  <div
                                    className={`absolute z-[9999] hidden group-hover:flex flex-col justify-start items-start top-full ${
                                      item?.formAuthor?.userId === user?.uid
                                        ? "left-0"
                                        : "right-0"
                                    } bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1`}
                                  >
                                    {item?.formAuthor?.userId === user?.uid && (
                                      <Link
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
                                          console.log(
                                            moment(item?.createdAt).isAfter(
                                              new Date()
                                            )
                                          );
                                        }}
                                        className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left flex items-center gap-x-2 text-black`}
                                      >
                                        <MdReplay size={20} /> Thu hồi
                                      </Link>
                                    )}
                                    <Link
                                      href={``}
                                      onClick={async (e) => {
                                        e.preventDefault();
                                        setChooseQuote(item);
                                      }}
                                      className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left  flex items-center gap-x-2 text-black`}
                                    >
                                      <MdReply size={20} /> Trả lời
                                    </Link>
                                    <Link
                                      href={``}
                                      onClick={async (e) => {
                                        e.preventDefault();
                                        setMessageForward(item?.text);
                                        setPhotoForward([]);
                                        setFieldForward([]);
                                        setShowForward(true);
                                      }}
                                      className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left  flex items-center gap-x-2 text-black`}
                                    >
                                      <IoMdShareAlt size={20} />
                                      Chuyển tiếp
                                    </Link>
                                  </div>
                                </button>
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
            } relative border-l pb-2`}
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
                  placeholder={`Nhắn tin tới ${userTo?.name}`}
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
                      if (myMessage.length > 0) {
                        await addDoc(
                          collection(
                            db,
                            "chat-rooms",
                            search.get("chatId"),
                            "messages"
                          ),
                          {
                            text: newMessage,
                            photos,
                            files: [],
                            createdAt: serverTimestamp(),
                            formAuthor: myAuthor,
                            recall: false,
                            reply: chooseQuote || null,
                          }
                        );
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
                            {
                              text: newMessage,
                              photos,
                              files: [],
                              createdAt: serverTimestamp(),
                              formAuthor: myAuthor,
                              recall: false,
                              reply: chooseQuote || null,
                            }
                          );
                          setChooseQuote();
                          router.push(`/chat?chatId=${data?.id}`);
                        });
                      }
                      setNewMessage("");
                      setPhotos([]);
                      setUserRecieved();
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
    </div>
  );
}
