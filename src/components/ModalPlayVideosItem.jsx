"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  createUserFollow,
  createUserToFollowerList,
  deleteAddFriend,
  deleteRecieveFriend,
  deleteUserFollow,
  deleteUserInFollowerList,
  getProfile,
  receiveRequestAddFriend,
  sendRequestAddFriend,
} from "@apis/users";
import { message } from "antd";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { FaUserTimes } from "react-icons/fa";
import { FaPencil, FaUserCheck, FaUserPlus } from "react-icons/fa6";
import { useWindowSize } from "@hooks/useWindowSize";
import { useEffect } from "react";
const QuickAddStory = dynamic(
  () => {
    return import("./QuickAddStory");
  },
  { ssr: false }
);
const StoryLikeShareComment = dynamic(
  () => {
    return import("./Story/StoryLikeShareComment");
  },
  { ssr: false }
);
export default function ModalPlayVideosItem({
  item,
  user,
  usingUser,
  imageList,
  onCallback,
  myFollow,
  myFriend,
}) {
  const router = useRouter();
  const sizes = useWindowSize();
  const [loading2, setLoading2] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [activeEdit, setActiveEdit] = useState();
  const [following, setFollowing] = useState();
  const [friendType, setFriendType] = useState(1);
  // 1 = "chưa bạn" 2 = "Bạn bè" 3 = "đã gửi" 4 = Đã nhận
  useEffect(() => {
    const find = myFollow?.find((a) => a.authorId === item?.author?.authorId);
    const findFriend = myFriend?.find(
      (x) => x?.authorId === item?.author?.authorId
    );
    if (find) {
      setFollowing(true);
    }
    if (findFriend) {
      if (findFriend?.status === 2) {
        setFriendType(2);
      } else {
        if (findFriend?.type === "send") {
          setFriendType(3);
        } else {
          setFriendType(4);
        }
      }
    }
  }, []);
  return (
    <div className="bg-white w-full">
      {item?.type === "file" ? (
        <video className="w-full h-full object-contain" controls loop>
          <source src={item.photos} type="video/mp4" />
        </video>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: item?.description }}></div>
      )}
      <div className="py-2 px-4">
        <div
          className={`flex justify-between mb-4 ${
            sizes.width > 450 ? "items-center flex-row" : "flex-col items-start"
          } gap-2`}
        >
          <div className="flex items-center gap-x-2 ">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              class="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
              src={
                item?.author?.photo
                  ? item?.author?.photo
                  : item?.author?.user?.photo
                  ? item?.author?.user?.photo
                  : "/dumuc/avatar.png"
              }
              alt={item?.author?.name}
            />
            <Link
              class="text-base sm:text-lg font-semibold leading-none text-gray-900 dark:text-white"
              href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
            >
              {item?.author?.name}
            </Link>
          </div>
          {item?.author?.userId !== user?.uid ? (
            <div className="flex items-center gap-x-2 mt-2">
              {friendType === 1 ? (
                <button
                  onClick={() => {
                    if (user) {
                      sendRequestAddFriend(
                        {
                          authorId: item?.author?.authorId,
                        },
                        user?.accessToken
                      );
                      receiveRequestAddFriend(
                        {
                          authorUserId: item?.author?.userId,
                        },
                        user?.accessToken
                      ).then(() => {});
                      setFriendType(3);
                      message.success("Đã gữi yêu cầu kết bạn.");
                    } else {
                      router.push(
                        `/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}?${item?.storyId}`
                      );
                    }
                  }}
                  type="button"
                  class="flex items-center gap-x-1 px-4 py-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <FaUserPlus size={18} />
                  Thêm bạn bè
                </button>
              ) : friendType === 2 ? (
                <button
                  type="button"
                  class="flex items-center group gap-x-2 px-4 py-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <>
                    <FaUserCheck size={18} className="w-4 h-4" />
                    Bạn bè
                  </>
                </button>
              ) : friendType === 3 ? (
                <button
                  onClick={() => {
                    deleteAddFriend(
                      {
                        authorId: item?.author?.authorId,
                      },
                      user?.accessToken
                    );
                    deleteRecieveFriend(
                      {
                        authorUserId: item?.author?.userId,
                      },
                      user?.accessToken
                    );
                    setFriendType(1);
                    message.success("Đã hủy kết bạn.");
                  }}
                  type="button"
                  class="flex items-center gap-x-1 px-4 py-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <FaUserTimes size={18} />
                  Hủy lời mời
                </button>
              ) : friendType === 4 ? (
                <button
                  type="button"
                  class="flex items-center gap-x-2 relative cursor-pointer group px-4 py-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  <>
                    <FaUserCheck size={18} />
                    Phản hồi
                  </>
                  <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                    <Link
                      href={``}
                      onClick={(e) => {
                        e.preventDefault();

                        deleteAddFriend(
                          {
                            authorId: item?.author?.authorId,
                          },
                          user?.accessToken
                        );
                        deleteRecieveFriend(
                          {
                            authorUserId: item?.author?.userId,
                          },
                          user?.accessToken
                        );
                        sendRequestAddFriend(
                          {
                            authorId: item?.author?.authorId,
                            status: 2,
                          },
                          user?.accessToken
                        );
                        receiveRequestAddFriend(
                          {
                            authorUserId: item?.author?.userId,
                            status: 2,
                          },
                          user?.accessToken
                        );
                        setFriendType(2);
                        message.success("Đã đồng ý kết bạn");
                      }}
                      className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                    >
                      Xác nhận
                    </Link>
                    <Link
                      href={``}
                      onClick={(e) => {
                        e.preventDefault();
                        setFriendType(1);
                        deleteAddFriend(
                          {
                            authorId: item?.author?.authorId,
                          },
                          user?.accessToken
                        );
                        deleteRecieveFriend(
                          {
                            authorUserId: item?.author?.userId,
                          },
                          user?.accessToken
                        );
                        message.success("Đã xóa yêu cầu kết bạn");
                      }}
                      className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                    >
                      Xóa lời mời
                    </Link>
                  </div>
                </button>
              ) : (
                <div></div>
              )}

              {/* follow */}
              {following ? (
                <Link
                  href={``}
                  onClick={(e) => {
                    e.preventDefault();
                    setLoading2(true);
                    deleteUserFollow(
                      {
                        authorId: item?.author?.authorId,
                      },
                      user?.accessToken
                    ).then((result) => {
                      //update recoil
                      deleteUserInFollowerList(
                        {
                          authorUserId: item?.author?.userId,
                        },
                        user?.accessToken
                      )
                        .then((e) => console.log(e))
                        .catch((e) => console.log(e));
                    });
                    setFollowing(false);
                    message.success("Hủy theo dõi thành công");
                    setLoading2(false);
                  }}
                  className="flex items-center gap-x-2 px-4 py-2 text-xs font-medium text-center text-white bg-indigo-500 rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Hủy theo dõi
                </Link>
              ) : (
                <Link
                  href={``}
                  onClick={(e) => {
                    e.preventDefault();
                    if (user) {
                      createUserFollow(
                        {
                          authorId: item?.author?.authorId,
                        },
                        user?.accessToken
                      ).then(async (result) => {
                        createUserToFollowerList(
                          {
                            authorUserId: item?.author?.userId,
                          },
                          user?.accessToken
                        )
                          .then((e) => console.log(e))
                          .catch((e) => console.log(e));
                      });
                      setFollowing(true);
                      message.success("Theo dõi thành công");
                    } else {
                      router.push(
                        `/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}?${item?.storyId}`
                      );
                    }
                  }}
                  className="flex items-center gap-x-2 px-4 py-2 text-xs font-medium text-center text-black bg-gray-300 rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Theo dõi
                </Link>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setShowEdit(true);
                setActiveEdit(item);
                // oncancel()
              }}
              className="flex items-center gap-x-2 text-sm font-medium bg-sky-600 text-white px-4 py-2 rounded-md"
            >
              <FaPencil />
              Chỉnh sửa
            </button>
          )}
        </div>
        {/* <div className='flex justify-end text-indigo-500 font-medium hover:underline mb-4'>
                                <button onClick={() => router.push(`/author/${x?.author?.slug}/${x?.author?.authorId}`)}>Trang cá nhân tác giả</button>
                            </div> */}
        <StoryLikeShareComment
          item={item}
          url={"/"}
          user={user}
          usingUser={usingUser}
        />
      </div>
      <QuickAddStory
        visible={showEdit}
        onCallback={onCallback}
        onCancel={() => setShowEdit(false)}
        data={imageList}
        activeItem={activeEdit}
        user={user}
        usingUser={usingUser}
      />
    </div>
  );
}
