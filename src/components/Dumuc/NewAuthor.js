"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import {getAuthor } from "@apis/posts";
import TabbarBottom from "@components/TabbarBottom";
import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import {MdOutlinePhoto, MdOutlinePlayCircleOutline} from "react-icons/md";
import Loading from "app/author/[slug]/[id]/loading";
import { useWindowSize } from "@hooks/useWindowSize";
import { IoEyeOutline } from "react-icons/io5";
import { HiPencil } from "react-icons/hi";
import AuthorLibrary from "@components/authorLibrary";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const NewAuthorUI = ({ currentUrl = '/', params, searchParams }) => {
    const id = params?.id || '';
    const slug = params?.slug || '';
    const router = useRouter();
    const [user] = useAuthState(auth)
    const [active, setActive] = useState(0)
    const [loading, setLoading] = useState(true)
    const [authorData, setAuthorData] = useState();
    const [openLibrary, setOpenLibrary] = useState(false)

    const sizes = useWindowSize();
    useEffect(() => {
        getAuthor({authorId: id}).then((author) => setAuthorData(author))
        setLoading(false)
    }, [id, slug])
    return (
        loading ? <Loading /> :
            <main className="w-full">
                {
                    openLibrary ? <AuthorLibrary active={active} setActive={setActive} id={id} slug={slug}  setOpenLibrary={setOpenLibrary}/> : <div className="w-full">
                    <Header />
                    <div className=''>
                        <div className="bg-white">
                            <div className='pt-2 relative '>
                                <div className="w-full h-[160px]">
                                    <Image width={0} height={0} sizes="100vw" alt="" src="/dumuc/bg-author.png" className="w-full h-full" />
                                </div>
                               
                                <div className='w-full absolute top-full left-0'>
                                    <div className="-translate-y-16 relative flex flex-col items-center z-30">
                                        <div className="bg-white relative rounded-full z-30">
                                            <Image width={0} height={0} sizes="100vw" class="w-32 h-32 rounded-full" src={
                                                authorData?.photo
                                                    ? authorData?.photo
                                                    : authorData?.user?.photo ? authorData?.user?.photo : "/dumuc/avatar.png"
                                            } alt={authorData?.name} />
                                        </div>
                                        {/* <a style={{ color: 'black', fontWeight: '500', fontSize: 24 }} href={`/author/${authorData?.slug}/${authorData?.authorId}`}>{authorData?.name}</a> */}
                                    </div>

                                </div>
                            </div>
                            <div className="mt-16 translate-y-6 px-3">
                                <div className="bg-white rounded-xl shadow-md shadow-gray-400 px-[15px] py-[15px] sm:px-[25px] sm:py-[20px]">
                                    <h3 className="text-base sm:text-lg font-semibold">{authorData?.name}</h3>
                                    <div className="flex gap-6 text-sm font-semibold text-[#00000080]">
                                        <p>ID: dumuc{authorData?.user?.username}</p>
                                        <p>Phone:09xxxxx</p>
                                    </div>
                                    <div className="flex gap-x-3 sm:gap-x-6 mt-3">
                                    {user?.email === authorData?.user?.email && <button onClick={() => router.push("/account/profile")} className={`flex items-center justify-center bg-white rounded-full shadow-md shadow-gray-400 basis-1/2 py-[10px] ${sizes.width > 350 ? "text-base sm:text-lg" : "text-sm"}  font-semibold gap-x-2`}>
                                        <HiPencil size={18} color="#00000080" />
                                        Chỉnh sửa
                                        </button>}
                                        <button onClick={() => {
                                            setOpenLibrary(true)
                                            setActive(2)
                                        }} className={`flex items-center justify-center bg-white rounded-full shadow-md shadow-gray-400 basis-1/2 py-[10px] ${sizes.width > 350 ? "text-base sm:text-lg" : "text-sm"}  font-semibold gap-x-2`}>
                                        <HiPencil size={18} color="#00000080" />
                                        Giới thiệu
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl shadow-md shadow-gray-400 px-[15px] py-[15px] sm:px-[25px] sm:py-[20px] mt-4 sm:mt-6">
                                    <h3 className="text-base sm:text-lg font-semibold">Thư viện bài viết</h3>
                                    <div className="flex gap-6 text-sm font-semibold text-[#00000080]">
                                    Nơi lưu trữ lịch sử bài viết của {user?.email === authorData?.user?.email ? "bạn": authorData?.name}....
                                    </div>
                                    <div className="flex gap-x-3 sm:gap-x-6 mt-3">
                                        <button 
                                        onClick={() => {
                                            setOpenLibrary(true);
                                            setActive(0)
                                        }}
                                         className={`flex items-center justify-center bg-white rounded-full shadow-md shadow-gray-400 basis-1/2 py-[10px] ${sizes.width > 350 ? "text-base sm:text-lg" : "text-sm"}  font-semibold gap-x-2`}>
                                        <IoEyeOutline size={18} color="#00000080" />
                                        Bài Feed
                                        </button>
                                        <button
                                         onClick={() => {
                                            setOpenLibrary(true);
                                            setActive(1)
                                         }}
                                         className={`flex items-center justify-center bg-white rounded-full shadow-md shadow-gray-400 basis-1/2 py-[10px] ${sizes.width > 350 ? "text-base sm:text-lg" : "text-sm"}  font-semibold gap-x-2`}>
                                        <IoEyeOutline size={18} color="#00000080" />
                                        Bài Forum
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl shadow-md shadow-gray-400 px-[15px] py-[15px] sm:px-[25px] sm:py-[20px] mt-4 sm:mt-6">
                                    <h3 className="text-base sm:text-lg font-semibold">Thư viện hình ảnh, video</h3>
                                    <div className="flex gap-6 text-sm font-semibold text-[#00000080]">
                                    Nơi lưu trữ lịch sử hình ảnh, video của {user?.email === authorData?.user?.email ? "bạn": authorData?.name} ...
                                    </div>
                                    <div className="flex gap-x-3 sm:gap-x-6 mt-3">
                                        <button onClick={() => {
                                            setOpenLibrary(true)
                                            setActive(3)
                                        }} className={`flex items-center justify-center bg-white rounded-full shadow-md shadow-gray-400 basis-1/2 py-[10px] ${sizes.width > 350 ? "text-base sm:text-lg" : "text-sm"}  font-semibold gap-x-2`}>
                                        <MdOutlinePhoto size={18} color="#00000080" />
                                        Hình ảnh
                                        </button>
                                        <button onClick={() => {
                                            setOpenLibrary(true)
                                            setActive(4)
                                        }} className={`flex items-center justify-center bg-white rounded-full shadow-md shadow-gray-400 basis-1/2 py-[10px] ${sizes.width > 350 ? "text-base sm:text-lg" : "text-sm"}  font-semibold gap-x-2`}>
                                        <MdOutlinePlayCircleOutline size={18} color="#00000080" />
                                        Video
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-white rounded-xl shadow-md shadow-gray-400 px-[15px] py-[15px] sm:px-[25px] sm:py-[20px] mt-4 sm:mt-6">
                                    <h3 className="text-base sm:text-lg font-semibold">Danh sách bạn</h3>
                                    <div className="flex gap-6 text-sm font-semibold text-[#00000080]">
                                    Danh sách kết bạn và theo dõi của {user?.email === authorData?.user?.email ? "bạn": authorData?.name} ...
                                    </div>
                                    <div className="flex gap-x-3 sm:gap-x-6 mt-3">
                                        <button className={`flex items-center justify-center bg-white rounded-full shadow-md shadow-gray-400 basis-1/2 py-[10px] ${sizes.width > 350 ? "text-base sm:text-lg" : sizes.width > 310 ? "text-sm" : "text-[13px]"}  font-semibold gap-x-2`}>
                                        Danh sách bạn
                                        </button>
                                        <button className={`flex items-center justify-center bg-white rounded-full shadow-md shadow-gray-400 basis-1/2 py-[10px] ${sizes.width > 350 ? "text-base sm:text-lg" : sizes.width > 310 ? "text-sm" : "text-[13px]"}  font-semibold gap-x-2`}>
                                        Đang theo dõi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
                }
                <TabbarBottom />
                <div className="md:mb-44 sm:mb-56 mb-60" />
                <BannerRight
                    isAppInstall={true}
                />
            </main>
    )
}
export default NewAuthorUI;