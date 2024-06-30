"use client";
import React, { useState, useEffect, useRef } from "react";
import { Modal, Spin, message } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@utils/firebase";
import { getProfile } from "@apis/users";
import {
  FaCheck,
  FaFile,
  FaFileAudio,
  FaFileImage,
  FaFileLines,
} from "react-icons/fa6";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteField,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { IoMdCloseCircle } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import { Textarea } from "@nextui-org/input";
import { SiMicrosoftpowerpoint } from "react-icons/si";
import { RiFileVideoFill } from "react-icons/ri";
import { BiSolidFilePdf, BiSolidFileTxt } from "react-icons/bi";
import { BsFileEarmarkWordFill } from "react-icons/bs";

export default function ModalForwardMessage({
  visible,
  onCancel,
  onCallback,
  authors,
  messageForward,
  photForward,
  fileForward,
  listmessage,
}) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const search = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [usingUser, setUsingUser] = useState();
  const [name, setName] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const textareaRef = useRef(null);
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState([]);
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
      setFriendList(dataCall?.friendList?.filter((x) => x.status === 2));
    });
  }, [user]);
  useEffect(() => {
    setNewMessage(messageForward);
    setPhotos(photForward);
    setFile(fileForward);
  }, [messageForward, photForward, fileForward]);
  const save = () => {
    setLoading(true);
    const findMe = listmessage?.filter((x) =>
      x?.member?.find((x) => x?.userId === user?.uid)
    );
    memberList?.map(async (x) => {
      const myAuthor = authors?.find((x) => x?.userId === user?.uid);
      const findChat = findMe?.find((a) =>
        a?.member?.find((t) => t?.userId === x?.userId)
      );
      let dataItem = {
        text: newMessage,
        photos: photos,
        files: file,
        createdAt: serverTimestamp(),
        formAuthor: myAuthor,
        recall: false,
        reply: null,
      };
      if (findChat) {
        await addDoc(
          collection(db, "chat-rooms", findChat?.id, "messages"),
          dataItem
        ).then(async (dataMessage) => {
          const washingtonRef = doc(db, "chat-rooms", `${findChat?.id}`);
          await updateDoc(washingtonRef, {
            lastMessage: {
              ...dataItem,
              messageId: dataMessage?.id,
              text:
                photos?.length > 0
                  ? "[Hình ảnh]"
                  : file?.length > 0
                  ? "[Hình ảnh]"
                  : dataItem?.text,
            },
            new: true,
            lastMessagesCount: 1,
            isDelete: deleteField(),
            createdAt: serverTimestamp(),
          });
        });
      } else {
        await addDoc(collection(db, "chat-rooms"), {
          member: [x, myAuthor],
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
                text:
                  photos?.length > 0
                    ? "[Hình ảnh]"
                    : file?.length > 0
                    ? "[Hình ảnh]"
                    : dataItem?.text,
              },
              new: true,
              lastMessagesCount: 1,
              isDelete: deleteField(),
              createdAt: serverTimestamp(),
            });
          });
        });
      }
      // const washingtonRef = doc(db, "chat-groups", search.get("groupId"));
      // Atomically add a new region to the "regions" array field.
    });
    message.success("Bạn đã chia sẽ thành công");
    setLoading(false);
    setName("");
    setMemberList([]);
    setNewMessage("");
    setPhotos([]);
    setFile([]);
    setIsEditingMessage(false);
    onCancel();
  };
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
            .name?.trim()
            ?.toLowerCase()
            ?.includes(value?.trim()?.toLowerCase())
      );
      if (searchList && searchList.length > 0) {
        setFriendList(searchList);
      } else {
        setFriendList([]);
      }
    }
  };
  return (
    <Modal
      visible={visible}
      title={`Chia sẽ`}
      onCancel={() => {
        onCancel();
        setName("");
        setMemberList([]);
        setNewMessage("");
        setPhotos([]);
        setFile([]);
        setIsEditingMessage(false);
      }}
      destroyOnClose={true}
      footer={
        <div className="flex justify-end">
          {loading ? (
            <button
              disabled
              type="button"
              className={`text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5`}
            >
              <Spin />
              Chia sẽ
            </button>
          ) : (
            <button
              onClick={() => {
                memberList.length > 0 && save();
              }}
              type="button"
              disabled={memberList.length === 0}
              class={`text-white bg-[#c80000] ${
                memberList.length === 0 && "bg-opacity-50"
              } hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5`}
            >
              Chia sẽ
            </button>
          )}
        </div>
      }
      centered
      className="private"
    >
      <div className="mt-1 gap-x-2">
        <input
          onChange={(e) => searchField(e.target.value)}
          value={valueSearch}
          placeholder="Tìm kiếm....."
          aria-label="name"
          className={
            name === ""
              ? "bg-gray-50 border-b border-red-800 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5"
              : "bg-gray-50 border-b border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5"
          }
          type="text"
        />
        <div className="mt-1">
          {memberList.length > 0 && (
            <>
              <div className="text-[12px] font-semibold">
                Đã chọn ({memberList?.length}/50)
              </div>
              <div className="flex py-2 items-center gap-x-2 gap-y-2 flex-wrap h-[50px] overflow-auto scroll-chat">
                {memberList?.map((item, index) => {
                  const author = authors?.find(
                    (x) => x?.authorId === item?.authorId
                  );
                  return (
                    <div
                      key={index}
                      className={` shadow-md shadow-gray-400 rounded-full bg-gray-200 flex items-center gap-x-2 px-[4px] py-[2px]  cursor-pointer`}
                    >
                      <Image
                        src={
                          author?.user?.photo && author?.user?.photo?.length > 0
                            ? author?.user?.photo
                            : "/dumuc/avatar.jpg"
                        }
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-[20px] h-[20px] rounded-full"
                      />
                      <div className="flex justify-between w-full items-center gap-x-2">
                        <Link
                          href={`/author/${author?.slug}/${author?.authorId}`}
                          className="text-[10px] font-normal"
                        >
                          {author?.name}
                        </Link>
                        <IoMdCloseCircle
                          className="text-gray-400"
                          size={14}
                          onClick={() => {
                            memberList.splice(index, 1);
                            setMemberList([...memberList]);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {/* <div className=" font-semibold">Danh sách bạn bè</div> */}
          {friendList?.length > 0 ? (
            <div className="h-[180px] overflow-auto scroll-chat mt-2 border-t border-gray-500 ">
              {friendList?.map((item, index) => {
                const author = authors?.find(
                  (x) => x?.authorId === item?.authorId
                );
                return (
                  <div
                    key={index}
                    onClick={() => {
                      const find = memberList?.findIndex(
                        (x) => x?.authorId === author?.authorId
                      );
                      if (find < 0) {
                        if (memberList.length <= 49) {
                          memberList.push(author);
                        } else {
                          message.error(
                            "Chỉ được chia sẽ tối đa 50 người 1 lần"
                          );
                        }
                      } else {
                        memberList.splice(find, 1);
                      }
                      setMemberList([...memberList]);
                    }}
                    className={` rounded-md flex items-center gap-x-2 pl-[15px] pr-2 mt-[10px] cursor-pointer`}
                  >
                    <div className="w-5 h-4 flex items-center justify-center border border-gray-400 rounded-[2px] text-sky-500 mr-3">
                      {memberList?.find(
                        (x) => x?.authorId === author?.authorId
                      ) && <FaCheck size={12} />}
                    </div>
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
                      <div className="flex flex-col">
                        <div className="text-base">{author?.name}</div>
                      </div>
                      {/* <span className='text-[13px] text-[#00000080]'>13 phút</span> */}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center text-base mt-2">
              Danh bạn đang trống
            </div>
          )}
        </div>
        <div className={friendList?.length > 0 && "border-t border-gray-500"}>
          <div className="text-[12px] font-semibold">Nội dung chia sẽ</div>
          {newMessage.length > 0 && (
            <div className="flex items-center gap-x-3">
              <div className="w-full">
                <Textarea
                  ref={textareaRef}
                  minRows={1}
                  maxRows={4}
                  value={newMessage}
                  onChange={(event) => {
                    setNewMessage(event.target.value);
                  }}
                  onFocus={(e) => {}}
                  disabled={!isEditingMessage}
                  style={{
                    resize: "none",
                    boxShadow: "none",
                    background: "white",
                    fontSize: 12,
                  }}
                />
              </div>
              <button
                className="bg-[#cecece] px-3 py-0 font-medium text-[12px]"
                onClick={() => {
                  setIsEditingMessage(true);
                  textareaRef.current?.focus();
                }}
              >
                Sửa
              </button>
            </div>
          )}
          {file.length > 0 && (
            <div>
              <div
                className={`cursor-pointer w-full cursor-pointer bg-gray-100 px-[10px] py-[5px] mt-2`}
              >
                <div className="flex items-center gap-x-2">
                  {file[0]?.type?.includes("image") ? (
                    <FaFileImage className="text-amber-500" size={32} />
                  ) : file[0]?.name?.includes("pptx") ? (
                    <SiMicrosoftpowerpoint
                      className="text-rose-700"
                      size={32}
                    />
                  ) : file[0]?.name?.includes("xlsx") ? (
                    <FaFileLines className="text-green-600" size={32} />
                  ) : file[0]?.type?.includes("video") ? (
                    <RiFileVideoFill size={32} className="text-yellow-300" />
                  ) : file[0]?.type?.includes("pdf") ? (
                    <BiSolidFilePdf size={32} className="text-rose-500" />
                  ) : file[0]?.type?.includes("doc") ? (
                    <BsFileEarmarkWordFill
                      size={32}
                      className="text-[#4367A5]"
                    />
                  ) : file[0]?.type?.includes("audio/mpeg") ? (
                    <FaFileAudio size={32} className="text-purple-600" />
                  ) : file[0]?.type?.includes("text/plain") ? (
                    <BiSolidFileTxt size={32} className="text-sky-400" />
                  ) : (
                    <FaFile size={32} className="text-sky-400" />
                  )}
                  <div className="text-[12px]">
                    <div className="font-semibold">File</div>
                    <div>
                      {file[0]?.name?.slice(0, 15)}
                      {file[0]?.name?.length > 20 && (
                        <>
                          ...
                          {file[0]?.name?.slice(
                            file[0]?.name?.length - 8,
                            file[0]?.name?.length
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {photos?.length > 0 && (
            <div className="flex gap-x-2 mt-2">
              <Image
                src={photos[0]}
                width={0}
                height={0}
                className="w-[32px] h-[30px]"
                objectFit="contain"
                sizes="100vw"
              />
              <div>[Hình ảnh]</div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
