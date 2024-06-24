"use client";
import { getProfile, updateProfile } from "@apis/users";
import BannerRight from "@components/BannerRight";
import Header from "@components/Header";
import { auth } from "@utils/firebase";
import { message } from "antd";
import { Spinner } from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCheck, FaRegAddressCard } from "react-icons/fa6";
import { HiMiniIdentification } from "react-icons/hi2";
import { IoMdCheckmark } from "react-icons/io";
import {
  MdEmail,
  MdOutlineArrowDropDown,
  MdOutlineArrowRight,
} from "react-icons/md";
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
  const [showSettingEmail, setShowSettingEmail] = useState(false);
  const [activeEmail, setActiveEmail] = useState(true);
  const [showSettingPhone, setShowSettingPhone] = useState(false);
  const [activePhone, setActivePhone] = useState(true);
  const [showSettingId, setShowSettingId] = useState(false);
  const [activeId, setActiveId] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
    });
  }, [user]);
  useEffect(() => {
    setActiveNickName(usingUser?.activeNickName);
    setActiveEmail(usingUser?.activeEmail);
    setActivePhone(usingUser?.activePhone);
    setActiveId(usingUser?.activeId);
  }, [usingUser]);
  console.log(usingUser);
  return (
    <main className="w-full">
      <Header isBack={true} />
      <div class="px-0 sm:px-4 dark:bg-gray-900">
        <div className="flex justify-between items-center my-4 mx-4 ">
          <h3 className="text-[#838383] text-[18px] font-semibold">Cài đặt</h3>
          <div>
            {loading ? (
              <button className="text-white flex items-center gap-x-2 px-[35px] bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm py-1.5 mb-2">
                <Spinner className="w-4 h-4" />
                Đang lưu lại...
              </button>
            ) : (
              <button
                onClick={() => {
                  setLoading(true);
                  updateProfile(
                    {
                      ...usingUser,
                      activeNickName,
                      activeEmail,
                      activePhone,
                      activeId,
                    },
                    user?.accessToken
                  ).then(() => {
                    message.success("Cập nhật thành công");
                    setLoading(false);
                  });
                }}
                className="text-white px-[35px] bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm py-1.5 mb-2"
              >
                Lưu lại
              </button>
            )}
          </div>
        </div>
        <div className="rounded-3xl shadow-md shadow-gray-400 px-4 sm:px-8 py-6 bg-white mb-3">
          <h3 className="text-[#838383] text-[14px] font-semibold">Hiển thị</h3>
          <button className="relative w-full">
            <div
              className="px-4 py-2 inline-flex justify-between items-center w-full text-sm sm:text-base text-[#424141B2] border-b border-[#9C9C9CB2] hover:border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:text-blue-700 font-medium"
              onClick={() => setShowSettingName(!showSettingName)}
            >
              <div className="flex items-center gap-x-4">
                <HiMiniIdentification size={24} />
                Hiển thị tên khi đăng bài
              </div>
              {showSettingName ? (
                <MdOutlineArrowDropDown size={32} />
              ) : (
                <MdOutlineArrowRight size={32} />
              )}
            </div>
            {showSettingName && (
              <div className="flex flex-col items-start mt-[5px] border-b border-[#9C9C9CB2]">
                <button
                  className="py-2 w-full text-left px-4 text-xs sm:text-sm font-medium flex gap-x-4 items-center"
                  onClick={() => {
                    setActiveNickName(false);
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
          <button className="relative w-full">
            <div
              className="px-4 py-2 inline-flex justify-between items-center w-full text-sm sm:text-base text-[#424141B2] border-b border-[#9C9C9CB2] hover:border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:text-blue-700 font-medium"
              onClick={() => setShowSettingEmail(!showSettingEmail)}
            >
              <div className="flex items-center gap-x-4">
                <MdEmail size={24} />
                Hiển thị email trên trang cá nhân
              </div>
              {showSettingEmail ? (
                <MdOutlineArrowDropDown size={32} />
              ) : (
                <MdOutlineArrowRight size={32} />
              )}
            </div>
            {showSettingEmail && (
              <div className="flex flex-col items-start mt-[5px] border-b border-[#9C9C9CB2]">
                <button
                  className="py-2 w-full text-left px-4 text-xs sm:text-sm font-medium flex gap-x-4 items-center "
                  onClick={() => {
                    setActiveEmail(false);
                  }}
                >
                  <div
                    className={`flex justify-center items-center w-[22px] h-[22px] rounded-[5px] border ${
                      activeEmail === false
                        ? "bg-green-400 "
                        : "border-gray-500"
                    }`}
                  >
                    {activeEmail === false && (
                      <FaCheck className="text-white" />
                    )}
                  </div>
                  Ẩn
                </button>
                <button
                  className="py-2 w-full text-left px-4 text-xs sm:text-sm font-medium flex gap-x-4 items-center"
                  onClick={() => {
                    setActiveEmail(true);
                  }}
                >
                  <div
                    className={`flex justify-center items-center w-[22px] h-[22px] rounded-[5px] border ${
                      activeEmail === true
                        ? "bg-green-400 border-green-400"
                        : "border-gray-500"
                    }`}
                  >
                    {activeEmail === true && <FaCheck className="text-white" />}
                  </div>
                  Hiện
                </button>
              </div>
            )}
          </button>
          <button className="relative w-full">
            <div
              className="px-4 py-2 inline-flex justify-between items-center w-full text-sm sm:text-base text-[#424141B2] border-b border-[#9C9C9CB2] hover:border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:text-blue-700 font-medium"
              onClick={() => setShowSettingPhone(!showSettingPhone)}
            >
              <div className="flex items-center gap-x-4">
                <FaPhoneAlt size={24} />
                Hiển thị SĐT trên trang cá nhân
              </div>
              {showSettingPhone ? (
                <MdOutlineArrowDropDown size={32} />
              ) : (
                <MdOutlineArrowRight size={32} />
              )}
            </div>
            {showSettingPhone && (
              <div className="flex flex-col items-start mt-[5px] border-b border-[#9C9C9CB2]">
                <button
                  className="py-2 w-full text-left px-4 text-xs sm:text-sm font-medium flex gap-x-4 items-center"
                  onClick={() => {
                    setActivePhone(false);
                  }}
                >
                  <div
                    className={`flex justify-center items-center w-[22px] h-[22px] rounded-[5px] border ${
                      activePhone === false
                        ? "bg-green-400 "
                        : "border-gray-500"
                    }`}
                  >
                    {activePhone === false && (
                      <FaCheck className="text-white" />
                    )}
                  </div>
                  Ẩn
                </button>
                <button
                  className="py-2 w-full text-left px-4 text-xs sm:text-sm font-medium flex gap-x-4 items-center"
                  onClick={() => {
                    setActivePhone(true);
                  }}
                >
                  <div
                    className={`flex justify-center items-center w-[22px] h-[22px] rounded-[5px] border ${
                      activePhone === true
                        ? "bg-green-400 border-green-400"
                        : "border-gray-500"
                    }`}
                  >
                    {activePhone === true && <FaCheck className="text-white" />}
                  </div>
                  Hiện
                </button>
              </div>
            )}
          </button>
          <button className="relative w-full">
            <div
              className="px-4 py-2 inline-flex justify-between items-center w-full text-sm sm:text-base text-[#424141B2] border-b border-[#9C9C9CB2] hover:border-black hover:bg-gray-100 hover:text-blue-700 focus:z-10  focus:text-blue-700 font-medium"
              onClick={() => setShowSettingId(!showSettingId)}
            >
              <div className="flex items-center gap-x-4">
                <FaRegAddressCard size={24} />
                Hiển thị ID hệ thống trên trang cá nhân
              </div>
              {showSettingId ? (
                <MdOutlineArrowDropDown size={32} />
              ) : (
                <MdOutlineArrowRight size={32} />
              )}
            </div>
            {showSettingId && (
              <div className="flex flex-col items-start mt-[5px] border-b border-[#9C9C9CB2]">
                <button
                  className="py-2 w-full text-left px-4 text-xs sm:text-sm font-medium flex gap-x-4 items-center"
                  onClick={() => {
                    setActiveId(false);
                  }}
                >
                  <div
                    className={`flex justify-center items-center w-[22px] h-[22px] rounded-[5px] border ${
                      activeId === false ? "bg-green-400 " : "border-gray-500"
                    }`}
                  >
                    {activeId === false && <FaCheck className="text-white" />}
                  </div>
                  Ẩn
                </button>
                <button
                  className="py-2 w-full text-left px-4 text-xs sm:text-sm font-medium flex gap-x-4 items-center"
                  onClick={() => {
                    setActiveId(true);
                  }}
                >
                  <div
                    className={`flex justify-center items-center w-[22px] h-[22px] rounded-[5px] border ${
                      activeId === true
                        ? "bg-green-400 border-green-400"
                        : "border-gray-500"
                    }`}
                  >
                    {activeId === true && <FaCheck className="text-white" />}
                  </div>
                  Hiện
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
