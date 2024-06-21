"use client";
import { getProfile, updateProfile } from "@apis/users";
import BannerRight from "@components/BannerRight";
import Header from "@components/Header";
import { auth } from "@utils/firebase";
import { message } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaCheck, FaRegAddressCard } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineArrowDropDown, MdOutlineArrowRight } from "react-icons/md";
const TabbarBottom = dynamic(
  () => {
    return import("@components/TabbarBottom");
  },
  { ssr: false }
);
const SettingPage = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [usingUser, setUsingUser] = useState();
  const [showSettingName, setShowSettingName] = useState(false);
  const [activeNickName, setActiveNickName] = useState(false);
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
      setActiveNickName(dataCall?.activeNickName);
    });
  }, [user]);
  return (
    <main className="w-full">
      <Header isBack={true} />
      <div class="px-0 sm:px-4 dark:bg-gray-900">
        <div className="flex justify-between items-center">
          <h3 className="my-4 mx-4 text-[#838383] text-[18px] font-semibold">
            Cài đặt
          </h3>
        </div>
        <div className="rounded-3xl shadow-md shadow-gray-400 px-4 sm:px-8 py-6 bg-white mb-3">
          <button className="relative w-full">
            <div
              className="px-4 py-2 inline-flex justify-between items-center w-full text-sm sm:text-base text-[#424141B2] border-b border-[#9C9C9CB2] hover:border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:text-blue-700 font-medium"
              onClick={() => setShowSettingName(!showSettingName)}
            >
              <div className="flex items-center gap-x-4">
                <FaRegAddressCard size={24} />
                Hiển thị tên khi đăng bài
              </div>
              {showSettingName ? (
                <MdOutlineArrowDropDown size={32} />
              ) : (
                <MdOutlineArrowRight size={32} />
              )}
            </div>
            {showSettingName && (
              <div className="flex flex-col items-start mt-[5px]">
                <button
                  className="py-2 w-full text-left px-4 text-xs sm:text-sm font-medium flex gap-x-4 items-center"
                  onClick={() => {
                    setActiveNickName(false);
                    updateProfile(
                      {
                        activeNickName: false,
                      },
                      user?.accessToken
                    ).then(() => {
                      message.success("Cập nhật thành công");
                    });
                  }}
                >
                  <div
                    className={`flex justify-center items-center w-[22px] h-[22px] rounded-[5px] border ${
                      activeNickName === false
                        ? "bg-green-400 "
                        : "border-gray-500"
                    }`}
                  >
                    {activeNickName === false && (
                      <FaCheck className="text-white" />
                    )}
                  </div>
                  Hiển thị tên
                </button>
                <button
                  className="py-2 w-full text-left px-4 text-xs sm:text-sm font-medium flex gap-x-4 items-center"
                  onClick={() => {
                    setActiveNickName(true);
                    updateProfile(
                      {
                        activeNickName: true,
                      },
                      user?.accessToken
                    ).then(() => {
                      message.success("Cập nhật thành công");
                    });
                  }}
                >
                  <div
                    className={`flex justify-center items-center w-[22px] h-[22px] rounded-[5px] border ${
                      activeNickName === true
                        ? "bg-green-400 border-green-400"
                        : "border-gray-500"
                    }`}
                  >
                    {activeNickName === true && (
                      <FaCheck className="text-white" />
                    )}
                  </div>
                  Hiển thị biệt danh
                </button>
              </div>
            )}
          </button>
        </div>
        <div className="mb-28"></div>
      </div>
      <BannerRight isAppInstall={true} />
      <TabbarBottom />
    </main>
  );
};

export default SettingPage;
