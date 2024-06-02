"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  MdOutlineArrowForwardIos,
  MdOutlineSettingsAccessibility,
} from "react-icons/md";
import BannerRight from "@components/BannerRight";

import { auth } from "@utils/firebase";
import { getProfile } from "@apis/users";
import { RangeSlider, Spinner } from "flowbite-react";
import { useWindowSize } from "@hooks/useWindowSize";
import Clock from "@components/Clock";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";
const TabbarBottomChat = dynamic(
  () => {
    return import("@components/TabbarBottomChat");
  },
  { ssr: false }
);

const theme = {
  root: {
    base: "flex",
  },
  field: {
    base: "relative w-full",
    input: {
      base: "w-full bg-[#389FFD] rounded-lg appearance-none cursor-pointer dark:bg-gray-700",
      sizes: {
        sm: "h-1 range-sm",
        md: "h-[6px]",
        lg: "h-3 range-lg",
      },
    },
  },
};

const RecentMembers = () => {
  const router = useRouter();
  const [setUser, updating, error] = useUpdateProfile(auth);
  const [value, setValue] = useState(0);
  const sizes = useWindowSize();
  const [user, loading, errorAuth] = useAuthState(auth);
  const [loadPage, setLoadPage] = useState(true);
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    if (user === undefined && loading === false) {
      const url_return = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/account/`;
      router.push(`/auth?url_return=${url_return}`);
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          let profile = await getProfile(user?.accessToken);
          // setUser(profile);
        }
      } catch (e) {}
    })();
  }, [user]);

  return (
    <main className="w-full">
      <div className="w-full" style={{ marginTop: 1 }}>
        <div className="flex items-center bg-[#C82027] shadow-md shadow-gray-400 w-full px-[15px] py-[20px] gap-x-3">
          <button onClick={() => router.back()}>
            <FaArrowLeftLong size={24} color="#fff" />
          </button>
          <div className="text-xl text-white w-full text-center">Thêm bạn</div>
        </div>
        {/* <div className='flex justify-between items-center bg-[#EB7F7F] shadow-md shadow-gray-400 w-full justify-between px-[5px] py-[20px] gap-x-3 mt-[20px] rounded-[10px]'>
                <input placeholder='@ Tìm số điện thoại để thêm ...' className='w-full ml-[6px] text-[#fff] text-base placeholder-[#fff] bg-[#EB7F7F] focus-visible:border-none focus-visible:shadow-none focus-visible:outline-none' />
                    <button><MdOutlineArrowForwardIos size={24} color="#fff" /></button>
            </div> */}
        <div className="flex justify-between items-center text-base sm:text-lg font-semibold">
          <h3 className="my-4 mx-auto text-[#838383] text-center px-8">
            Bạn có thể tìm thành viên
            <span className="text-[#C82027] font-semibold mx-1">dumuc.me</span>
            xung quanh đây!
          </h3>
        </div>
        <div>
          <div className="">
            <Clock setLoadData={setLoadData} />
          </div>
          <div className="flex items-center px-4 mt-2">
            <label className="w-[105px]">Chọn bán kính</label>
            <div className="relative border border-[#E0D2D2] rounded-md w-[calc(100%-105px)]">
              <input
                className="border-0 outline-0 shadow-0 focus:border-0 focus:outline-0 focus:shadow-0 block w-full h-full py-2 pr-[45px] text-center"
                value={(30 * (value / 100)).toFixed(1)}
              />
              <span className="absolute right-0 top-0 w-[38px] h-full rounded-br-md rounded-tr-md bg-[#389FFD4D] flex justify-center items-center">
                Km
              </span>
            </div>
          </div>
          <div className="flex justify-end px-4 my-2">
            <div className="w-[calc(100%-105px)]">
              <RangeSlider
                theme={theme}
                size={"md"}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          </div>
          <div></div>
        </div>
        <div
          className="rounded-3xl mt-6 px-4 sm:px-8 bg-white mb-3 border-b border-gray-300"
          style={{
            boxShadow: "0px 4px 4px 0px #00000040 inset",
          }}
        >
          <div className="bottom-link text-[#389FFD] py-4 flex items-center justify-center gap-2 text-sm sm:text-lg uppercase border-b border-[#389FFD]">
            <MdOutlineSettingsAccessibility size={24} color="#389FFD" />
            Danh sách bạn bè gần đây
          </div>
          {loadData ? (
            <div className="h-20 w-full flex justify-center items-center">
              <Spinner /> <div className="ml-2">Đang tìm kiếm</div>
            </div>
          ) : (
            Array(5)
              .fill()
              .map((x, index) => {
                return (
                  <div
                    key={index}
                    class={`flex justify-between items-center sm:gap-x-4 py-3 ${
                      index !== 0 ? "border-t" : "border-0"
                    } border-[#389FFD]`}
                  >
                    <Link href={``}>
                      <div class="flex items-center gap-x-2">
                        <div class="flex-shrink-0">
                          <Image
                            src="/dumuc/avatar.png"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-[45px] h-[45px] rounded-full"
                          />
                        </div>
                        <div className="md:flex-1 md:min-w-0 text-sm font-medium text-gray-900">
                          <div className="text-base font-medium text-[#363535]">
                            Tran Vi Khang
                          </div>
                          <div
                            className={`flex gap-x-4 ${
                              sizes.width > 335
                                ? "flex-row"
                                : "flex-col gap-y-1"
                            }`}
                          >
                            <div className="text-xs sm:text-sm text-[#747272]">
                              Ngày tham gia:{" "}
                              <span className="">12/08/2023</span>
                            </div>
                            <div className="text-xs sm:text-sm text-[#747272]">
                              Khoảng cách:{" "}
                              <span className="text-[#FC1717B2]">1.2km</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
          )}
        </div>

        <div className="mb-24" />
      </div>
      <TabbarBottomChat active="chat" />
      <BannerRight isAppInstall={true} />
    </main>
  );
};

export default RecentMembers;
