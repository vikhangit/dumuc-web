"use client";
import { useWindowSize } from "@hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoMdClose, IoMdPersonAdd, IoMdShareAlt } from "react-icons/io";
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
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import { uploadImage } from "@apis/other";
import ModalWating from "@components/Dumuc/ModalWating";
import { Dropdown, Popconfirm, message } from "antd";
const ModalImageZoom = dynamic(
  () => {
    return import("@components/ModalImageZoom");
  },
  { ssr: false }
);
import {
  MdAttachFile,
  MdDelete,
  MdDeleteForever,
  MdPlaylistRemove,
  MdReplay,
  MdReply,
} from "react-icons/md";
import {
  FaCheck,
  FaFile,
  FaFileAudio,
  FaFileImage,
  FaFileLines,
} from "react-icons/fa6";
import { BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { BsEmojiSmile, BsFileEarmarkWordFill } from "react-icons/bs";
import { SiMicrosoftpowerpoint } from "react-icons/si";
import ModalAbout from "./ModalAbout";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { getTimeChat } from "@utils/dateFormat";
import { HiOutlineDotsHorizontal, HiPencil } from "react-icons/hi";
import { Textarea } from "@nextui-org/input";
import EmojiPicker from "emoji-picker-react";
import moment from "moment";
import ModalAddMember from "./ModalAddMember";
import ModalAddLeader from "./ModalAddLeader";
import { CiUser } from "react-icons/ci";

export default function ChatGroupRight({
  userRecieved,
  setUserRecieved,
  mobile,
  setMobile,
  messages,
  authors,
  activeGroup,
  setActiveGroup,
  // user,
  // usingUser,
}) {
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const router = useRouter();
  const search = useSearchParams();
  const refImg = useRef();
  const refVideo = useRef();
  const scroll = useRef();
  const sizes = useWindowSize();
  const [newMessage, setNewMessage] = useState("");
  const [showWatting, setShowWating] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [myMessage, setMyMessage] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [showModalLeader, setShowModalLeader] = useState(false);
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
  const [showEmoji, setShowEmoji] = useState(false);
  const [chooseEmoji, setChooseEmoji] = useState("");
  const [chooseQuote, setChooseQuote] = useState();
  const ref = useRef(null);
  const [groupTo, setGroupTo] = useState(() => {
    if (search.get("groupId")) {
      const chatDetail = messages?.find((x) => x?.id === search.get("groupId"));
      return chatDetail;
    }
  });
  useEffect(() => {
    setHeight(textareaRef.current?.offsetHeight);
    setSendHeight(sendRef.current?.offsetHeight);
    setaddFriendHeight(addFriend.current ? addFriend.current?.offsetHeight : 0);
    setQuoteHeight(quoteRef.current ? quoteRef.current?.offsetHeight : 0);
  });
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
  const read = async () => {
    if (groupTo?.lastMessage?.formAuthor?.userId !== userId) {
      const washingtonRef = doc(db, "chat-groups", groupTo?.id);
      await updateDoc(washingtonRef, {
        new: false,
        lastMessagesCount: deleteField(),
      });
    }
  };
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
    if (groupTo) {
      read();
    }
  });
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
        setMyMessage(allMess);
      });

      return () => unsubscribe;
    } else {
      setMyMessage([]);
    }
  }, [search]);

  useEffect(() => {
    if (search.get("groupId")) {
      const chatDetail = messages?.find((x) => x?.id === search.get("groupId"));
      // const myGroup = chatDetail?.member?.find((x) => x?.user === userId);
      setGroupTo(chatDetail);
    }
  }, [messages, search]);
  const handleSendImage = async (e) => {
    setShowWating(true);
    if (e?.target?.files) {
      let array = [];
      for (let index = 0; index < e?.target?.files?.length; index++) {
        array.push(e?.target?.files[index]);
      }
      let newPhoto = [];
      array.map((x) => {
        uploadImage(x, userToken)
          .then(async (data) => {
            newPhoto.push(data?.url);
            if (newPhoto.length === array.length) {
              const myAuthor = authors?.find((x) => x?.userId === userId);
              const find = messages?.find(
                (x) => x?.id === search.get("groupId")
              );
              let dataItem = {
                text: newMessage,
                photos: newPhoto,
                files: [],
                createdAt: serverTimestamp(),
                formAuthor: myAuthor,
                recall: false,
              };
              await addDoc(
                collection(
                  db,
                  "chat-groups",
                  search.get("groupId"),
                  "messages"
                ),
                dataItem
              ).then(async (data) => {
                const washingtonRef = doc(
                  db,
                  "chat-groups",
                  search.get("groupId")
                );
                await updateDoc(washingtonRef, {
                  lastMessage: {
                    messageId: data?.id,
                    ...dataItem,
                    text: "[Hình ảnh]",
                  },
                  new: true,
                  lastMessagesCount: find?.lastMessagesCount
                    ? find?.lastMessagesCount + 1
                    : 1,
                  isDelete: deleteField(),
                  createdAt: serverTimestamp(),
                });
              });
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
        uploadImage(x, userToken)
          .then(async (data) => {
            newPhoto.push({
              url: data?.url,
              name: x?.name,
              type: x?.type,
            });
            if (newPhoto.length === array.length) {
              const myAuthor = authors?.find((x) => x?.userId === userId);
              const find = messages?.find(
                (x) => x?.id === search.get("groupId")
              );
              newPhoto?.map(async (x) => {
                let dataItem = {
                  text: newMessage,
                  photos,
                  files: [x],
                  createdAt: serverTimestamp(),
                  formAuthor: myAuthor,
                  recall: false,
                };
                await addDoc(
                  collection(
                    db,
                    "chat-groups",
                    search.get("groupId"),
                    "messages"
                  ),
                  dataItem
                ).then(async (data) => {
                  const washingtonRef = doc(
                    db,
                    "chat-groups",
                    search.get("groupId")
                  );
                  await updateDoc(washingtonRef, {
                    lastMessage: {
                      messageId: data?.id,
                      ...dataItem,
                      text: "[File]",
                    },
                    new: true,
                    isDelete: deleteField(),
                    lastMessagesCount: find?.lastMessagesCount
                      ? find?.lastMessagesCount + 1
                      : 1,
                    createdAt: serverTimestamp(),
                  });
                });
              });

              setNewMessage("");
              scroll.current?.scrollIntoView({ behavior: "smooth" });
            }
            setShowWating(false);
          })
          .catch((err) => {
            setShowWating(false);
          });
      });
    }
  };
  const [openImage, setOpenImage] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [indexImage, setIndexImage] = useState(0);
  const [type, setType] = useState("image");
  const [showModalAddMember, setShowModalAddMember] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [typeAbout, setTypeAbout] = useState("about");
  const [activeMultipleDelete, setActiveMultipleDelete] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  return (
    <div
      className={`h-full ${
        sizes.width > 992 ? "basis-2/3" : `${mobile ? "basis-full" : "hidden"}`
      }`}
    >
      <div className="h-[75px] flex justify-between items-center px-[15px] pl-[0px] sm:px-[20px] border-b border-gray-300">
        {groupTo && (
          <>
            <div className="flex items-center gap-x-2 sm:gap-x-4">
              <button
                className={`${sizes.width > 992 ? "hidden" : ""}`}
                onClick={() => {
                  setMobile(false);
                  router.push("/chat/group-public");
                }}
              >
                <IoChevronBackOutline size={32} />
              </button>
              <Image
                src={
                  groupTo?.avatar?.length > 0 && groupTo?.avatar?.length > 0
                    ? groupTo?.avatar
                    : "/dumuc/avatar.jpg"
                }
                width={0}
                height={0}
                sizes="100vw"
                className="w-[45px] h-[45px] rounded-full"
              />
              <div>
                <Link href="" className="text-base font-semibold">
                  {groupTo?.name}
                </Link>
                <p className="text-xs flex gap-x-1 items-center">
                  <CiUser size={14} />
                  {groupTo?.member?.length} thành viên
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3 pr-0 sm:pr-5">
              {groupTo?.member?.find((x) => x?.user === userId) && (
                <IoMdPersonAdd
                  color="#0084ff"
                  size={24}
                  onClick={() => setShowModalAddMember(true)}
                />
              )}
              <Dropdown
                placement="bottomRight"
                menu={{
                  items: [
                    {
                      label: (
                        <Link
                          href={``}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenAbout(true);
                            setTypeAbout("about");
                          }}
                          className={`w-full`}
                        >
                          Thông tin nhóm
                        </Link>
                      ),
                      key: "0",
                    },
                    {
                      label: (
                        <Link
                          href={``}
                          onClick={async (e) => {
                            e.preventDefault();
                            setOpenAbout(true);
                            setTypeAbout("member");
                          }}
                          className={`w-full`}
                        >
                          Xem thành viên
                        </Link>
                      ),
                      disabled: groupTo?.member?.find((x) => x?.user === userId)
                        ? false
                        : true,
                      key: "1",
                    },
                    {
                      label: (
                        <Popconfirm
                          placement="bottomRight"
                          title="Xóa tin nhắn"
                          description="Toàn bộ tin nhắn ở phía sẽ bị xóa vĩnh viễn các thành viên khác vẫn sẽ  thấy. Bạn có chắc chắn xóa?"
                          onConfirm={async () => {
                            myMessage?.map(async (x) => {
                              const washingtonRef = doc(
                                db,
                                "chat-groups",
                                groupTo?.id,
                                "messages",
                                x?.id
                              );
                              await updateDoc(washingtonRef, {
                                isDelete: arrayUnion({
                                  user: userId,
                                }),
                              });
                            });
                            const groupRef = doc(
                              db,
                              "chat-groups",
                              groupTo?.id
                            );
                            await updateDoc(groupRef, {
                              isDelete: arrayUnion({
                                user: userId,
                              }),
                            });
                            message.success("Đã xóa tin nhắn thành công!!");
                          }}
                          onCancel={() => {}}
                          okText="Đồng ý"
                          cancelText="Hủy bỏ"
                          style={{
                            width: 200,
                          }}
                        >
                          <button className="w-full flex">Xóa tin nhắn</button>
                        </Popconfirm>
                      ),

                      disabled: groupTo?.member?.find((x) => x?.user === userId)
                        ? false
                        : true,
                      key: "2",
                    },
                    {
                      label: (
                        <Popconfirm
                          placement="bottomRight"
                          title="Chuyển đổi nhóm"
                          description="Bạn có chắc chắn chuyển đổi nhóm thành nhóm riêng tư không?"
                          onConfirm={async () => {
                            const cityRef = doc(db, "chat-groups", groupTo?.id);
                            await updateDoc(cityRef, {
                              isPrivate: true,
                            }).then(async () => {
                              await addDoc(
                                collection(
                                  db,
                                  "chat-groups",
                                  search.get("groupId"),
                                  "messages"
                                ),
                                {
                                  type: "change",
                                  notify: true,
                                  user: userId,
                                  text: "đã đổi nhóm thành nhóm riêng tư",
                                  createdAt: serverTimestamp(),
                                }
                              ).then(() => {
                                message.success(
                                  "Đã chuyển nhóm thành nhóm riêng tư thành công"
                                );

                                router.push(
                                  `/chat/group?groupId=${groupTo?.id}`
                                );
                              });
                            });
                          }}
                          onCancel={() => {}}
                          okText="Đồng ý"
                          cancelText="Hủy bỏ"
                          style={{
                            width: 200,
                          }}
                        >
                          <button className="w-full flex">
                            Chuyển nhóm thành riêng tư
                          </button>
                        </Popconfirm>
                      ),
                      disabled: groupTo?.leader === userId ? false : true,
                      key: "3",
                    },
                    {
                      disabled:
                        groupTo?.leader === userId ||
                        groupTo?.deputyLeader === userId
                          ? false
                          : true,
                      label: (
                        <Link
                          href={``}
                          onClick={async (e) => {
                            e.preventDefault();
                            setOpenAbout(true);
                            setTypeAbout("request");
                          }}
                          className={` w-full flex item-cemter justify-between`}
                        >
                          Yêu cầu tham gia nhóm
                          <div className="bg-[#C82027]  text-white w-[12px] h-[12px] rounded-full flex justify-center items-center text-[10px] font-semibold">
                            {groupTo?.requestList
                              ? groupTo?.requestList?.length
                              : "0"}
                          </div>
                        </Link>
                      ),
                      key: "4",
                    },
                    {
                      label: (
                        <Popconfirm
                          placement="bottomRight"
                          title="Xác nhận rời nhóm"
                          description={`Bạn có chắc chắn khỏi nhóm nhóm không?`}
                          onConfirm={async () => {
                            const washingtonRef = doc(
                              db,
                              "chat-groups",
                              groupTo?.id
                            );
                            if (groupTo?.leader === userId) {
                              if (
                                groupTo?.deputyLeader !== "" &&
                                groupTo?.deputyLeader?.length > 0
                              ) {
                                await updateDoc(washingtonRef, {
                                  member: arrayRemove(
                                    groupTo?.member?.find(
                                      (x) => x?.user === userId
                                    )
                                  ),
                                })
                                  .then(async (result) => {
                                    await updateDoc(washingtonRef, {
                                      leader: groupTo?.deputyLeader,
                                      deputyLeader: "",
                                      createdAt: serverTimestamp(),
                                    });
                                    await addDoc(
                                      collection(
                                        db,
                                        "chat-groups",
                                        search.get("groupId"),
                                        "messages"
                                      ),
                                      {
                                        type: "exit",
                                        notify: true,
                                        user: userId,
                                        createdAt: serverTimestamp(),
                                      }
                                    );
                                    await addDoc(
                                      collection(
                                        db,
                                        "chat-groups",
                                        search.get("groupId"),
                                        "messages"
                                      ),
                                      {
                                        type: "leader",
                                        notify: true,
                                        user: groupTo?.deputyLeader,
                                        createdAt: serverTimestamp(),
                                      }
                                    );
                                    message.success(
                                      "Bạn đã rời khỏi nhóm thành công"
                                    );
                                    setGroupTo();
                                    router.push("/chat/group");
                                  })
                                  .catch((err) => {
                                    message.error(
                                      "Bạn đã rời khỏi nhóm thất bại"
                                    );
                                  });
                              } else {
                                setShowModalLeader(true);
                              }
                            } else {
                              await updateDoc(washingtonRef, {
                                member: arrayRemove(
                                  groupTo?.member?.find(
                                    (x) => x?.user === userId
                                  )
                                ),
                                createdAt: serverTimestamp(),
                              })
                                .then(async (result) => {
                                  if (userId === groupTo?.deputyLeader) {
                                    await updateDoc(washingtonRef, {
                                      deputyLeader: "",
                                      createdAt: serverTimestamp(),
                                    });
                                  }
                                  await addDoc(
                                    collection(
                                      db,
                                      "chat-groups",
                                      search.get("groupId"),
                                      "messages"
                                    ),
                                    {
                                      type: "exit",
                                      notify: true,
                                      user: userId,
                                      createdAt: serverTimestamp(),
                                    }
                                  );
                                  message.success("Rời khỏi nhóm thành công");
                                  setGroupTo();
                                  router.push("/chat/group-public");
                                })
                                .catch((err) => {});
                            }
                          }}
                          onCancel={() => {}}
                          okText="Đồng ý"
                          cancelText="Hủy bỏ"
                        >
                          <button className={`w-full text-left`}>
                            Rời nhóm
                          </button>
                        </Popconfirm>
                      ),
                      disabled: groupTo?.member?.find((x) => x?.user === userId)
                        ? false
                        : true,
                    },
                    {
                      disabled: groupTo?.leader === userId ? false : true,
                      label: (
                        <Popconfirm
                          placement="bottomRight"
                          title="Xóa nhóm"
                          description="Toàn bộ thông tin tin nhắn, hình ảnh, video,,,, sẽ bị xóa vĩnh viễn. Bạn có chắc chắn xóa nhóm?"
                          onConfirm={async () => {
                            const cityRef = doc(db, "chat-groups", groupTo?.id);
                            await updateDoc(cityRef, {
                              messages: deleteField(),
                            });
                            await deleteDoc(cityRef).then(() => {
                              message.success("Đã xóa nhóm thành công!!");
                              setGroupTo();
                              router.push("/chat/group-public");
                            });
                          }}
                          onCancel={() => {}}
                          okText="Đồng ý"
                          cancelText="Hủy bỏ"
                          style={{
                            width: 200,
                          }}
                        >
                          <button className="w-full flex">Giải tán nhóm</button>
                        </Popconfirm>
                      ),
                      key: "5",
                    },
                  ],
                }}
              >
                <IoInformationCircleSharp color="#0084ff" size={28} />
              </Dropdown>
            </div>
          </>
        )}
      </div>
      {activeMultipleDelete && (
        <div
          ref={addFriend}
          className="flex justify-between items-center px-[15px] border-b py-2 border-gray-300"
        >
          <div className="flex items-center gap-x-2">
            <MdDeleteForever size={24} color="#c80000" />
            <span>Đã chọn: {deleteList?.length}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <button
              className={`bg-[#c80000] text-white font-semibold px-4 py-1 ${
                deleteList.length <= 0 && "bg-opacity-50"
              }`}
              onClick={() => {
                if (deleteList.length > 0) {
                  deleteList?.map(async (x) => {
                    const washingtonRef = doc(
                      db,
                      "chat-groups",
                      search.get("groupId"),
                      "messages",
                      x?.id
                    );
                    await deleteDoc(washingtonRef);
                    if (groupTo?.lastMessage?.messageId === x?.id) {
                      const wRef = doc(
                        db,
                        "chat-groups",
                        search.get("groupId")
                      );
                      const finIndexMessages = groupTo?.messages?.findLastIndex(
                        (x) => {
                          if (!x?.isDelete) {
                            return x;
                          } else {
                            if (
                              x?.isDelete?.find((aa) => aa?.user !== userId)
                            ) {
                              return x;
                            }
                          }
                        }
                      );

                      await updateDoc(wRef, {
                        lastMessage:
                          finIndexMessages > -1
                            ? {
                                ...groupTo?.messages[finIndexMessages],
                                messageId:
                                  groupTo?.messages[finIndexMessages]?.id,
                                text:
                                  groupTo?.messages[finIndexMessages]?.photos
                                    ?.length > 0
                                    ? "[Hình ảnh]"
                                    : groupTo?.messages[finIndexMessages]?.files
                                        ?.length > 0
                                    ? "[File]"
                                    : groupTo?.messages[finIndexMessages]?.text,
                              }
                            : deleteField(),
                      });
                    }
                  });
                  setActiveMultipleDelete(false);
                  setDeleteList([]);
                  message?.success("Đã xóa tin nhắn");
                }
              }}
            >
              Xóa
            </button>
            <button
              className="bg-gray-300 font-semibold px-4 py-1"
              onClick={() => {
                setActiveMultipleDelete(false);
                setDeleteList([]);
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
      {groupTo ? (
        groupTo?.member?.find((x) => x?.user === userId) ? (
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
                    if (item?.isDelete?.find((x) => x?.user === userId)) {
                    } else {
                      if (!item?.notify) {
                        return (
                          <div
                            key={index}
                            className={`flex items-start gap-x-2 cursor-pointer sm:gap-x-4 ${
                              item?.formAuthor?.userId === userId
                                ? "flex-row-reverse"
                                : "flex-row"
                            } ${index !== 0 && "mt-3"}`}
                          >
                            <div
                              className={`flex items-center gap-x-3 ${
                                item?.formAuthor?.userId === userId
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              }`}
                            >
                              {activeMultipleDelete && (
                                <div
                                  className={`w-[15px] h-[15px] border  rounded-full ${
                                    deleteList?.find((x) => x?.id === item?.id)
                                      ? "bg-green-500 border-green-500"
                                      : "bg-white border-gray-400"
                                  }  flex justify-center items-center cursor-pointer`}
                                  onClick={() => {
                                    const find = deleteList?.findIndex(
                                      (x) => x?.id === item?.id
                                    );
                                    if (find < 0) {
                                      deleteList.push(item);
                                    } else {
                                      deleteList.splice(find, 1);
                                    }
                                    setDeleteList([...deleteList]);
                                  }}
                                >
                                  {deleteList?.find(
                                    (x) => x?.id === item?.id
                                  ) && <FaCheck color="white" size={10} />}
                                </div>
                              )}
                              <Image
                                onClick={() =>
                                  router.push(
                                    `/author/${author?.slug}/${author?.authorId}`
                                  )
                                }
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
                            </div>
                            <div
                              className={`w-2/3 sm-w-1/2 flex items-center gap-x-2 ${
                                item?.formAuthor?.userId === userId
                                  ? "flex-row-reverse"
                                  : "flex-row"
                              }`}
                            >
                              {item?.photos?.length > 0 &&
                                (item?.recall ? (
                                  <div
                                    id={item?.id}
                                    className={`w-fit text-sm ${
                                      item?.formAuthor?.userId === userId
                                        ? "ml-auto"
                                        : ""
                                    }`}
                                  >
                                    <div
                                      className={`w-full text-sm ${
                                        item?.formAuthor?.userId === userId
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
                                      author?.userId === userId ? "ml-auto" : ""
                                    }`}
                                  >
                                    <div
                                      className={`w-full flex items-center gap-x-2 flex-wrap ${
                                        item?.formAuthor?.userId === userId
                                          ? "justify-end"
                                          : ""
                                      } `}
                                    >
                                      {item?.formAuthor?.userId === userId &&
                                        !item?.recall && (
                                          <button className="relative group w-fit mr-1">
                                            <HiOutlineDotsHorizontal />
                                            <div
                                              className={`absolute z-[9999] hidden group-hover:flex flex-col justify-start items-start top-full ${
                                                item?.formAuthor?.userId ===
                                                userId
                                                  ? "left-0"
                                                  : "right-0"
                                              } bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1`}
                                            >
                                              {item?.formAuthor?.userId ===
                                                userId && (
                                                <>
                                                  <Link
                                                    href={``}
                                                    onClick={async (e) => {
                                                      e.preventDefault();
                                                      const washingtonRef = doc(
                                                        db,
                                                        "chat-groups",
                                                        search.get("groupId"),
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
                                                        groupTo?.lastMessage
                                                          ?.messageId ===
                                                        item?.id
                                                      ) {
                                                        const wRef = doc(
                                                          db,
                                                          "chat-groups",
                                                          search.get("groupId")
                                                        );
                                                        await updateDoc(wRef, {
                                                          lastMessage: {
                                                            recall: true,
                                                          },
                                                        });
                                                      }
                                                    }}
                                                    className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left flex items-center gap-x-2 text-black`}
                                                  >
                                                    <MdReplay size={20} /> Thu
                                                    hồi
                                                  </Link>
                                                  <Link
                                                    href={``}
                                                    onClick={async (e) => {
                                                      e.preventDefault();
                                                      const washingtonRef = doc(
                                                        db,
                                                        "chat-groups",
                                                        groupTo?.id,
                                                        "messages",
                                                        item?.id
                                                      );
                                                      await updateDoc(
                                                        washingtonRef,
                                                        {
                                                          isDelete: arrayUnion({
                                                            user: userId,
                                                          }),
                                                        }
                                                      );
                                                      if (
                                                        groupTo?.lastMessage
                                                          ?.messageId ===
                                                        item?.id
                                                      ) {
                                                        const wRef = doc(
                                                          db,
                                                          "chat-groups",
                                                          search.get("groupId")
                                                        );
                                                        await updateDoc(wRef, {
                                                          lastMessage: {
                                                            ...item,
                                                            messageId: item?.id,
                                                            isDelete:
                                                              arrayUnion({
                                                                user: userId,
                                                              }),
                                                          },
                                                        });
                                                      }
                                                    }}
                                                    className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left flex items-center gap-x-2 text-black`}
                                                  >
                                                    <MdDelete size={20} /> Xóa
                                                  </Link>
                                                </>
                                              )}
                                              <Link
                                                href={``}
                                                onClick={async (e) => {
                                                  e.preventDefault();
                                                  setChooseQuote(item);
                                                }}
                                                className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left  flex items-center gap-x-2 text-black`}
                                              >
                                                <MdReply size={20} /> Trả lời
                                              </Link>
                                              {groupTo?.leader === userId && (
                                                <Link
                                                  href={``}
                                                  onClick={async (e) => {
                                                    e.preventDefault();
                                                    setActiveMultipleDelete(
                                                      true
                                                    );
                                                    const find =
                                                      deleteList?.findIndex(
                                                        (x) =>
                                                          x?.id === item?.id
                                                      );
                                                    if (find < 0) {
                                                      deleteList.push(item);
                                                    } else {
                                                      deleteList.splice(
                                                        find,
                                                        1
                                                      );
                                                    }
                                                    setDeleteList([
                                                      ...deleteList,
                                                    ]);
                                                  }}
                                                  className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left  flex items-center gap-x-2 text-black`}
                                                >
                                                  <MdPlaylistRemove size={20} />
                                                  Xóa nhiều
                                                </Link>
                                              )}
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
                                      {item?.formAuthor?.userId !== userId &&
                                        !item?.recall && (
                                          <button className="relative group w-fit mr-1">
                                            <HiOutlineDotsHorizontal />
                                            <div
                                              className={`absolute z-[9999] hidden group-hover:flex flex-col justify-start items-start top-full ${
                                                item?.formAuthor?.userId ===
                                                userId
                                                  ? "left-0"
                                                  : "right-0"
                                              } bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1`}
                                            >
                                              {item?.formAuthor?.userId ===
                                                userId && (
                                                <>
                                                  <Link
                                                    href={``}
                                                    onClick={async (e) => {
                                                      e.preventDefault();
                                                      const washingtonRef = doc(
                                                        db,
                                                        "chat-groups",
                                                        search.get("groupId"),
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
                                                        groupTo?.lastMessage
                                                          ?.messageId ===
                                                        item?.id
                                                      ) {
                                                        const wRef = doc(
                                                          db,
                                                          "chat-groups",
                                                          search.get("groupId")
                                                        );
                                                        await updateDoc(wRef, {
                                                          lastMessage: {
                                                            recall: true,
                                                          },
                                                        });
                                                      }
                                                    }}
                                                    className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left flex items-center gap-x-2 text-black`}
                                                  >
                                                    <MdReplay size={20} /> Thu
                                                    hồi
                                                  </Link>
                                                  <Link
                                                    href={``}
                                                    onClick={async (e) => {
                                                      e.preventDefault();
                                                      const washingtonRef = doc(
                                                        db,
                                                        "chat-groups",
                                                        groupTo?.id,
                                                        "messages",
                                                        item?.id
                                                      );
                                                      await updateDoc(
                                                        washingtonRef,
                                                        {
                                                          isDelete: arrayUnion({
                                                            user: userId,
                                                          }),
                                                        }
                                                      );
                                                      if (
                                                        groupTo?.lastMessage
                                                          ?.messageId ===
                                                        item?.id
                                                      ) {
                                                        const wRef = doc(
                                                          db,
                                                          "chat-groups",
                                                          search.get("groupId")
                                                        );
                                                        await updateDoc(wRef, {
                                                          lastMessage: {
                                                            ...item,
                                                            messageId: item?.id,
                                                            isDelete:
                                                              arrayUnion({
                                                                user: userId,
                                                              }),
                                                          },
                                                        });
                                                      }
                                                    }}
                                                    className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left flex items-center gap-x-2 text-black`}
                                                  >
                                                    <MdDelete size={20} /> Xóa
                                                  </Link>
                                                </>
                                              )}
                                              <Link
                                                href={``}
                                                onClick={async (e) => {
                                                  e.preventDefault();
                                                  setChooseQuote(item);
                                                }}
                                                className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left  flex items-center gap-x-2 text-black`}
                                              >
                                                <MdReply size={20} /> Trả lời
                                              </Link>
                                              {groupTo?.leader === userId && (
                                                <Link
                                                  href={``}
                                                  onClick={async (e) => {
                                                    e.preventDefault();
                                                    setActiveMultipleDelete(
                                                      true
                                                    );
                                                    const find =
                                                      deleteList?.findIndex(
                                                        (x) =>
                                                          x?.id === item?.id
                                                      );
                                                    if (find < 0) {
                                                      deleteList.push(item);
                                                    } else {
                                                      deleteList.splice(
                                                        find,
                                                        1
                                                      );
                                                    }
                                                    setDeleteList([
                                                      ...deleteList,
                                                    ]);
                                                  }}
                                                  className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left  flex items-center gap-x-2 text-black`}
                                                >
                                                  <MdPlaylistRemove size={20} />
                                                  Xóa nhiều
                                                </Link>
                                              )}
                                            </div>
                                          </button>
                                        )}
                                    </div>
                                    <div
                                      className={`w-fit ${
                                        author?.userId === userId && "ml-auto"
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
                                      item?.formAuthor?.userId === userId
                                        ? "ml-auto"
                                        : ""
                                    }`}
                                  >
                                    <div
                                      className={`w-full text-sm ${
                                        item?.formAuthor?.userId === userId
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
                                      item?.formAuthor?.userId === userId
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
                                                item?.formAuthor?.userId ===
                                                userId
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
                                                    userId
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
                                                            photo?.name
                                                              ?.length -
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
                                                author?.userId === userId &&
                                                "ml-auto"
                                              } text-[10px] text-white px-[8px] pt-[3px] pb-[2px]  rounded-full font-normal mt-[4px] bg-black bg-opacity-40`}
                                            >
                                              {moment(item?.createdAt).isBefore(
                                                new Date(),
                                                "days"
                                              )
                                                ? `${moment(
                                                    item?.createdAt
                                                  ).format("hh:mm DD/MM/yyyy")}`
                                                : `${moment(
                                                    item?.createdAt
                                                  ).format("hh:mm")}`}
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
                                            item?.formAuthor?.userId === userId
                                              ? "left-0"
                                              : "right-0"
                                          } bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1`}
                                        >
                                          {item?.formAuthor?.userId ===
                                            userId && (
                                            <>
                                              <Link
                                                href={``}
                                                onClick={async (e) => {
                                                  e.preventDefault();
                                                  const washingtonRef = doc(
                                                    db,
                                                    "chat-groups",
                                                    search.get("groupId"),
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
                                                    groupTo?.lastMessage
                                                      ?.messageId === item?.id
                                                  ) {
                                                    const wRef = doc(
                                                      db,
                                                      "chat-groups",
                                                      search.get("groupId")
                                                    );
                                                    await updateDoc(wRef, {
                                                      lastMessage: {
                                                        recall: true,
                                                      },
                                                    });
                                                  }
                                                }}
                                                className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left flex items-center gap-x-2 text-black`}
                                              >
                                                <MdReplay size={20} /> Thu hồi
                                              </Link>
                                              <Link
                                                href={``}
                                                onClick={async (e) => {
                                                  e.preventDefault();
                                                  const washingtonRef = doc(
                                                    db,
                                                    "chat-groups",
                                                    groupTo?.id,
                                                    "messages",
                                                    item?.id
                                                  );
                                                  await updateDoc(
                                                    washingtonRef,
                                                    {
                                                      isDelete: arrayUnion({
                                                        user: userId,
                                                      }),
                                                    }
                                                  );
                                                  if (
                                                    groupTo?.lastMessage
                                                      ?.messageId === item?.id
                                                  ) {
                                                    const wRef = doc(
                                                      db,
                                                      "chat-groups",
                                                      search.get("groupId")
                                                    );
                                                    await updateDoc(wRef, {
                                                      lastMessage: {
                                                        ...item,
                                                        messageId: item?.id,
                                                        isDelete: arrayUnion({
                                                          user: userId,
                                                        }),
                                                      },
                                                    });
                                                  }
                                                }}
                                                className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left flex items-center gap-x-2 text-black`}
                                              >
                                                <MdDelete size={20} /> Xóa
                                              </Link>
                                            </>
                                          )}
                                          <Link
                                            href={``}
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              setChooseQuote(item);
                                            }}
                                            className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left  flex items-center gap-x-2 text-black`}
                                          >
                                            <MdReply size={20} /> Trả lời
                                          </Link>
                                          {groupTo?.leader === userId && (
                                            <Link
                                              href={``}
                                              onClick={async (e) => {
                                                e.preventDefault();
                                                setActiveMultipleDelete(true);
                                                const find =
                                                  deleteList?.findIndex(
                                                    (x) => x?.id === item?.id
                                                  );
                                                if (find < 0) {
                                                  deleteList.push(item);
                                                } else {
                                                  deleteList.splice(find, 1);
                                                }
                                                setDeleteList([...deleteList]);
                                              }}
                                              className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left  flex items-center gap-x-2 text-black`}
                                            >
                                              <MdPlaylistRemove size={20} />
                                              Xóa nhiều
                                            </Link>
                                          )}
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
                                      ? `${
                                          item?.reply
                                            ? "w-[250px]"
                                            : "w-[170px]"
                                        }`
                                      : "w-fit"
                                  } text-sm ${
                                    item?.formAuthor?.userId === userId
                                      ? "ml-auto"
                                      : ""
                                  }`}
                                >
                                  <div
                                    className={`flex gap-x-2 items-center ${
                                      item?.formAuthor?.userId === userId
                                        ? "flex-row"
                                        : "flex-row-reverse"
                                    }`}
                                  >
                                    {!item?.recall && (
                                      <button className="relative group w-fit">
                                        <HiOutlineDotsHorizontal />
                                        <div
                                          className={`absolute z-[9999] hidden group-hover:flex flex-col justify-start items-start top-full ${
                                            item?.formAuthor?.userId === userId
                                              ? "left-0"
                                              : "right-0"
                                          } bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1`}
                                        >
                                          {item?.formAuthor?.userId ===
                                            userId && (
                                            <>
                                              <Link
                                                href={``}
                                                onClick={async (e) => {
                                                  e.preventDefault();
                                                  const washingtonRef = doc(
                                                    db,
                                                    "chat-groups",
                                                    search.get("groupId"),
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
                                                    groupTo?.lastMessage
                                                      ?.messageId === item?.id
                                                  ) {
                                                    const wRef = doc(
                                                      db,
                                                      "chat-groups",
                                                      search.get("groupId")
                                                    );
                                                    await updateDoc(wRef, {
                                                      lastMessage: {
                                                        recall: true,
                                                      },
                                                    });
                                                  }
                                                }}
                                                className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left flex items-center gap-x-2 text-black`}
                                              >
                                                <MdReplay size={20} /> Thu hồi
                                              </Link>
                                              <Link
                                                href={``}
                                                onClick={async (e) => {
                                                  e.preventDefault();
                                                  const washingtonRef = doc(
                                                    db,
                                                    "chat-groups",
                                                    groupTo?.id,
                                                    "messages",
                                                    item?.id
                                                  );
                                                  await updateDoc(
                                                    washingtonRef,
                                                    {
                                                      isDelete: arrayUnion({
                                                        user: userId,
                                                      }),
                                                    }
                                                  );
                                                  if (
                                                    groupTo?.lastMessage
                                                      ?.messageId === item?.id
                                                  ) {
                                                    const wRef = doc(
                                                      db,
                                                      "chat-groups",
                                                      search.get("groupId")
                                                    );
                                                    await updateDoc(wRef, {
                                                      lastMessage: {
                                                        ...item,
                                                        messageId: item?.id,
                                                        isDelete: arrayUnion({
                                                          user: userId,
                                                        }),
                                                      },
                                                    });
                                                  }
                                                }}
                                                className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left flex items-center gap-x-2 text-black`}
                                              >
                                                <MdDelete size={20} /> Xóa
                                              </Link>
                                            </>
                                          )}
                                          <Link
                                            href={``}
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              setChooseQuote(item);
                                            }}
                                            className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left  flex items-center gap-x-2 text-black`}
                                          >
                                            <MdReply size={20} /> Trả lời
                                          </Link>
                                          {groupTo?.leader === userId && (
                                            <Link
                                              href={``}
                                              onClick={async (e) => {
                                                e.preventDefault();
                                                setActiveMultipleDelete(true);
                                                const find =
                                                  deleteList?.findIndex(
                                                    (x) => x?.id === item?.id
                                                  );
                                                if (find < 0) {
                                                  deleteList.push(item);
                                                } else {
                                                  deleteList.splice(find, 1);
                                                }
                                                setDeleteList([...deleteList]);
                                              }}
                                              className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-1.5 text-left  flex items-center gap-x-2 text-black`}
                                            >
                                              <MdPlaylistRemove size={20} />
                                              Xóa nhiều
                                            </Link>
                                          )}
                                        </div>
                                      </button>
                                    )}

                                    <div
                                      className={`w-full text-sm ${
                                        item?.formAuthor?.userId === userId
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
                                                  {item?.reply?.files?.length >
                                                  0 ? (
                                                    item?.reply?.files[
                                                      item?.reply?.files
                                                        ?.length - 1
                                                    ]?.type?.includes(
                                                      "image"
                                                    ) ? (
                                                      <FaFileImage
                                                        className="text-amber-500"
                                                        size={28}
                                                      />
                                                    ) : item?.reply?.files[
                                                        item?.reply?.files
                                                          ?.length - 1
                                                      ]?.name?.includes(
                                                        "pptx"
                                                      ) ? (
                                                      <SiMicrosoftpowerpoint
                                                        className="text-rose-700"
                                                        size={28}
                                                      />
                                                    ) : item?.reply?.files[
                                                        item?.reply?.files
                                                          ?.length - 1
                                                      ]?.name?.includes(
                                                        "xlsx"
                                                      ) ? (
                                                      <FaFileLines
                                                        className="text-green-600"
                                                        size={28}
                                                      />
                                                    ) : item?.reply?.files[
                                                        item?.reply?.files
                                                          ?.length - 1
                                                      ]?.type?.includes(
                                                        "video"
                                                      ) ? (
                                                      <RiFileVideoFill
                                                        size={28}
                                                        className="text-yellow-300"
                                                      />
                                                    ) : item?.reply?.files[
                                                        item?.reply?.files
                                                          ?.length - 1
                                                      ]?.type?.includes(
                                                        "pdf"
                                                      ) ? (
                                                      <BiSolidFilePdf
                                                        size={28}
                                                        className="text-rose-500"
                                                      />
                                                    ) : item?.reply?.files[
                                                        item?.reply?.files
                                                          ?.length - 1
                                                      ]?.type?.includes(
                                                        "doc"
                                                      ) ? (
                                                      <BsFileEarmarkWordFill
                                                        size={28}
                                                        className="text-[#4367A5]"
                                                      />
                                                    ) : item?.reply?.files[
                                                        item?.reply?.files
                                                          ?.length - 1
                                                      ]?.type?.includes(
                                                        "audio/mpeg"
                                                      ) ? (
                                                      <FaFileAudio
                                                        size={28}
                                                        className="text-purple-600"
                                                      />
                                                    ) : item?.reply?.files[
                                                        item?.reply?.files
                                                          ?.length - 1
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
                                                  {item?.reply?.photos?.length >
                                                  0 ? (
                                                    <div>
                                                      <Image
                                                        src={
                                                          item?.reply?.photos[0]
                                                        }
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
                                                      {item?.reply?.text
                                                        ?.length > 0 &&
                                                        item?.reply?.text}
                                                      {item?.reply?.files
                                                        ?.length > 0 &&
                                                        `${
                                                          sizes.width > 450
                                                            ? item?.reply
                                                                ?.files[
                                                                item?.reply
                                                                  ?.files
                                                                  ?.length - 1
                                                              ]?.name
                                                            : `${item?.reply?.files[
                                                                item?.reply
                                                                  ?.files
                                                                  ?.length - 1
                                                              ]?.name?.slice(
                                                                0,
                                                                10
                                                              )}...${
                                                                item?.reply
                                                                  ?.files[
                                                                  item?.reply
                                                                    ?.files
                                                                    ?.length - 1
                                                                ]?.name
                                                                  ?.length >
                                                                  5 &&
                                                                item?.reply?.files[
                                                                  item?.reply
                                                                    ?.files
                                                                    ?.length - 1
                                                                ]?.name?.slice(
                                                                  item?.reply
                                                                    ?.files[
                                                                    item?.reply
                                                                      ?.files
                                                                      ?.length -
                                                                      1
                                                                  ]?.name
                                                                    ?.length -
                                                                    5,
                                                                  item?.reply
                                                                    ?.files[
                                                                    item?.reply
                                                                      ?.files
                                                                      ?.length -
                                                                      1
                                                                  ]?.name
                                                                    ?.length
                                                                )
                                                              }`
                                                        }`}
                                                      {item?.reply?.photos
                                                        ?.length > 0 &&
                                                        "[Hình ảnh]"}
                                                    </div>
                                                  </div>
                                                </div>
                                              </Link>
                                            </div>
                                          )}
                                          <div className="mt-1">
                                            {item?.text}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div
                                    className={`w-fit ${
                                      author?.userId === userId && "ml-auto"
                                    } text-[10px] text-white px-[8px] py-[0px]  rounded-full font-normal mt-[4px] bg-black bg-opacity-40`}
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
                              )}
                            </div>
                          </div>
                        );
                      } else {
                        const author = authors?.find(
                          (x) => x?.userId === item?.user
                        );
                        return (
                          <div className="flex justify-center mt-2">
                            <div className="flex items-center gap-x-1 w-fit bg-gray-200 rounded-full px-[8px] py-[2px]">
                              {item?.type === "name" && (
                                <HiPencil size={16} color="green" />
                              )}
                              {item.type === "change" ? (
                                <div className="flex items-center gap-x-1">
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
                                    className="w-[15px] h-[15px] rounded-full"
                                  />
                                  <p className="text-[12px]">
                                    <strong>{author?.name}</strong> {item?.text}
                                  </p>
                                </div>
                              ) : item.type === "name" ? (
                                <div className="flex items-center gap-x-1">
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
                                    className="w-[15px] h-[15px] rounded-full"
                                  />
                                  <p className="text-[12px]">
                                    <strong>{author?.name}</strong> đã đổi tên
                                    nhóm thành
                                    <strong>"{item?.text}"</strong>
                                  </p>
                                </div>
                              ) : item.type === "noi_quy" ? (
                                <div className="flex items-center gap-x-1">
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
                                    className="w-[15px] h-[15px] rounded-full"
                                  />
                                  <p className="text-[12px]">
                                    <strong>{author?.name}</strong> đã thay đổi
                                    nội quy nhóm
                                  </p>
                                </div>
                              ) : item.type === "gioi_thieu" ? (
                                <div className="flex items-center gap-x-1">
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
                                    className="w-[15px] h-[15px] rounded-full"
                                  />
                                  <p className="text-[12px]">
                                    <strong>{author?.name}</strong> đã thay đổi
                                    thông tin giới thiệu về nhóm
                                  </p>
                                </div>
                              ) : item.type === "avatar" ? (
                                <div className="flex items-center gap-x-1">
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
                                    className="w-[15px] h-[15px] rounded-full"
                                  />
                                  <p className="text-[12px]">
                                    <strong>{author?.name}</strong> đã đổi ảnh
                                    đại diện
                                  </p>
                                </div>
                              ) : item.type === "exit" ||
                                item.type === "remove" ? (
                                <div className="flex items-center gap-x-1">
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
                                    className="w-[15px] h-[15px] rounded-full"
                                  />
                                  <p className="text-[12px]">
                                    <strong>{author?.name}</strong> đã{" "}
                                    {item.type === "remove" ? "bị xóa" : "rời"}{" "}
                                    khỏi nhóm
                                  </p>
                                </div>
                              ) : item.type === "leader" ||
                                item.type === "deputy-leader" ||
                                item.type === "deputy-leader-remove" ? (
                                <div className="flex items-center gap-x-1">
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
                                    className="w-[15px] h-[15px] rounded-full"
                                  />
                                  <p className="text-[12px]">
                                    <strong>{author?.name}</strong> đã{" "}
                                    {item.type === "deputy-leader-remove"
                                      ? "bị xóa quyền nhóm phó"
                                      : `trở thành
                                   ${
                                     item?.type === "leader"
                                       ? " nhóm trưởng"
                                       : " nhóm phó"
                                   }`}
                                  </p>
                                </div>
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>
                        );
                      }
                    }
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
                  <BsEmojiSmile
                    color="#999"
                    size={sizes.width > 992 ? 30 : 22}
                  />
                </div>
                <button onClick={() => refImg.current?.click()}>
                  <IoImageOutline
                    color="#999"
                    size={sizes.width > 992 ? 32 : 24}
                  />
                </button>
                <button onClick={() => refVideo.current?.click()}>
                  <MdAttachFile
                    color="#999"
                    size={sizes.width > 992 ? 28 : 22}
                  />
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
                    placeholder={`Nhắn tin tới nhóm ${groupTo?.name}`}
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
                          (x) => x?.userId === userId
                        );
                        let dataItem = {
                          text: newMessage,
                          photos,
                          files: [],
                          createdAt: serverTimestamp(),
                          formAuthor: myAuthor,
                          recall: false,
                          reply: chooseQuote || null,
                        };
                        const find = messages?.find(
                          (x) => x?.id === search.get("groupId")
                        );
                        await addDoc(
                          collection(
                            db,
                            "chat-groups",
                            search.get("groupId"),
                            "messages"
                          ),
                          dataItem
                        ).then(async (data) => {
                          const washingtonRef = doc(
                            db,
                            "chat-groups",
                            search.get("groupId")
                          );
                          await updateDoc(washingtonRef, {
                            lastMessage: {
                              messageId: data?.id,
                              ...dataItem,
                            },
                            new: true,
                            isDelete: deleteField(),
                            lastMessagesCount: find?.lastMessagesCount
                              ? find?.lastMessagesCount + 1
                              : 1,
                            createdAt: serverTimestamp(),
                          });
                        });
                        setChooseQuote();
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
          <div className="w-full h-full flex justify-center items-center flex-col gap-2">
            {groupTo?.requestList?.find((x) => x?.user === userId) ? (
              <div className="text-[18px]">
                Bạn đã gửi yêu cầu tham gia nhóm - <b>{groupTo?.name}</b>. Vui
                lòng chờ nhóm trưởng xét duyệt
              </div>
            ) : (
              <div className="text-[18px]">
                Bạn chưa phải là thành viên của nhóm - <b>{groupTo?.name}</b>
              </div>
            )}

            {groupTo?.requestList?.find((x) => x?.user === userId) ? (
              <button
                onClick={async () => {
                  const washingtonRef = doc(db, "chat-groups", groupTo?.id);
                  await updateDoc(washingtonRef, {
                    requestList: arrayRemove({
                      user: userId,
                    }),
                  }).then(async (result) => {
                    message.success("Đã hủy tham gia nhóm");
                  });
                }}
                className="text-sm bg-[#C82027] rounded-[15px] text-white font-semibold px-[25px] py-[12px] border border-[#C82027] hover:bg-white hover:text-[#C82027]"
              >
                Hủy yêu cầu tham gia
              </button>
            ) : (
              <button
                onClick={async () => {
                  const washingtonRef = doc(db, "chat-groups", groupTo?.id);
                  await updateDoc(washingtonRef, {
                    requestList: arrayUnion({
                      user: userId,
                    }),
                  }).then(async (result) => {
                    message.success("Đã gửi yêu cầu xin thành công");
                  });
                }}
                className="text-sm bg-indigo-600 rounded-[15px] text-white font-semibold px-[25px] py-[12px] border border-indigo-600 hover:bg-white hover:text-indigo-600"
              >
                Yêu cầu tham gia
              </button>
            )}
          </div>
        )
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
      <ModalAddMember
        authors={authors}
        onCallback={() => {}}
        visible={showModalAddMember}
        onCancel={() => setShowModalAddMember(false)}
        activeGroup={activeGroup}
        member={groupTo?.member}
      />
      <ModalAbout
        visible={openAbout}
        onCancel={() => setOpenAbout(false)}
        about={groupTo}
        authors={authors}
        member={groupTo?.member}
        type={typeAbout}
        setShowModalLeader={setShowModalLeader}
      />
      <ModalAddLeader
        authors={authors}
        member={groupTo?.member}
        onCancel={() => setShowModalLeader(false)}
        onCloseParent={() => setOpenAbout(false)}
        visible={showModalLeader}
      />
    </div>
  );
}
