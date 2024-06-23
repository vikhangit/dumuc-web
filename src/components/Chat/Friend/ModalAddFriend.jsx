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
import { MdPending } from "react-icons/md";

export default function ModalAddFriend({
  visible,
  onCancel,
  onCallback,
  authors,
}) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [usingUser, setUsingUser] = useState();
  const [name, setName] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [findAuthor, setFindAuthor] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(-1);
  const [loadingFeedback, setLoadingFeedback] = useState(-1);
  const [loadingRemove, setLoadingRemove] = useState(-1);
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
      setFriendList(dataCall?.friendList?.filter((x) => x.status === 2));
    });
  }, [user]);

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
  console.log(authors);
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
      <div className="mt-8 gap-x-2">
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
                    <div className="flex justify-between w-full">
                      <div className="flex gap-x-2 items-center">
                        <Image
                          src={
                            x?.user?.photo && x?.user?.photo?.length > 0
                              ? x?.user?.photo
                              : "/dumuc/avatar.jpg"
                          }
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-[45px] h-[45px] rounded-full"
                        />
                        <div className="text-base">{x?.name}</div>
                      </div>
                      {x?.userId !== user.uid && (
                        <div className="flex items-center gap-x-2 mt-2">
                          {usingUser?.friendList?.length > 0 &&
                            usingUser?.friendList?.map((item, index) => {
                              if (
                                item?.type === "send" &&
                                item?.authorId === x?.authorId &&
                                item?.status === 1
                              ) {
                                return loadingAdd === indexParent ? (
                                  <button
                                    key={index}
                                    onClick={async () => {
                                      message.warning(
                                        "Thao tác đang được thực hiện."
                                      );
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
                                      setLoadingAdd(index);
                                      await deleteAddFriend(
                                        {
                                          authorId: x?.authorId,
                                        },
                                        user?.accessToken
                                      ).then(async (result) => {
                                        console.log(result);
                                        //update recoil
                                        await deleteRecieveFriend(
                                          {
                                            authorUserId: x?.userId,
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
                                        setLoadingAdd(-1);
                                      });
                                    }}
                                    type="button"
                                    class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                  >
                                    <>
                                      <FaUserTimes size={20} />
                                      Hủy lời mời
                                    </>
                                  </button>
                                );
                              } else if (
                                item?.type === "recieve" &&
                                item?.authorId === x?.authorId &&
                                item?.status === 1
                              ) {
                                return (
                                  <button
                                    key={index}
                                    type="button"
                                    class="flex items-center group gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                  >
                                    {loadingAdd === indexParent ? (
                                      <Spinner className="w-4 h-4" />
                                    ) : (
                                      <>
                                        <FaUserCheck size={20} />
                                        Phản hồi
                                      </>
                                    )}
                                    <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                      {loadingFeedback === indexParent ? (
                                        <Link
                                          href={``}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            message.warning(
                                              "Thao tác đang được thực hiện"
                                            );
                                          }}
                                          className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                        >
                                          <Spinner className="w-4 h-4" />
                                        </Link>
                                      ) : (
                                        <Link
                                          href={``}
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            setLoadingAdd(indexParent);
                                            setLoadingFeedback(indexParent);
                                            await deleteAddFriend(
                                              {
                                                authorId: x?.authorId,
                                              },
                                              user?.accessToken
                                            ).then(async (result) => {
                                              console.log(result);
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
                                                authorId: x?.authorId,
                                                status: 2,
                                              },
                                              user?.accessToken
                                            ).then(async (result) => {
                                              console.log(result);
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

                                            await getProfile(
                                              user?.accessToken
                                            ).then((dataCall) =>
                                              setUsingUser(dataCall)
                                            );

                                            setLoadingAdd(-1);
                                            setLoadingFeedback(-1);
                                          }}
                                          className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                        >
                                          Xác nhận
                                        </Link>
                                      )}
                                      {loadingRemove === indexParent ? (
                                        <Link
                                          href={``}
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            message.warning(
                                              "Thao tác đang được thực hiện"
                                            );
                                          }}
                                          className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                        >
                                          <Spinner className="h-4 w-4" />{" "}
                                        </Link>
                                      ) : (
                                        <Link
                                          href={``}
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            setLoadingAdd(indexParent);
                                            setLoadingRemove(indexParent);
                                            await deleteAddFriend(
                                              {
                                                authorId: x?.authorId,
                                              },
                                              user?.accessToken
                                            ).then(async (result) => {
                                              console.log(result);
                                              //update recoil
                                              await deleteRecieveFriend(
                                                {
                                                  authorUserId: x?.userId,
                                                },
                                                user?.accessToken
                                              )
                                                .then((e) => console.log(e))
                                                .catch((e) => console.log(e));
                                              const dataCall = await getProfile(
                                                user?.accessToken
                                              );
                                              setUsingUser(dataCall);
                                              message.success(
                                                "Đã xóa yêu cầu kết bạn"
                                              );
                                              setLoadingAdd(-1);
                                              setLoadingRemove(-1);
                                            });
                                          }}
                                          className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                        >
                                          Xóa lời mời
                                        </Link>
                                      )}
                                    </div>
                                  </button>
                                );
                              } else if (
                                item?.authorId === x?.authorId &&
                                item?.status === 2
                              ) {
                                return (
                                  <button
                                    key={index}
                                    type="button"
                                    class="flex items-center group gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                  >
                                    {loadingAdd === indexParent ? (
                                      <Spinner className="w-4 h-4" />
                                    ) : (
                                      <>
                                        <FaUserCheck
                                          size={20}
                                          className="w-4 h-4"
                                        />
                                        Bạn bè
                                      </>
                                    )}
                                    <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                      {usingUser?.follows?.find(
                                        (x) => x.authorId === x?.authorId
                                      ) ? (
                                        loadingFeedback === indexParent ? (
                                          <Link
                                            href={``}
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              message.success(
                                                "Thao tác đang được thực hiện"
                                              );
                                            }}
                                            className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                          >
                                            <Spinner className="w-4 h-4" />
                                          </Link>
                                        ) : (
                                          <Link
                                            href={``}
                                            onClick={async (e) => {
                                              e.preventDefault();
                                              setLoadingAdd(indexParent);
                                              setLoadingFeedback(indexParent);
                                              await deleteUserFollow(
                                                {
                                                  authorId: x?.authorId,
                                                },
                                                user?.accessToken
                                              ).then(async (result) => {
                                                console.log(result);
                                                //update recoil
                                                await deleteUserInFollowerList(
                                                  {
                                                    authorUserId: x?.userId,
                                                  },
                                                  user?.accessToken
                                                )
                                                  .then((e) => console.log(e))
                                                  .catch((e) => console.log(e));
                                                message.success(
                                                  "Hủy theo dõi thành công"
                                                );
                                              });
                                              await getProfile(
                                                user?.accessToken
                                              ).then((dataCall) =>
                                                setUsingUser(dataCall)
                                              );

                                              setLoadingAdd(-1);
                                              setLoadingFeedback(-1);
                                            }}
                                            className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                          >
                                            Hủy theo dõi
                                          </Link>
                                        )
                                      ) : loadingFeedback === indexParent ? (
                                        <Link
                                          href={``}
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            message.success(
                                              "Thao tác đang được thực hiện"
                                            );
                                          }}
                                          className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                        >
                                          <Spinner className="w-4 h-4" />
                                        </Link>
                                      ) : (
                                        <Link
                                          href={``}
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            setLoadingAdd(indexParent);
                                            setLoadingFeedback(indexParent);
                                            await createUserFollow(
                                              {
                                                authorId: x?.authorId,
                                              },
                                              user?.accessToken
                                            ).then(async (result) => {
                                              console.log(result);
                                              await createUserToFollowerList(
                                                {
                                                  authorUserId: x?.userId,
                                                },
                                                user?.accessToken
                                              )
                                                .then((e) => console.log(e))
                                                .catch((e) => console.log(e));
                                            });
                                            await getProfile(
                                              user?.accessToken
                                            ).then((dataCall) =>
                                              setUsingUser(dataCall)
                                            );

                                            message.success(
                                              "Theo dõi thành công"
                                            );
                                            setLoadingAdd(-1);
                                            setLoadingFeedback(-1);
                                          }}
                                          className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                        >
                                          Theo dõi
                                        </Link>
                                      )}
                                      {loadingRemove === indexParent ? (
                                        <Link
                                          href={``}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            message.success(
                                              "Thao tác đang được thực hiện"
                                            );
                                          }}
                                          className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                        >
                                          <Spinner className="w-4 h-4" />{" "}
                                        </Link>
                                      ) : (
                                        <Link
                                          href={``}
                                          onClick={async (e) => {
                                            e.preventDefault();
                                            setLoadingAdd(indexParent);
                                            setLoadingRemove(indexParent);
                                            await deleteAddFriend(
                                              {
                                                authorId: x?.authorId,
                                              },
                                              user?.accessToken
                                            ).then(async (result) => {
                                              console.log(result);
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

                                            await getProfile(
                                              user?.accessToken
                                            ).then((dataCall) =>
                                              setUsingUser(dataCall)
                                            );

                                            message.success("Đã xóa bạn");
                                            setLoadingAdd(-1);
                                            setLoadingRemove(-1);
                                          }}
                                          className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                        >
                                          Xóa bạn
                                        </Link>
                                      )}
                                    </div>
                                  </button>
                                );
                              }
                            })}
                          {usingUser?.friendList?.length > 0 &&
                            !usingUser?.friendList?.find(
                              (y) => y?.authorId === x?.authorId
                            ) &&
                            (loadingAdd === indexParent ? (
                              <button
                                onClick={async () => {
                                  if (user) {
                                    message.warning("Thao tác đang thực hiện");
                                  } else {
                                    router.push(
                                      `/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/author/${slug}/${id}`
                                    );
                                  }
                                }}
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                {<Spinner className="w-4 h-4" />}
                              </button>
                            ) : (
                              <button
                                onClick={async () => {
                                  if (user) {
                                    setLoadingAdd(indexParent);
                                    await sendRequestAddFriend(
                                      {
                                        authorId: x?.authorId,
                                      },
                                      user?.accessToken
                                    ).then(async (result) => {
                                      console.log(result);
                                      await receiveRequestAddFriend(
                                        {
                                          authorUserId: x?.userId,
                                        },
                                        user?.accessToken
                                      )
                                        .then((e) => console.log(e))
                                        .catch((e) => console.log(e));
                                    });

                                    await getProfile(user?.accessToken).then(
                                      (dataCall) => setUsingUser(dataCall)
                                    );

                                    setLoadingAdd(-1);
                                    message.success("Đã gữi yêu cầu kết bạn.");
                                  } else {
                                    router.push(
                                      `/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/author/${slug}/${id}`
                                    );
                                  }
                                }}
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                {loadingAdd === indexParent ? (
                                  <Spinner className="w-4 h-4" />
                                ) : (
                                  <>
                                    <FaUserPlus size={20} />
                                    Thêm bạn bè
                                  </>
                                )}
                              </button>
                            ))}
                          {usingUser?.friendList?.length === 0 &&
                            (loadingAdd === indexParent ? (
                              <button
                                onClick={async () => {
                                  if (user) {
                                    message.warning(
                                      "Thao tác đang được thực hiện"
                                    );
                                  } else {
                                    router.push(
                                      `/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/author/${slug}/${id}`
                                    );
                                  }
                                }}
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                {<Spinner className="w-4 h-4" />}
                              </button>
                            ) : (
                              <button
                                onClick={async () => {
                                  if (user) {
                                    setLoadingAdd(indexParent);
                                    await sendRequestAddFriend(
                                      {
                                        authorId: x?.authorId,
                                      },
                                      user?.accessToken
                                    ).then(async (result) => {
                                      console.log(result);
                                      await receiveRequestAddFriend(
                                        {
                                          authorUserId: x?.userId,
                                        },
                                        user?.accessToken
                                      )
                                        .then((e) => console.log(e))
                                        .catch((e) => console.log(e));
                                    });

                                    await getProfile(user?.accessToken).then(
                                      (dataCall) => setUsingUser(dataCall)
                                    );

                                    setLoadingAdd(-1);
                                    message.success("Đã gữi yêu cầu kết bạn.");
                                  } else {
                                    router.push(
                                      `/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/author/${slug}/${id}`
                                    );
                                  }
                                }}
                                type="button"
                                class="flex items-center gap-x-1 px-2 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                              >
                                {loadingAdd === indexParent ? (
                                  <Spinner className="w-4 h-4" />
                                ) : (
                                  <>
                                    <FaUserPlus size={20} />
                                    Thêm bạn bè
                                  </>
                                )}
                              </button>
                            ))}
                        </div>
                      )}
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
