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
  arrayRemove,
  arrayUnion,
  collection,
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

export default function ModalAddLeader({
  visible,
  onCancel,
  authors,
  member,
  onCloseParent,
}) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const search = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [usingUser, setUsingUser] = useState();
  const [name, setName] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [memberList, setMemberList] = useState();
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
      setFriendList(dataCall?.friendList?.filter((x) => x.status === 2));
    });
  }, [user]);
  const save = async () => {
    const washingtonRef = doc(db, "chat-groups", search.get("groupId"));
    setLoading(true);
    const find = member?.find((x) => x.user === user?.uid);
    await updateDoc(washingtonRef, {
      member: arrayRemove(find),
    })
      .then(async (result) => {
        await updateDoc(washingtonRef, {
          leader: memberList?.user,
        });
        await addDoc(
          collection(db, "chat-groups", search.get("groupId"), "messages"),
          {
            type: "exit",
            notify: true,
            user: user?.uid,
            createdAt: serverTimestamp(),
          }
        );
        await addDoc(
          collection(db, "chat-groups", search.get("groupId"), "messages"),
          {
            type: "leader",
            notify: true,
            user: memberList?.user,
            createdAt: serverTimestamp(),
          }
        );
        message.success("Bạn đã rời khỏi nhóm thành công");
        setLoading(false);
        onCancel();
        onCloseParent();
        router.push("/chat/group-public");
      })
      .catch((err) => {
        message.error("Bạn đã rời khỏi nhóm thất bại");
      });
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
      title={`Chọn nhóm trưởng mới`}
      onCancel={() => {
        onCancel();
        setName("");
        setMemberList();
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
              Xác nhận
            </button>
          ) : (
            <button
              onClick={() => {
                memberList && save();
              }}
              type="button"
              disabled={memberList ? false : true}
              class={`text-white bg-[#c80000] ${
                !memberList && "bg-opacity-50"
              } hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5`}
            >
              Xác nhận
            </button>
          )}
        </div>
      }
      centered
      className="private"
    >
      <div className="mt-1 gap-x-2">
        {/* <input
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
        /> */}
        <div className="mt-1">
          {member?.length > 0 ? (
            <div className="h-[180px] overflow-auto scroll-chat ">
              {member?.map((item, index) => {
                const author = authors?.find((x) => x?.userId === item?.user);
                return (
                  item?.user !== user.uid && (
                    <div
                      key={index}
                      onClick={() => {
                        setMemberList(item);
                      }}
                      className={` rounded-md flex items-center gap-x-2 pl-[15px] pr-2 mt-[10px] cursor-pointer`}
                    >
                      <div className="w-5 h-4 flex items-center justify-center border border-gray-400 rounded-[2px] text-sky-500 mr-3">
                        {memberList?.user === author?.userId && (
                          <FaCheck size={12} />
                        )}
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
                  )
                );
              })}
            </div>
          ) : (
            <div className="h-full w-full flex justify-center items-center text-base mt-2">
              Chưa có thành viên
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
