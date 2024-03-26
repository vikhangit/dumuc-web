"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import Image from 'next/image';
import { MdArtTrack, MdContactless, MdFavorite, MdOutlineBookmarks, MdOutlineExitToApp, MdOutlineFileCopy, MdOutlineMessage, MdOutlinePermContactCalendar, MdOutlinePhoneInTalk, MdOutlinePrivacyTip, MdOutlineSettingsAccessibility } from "react-icons/md";

import TabbarBottom from "@components/TabbarBottom";
import Header from "@components/Header";
import BannerRight from "@components/BannerRight";

import { getProfile } from "@apis/users";
import { auth } from '@utils/firebase';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { message } from "antd";

const AccountPage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState()

  //require login
  const [user, loading] = useAuthState(auth);
  
  // const [setUser, updating] = useUpdateProfile(auth);
  const [signOut, loadingSignout, error] = useSignOut(auth);
  useEffect(() => {
    if (!user && !loading) {
      const url_return = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/account/`
      router.push(`/auth?url_return=${url_return}`);
    }
  }, [user, loading])
 
  useEffect(() => {
    (async () => {
      try {
        if (user) {
          let profile = await getProfile(user?.accessToken);
          setProfile(profile);
        }
      } catch (e) {
      }
    })();
  }, [user])

 

  return (
    <main className="w-full">
      <div className="w-full" style={{ marginTop: 1 }}>
        <Header />
        <div className="flex justify-between items-center">
          <h3 className="my-4 mx-4 text-[#838383]">
            Chào mừng thành viên <span className="text-[#C82027] font-semibold">Dumuc !</span>
          </h3>
        </div>
        <div className="rounded-3xl shadow-md shadow-gray-400 px-4 sm:px-8 py-6 bg-white mb-3">
          <Link href={`/author/${profile?.author?.slug}/${profile?.author?.authorId}`} className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            <div className="flex items-center gap-x-4">
            <MdArtTrack size={24} />
            Xem trang cá nhân
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
          </Link>
          <Link
            href={"/account/profile"}
            className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
            <div className="flex items-center gap-x-4">
            <MdOutlinePermContactCalendar  size={20} />
            Quản lý tài khoản
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
          </Link>
          <Link
            href={"/account/library/bookmark"}
            className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
            <div className="flex items-center gap-x-4">
            <MdOutlineBookmarks size={20} />
            Thông tin đã lưu
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
          </Link>
          <Link
            href={"/account/library/following"}
            className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
            <div className="flex items-center gap-x-4">
            <MdFavorite  size={20} />
            Đang theo dõi
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
          </Link>
        </div>
        <div className="rounded-3xl shadow-md shadow-gray-400 px-4 sm:px-8  py-6 bg-white mb-3">
          <Link
            href={"/account/library/post"}
            className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
            <div className="flex items-center gap-x-4">
            <MdOutlineFileCopy size={20} />
            Bài viết đã đăng
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
          </Link>
          <Link
          href={"/account/library/comment"}
          className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
          <div className="flex items-center gap-x-4">
          <MdOutlineMessage size={20} />
            Bình luận
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
        </Link>
        <Link
          href={"/account/library/sos"}
          className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
          <div className="flex items-center gap-x-4">
            <MdContactless size={20}  color="#C82027"  />
            <div><span className="bottom-link text-[#C82027] mr-1.5">SOS</span>đã gửi</div>
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
        </Link>
        <Link
          href={"/account/library/sos-help"}
          className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
        >
          <div className="flex items-center gap-x-4">
          <MdContactless size={20} color="#C82027" />
            <div><span className="bottom-link text-[#C82027] mr-1.5">SOS</span>đã giúp đỡ</div>
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
        </Link>
        </div>
        <div className="rounded-3xl shadow-md shadow-gray-400 px-4 sm:px-8  py-6 bg-white mb-3">
          <button
            onClick={async () => { 
          const success = await signOut().then((res) => router.push("/"));
          if (success) {
            message.success("Đăng xuất thành công!");
          }
        }}
            type="button"
            className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
          >
            <div className="flex items-center gap-x-4">
            <MdOutlineExitToApp size={20} />
            Đăng xuất
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
          </button>
          <Link href={``} className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            <div className="flex items-center gap-x-4">
            <MdOutlinePrivacyTip size={20} />
            Trợ giúp
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
          </Link>
          <Link href={`/account/recent-members`} className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            <div className="flex items-center gap-x-4 bottom-link text-[#389FFD]">
            <MdOutlineSettingsAccessibility size={20} color="#389FFD" />
            TÌM THÀNH VIÊN GẦN ĐÂY
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
          </Link>
          <Link href={``} className="relative inline-flex justify-between items-center w-full px-4 py-2 text-sm sm:text-base  text-[#424141B2] font-medium border-b border-[#9C9C9CB2] hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            <div className="flex items-center gap-x-4 bottom-link text-[#C82027]">
            <MdOutlinePhoneInTalk size={20}color="#C82027" />
            HOTLINE
            </div>
            <Image alt="" src="/icons/account/MdOutlineArrowRight.png" width={0} height={0} sizes="100vw" className="w-8 h-8" />
          </Link>
        </div>
        <div className="text-center mt-4 text-sm px-2 sm:px-0">
          <div className="text-base sm:text-xl bottom-link text-[#7B7A7A]">CÔNG TY TNHH DU MỤC</div>
        <div className="text-[#424141B2] uppercase mt-2">MST: 0317841883</div>
          <div className="text-[#424141B2] uppercase mt-2">
            Địa chỉ: 27B Chế Lan Viên, Tây Thạnh, Tân Phú, TP.HCM
          </div>
          <div className="my-2 text-[#424141B2] font-medium sm:font-normal text-xs sm:text-sm">
            <Link href={"/page/gioi-thieu"}>
              Giới thiệu <span className="px-2">|</span>
            </Link>
            <Link href={"/page/gioi-thieu"}>
              Chính Sách Bảo Mật<span className="px-2">|</span>
            </Link>
            <Link href={"/page/gioi-thieu"}>Điều khoản dịch vụ</Link>
          </div>
        </div>
        <div className="mb-28" />
      </div>
      <TabbarBottom active="account" />
      <BannerRight isAppInstall={true} />
    </main>
  )
};

export default AccountPage;
