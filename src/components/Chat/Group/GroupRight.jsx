"use client";
import { useWindowSize } from "@hooks/useWindowSize";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import {
  IoChevronBackOutline,
  IoImageOutline,
  IoInformationCircleSharp,
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
import { MdAttachFile } from "react-icons/md";
import { FaFile, FaFileAudio, FaFileImage, FaFileLines } from "react-icons/fa6";
import { BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { BsFileEarmarkWordFill } from "react-icons/bs";
import { SiMicrosoftpowerpoint } from "react-icons/si";
import ModalAddMember from "./ModalAddMember";
import ModalAbout from "./ModalAbout";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { getTimeChat } from "@utils/dateFormat";

export default function ChatGroupRight({
  userRecieved,
  setUserRecieved,
  mobile,
  setMobile,
  messages,
  authors,
  activeGroup,
  setActiveGroup,
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
  const [myMessage, setMyMessage] = useState([]);
  const [myMember, setMyMember] = useState([]);
  const [avatar, setAvatar] = useState([]);
  const [groupTo, setGroupTo] = useState();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
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
      const q = query(
        collection(db, "chat-groups", search.get("groupId"), "member"),
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
        setMyMember(allMess);
      });
      return () => unsubscribe;
    } else {
      setMyMember([]);
    }
  }, [search]);
  useEffect(() => {
    if (search.get("groupId")) {
      const chatDetail = messages?.find((x) => x?.id === search.get("groupId"));
      setGroupTo(chatDetail);
    }
  }, [messages, search]);
  useEffect(() => {
    if (search.get("groupId")) {
      const q = query(
        collection(db, "chat-groups", search.get("groupId"), "avatar"),
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
        setAvatar(allMess);
      });
      return () => unsubscribe;
    } else {
      setAvatar([]);
    }
  }, [search]);
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
              await addDoc(
                collection(
                  db,
                  "chat-groups",
                  search.get("groupId"),
                  "messages"
                ),
                {
                  text: newMessage,
                  photos: newPhoto,
                  files: [],
                  createdAt: serverTimestamp(),
                  formAuthor: myAuthor,
                }
              );
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
              await addDoc(
                collection(
                  db,
                  "chat-groups",
                  search.get("groupId"),
                  "messages"
                ),
                {
                  text: newMessage,
                  photos,
                  files: newPhoto,
                  createdAt: serverTimestamp(),
                  formAuthor: myAuthor,
                }
              );
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
  const [showModalAddMember, setShowModalAddMember] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [typeAbout, setTypeAbout] = useState("about");
  const [activeAbout, setActiveAbout] = useState();
  return (
    <div
      className={`h-full ${
        sizes.width > 992 ? "basis-2/3" : `${mobile ? "basis-full" : "hidden"}`
      }`}
    >
      <div className="h-[75px] flex justify-between items-center px-[15px] pl-[0px] sm:px-[20px] shadow-md shadow-gray-400">
        {groupTo && (
          <>
            <div className="flex items-center gap-x-2 sm:gap-x-4">
              <button
                className={`${sizes.width > 992 ? "hidden" : ""}`}
                onClick={() => {
                  setMobile(false);
                  router.push("/chat/group");
                }}
              >
                <IoChevronBackOutline size={32} />
              </button>
              <Image
                src={
                  avatar && avatar?.length > 0 && avatar[0]?.avatar?.length > 0
                    ? avatar[0]?.avatar
                    : "/dumuc/avatar.png"
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
                {/* <p className='text-sm'>Đang hoạt động</p> */}
              </div>
            </div>
            <div className="flex items-center gap-x-3 pr-0 sm:pr-5">
              <IoMdPersonAdd
                color="#0084ff"
                size={24}
                onClick={() => setShowModalAddMember(true)}
              />
              <button className="group relative">
                <IoInformationCircleSharp color="#0084ff" size={28} />
                <div className="absolute z-[99999] hidden group-hover:flex flex-col justify-start items-start top-full right-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[125px] rounded p-1">
                  <Link
                    href={``}
                    onClick={async (e) => {
                      e.preventDefault();
                      setOpenAbout(true);
                      setTypeAbout("member");
                    }}
                    className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left`}
                  >
                    Xem thành viên
                  </Link>
                  <Link
                    href={``}
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenAbout(true);
                      setTypeAbout("about");
                    }}
                    className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left`}
                  >
                    Thông tin nhóm
                  </Link>
                </div>
              </button>
            </div>
          </>
        )}
      </div>
      {groupTo ? (
        <>
          <div
            className={`${
              sizes.width > 992
                ? "h-[calc(100%-335px)]"
                : sizes.width > 320
                ? "h-[calc(100%-200px)] sm:h-[calc(100%-205px)]"
                : "h-[calc(100%-200px)]"
            } overflow-auto scroll-chat px-3 py-5`}
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
                  return (
                    <div
                      key={index}
                      className={`flex gap-x-2 sm:gap-x-4 ${
                        author?.userId === user?.uid
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
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
                      <div className="w-2/3 sm-w-1/2">
                        {item?.photos?.length > 0 && (
                          <div
                            className={`w-full sm:w-3/4 ${
                              author?.userId === user?.uid ? "ml-auto" : ""
                            }`}
                          >
                            <div
                              className={`w-full flex flex-wrap ${
                                author?.userId === user?.uid
                                  ? "justify-end"
                                  : ""
                              } ${author?.userId === user?.uid ? "" : ""} mt-3`}
                            >
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
                            </div>
                            <div
                              className={`w-fit ${
                                author?.userId === user?.uid && "ml-auto"
                              } text-[10px] text-white px-[8px] pt-[3px] pb-[2px]  rounded-full font-normal mt-[4px] bg-black bg-opacity-40`}
                            >
                              {getTimeChat(item?.createdAt)}
                            </div>
                          </div>
                        )}
                        {item?.files?.length > 0 && (
                          <div className={`w-full mt-3`}>
                            {item?.files?.map((photo, indexC) => {
                              return (
                                <Link
                                  key={indexC}
                                  href={photo?.url}
                                  target="_blank"
                                >
                                  <div
                                    className={`w-full ${
                                      item?.formAuthor?.userId === user?.uid
                                        ? " ml-auto"
                                        : ""
                                    } sm:w-3/4 lg:w-2/3 xl:w-7/12 2xl:w-1/2`}
                                  >
                                    <div
                                      className={`cursor-pointer   text-base font-medium cursor-pointer ${
                                        item?.formAuthor?.userId === user?.uid
                                          ? "bg-[#e5efff] ml-auto"
                                          : "bg-gray-100"
                                      }  rounded-[10px] px-[10px] py-[20px] mb-2`}
                                    >
                                      <div className="flex items-center gap-x-2">
                                        {photo?.type?.includes("image") ? (
                                          <FaFileImage
                                            className="text-amber-500"
                                            size={48}
                                          />
                                        ) : photo?.name?.includes("pptx") ? (
                                          <SiMicrosoftpowerpoint
                                            className="text-rose-700"
                                            size={48}
                                          />
                                        ) : photo?.name?.includes("xlsx") ? (
                                          <FaFileLines
                                            className="text-green-600"
                                            size={48}
                                          />
                                        ) : photo?.type?.includes("video") ? (
                                          <RiFileVideoFill
                                            size={48}
                                            className="text-yellow-300"
                                          />
                                        ) : photo?.type?.includes("pdf") ? (
                                          <BiSolidFilePdf
                                            size={48}
                                            className="text-rose-500"
                                          />
                                        ) : photo?.type?.includes("doc") ? (
                                          <BsFileEarmarkWordFill
                                            size={48}
                                            className="text-[#4367A5]"
                                          />
                                        ) : photo?.type?.includes(
                                            "audio/mpeg"
                                          ) ? (
                                          <FaFileAudio
                                            size={48}
                                            className="text-purple-600"
                                          />
                                        ) : photo?.type?.includes(
                                            "text/plain"
                                          ) ? (
                                          <BiSolidFileTxt
                                            size={48}
                                            className="text-sky-400"
                                          />
                                        ) : (
                                          <FaFile
                                            size={48}
                                            className="text-sky-400"
                                          />
                                        )}
                                        <div className="">
                                          {" "}
                                          {photo?.name?.slice(0, 20)}
                                          {photo?.name?.length > 20 && (
                                            <>
                                              ...
                                              {photo?.name?.slice(
                                                photo?.name?.length - 8,
                                                photo?.name?.length
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className={`w-fit ${
                                        author?.userId === user?.uid &&
                                        "ml-auto"
                                      } text-[10px] text-white px-[8px] pt-[3px] pb-[2px]  rounded-full font-normal mt-[4px] bg-black bg-opacity-40`}
                                    >
                                      {getTimeChat(item?.createdAt)}
                                    </div>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        )}
                        {item?.text?.trim() !== "" && (
                          <div
                            className={`${
                              item?.text?.length < 30 ? "w-[170px]" : "w-fit"
                            } text-sm ${
                              item?.formAuthor?.userId === user?.uid
                                ? "ml-auto"
                                : ""
                            }  mt-3`}
                          >
                            <div
                              className={`w-full  text-sm ${
                                item?.formAuthor?.userId === user?.uid
                                  ? "bg-[#e5efff]"
                                  : "bg-gray-100"
                              }  rounded-[10px] px-[10px] py-[20px]`}
                            >
                              {item?.text}
                            </div>
                            <div
                              className={`w-fit ${
                                author?.userId === user?.uid && "ml-auto"
                              } text-[10px] text-white px-[8px] py-[0px]  rounded-full font-normal mt-[4px] bg-black bg-opacity-40`}
                            >
                              {getTimeChat(item?.createdAt)}
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
          <div
            className={`bg-gray-200 ${
              sizes.width > 992 ? " h-[300px]" : " h-[200px]"
            } w-full ${sizes.width > 992 ? "py-[16px]" : "py-[8px]"} relative`}
          >
            <div className="flex items-center px-4 gap-x-4">
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
              {/* <input className='hidden' type='file' accept='' ref={refFile} multiple /> */}
            </div>
            <div className="my-2 flex flex-col">
              <textarea
                value={newMessage}
                onChange={(event) => {
                  setNewMessage(event.target.value);
                }}
                placeholder="Nhập tin nhắn..."
                className={`px-4 ${
                  sizes.width > 992
                    ? "placeholder:text-lg text-lg"
                    : "placeholder:text-sm text-sm sm:placeholder:text-base sm:text-base"
                } w-full border-none bg-gray-200 focus-visible:border-none  focus-visible:shadow-none focus-visible:outline-none focus:border-none focus:shadow-none focus:outline-none`}
                style={{
                  resize: "none",
                  boxShadow: "none",
                }}
                rows={sizes.width > 992 ? 2 : 1}
              ></textarea>
            </div>
            <div className="flex justify-end items-center pr-[30px]">
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

                    await addDoc(
                      collection(
                        db,
                        "chat-groups",
                        search.get("groupId"),
                        "messages"
                      ),
                      {
                        text: newMessage,
                        photos,
                        files: [],
                        createdAt: serverTimestamp(),
                        formAuthor: myAuthor,
                      }
                    );
                    setNewMessage("");
                    setPhotos([]);
                    scroll.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`bg-[#0084ff] text-white px-[30px] rounded-[10px] ${
                    sizes.width > 992
                      ? "pt-[4px] pb-[6px] text-lg"
                      : "pt-[2px] pb-[2px] text-base"
                  }  `}
                >
                  Gửi
                </button>
              ) : (
                <button
                  className={`bg-[#0084ff] bg-opacity-60 text-white px-[30px] rounded-[10px] ${
                    sizes.width > 992
                      ? "pt-[4px] pb-[6px] text-lg"
                      : "pt-[2px] pb-[2px] text-base"
                  } cursor-not-allowed`}
                >
                  Gửi
                </button>
              )}
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
      <ModalAddMember
        authors={authors}
        onCallback={() => {}}
        visible={showModalAddMember}
        onCancel={() => setShowModalAddMember(false)}
        activeGroup={activeGroup}
        member={myMember}
      />
      <ModalAbout
        visible={openAbout}
        onCancel={() => setOpenAbout(false)}
        about={groupTo}
        authors={authors}
        member={myMember}
        type={typeAbout}
        avatarGroup={avatar}
      />
    </div>
  );
}
