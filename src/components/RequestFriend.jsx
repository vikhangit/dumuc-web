import {
  deleteAddFriend,
  deleteRecieveFriend,
  receiveRequestAddFriend,
  sendRequestAddFriend,
} from "@apis/users";
import { auth } from "@utils/firebase";
import Image from "next/image";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Spinner } from "flowbite-react";
import { message } from "antd";
import { useEffect } from "react";
import { getAuthors } from "@apis/posts";
import { useWindowSize } from "@hooks/useWindowSize";

export default function RequestFriend({ items, onCallback, authors, user }) {
  const [loading, setLoading] = useState(-1);
  const [loadingRemove, setLoadingRemove] = useState(-1);
  const sizes = useWindowSize();
  const [friendList, setFriendList] = useState(items);
  // useEffect(() => {
  //   setFriendList(items);
  // }, [items]);
  return (
    <div>
      {friendList?.length > 0 && (
        <div className="font-semibold xl:font-normal mb-3">Lời mời kết bạn</div>
      )}
      <div>
        <ul
          class={`pb-1 grid xl:block ${
            sizes.width > 450 ? "grid-cols-2" : "gap-y-4"
          } gap-x-4`}
        >
          {friendList?.length > 0 &&
            friendList.map(async (item, index) => {
              const author = authors?.find(
                (x) => x?.authorId === item?.authorId
              );
              return (
                item.status === 1 && (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow shadow-gray-400 py-2 px-2  xl:shadow-none"
                  >
                    <div className="flex gap-x-3 items-center w-full mt-2">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        class="w-10 h-10 rounded-full"
                        src={
                          author?.photo
                            ? author?.photo
                            : author?.user?.photo
                            ? author?.user?.photo
                            : "/dumuc/avatar.jpg"
                        }
                        alt={author?.name}
                      />
                      <div className="text-base font-semibold">
                        {author?.name}
                      </div>
                    </div>
                    <div className="w-full flex gap-x-2 mt-2">
                      <button
                        onClick={async (e) => {
                          e.preventDefault();
                          friendList.splice(index, 1);
                          setFriendList([...friendList]);
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

                          message.success("Đã chấp nhận yêu cầu kết bạn");
                        }}
                        className="px-3 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300 basis-1/2"
                      >
                        Chấp nhận
                      </button>
                      <button
                        onClick={() => {
                          friendList.splice(index, 1);
                          setFriendList([...friendList]);
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
                        className="px-3 py-1 text-xs font-medium text-center text-black bg-gray-300 rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300 basis-1/2"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                )
              );
            })}
        </ul>
      </div>
    </div>
  );
}
