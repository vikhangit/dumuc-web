"use client";
import { getProfile } from "@apis/users";
import { useWindowSize } from "@hooks/useWindowSize";
import { auth } from "@utils/firebase";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
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
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
      setFriendList(
        dataCall?.friendList
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

          .filter((x) => x !== undefined)
      );
    });
  }, [user, authors]);
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
  console.log(friendList);
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
          friendList
            ?.sort((a, b) => a?.author?.name?.localeCompare(b?.author?.name))
            .map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    setMobile(true);
                    router.push(`/chat?friendId=${item?.author?.authorId}`);
                  }}
                  className={`bg-white rounded-md shadow shadow-gray-400 bg-white flex items-center gap-x-2 pl-[15px] pr-2 py-[12px] mt-[10px] cursor-pointer`}
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
                  <div className="flex justify-between w-full">
                    <div>
                      <Link href="" className="text-base">
                        {item?.author?.name}
                      </Link>
                    </div>
                  </div>
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
