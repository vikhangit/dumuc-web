import {
  deleteAddFriend,
  deleteRecieveFriend,
  getProfile,
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

export default function SendAddFriend({
  items,
  onCallback,
  setItems,
  authors,
  user,
  setUsingUser,
  setTab,
}) {
  const [loading, setLoading] = useState(false);
  const [loadingRemove, setLoadingRemove] = useState(-1);
  const sizes = useWindowSize();
  const [friendList, setFriendList] = useState(items);
  useEffect(() => {
    setFriendList(items);
  }, [items]);
  return (
    <div>
      {friendList?.length > 0 ? (
        <div>
          <ul
            class={`pb-1 grid ${
              sizes.width > 992
                ? "grid-cols-1 xl:grid-cols-2"
                : `grid-cols-1 ${
                    sizes.width > 650
                      ? `grid-cols-3`
                      : sizes.width > 400
                      ? `grid-cols-2`
                      : `grid-cols-1`
                  }`
            } gap-4`}
          >
            {friendList.map(async (item, index) => {
              const author = authors?.find(
                (x) => x?.authorId === item?.authorId
              );
              return (
                item.status === 1 && (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow shadow-gray-400 py-2 px-2 "
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
                    <button
                      onClick={() => {
                        if (!loading) {
                          setLoading(true);
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
                          ).then(() => {
                            getProfile(user?.accessToken).then((data) => {
                              setItems(
                                data?.friendList
                                  ?.map((item) => {
                                    let obj = {
                                      ...item,
                                      author: authors?.find(
                                        (x) =>
                                          x?.authorId === item?.author?.authorId
                                      ),
                                    };
                                    return obj;
                                  })
                                  ?.filter((x) => x !== undefined)
                                  ?.sort((a, b) =>
                                    a?.author?.name?.localeCompare(
                                      b?.author?.name
                                    )
                                  )
                              );
                            });
                          });
                          setTab(1);
                          setLoading(false);
                          message.success("Đã hủy yêu cầu kết bạn");
                        } else {
                          message.warning(
                            "Thao tác đang thực hiện xin đừng span"
                          );
                        }
                      }}
                      className="px-3 w-full py-1 mt-2 text-xs font-medium text-center text-black bg-gray-300 rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300 basis-1/2"
                    >
                      Hủy yêu cầu
                    </button>
                  </div>
                )
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="p-2 italic">Bạn chưa có gửi kết bạn</div>
      )}
    </div>
  );
}
