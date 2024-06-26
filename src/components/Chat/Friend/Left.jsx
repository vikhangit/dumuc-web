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
import { message } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiOutlineDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
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
          if (item?.status === 2) {
            let obj = {
              ...item,
              author: authors?.find(
                (x) => x?.authorId === item?.author?.authorId
              ),
            };
            return obj;
          }
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
  console.log("My Follow", friendList);
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
      <div className="mt-[10px] ml-2 mr-3 font-semibold pb-[10px] border-b border-gray-400">
        Danh sách bạn bè
      </div>
      <div
        className={`${
          sizes.width > 800 ? "h-[calc(100%-175px)]" : "h-[calc(100%-130px)]"
        } overflow-auto scroll-chat px-2 pb-4`}
      >
        {friendList?.length > 0 ? (
          friendList?.map((item, index) => {
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
                    {item?.author?.name}
                  </Link>
                </div>
                <button className="group relative">
                  <HiOutlineDotsVertical size={20} />
                  <div className="absolute z-50 hidden group-hover:flex flex-col justify-start items-start -top-1/2 right-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[150px] rounded p-1">
                    <Link
                      href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
                      className={`hover:bg-[#c80000] hover:text-white w-full rounded px-2.5 py-2 text-left`}
                    >
                      {" "}
                      Xem trang cá nhân
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
                            (ab) => ab?.author === item?.author?.authorId
                          );
                          followedArray.splice(findIndex, 1);
                          setFollowedArray([...followedArray]);
                          message.success("Đã hủy dõi");
                        }}
                        className={`hover:bg-[#c80000] hover:text-white w-full rounded px-2.5 py-2 text-left`}
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
                        className={`hover:bg-[#c80000] hover:text-white w-full rounded px-2.5 py-2 text-left`}
                      >
                        Theo dõi
                      </Link>
                    )}

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
                      className={`hover:bg-[#c80000] hover:text-white w-full rounded px-2.5 py-2 text-left`}
                    >
                      {" "}
                      Xóa bạn
                    </Link>
                  </div>
                </button>
              </div>
            );
          })
        ) : valueSearch.trim() === "" ? (
          <div className="h-full w-full flex justify-center items-center text-base">
            Danh sách bạn bè trống
          </div>
        ) : (
          <div className="h-full w-full flex justify-center items-center text-base">
            Không tìm thấy kết quả vui lòng thử từ khóa khác
          </div>
        )}
      </div>
    </div>
  );
}
