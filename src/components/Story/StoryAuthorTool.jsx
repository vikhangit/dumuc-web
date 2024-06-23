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
import { IoMdMore } from "react-icons/io";
import { deleteStoryByUser, getStory, updateStoryByUser } from "@apis/feeds";
import QuickAddStory from "@components/QuickAddStory";
// const QuickAddStory = dynamic(
//   () => {
//     return import("./QuickAddStory");
//   },
//   { ssr: false }
// );
// const StoryLikeShareComment = dynamic(
//   () => {
//     return import("./Story/StoryLikeShareComment");
//   },
//   { ssr: false }
// );
export default function StoryAuthorTool({
  data,
  user,
  usingUser,
  imageList,
  onCallback,
  myFollow,
  myFriend,
  close,
}) {
  const router = useRouter();
  const sizes = useWindowSize();
  const [loading2, setLoading2] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [activeEdit, setActiveEdit] = useState();
  const [following, setFollowing] = useState();
  const [friendType, setFriendType] = useState(1);
  const [item, setItem] = useState(data);
  const [hidden, setHidden] = useState(data?.isPrivate);
  useEffect(() => {
    setItem(data);
    setHidden(data?.isPrivate);
  }, [data]);
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
  const onCallbackData = (storyId) => {
    getStory({ storyId }).then((data) => {
      setItem(data);
    });
  };
  console.log(item);
  return (
    <>
      <div className="">
        <div
          className={`flex justify-between mb-4 ${
            sizes.width > 480 ? "items-center flex-row" : "flex-col items-start"
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
                  : "/dumuc/avatar.jpg"
              }
              alt={item?.author?.name}
            />
            <Link
              class="text-base sm:text-lg font-semibold leading-none text-gray-900 dark:text-white"
              href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
            >
              {item?.author?.activeNickName
                ? item?.author?.nickName
                : item?.author?.name}
            </Link>
          </div>

          <div className="flex gap-x-2 items-center">
            {item?.author?.userId !== user?.uid ? (
              <div className="flex items-center gap-x-2">
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
                        onClick={async (e) => {
                          e.preventDefault();

                          await deleteAddFriend(
                            {
                              authorId: item?.author?.authorId,
                            },
                            user?.accessToken
                          ).then(() => {
                            deleteRecieveFriend(
                              {
                                authorUserId: item?.author?.userId,
                              },
                              user?.accessToken
                            );
                          });

                          await sendRequestAddFriend(
                            {
                              authorId: item?.author?.authorId,
                              status: 2,
                            },
                            user?.accessToken
                          ).then(() => {
                            receiveRequestAddFriend(
                              {
                                authorUserId: item?.author?.userId,
                                status: 2,
                              },
                              user?.accessToken
                            );
                          });

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
            <div className="relative cursor-pointer group">
              <IoMdMore size={24} />
              <div className="absolute z-40 hidden group-hover:flex flex-col top-0 right-2 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[80px] rounded p-1">
                {item?.userId === user?.uid && (
                  <Link
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setShowEdit(true);
                      setActiveEdit(item);
                    }}
                    className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                  >
                    Sửa
                  </Link>
                )}
                {item?.userId === user?.uid && (
                  <Link
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      if (hidden === true) {
                        return updateStoryByUser(
                          {
                            ...item,
                            isPrivate: false,
                          },
                          user?.accessToken
                        ).then((result) => {
                          onCallbackData(item?.storyId);
                          setHidden(false);
                          message.success("Công khai bài viết thành công");
                        });
                      } else {
                        return updateStoryByUser(
                          {
                            ...item,
                            isPrivate: true,
                          },
                          user?.accessToken
                        ).then((result) => {
                          onCallbackData(item?.storyId);
                          setHidden(ftrue);
                          message.success("Ẩn bài viết thành công");
                        });
                      }
                    }}
                    className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                  >
                    {hidden === true ? "Hủy ẩn" : "Ẩn"}
                  </Link>
                )}
                {item?.userId !== user?.uid && (
                  <Link
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      return updateFeedByUser(
                        {
                          ...item,
                          isReport: true,
                        },
                        user?.accessToken
                      ).then((result) => {
                        message.success(
                          "Chúng tôi sẽ xem xét báo cáo của bạn về bài viết này. Xin cảm ơn!!!"
                        );
                      });
                    }}
                    className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                  >
                    Báo cáo
                  </Link>
                )}
                {item?.userId === user?.uid && (
                  <Link
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      return deleteStoryByUser(
                        item?.storyId,
                        user?.accessToken
                      ).then((result) => {
                        onCallback();
                        message.success("Xóa bài viết thành công");
                        close();
                      });
                    }}
                    className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                  >
                    Xóa
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
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
    </>
  );
}
