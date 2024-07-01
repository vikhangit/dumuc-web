"use client";
import {
  createUserFollow,
  createUserToFollowerList,
  deleteAddFriend,
  deleteRecieveFriend,
  deleteUserFollow,
  deleteUserInFollowerList,
  getProfile,
} from "@apis/users";
import { useWindowSize } from "@hooks/useWindowSize";
import { auth } from "@utils/firebase";
import { Dropdown, message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import RequestFriend from "../RequestFriend";
import SendAddFriend from "../SendAddFriend";
export default function ChatLeft({ mobile, setMobile, authors }) {
  const [user] = useAuthState(auth);
  const sizes = useWindowSize();
  const router = useRouter();
  const [friendList, setFriendList] = useState([]);
  const [valueSearch, setValueSearch] = useState("");
  const [searchFunction, setSearchFunction] = useState(true);
  const [usingUser, setUsingUser] = useState();
  const [myFollow, setMyFollow] = useState([]);
  const [following, setFollowing] = useState();
  const [followedArray, setFollowedArray] = useState([]);
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
    });
  }, [user]);
  useEffect(() => {
    setFriendList(
      usingUser?.friendList
        ?.map((item) => {
          let obj = {
            ...item,
            author: authors?.find(
              (x) => x?.authorId === item?.author?.authorId
            ),
          };
          return obj;
        })
        ?.filter((x) => x !== undefined)
        ?.sort((a, b) => a?.author?.name?.localeCompare(b?.author?.name))
    );
    setMyFollow(usingUser?.follows);
  }, [usingUser, authors]);
  useEffect(() => {
    setFollowedArray([]);
    friendList?.map((item) => {
      if (followedArray?.find((a) => a?.authorId === item?.authorId)) {
        setFollowedArray(followedArray);
      } else {
        if (myFollow?.find((x) => x?.authorId === item?.authorId)) {
          followedArray.push(item);
          setFollowedArray([...followedArray]);
        } else {
          setFollowedArray([]);
        }
      }
    });
  }, [friendList, myFollow]);
  console.log(friendList);
  console.log("User", usingUser);

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
            ?.name?.toLowerCase()
            ?.includes(value?.toLowerCase())
      );
      if (searchList && searchList.length > 0) {
        setFriendList(searchList);
      } else {
        setFriendList([]);
      }
    }
  };
  const [tab, setTab] = useState(0);
  return (
    <div
      className={`h-full ${
        sizes.width > 992 ? "basis-1/3" : `${!mobile ? "basis-full" : "hidden"}`
      }`}
    >
      <div className="flex items-center bg-[#C82027] shadow-md shadow-gray-400 w-full justify-between px-[5px] h-[65px] gap-x-3">
        <div
          className={`relative flex items-center pl-[15px] ${
            searchFunction ? "w-full pr-[22px]" : "w-[calc(100%-170px)]"
          } ${sizes.width > 380 ? "pl-[15px]" : "pl-[5px]"}`}
        >
          <div className="">
            <IoMdSearch size={24} color="#fff" />
          </div>
          <input
            placeholder="Tìm kiếm ..."
            onFocus={() => {
              setSearchFunction(true);
              if (valueSearch.trim() === "")
                setFriendList(
                  usingUser?.friendList?.filter((x) => x.status === 2)
                );
            }}
            value={valueSearch}
            // autoFocus={searchFunction}
            className="pl-[6px] text-[#fff] text-base placeholder-[#fff] bg-[#C82027] w-full focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none"
            onChange={(e) => searchField(e.target.value)}
          />
          {valueSearch.trim() !== "" && searchFunction && (
            <button
              onClick={() => {
                setValueSearch("");
                setFriendList(
                  usingUser?.friendList?.filter((x) => x.status === 2)
                );
              }}
              className="absolute right-[10px]"
            >
              <IoCloseCircle size={20} className="text-white" />
            </button>
          )}
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setTab(0);
          }}
          className={`px-3 py-3 ${tab === 0 && "border-b-2 border-[#c80000]"}`}
        >
          Bạn bè
        </button>
        <button
          onClick={() => {
            setTab(1);
          }}
          className={`px-3 py-3 ${tab === 1 && "border-b-2 border-[#c80000]"}`}
        >
          Lời mới
        </button>
        <button
          onClick={() => {
            setTab(2);
          }}
          className={`px-3 py-3 ${tab === 2 && "border-b-2 border-[#c80000]"}`}
        >
          Đề nghị
        </button>
      </div>
      <div
        className={`${
          sizes.width > 800 ? "h-[calc(100%-175px)]" : "h-[calc(100%-130px)]"
        } overflow-auto scroll-chat px-2 pb-4`}
      >
        {
          tab === 0 ? (
            friendList?.filter((x) => x?.status === 2)?.length > 0 ? (
              friendList
                ?.filter((x) => x?.status === 2)
                ?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={`flex justify-between items-center bg-white rounded-md shadow shadow-gray-400 bg-white flex items-center gap-x-2 pl-[15px] pr-2 py-[12px] mt-[10px] cursor-pointer`}
                    >
                      <div
                        className="flex items-center gap-x-2 w-full"
                        onClick={() => {
                          setMobile(true);
                          router.push(`/chat?friendId=${item?.authorId}`);
                        }}
                      >
                        <Image
                          src={
                            item?.author?.user?.photo &&
                            item?.author?.user?.photo?.length > 0
                              ? item?.author?.user?.photo
                              : "/dumuc/avatar.jpg"
                          }
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-[45px] h-[45px] rounded-full"
                        />
                        <Link href="" className="text-base">
                          {item?.ten_goi_nho && item?.ten_goi_nho?.length > 0
                            ? item?.ten_goi_nho
                            : item?.author?.name}
                        </Link>
                      </div>

                      <Dropdown
                        placement="bottomRight"
                        menu={{
                          items: [
                            {
                              label: (
                                <Link
                                  href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
                                  className={` w-full text-left`}
                                >
                                  Xem trang cá nhân
                                </Link>
                              ),
                            },
                            {
                              label: followedArray?.find(
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
                                  className={`w-ful text-left`}
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
                                    setFollowing(true);
                                    followedArray?.push(item);
                                    setFollowedArray([...followedArray]);
                                    message.success("Đã theo dõi thành công");
                                  }}
                                  className={`w-full text-left`}
                                >
                                  Theo dõi
                                </Link>
                              ),
                            },
                            {
                              label: (
                                <Link
                                  href={``}
                                  onClick={async (e) => {
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
                                    friendList.splice(index, 1);
                                    setFriendList([...friendList]);
                                    message.success("Đã xóa bạn");
                                  }}
                                  className={` w-full text-left`}
                                >
                                  Xóa bạn
                                </Link>
                              ),
                            },
                          ],
                        }}
                      >
                        <HiOutlineDotsVertical size={20} />
                      </Dropdown>
                    </div>
                  );
                })
            ) : (
              <div className="p-2 italic">Chưa có bạn bè</div>
            )
          ) : tab === 1 ? (
            <RequestFriend
              authors={authors}
              items={friendList?.filter(
                (x) => x?.status === 1 && x?.type === "recieve"
              )}
              setItems={setFriendList}
              user={user}
              onCallback={() => {}}
              setUsingUser={setUsingUser}
              setTab={setTab}
            />
          ) : tab === 2 ? (
            <SendAddFriend
              authors={authors}
              items={friendList?.filter(
                (x) => x?.status === 1 && x?.type === "send"
              )}
              setItems={setFriendList}
              user={user}
              onCallback={() => {}}
              setUsingUser={setUsingUser}
              setTab={setTab}
            />
          ) : (
            ""
          )
          // )
          // : valueSearch.trim() === "" ? (

          //   <div className="h-full w-full flex justify-center items-center text-base">
          //     Danh sách bạn bè trống
          //   </div>
          // ) : (
          //   <div className="h-full w-full flex justify-center items-center text-base">
          //     Không tìm thấy
          //   </div>
          // )
        }
      </div>
    </div>
  );
}
