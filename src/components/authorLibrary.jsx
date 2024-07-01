"use client";
import { getFeedsLoadMore, getStoriesLoadMore } from "@apis/feeds";
import { getAuthor, getPostsLoadMore } from "@apis/posts";
import React, { useCallback, useEffect, useState } from "react";
import FeedItems from "./FeedItems";
import ArticleItems from "./ArticleItems";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import { HiPencil } from "react-icons/hi";
import {
  createUserFollow,
  createUserToFollowerList,
  deleteAddFriend,
  deleteRecieveFriend,
  deleteUserFollow,
  deleteUserInFollowerList,
  getUser,
  receiveRequestAddFriend,
  sendRequestAddFriend,
} from "@apis/users";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { MdPending } from "react-icons/md";
import { message } from "antd";
import Link from "next/link";
const Story = dynamic(
  () => {
    return import("./Dumuc/Story");
  },
  { ssr: false }
);

export default function AuthorLibrary({
  active,
  id,
  slug,
  setOpenLibrary,
  usingUser,
  onCallback,
  authorData,
  authors,
  myFollow,
  myFriend,
}) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [postsData, setPostsData] = useState();
  const [feedsData, setFeedsData] = useState();
  const [stories, setStories] = useState([]);
  const [userAuthor, setUserAuthor] = useState();
  const [tab, setTab] = useState(0);
  const router = useRouter();

  useEffect(() => {
    let payload = {
      limit: 100,
      author: id,
    };
    // getPostsLoadMore(payload).then((posts) => setPostsData(posts))
    getPostsLoadMore(payload).then((data) => {
      let newarr = data.items;
      const myPost = newarr?.filter(
        (a) => a?.author?.user?.email === user?.email
      );
      if (myPost && myPost?.length > 0) {
        setPostsData(newarr);
      } else {
        const publishPosts = newarr?.filter((a) => a?.isPrivate === false);
        setPostsData(publishPosts);
      }
    });
    getFeedsLoadMore(payload).then((feeds) => setFeedsData(feeds));

    getStoriesLoadMore(payload).then((data) => {
      setStories(data);
    });
    setLoading(false);
  }, [id, slug]);
  useEffect(() => {
    getUser({
      userId: authorData?.userId,
    }).then((data) => setUserAuthor(data));
  }, [authorData]);

  const checkFriendType = useCallback(
    (friendAuthorId) => {
      const findFriend = myFriend?.find((x) => x?.authorId === friendAuthorId);
      if (findFriend) {
        if (findFriend?.status === 2) {
          return 2;
        } else {
          if (findFriend?.type === "send") {
            return 3;
          } else {
            return 4;
          }
        }
      }
      return 1;
    },
    [myFriend]
  );

  const [typeArr, setTypeArr] = useState([]);
  const [arrayList, setArrayList] = useState(userAuthor?.friendList);
  useEffect(() => {
    setArrayList(userAuthor?.friendList);
  }, [userAuthor]);
  useEffect(() => {
    // setTypeArr([]);
    arrayList
      // ?.filter((n) => n?.userId !== user?.uid)
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
  }, [arrayList]);
  const [followedArray, setFollowedArray] = useState([]);
  const [myFollowed, setMyFollowed] = useState([]);
  useEffect(() => {
    setMyFollowed(myFollow);
  }, [myFollow]);
  useEffect(() => {
    // setFollowedArray([]);
    arrayList?.map((item) => {
      if (followedArray?.find((a) => a?.authorId === item?.authorId)) {
        setFollowedArray(followedArray);
      } else {
        if (myFollowed?.find((x) => x?.authorId === item?.authorId)) {
          followedArray.push(item);
          setFollowedArray([...followedArray]);
        }
      }
    });
  }, [arrayList, myFollowed]);
  return (
    <div>
      <div className="px-3">
        {active === 0 && (
          <div className="">
            <FeedItems
              data={feedsData}
              authorId={id}
              onCallback={async () => {
                getFeedsLoadMore({ limit: 100, author: id }).then((feeds) =>
                  setFeedsData(feeds)
                );
              }}
              authors={authors}
              loading={loading}
              user={user}
              usingUser={usingUser}
            />
          </div>
        )}
        {active === 6 && (
          <div className="pt-5">
            <Story
              data={stories}
              onCallback={async () => {
                getStoriesLoadMore({ limit: 100 }).then((data) => {
                  setStories(data);
                });
              }}
              authors={authors}
              myFollow={myFollow}
              usingUser={usingUser}
              user={user}
              myFriend={myFriend}
            />
          </div>
        )}
        {active === 1 && (
          <div className="!bg-white">
            <ArticleItems
              data={postsData}
              authorId={id}
              onCallback={async () => {
                getPostsLoadMore({ limit: 100, author: id }).then((data) => {
                  let newarr = data.items;
                  const myPost = newarr?.filter(
                    (a) => a?.author?.user?.email === user?.email
                  );
                  if (myPost && myPost?.length > 0) {
                    setPostsData(newarr);
                  } else {
                    const publishPosts = newarr?.filter(
                      (a) => a?.isPrivate === false
                    );
                    setPostsData(publishPosts);
                  }
                });
              }}
              user={user}
              usingUser={usingUser}
            />
          </div>
        )}
        {active === 2 && (
          <div className="flex flex-col mt-6 justify-center">
            <div className="bg-white rounded-xl shadow-md shadow-gray-400 px-[15px] py-[15px] sm:px-[25px] sm:py-[20px]">
              <div className="flex justify-end mt-3">
                {user?.email === authorData?.user?.email && (
                  <button
                    onClick={() => router.push("/account/profile")}
                    className={`flex items-center justify-center rounded-lg bg-[#c80000] shadow-md shadow-gray-400 py-[5px] px-2 text-white text-sm  font-normal gap-x-2`}
                  >
                    <HiPencil size={16} />
                    Chỉnh sửa
                  </button>
                )}
              </div>
              <div className="flex flex-col gap-1 text-sm font-normal text-[#000000]">
                {authorData?.user?.activeId && (
                  <p>
                    <strong>ID:</strong> Dumuc{authorData?.user?.username}
                  </p>
                )}
                {authorData?.user?.phone && authorData?.user?.activePhone && (
                  <p>
                    <strong>Phone:</strong> {authorData?.user?.phone}
                  </p>
                )}
                {authorData?.user?.email && authorData?.user?.activeEmail && (
                  <p>
                    <strong>Email:</strong> {authorData?.user?.email}
                  </p>
                )}
                {authorData?.user?.phone && authorData?.user?.activePhone && (
                  <p>
                    <strong>Số điện thoại:</strong>
                    {authorData?.user?.phone}
                  </p>
                )}
                {authorData?.user?.numberPlate?.length > 0 && (
                  <p>
                    <strong>Biển số xe:</strong> {authorData?.user?.numberPlate}
                  </p>
                )}
                {authorData?.user?.address?.length > 0 && (
                  <p className="flex items-center gap-x-2">
                    <strong className="text-nowrap">Địa chỉ:</strong>{" "}
                    <div>{authorData?.user?.address}</div>
                  </p>
                )}
                {authorData?.user?.review?.length > 0 &&
                  authorData?.user?.activeReview && (
                    <p className="flex items-center gap-x-2">
                      <strong className="text-nowrap">Giới thiệu:</strong>{" "}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: authorData?.user?.review,
                        }}
                      ></div>
                    </p>
                  )}
              </div>
            </div>
          </div>
        )}
        {active === 3 && (
          <div className="px-5">
            <div>
              <div className="flex text-dm font-semibold bg-white">
                <button
                  onClick={() => {
                    setTab(0);
                    setArrayList(userAuthor?.friendList);
                  }}
                  className={`px-3 py-3 ${
                    tab === 0 && "border-b-2 border-[#c80000]"
                  }`}
                >
                  Bạn bè
                </button>
                <button
                  onClick={() => {
                    setTab(2);
                    setArrayList(userAuthor?.follower);
                  }}
                  className={`px-3 py-3 ${
                    tab === 2 && "border-b-2 border-[#c80000]"
                  }`}
                >
                  Người theo dõi
                </button>
                <button
                  onClick={() => {
                    setTab(1);
                    setArrayList(userAuthor?.follows);
                  }}
                  className={`px-3 py-3 ${
                    tab === 1 && "border-b-2 border-[#c80000]"
                  }`}
                >
                  Đang theo dõi
                </button>
              </div>
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              {tab === 0 &&
                userAuthor?.friendList
                  ?.filter((x) => x.status === 2)
                  ?.map((item, index) => {
                    const author = authors?.find(
                      (x) => x?.authorId === item?.authorId
                    );
                    return (
                      <div
                        key={index}
                        className="flex gap-x-2 items-center cursor-pointer w-full"
                      >
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          class="w-24 h-24 sm:w-32 sm:h-32 "
                          src={
                            author?.photo
                              ? author?.photo
                              : author?.user?.photo
                              ? author?.user?.photo
                              : "/dumuc/avatar.jpg"
                          }
                          alt={author?.name}
                          onClick={() =>
                            router.push(
                              `/author/${author?.slug}/${author?.authorId}`
                            )
                          }
                        />
                        <div class="w-full">
                          <p
                            onClick={() =>
                              router.push(
                                `/author/${author?.slug}/${author?.authorId}`
                              )
                            }
                            className="text-base font-semibold"
                          >
                            {author?.name}
                          </p>
                          {user && item?.author?.userId !== user?.uid ? (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {typeArr.find(
                                (i) =>
                                  i?.author === item?.authorId && i?.type === 1
                              ) ? (
                                <button
                                  onClick={() => {
                                    sendRequestAddFriend(
                                      {
                                        authorId: item?.authorId,
                                      },
                                      user?.accessToken
                                    );
                                    receiveRequestAddFriend(
                                      {
                                        authorUserId: item?.author?.userId,
                                      },
                                      user?.accessToken
                                    );
                                    const findIndex = typeArr.findIndex(
                                      (ab) => ab?.author === item?.authorId
                                    );
                                    typeArr.splice(findIndex, 1);
                                    setTypeArr([...typeArr]);
                                    typeArr.push({
                                      type: 3,
                                      author: item?.authorId,
                                    });
                                    setTypeArr([...typeArr]);
                                    message.success("Đã gữi yêu cầu kết bạn.");
                                    //
                                  }}
                                  type="button"
                                  class="flex text-center items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                >
                                  Kết bạn
                                </button>
                              ) : typeArr.find(
                                  (i) =>
                                    i?.author === item?.authorId &&
                                    i?.type === 2
                                ) ? (
                                <button
                                  type="button"
                                  class="flex text-center items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                >
                                  Bạn bè
                                </button>
                              ) : typeArr.find(
                                  (i) =>
                                    i?.author === item?.authorId &&
                                    i?.type === 3
                                ) ? (
                                <button
                                  onClick={async () => {
                                    deleteAddFriend(
                                      {
                                        authorId: item?.authorId,
                                      },
                                      user?.accessToken
                                    );
                                    deleteRecieveFriend(
                                      {
                                        authorUserId: item?.author?.userId,
                                      },
                                      user?.accessToken
                                    );
                                    const findIndex = typeArr.findIndex(
                                      (ab) => ab?.author === item?.authorId
                                    );
                                    typeArr.splice(findIndex, 1);
                                    setTypeArr([...typeArr]);
                                    typeArr.push({
                                      type: 1,
                                      author: item?.authorId,
                                    });
                                    setTypeArr([...typeArr]);
                                    message.success("Đã hủy kết bạn.");
                                    //
                                  }}
                                  type="button"
                                  class="flex text-center items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                >
                                  <>Hủy lời mời</>
                                </button>
                              ) : typeArr.find(
                                  (i) =>
                                    i?.author === item?.authorId &&
                                    i?.type === 4
                                ) ? (
                                <button
                                  type="button"
                                  class="flex text-center items-center group gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                >
                                  Phản hồi
                                  <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                    <Link
                                      href={``}
                                      onClick={async (e) => {
                                        e.preventDefault();
                                        await deleteAddFriend(
                                          {
                                            authorId: item?.authorId,
                                          },
                                          user?.accessToken
                                        ).then(async (result) => {
                                          //update recoil
                                          deleteRecieveFriend(
                                            {
                                              authorUserId:
                                                item?.author?.userId,
                                            },
                                            user?.accessToken
                                          );
                                        });
                                        await sendRequestAddFriend(
                                          {
                                            authorId: item?.authorId,
                                            status: 2,
                                          },
                                          user?.accessToken
                                        ).then(() => {
                                          receiveRequestAddFriend(
                                            {
                                              authorUserId:
                                                item?.author?.userId,
                                              status: 2,
                                            },
                                            user?.accessToken
                                          );
                                        });

                                        const findIndex = typeArr.findIndex(
                                          (ab) => ab?.author === item?.authorId
                                        );
                                        typeArr.splice(findIndex, 1);
                                        setTypeArr([...typeArr]);
                                        typeArr.push({
                                          type: 2,
                                          author: item?.authorId,
                                        });
                                        setTypeArr([...typeArr]);
                                        message.success(
                                          "Bạn đã đồng ý kết bạn"
                                        );
                                      }}
                                      className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-center"
                                    >
                                      Xác nhận
                                    </Link>
                                    <Link
                                      href={``}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        deleteAddFriend(
                                          {
                                            authorId: item?.authorId,
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
                                          (ab) => ab?.author === item?.authorId
                                        );
                                        typeArr.splice(findIndex, 1);
                                        setTypeArr([...typeArr]);
                                        typeArr.push({
                                          type: 1,
                                          author: item?.authorId,
                                        });
                                        setTypeArr([...typeArr]);
                                        message.success(
                                          "Đã xóa yêu cầu kết bạn"
                                        );
                                      }}
                                      className="text-center hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-center"
                                    >
                                      Xóa lời mời
                                    </Link>
                                  </div>
                                </button>
                              ) : (
                                ""
                              )}
                              <Link
                                href={`/chat?friendId=${item?.authorId}`}
                                className="flex text-center items-center gap-x-2 px-2 py-1 text-xs font-medium text-center bg-blue-700 text-white rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                Nhắn tin
                              </Link>
                              {followedArray?.find(
                                (a) => a?.authorId === item?.author?.authorId
                              ) ? (
                                <Link
                                  href={``}
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    deleteUserFollow(
                                      {
                                        authorId: item?.author?.authorId,
                                      },
                                      user?.accessToken
                                    );
                                    deleteUserInFollowerList(
                                      {
                                        authorUserId: item?.author?.userId,
                                      },
                                      user?.accessToken
                                    );
                                    const findIndex = followedArray?.findIndex(
                                      (ab) =>
                                        ab?.author === item?.author?.authorId
                                    );
                                    followedArray.splice(findIndex, 1);
                                    setFollowedArray([...followedArray]);
                                    message.success("Đã hủy dõi");
                                  }}
                                  className={`bg-gray-300 rounded px-2 py-1 text-left text-xs font-medium`}
                                >
                                  {" "}
                                  Hủy theo dõi
                                </Link>
                              ) : (
                                <Link
                                  href={``}
                                  onClick={async (e) => {
                                    e.preventDefault();
                                    createUserFollow(
                                      {
                                        authorId: item?.author?.authorId,
                                      },
                                      user?.accessToken
                                    );
                                    createUserToFollowerList(
                                      {
                                        authorUserId: item?.author?.userId,
                                      },
                                      user?.accessToken
                                    );
                                    // setFollowing(true);
                                    followedArray?.push(item);
                                    setFollowedArray([...followedArray]);
                                    message.success("Đã theo dõi thành công");
                                  }}
                                  className={`bg-gray-300 rounded px-2 py-1 text-center text-xs font-medium`}
                                >
                                  Theo dõi
                                </Link>
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}
              {tab === 1 &&
                userAuthor?.follows?.map((item, index) => {
                  const author = authors?.find(
                    (x) => x?.authorId === item?.authorId
                  );
                  return (
                    <div
                      key={index}
                      className="flex gap-x-3 items-center cursor-pointer w-full"
                    >
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        class="w-24 h-24 sm:w-32 sm:h-32 "
                        src={
                          author?.photo
                            ? author?.photo
                            : author?.user?.photo
                            ? author?.user?.photo
                            : "/dumuc/avatar.jpg"
                        }
                        alt={item?.author?.name}
                        onClick={() =>
                          router.push(
                            `/author/${author?.slug}/${author?.authorId}`
                          )
                        }
                      />
                      <div class="w-full">
                        <p
                          onClick={() =>
                            router.push(
                              `/author/${author?.slug}/${author?.authorId}`
                            )
                          }
                          className="text-base font-semibold"
                        >
                          {author?.name}
                        </p>
                        {user && item?.author?.userId !== user?.uid ? (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {typeArr.find(
                              (i) =>
                                i?.author === item?.authorId && i?.type === 1
                            ) ? (
                              <button
                                onClick={() => {
                                  sendRequestAddFriend(
                                    {
                                      authorId: item?.authorId,
                                    },
                                    user?.accessToken
                                  );
                                  receiveRequestAddFriend(
                                    {
                                      authorUserId: item?.author?.userId,
                                    },
                                    user?.accessToken
                                  );
                                  const findIndex = typeArr.findIndex(
                                    (ab) => ab?.author === item?.authorId
                                  );
                                  typeArr.splice(findIndex, 1);
                                  setTypeArr([...typeArr]);
                                  typeArr.push({
                                    type: 3,
                                    author: item?.authorId,
                                  });
                                  setTypeArr([...typeArr]);
                                  message.success("Đã gữi yêu cầu kết bạn.");
                                  //
                                }}
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                Kết bạn
                              </button>
                            ) : typeArr.find(
                                (i) =>
                                  i?.author === item?.authorId && i?.type === 2
                              ) ? (
                              <button
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                Bạn bè
                              </button>
                            ) : typeArr.find(
                                (i) =>
                                  i?.author === item?.authorId && i?.type === 3
                              ) ? (
                              <button
                                onClick={async () => {
                                  deleteAddFriend(
                                    {
                                      authorId: item?.authorId,
                                    },
                                    user?.accessToken
                                  );
                                  deleteRecieveFriend(
                                    {
                                      authorUserId: item?.author?.userId,
                                    },
                                    user?.accessToken
                                  );
                                  const findIndex = typeArr.findIndex(
                                    (ab) => ab?.author === item?.authorId
                                  );
                                  typeArr.splice(findIndex, 1);
                                  setTypeArr([...typeArr]);
                                  typeArr.push({
                                    type: 1,
                                    author: item?.authorId,
                                  });
                                  setTypeArr([...typeArr]);
                                  message.success("Đã hủy kết bạn.");
                                  //
                                }}
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                <>Hủy lời mời</>
                              </button>
                            ) : typeArr.find(
                                (i) =>
                                  i?.author === item?.authorId && i?.type === 4
                              ) ? (
                              <button
                                type="button"
                                class="flex items-center group gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                Phản hồi
                                <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                  <Link
                                    href={``}
                                    onClick={async (e) => {
                                      e.preventDefault();
                                      await deleteAddFriend(
                                        {
                                          authorId: item?.authorId,
                                        },
                                        user?.accessToken
                                      ).then(async (result) => {
                                        //update recoil
                                        deleteRecieveFriend(
                                          {
                                            authorUserId: item?.author?.userId,
                                          },
                                          user?.accessToken
                                        );
                                      });
                                      await sendRequestAddFriend(
                                        {
                                          authorId: item?.authorId,
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

                                      const findIndex = typeArr.findIndex(
                                        (ab) => ab?.author === item?.authorId
                                      );
                                      typeArr.splice(findIndex, 1);
                                      setTypeArr([...typeArr]);
                                      typeArr.push({
                                        type: 2,
                                        author: item?.authorId,
                                      });
                                      setTypeArr([...typeArr]);
                                      message.success("Bạn đã đồng ý kết bạn");
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
                                          authorId: item?.authorId,
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
                                        (ab) => ab?.author === item?.authorId
                                      );
                                      typeArr.splice(findIndex, 1);
                                      setTypeArr([...typeArr]);
                                      typeArr.push({
                                        type: 1,
                                        author: item?.authorId,
                                      });
                                      setTypeArr([...typeArr]);
                                      message.success("Đã xóa yêu cầu kết bạn");
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
                            <Link
                              href={`/chat?friendId=${item?.authorId}`}
                              className="flex items-center gap-x-2 px-2 py-1 text-xs font-medium text-center bg-blue-700 text-white rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                              Nhắn tin
                            </Link>
                            {followedArray?.find(
                              (a) => a?.authorId === item?.author?.authorId
                            ) ? (
                              <Link
                                href={``}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  deleteUserFollow(
                                    {
                                      authorId: item?.author?.authorId,
                                    },
                                    user?.accessToken
                                  );
                                  deleteUserInFollowerList(
                                    {
                                      authorUserId: item?.author?.userId,
                                    },
                                    user?.accessToken
                                  );
                                  const findIndex = followedArray?.findIndex(
                                    (ab) =>
                                      ab?.author === item?.author?.authorId
                                  );
                                  followedArray.splice(findIndex, 1);
                                  setFollowedArray([...followedArray]);
                                  message.success("Đã hủy dõi");
                                }}
                                className={`bg-gray-300 rounded px-2 py-1 text-left text-xs font-medium`}
                              >
                                {" "}
                                Hủy theo dõi
                              </Link>
                            ) : (
                              <Link
                                href={``}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  createUserFollow(
                                    {
                                      authorId: item?.author?.authorId,
                                    },
                                    user?.accessToken
                                  );
                                  createUserToFollowerList(
                                    {
                                      authorUserId: item?.author?.userId,
                                    },
                                    user?.accessToken
                                  );
                                  // setFollowing(true);
                                  followedArray?.push(item);
                                  setFollowedArray([...followedArray]);
                                  message.success("Đã theo dõi thành công");
                                }}
                                className={`bg-gray-300 rounded px-2 py-1 text-left text-xs font-medium`}
                              >
                                Theo dõi
                              </Link>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
              {tab === 2 &&
                userAuthor?.follower?.map((item, index) => {
                  const author = authors?.find(
                    (x) => x?.authorId === item?.authorId
                  );
                  return (
                    <div
                      key={index}
                      className="flex gap-x-3 items-center cursor-pointer w-full"
                    >
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        class="w-24 h-24 sm:w-32 sm:h-32 "
                        src={
                          author?.photo
                            ? author?.photo
                            : author?.user?.photo
                            ? author?.user?.photo
                            : "/dumuc/avatar.jpg"
                        }
                        alt={item?.author?.name}
                        onClick={() =>
                          router.push(
                            `/author/${author?.slug}/${author?.authorId}`
                          )
                        }
                      />
                      <div class="w-full">
                        <p
                          onClick={() =>
                            router.push(
                              `/author/${author?.slug}/${author?.authorId}`
                            )
                          }
                          className="text-base font-semibold"
                        >
                          {author?.name}
                        </p>
                        {user && item?.author?.userId !== user?.uid ? (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {typeArr.find(
                              (i) =>
                                i?.author === item?.authorId && i?.type === 1
                            ) ? (
                              <button
                                onClick={() => {
                                  sendRequestAddFriend(
                                    {
                                      authorId: item?.authorId,
                                    },
                                    user?.accessToken
                                  );
                                  receiveRequestAddFriend(
                                    {
                                      authorUserId: item?.author?.userId,
                                    },
                                    user?.accessToken
                                  );
                                  const findIndex = typeArr.findIndex(
                                    (ab) => ab?.author === item?.authorId
                                  );
                                  typeArr.splice(findIndex, 1);
                                  setTypeArr([...typeArr]);
                                  typeArr.push({
                                    type: 3,
                                    author: item?.authorId,
                                  });
                                  setTypeArr([...typeArr]);
                                  message.success("Đã gữi yêu cầu kết bạn.");
                                  //
                                }}
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                Kết bạn
                              </button>
                            ) : typeArr.find(
                                (i) =>
                                  i?.author === item?.authorId && i?.type === 2
                              ) ? (
                              <button
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                Bạn bè
                              </button>
                            ) : typeArr.find(
                                (i) =>
                                  i?.author === item?.authorId && i?.type === 3
                              ) ? (
                              <button
                                onClick={async () => {
                                  deleteAddFriend(
                                    {
                                      authorId: item?.authorId,
                                    },
                                    user?.accessToken
                                  );
                                  deleteRecieveFriend(
                                    {
                                      authorUserId: item?.author?.userId,
                                    },
                                    user?.accessToken
                                  );
                                  const findIndex = typeArr.findIndex(
                                    (ab) => ab?.author === item?.authorId
                                  );
                                  typeArr.splice(findIndex, 1);
                                  setTypeArr([...typeArr]);
                                  typeArr.push({
                                    type: 1,
                                    author: item?.authorId,
                                  });
                                  setTypeArr([...typeArr]);
                                  message.success("Đã hủy kết bạn.");
                                  //
                                }}
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                <>Hủy lời mời</>
                              </button>
                            ) : typeArr.find(
                                (i) =>
                                  i?.author === item?.authorId && i?.type === 4
                              ) ? (
                              <button
                                type="button"
                                class="flex items-center group gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                Phản hồi
                                <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                  <Link
                                    href={``}
                                    onClick={async (e) => {
                                      e.preventDefault();
                                      await deleteAddFriend(
                                        {
                                          authorId: item?.authorId,
                                        },
                                        user?.accessToken
                                      ).then(async (result) => {
                                        //update recoil
                                        deleteRecieveFriend(
                                          {
                                            authorUserId: item?.author?.userId,
                                          },
                                          user?.accessToken
                                        );
                                      });
                                      await sendRequestAddFriend(
                                        {
                                          authorId: item?.authorId,
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

                                      const findIndex = typeArr.findIndex(
                                        (ab) => ab?.author === item?.authorId
                                      );
                                      typeArr.splice(findIndex, 1);
                                      setTypeArr([...typeArr]);
                                      typeArr.push({
                                        type: 2,
                                        author: item?.authorId,
                                      });
                                      setTypeArr([...typeArr]);
                                      message.success("Bạn đã đồng ý kết bạn");
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
                                          authorId: item?.authorId,
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
                                        (ab) => ab?.author === item?.authorId
                                      );
                                      typeArr.splice(findIndex, 1);
                                      setTypeArr([...typeArr]);
                                      typeArr.push({
                                        type: 1,
                                        author: item?.authorId,
                                      });
                                      setTypeArr([...typeArr]);
                                      message.success("Đã xóa yêu cầu kết bạn");
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
                            <Link
                              href={`/chat?friendId=${item?.authorId}`}
                              className="flex items-center gap-x-2 px-2 py-1 text-xs font-medium text-center bg-blue-700 text-white rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                            >
                              Nhắn tin
                            </Link>
                            {followedArray?.find(
                              (a) => a?.authorId === item?.author?.authorId
                            ) ? (
                              <Link
                                href={``}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  deleteUserFollow(
                                    {
                                      authorId: item?.author?.authorId,
                                    },
                                    user?.accessToken
                                  );
                                  deleteUserInFollowerList(
                                    {
                                      authorUserId: item?.author?.userId,
                                    },
                                    user?.accessToken
                                  );
                                  const findIndex = followedArray?.findIndex(
                                    (ab) =>
                                      ab?.author === item?.author?.authorId
                                  );
                                  followedArray.splice(findIndex, 1);
                                  setFollowedArray([...followedArray]);
                                  message.success("Đã hủy dõi");
                                }}
                                className={`bg-gray-300 rounded px-2 py-1 text-left text-xs font-medium`}
                              >
                                {" "}
                                Hủy theo dõi
                              </Link>
                            ) : (
                              <Link
                                href={``}
                                onClick={async (e) => {
                                  e.preventDefault();
                                  createUserFollow(
                                    {
                                      authorId: item?.author?.authorId,
                                    },
                                    user?.accessToken
                                  );
                                  createUserToFollowerList(
                                    {
                                      authorUserId: item?.author?.userId,
                                    },
                                    user?.accessToken
                                  );
                                  // setFollowing(true);
                                  followedArray?.push(item);
                                  setFollowedArray([...followedArray]);
                                  message.success("Đã theo dõi thành công");
                                }}
                                className={`bg-gray-300 rounded px-2 py-1 text-left text-xs font-medium`}
                              >
                                Theo dõi
                              </Link>
                            )}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
        {active === 4 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {authorData?.photos?.map(
              (photo, index) =>
                photo?.type === "image" && (
                  <Image
                    key={index}
                    alt=""
                    src={photo?.url}
                    sizes="100vw"
                    width={0}
                    height={0}
                    className="w-full h-full rounded-md"
                  />
                )
            )}
          </div>
        )}
        {active === 5 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
            {authorData?.photos?.map(
              (photo, index) =>
                photo?.type === "video" && (
                  <video
                    key={index}
                    className="rounded-lg w-full h-[200px]"
                    controls
                    loop
                  >
                    <source src={photo.url} type="video/mp4" />
                  </video>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
