"use client";
import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@utils/firebase";
import {
  createUserFollow,
  createUserToFollowerList,
  deleteAddFriend,
  deleteRecieveFriend,
  deleteUserFollow,
  deleteUserInFollowerList,
  getProfile,
  getUser,
  receiveRequestAddFriend,
  sendRequestAddFriend,
} from "@apis/users";
import { FaCheck, FaUserCheck, FaUserPlus } from "react-icons/fa6";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { IoMdCloseCircle, IoMdSearch } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { FaUserTimes } from "react-icons/fa";
import { MdOutlinePending, MdPending } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function ModalAddFriend({
  visible,
  onCancel,
  onCallback,
  authors,
  onChooseUser,
  user,
  usingUser,
  checkFriendType,
  setFriendList,
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [findAuthor, setFindAuthor] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(-1);
  const [loadingFeedback, setLoadingFeedback] = useState(-1);
  const [loadingRemove, setLoadingRemove] = useState(-1);
  const [typeArr, setTypeArr] = useState([]);
  useEffect(() => {
    setTypeArr([]);
    findAuthor
      ?.filter((n) => n?.userId !== user?.uid)
      ?.map((x) => {
        const friendType = checkFriendType(x?.authorId);
        if (typeArr?.find((a) => a.author === x?.authorId)) {
          setTypeArr(typeArr);
        } else {
          if (friendType === 2) {
            typeArr.push({
              author: x?.authorId,
              type: 2,
            });
            setTypeArr([...typeArr]);
          } else if (friendType === 3) {
            typeArr.push({
              author: x?.authorId,
              type: 3,
            });
            setTypeArr([...typeArr]);
          } else if (friendType === 4) {
            typeArr.push({
              author: x?.authorId,
              type: 4,
            });
            setTypeArr([...typeArr]);
          } else {
            typeArr.push({
              author: x?.authorId,
              type: 1,
            });
            setTypeArr([...typeArr]);
          }
        }
      });
  }, [findAuthor]);

  const searchField = (value) => {
    setValueSearch(value);
    if (value.trim() === "") {
      setFindAuthor([]);
    } else {
      const searchAuthor = authors.filter(
        (x) =>
          x?.name
            ?.trim()
            ?.toLowerCase()
            ?.includes(value?.trim()?.toLowerCase()) ||
          x?.user?.phone === value?.trim()?.toLowerCase()
      );
      if (searchAuthor && searchAuthor.length > 0) {
        setFindAuthor(searchAuthor);
      } else {
        setFindAuthor([]);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      title={`Thêm bạn`}
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose={true}
      footer={null}
      centered
      className="private"
    >
      <div className="">
        <div className="flex justify-end mb-[12px]">
          <Link
            href={"/account/recent-members"}
            className="bg-indigo-500 border border-indigo-500 text-white leading-normal pb-[6px] pt-[3px] px-[12px] rounded-full hover:text-indigo-500 hover:bg-white"
          >
            Tìm bạn quanh đây
          </Link>
        </div>
        <div className="flex relative flex items-center bg-white pl-[10px] bg-gray-50 border border-gray-500 text-gray-900 rounded-lg w-full">
          <div className="">
            <IoMdSearch size={24} color="#000" />
          </div>
          <input
            onChange={(e) => searchField(e.target.value)}
            value={valueSearch}
            placeholder="Nhập tên hoặc số điện thoại"
            aria-label="name"
            className="pr-[40px] py-[8px] pl-[10px] text-base placeholder-[#000] bg-white w-full rounded-lg border-none focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
          />
          {valueSearch.trim() !== "" && (
            <button
              onClick={() => {
                setValueSearch("");
                setFindAuthor([]);
              }}
              className="absolute right-[10px]"
            >
              <IoCloseCircle size={20} className="text-[#c80000]" />
            </button>
          )}
        </div>
        <div className="mt-5">
          {findAuthor?.length > 0 ? (
            findAuthor?.map((x, indexParent) => {
              return (
                x?.userId !== user.uid && (
                  <div
                    key={indexParent}
                    onClick={() => {}}
                    className={` rounded-md flex items-center gap-x-2 pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div
                        className="flex gap-x-2 items-center"
                        onClick={() =>
                          router.push(`/author/${x?.slug}/${x?.authorId}`)
                        }
                      >
                        <Image
                          src={
                            x?.user?.photo && x?.user?.photo?.length > 0
                              ? x?.user?.photo
                              : "/dumuc/avatar.png"
                          }
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-[45px] h-[45px] rounded-full"
                        />
                        <div
                          className="text-base"
                          onClick={() =>
                            router.push(`/author/${x?.slug}/${x?.authorId}`)
                          }
                        >
                          {x?.name}
                        </div>
                      </div>
                      <div className="flex items-center gap-x-4">
                        <MdOutlinePending
                          size={32}
                          className="mt-[8px] text-gray-400"
                          onClick={() => {
                            onChooseUser(x);
                            onCancel();
                          }}
                        />

                        {x?.userId !== user.uid && (
                          <div className="flex items-center gap-x-2 mt-2">
                            {typeArr.find(
                              (i) => i?.author === x?.authorId && i?.type === 1
                            ) ? (
                              <button
                                onClick={() => {
                                  sendRequestAddFriend(
                                    {
                                      authorId: x?.authorId,
                                    },
                                    user?.accessToken
                                  );
                                  receiveRequestAddFriend(
                                    {
                                      authorUserId: x?.userId,
                                    },
                                    user?.accessToken
                                  );
                                  const findIndex = typeArr.findIndex(
                                    (ab) => ab?.author === x?.authorId
                                  );
                                  typeArr.splice(findIndex, 1);
                                  setTypeArr([...typeArr]);
                                  typeArr.push({
                                    type: 3,
                                    author: x?.authorId,
                                  });
                                  setTypeArr([...typeArr]);
                                  message.success("Đã gữi yêu cầu kết bạn.");
                                  // setFriendList(usingUser?.friendList);
                                }}
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                Kết bạn
                              </button>
                            ) : typeArr.find(
                                (i) =>
                                  i?.author === x?.authorId && i?.type === 2
                              ) ? (
                              <button
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                onClick={() =>
                                  router.push(
                                    `/author/${x?.slug}/${x?.authorId}`
                                  )
                                }
                              >
                                Bạn bè
                              </button>
                            ) : typeArr.find(
                                (i) =>
                                  i?.author === x?.authorId && i?.type === 3
                              ) ? (
                              <button
                                onClick={async () => {
                                  deleteAddFriend(
                                    {
                                      authorId: x?.authorId,
                                    },
                                    user?.accessToken
                                  );
                                  deleteRecieveFriend(
                                    {
                                      authorUserId: x?.userId,
                                    },
                                    user?.accessToken
                                  );
                                  const findIndex = typeArr.findIndex(
                                    (ab) => ab?.author === x?.authorId
                                  );
                                  typeArr.splice(findIndex, 1);
                                  setTypeArr([...typeArr]);
                                  typeArr.push({
                                    type: 1,
                                    author: x?.authorId,
                                  });
                                  setTypeArr([...typeArr]);
                                  message.success("Đã hủy kết bạn.");
                                  // setFriendList(usingUser?.friendList);
                                }}
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                <>Hủy lời mời</>
                              </button>
                            ) : typeArr.find(
                                (i) =>
                                  i?.author === x?.authorId && i?.type === 4
                              ) ? (
                              <button
                                type="button"
                                class="flex items-center group gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                {loadingAdd === indexParent ? (
                                  <Spinner className="w-4 h-4" />
                                ) : (
                                  <>Phản hồi</>
                                )}
                                <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                  <Link
                                    href={``}
                                    onClick={async (e) => {
                                      e.preventDefault();
                                      await deleteAddFriend(
                                        {
                                          authorId: x?.authorId,
                                        },
                                        user?.accessToken
                                      ).then(async (result) => {
                                        //update recoil
                                        deleteRecieveFriend(
                                          {
                                            authorUserId: x?.userId,
                                          },
                                          user?.accessToken
                                        );
                                      });
                                      await sendRequestAddFriend(
                                        {
                                          authorId: x?.authorId,
                                          status: 2,
                                        },
                                        user?.accessToken
                                      ).then(() => {
                                        receiveRequestAddFriend(
                                          {
                                            authorUserId: x?.userId,
                                            status: 2,
                                          },
                                          user?.accessToken
                                        );
                                      });

                                      const findIndex = typeArr.findIndex(
                                        (ab) => ab?.author === x?.authorId
                                      );
                                      typeArr.splice(findIndex, 1);
                                      setTypeArr([...typeArr]);
                                      typeArr.push({
                                        type: 2,
                                        author: x?.authorId,
                                      });
                                      setTypeArr([...typeArr]);
                                      message.success("Bạn đã đồng ý kết bạn");
                                      // setFriendList(usingUser?.friendList);
                                    }}
                                    className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                  >
                                    Xác nhận
                                  </Link>
                                  <Link
                                    href={``}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      deleteAddFriend(
                                        {
                                          authorId: x?.authorId,
                                        },
                                        user?.accessToken
                                      );
                                      deleteRecieveFriend(
                                        {
                                          authorUserId: x?.userId,
                                        },
                                        user?.accessToken
                                      );
                                      const findIndex = typeArr.findIndex(
                                        (ab) => ab?.author === x?.authorId
                                      );
                                      typeArr.splice(findIndex, 1);
                                      setTypeArr([...typeArr]);
                                      typeArr.push({
                                        type: 1,
                                        author: x?.authorId,
                                      });
                                      setTypeArr([...typeArr]);
                                      message.success("Đã xóa yêu cầu kết bạn");
                                      setFriendList(usingUser?.friendList);
                                    }}
                                    className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                  >
                                    Xóa lời mời
                                  </Link>
                                </div>
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              );
            })
          ) : (
            <div className="h-full w-full flex justify-center items-center text-base">
              Không tìm thấy người dùng. Hãy đổi từ khóa
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
