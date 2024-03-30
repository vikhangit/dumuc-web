"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import {getAuthor } from "@apis/posts";
import TabbarBottom from "@components/TabbarBottom";
import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import {MdOutlinePhoto, MdOutlinePlayCircleOutline, MdPending} from "react-icons/md";
import Loading from "app/author/[slug]/[id]/loading";
import { useWindowSize } from "@hooks/useWindowSize";
import { IoEyeOutline } from "react-icons/io5";
import { HiPencil } from "react-icons/hi";
import AuthorLibrary from "@components/authorLibrary";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import { FaUserCheck, FaUserPlus } from "react-icons/fa6";
import { FaUserTimes } from "react-icons/fa";
import { acceptReceiveRequestAddFriend, acceptRequestAddFriend, createUserFollow, createUserToFollowerList, deleteAddFriend, deleteRecieveFriend, deleteUserFollow, deleteUserInFollowerList, getProfile, receiveRequestAddFriend, sendRequestAddFriend } from "@apis/users";
import { message } from "antd";
import Link from "next/link";

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
    const [usingUser, setUsingUser] = useState()
    useEffect(() =>{
      getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall)) 
    },[user])
    useEffect(() => {
        getAuthor({authorId: id}).then((author) => setAuthorData(author))
        setLoading(false)
    }, [id, slug])
    return (
        loading ? <Loading /> :
            <main className="w-full">
                
                    <div className="w-full">
                    <Header />
                    <div className=''>
                        <div className="bg-white">
                            <div className='pt-2 relative '>
                                <div className="w-full h-[160px]">
                                    <Image width={0} height={0} sizes="100vw" alt="" src="/dumuc/bg-author.png" className="w-full h-full" />
                                </div>
                               {/* button addfriend */}
                                <div className='w-full absolute top-full left-0'>
                                    <div className="-translate-y-16 relative flex flex-col items-center z-30">
                                        <div className="bg-white relative rounded-full z-30">
                                            <Image width={0} height={0} sizes="100vw" class="w-32 h-32 rounded-full" src={
                                                authorData?.photo
                                                    ? authorData?.photo
                                                    : authorData?.user?.photo ? authorData?.user?.photo : "/dumuc/avatar.png"
                                            } alt={authorData?.name} />
                                        </div>
                                        <h3 className="text-black mt-1 text-lg font-semibold">
                                            {authorData?.name}
                                        </h3>
                                        {
                                            authorData?.user?.email !== user?.email && <div className="flex items-center gap-x-2 mt-2">
                                                {
                                                 usingUser?.friendList?.length > 0 ?   usingUser?.friendList?.map((item, index) => {
                                                        if(item?.type === "send" && item.authorId === authorData?.authorId && item?.status === 1){
                                                            return <button onClick={() => {
                                                                deleteAddFriend({
                                                                    authorId: authorData?.authorId,
                                                                    }, user?.accessToken)
                                                                    .then(async(result) => {
                                                                      console.log(result)
                                                                    //update recoil
                                                                    deleteRecieveFriend({
                                                                      authorUserId: authorData?.userId
                                                                    }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                    const dataCall = await getProfile(user?.accessToken) 
                                                                    setUsingUser(dataCall)
                                                                        message.success('Đã hủy kết bạn.');
                                                                });
                                                           }} 
                                                            type="button" 
                                                            class="flex items-center gap-x-2 px-5 py-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                            ><FaUserTimes size={20} />Hủy lời mời</button>
                                                        }else if(item?.type === "recieve" && item?.authorId === authorData?.authorId && item?.status === 1){
                                                            return <button 
                                                            type="button" 
                                                            class="flex items-center gap-x-2 relative cursor-pointer group px-5 py-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                            >
                                                                <FaUserCheck size={20} />Phản hồi
                                                                <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                                                <Link href={``} 
                                                                 onClick={async (e) => {
                                                                    e.preventDefault();
                                                                    await deleteAddFriend({
                                                                        authorId: authorData?.authorId,
                                                                        }, user?.accessToken)
                                                                        .then(async(result) => {
                                                                          console.log(result)
                                                                        //update recoil
                                                                        await deleteRecieveFriend({
                                                                          authorUserId: authorData?.userId
                                                                        }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                    });
                                                                    await sendRequestAddFriend({
                                                                        authorId: authorData?.authorId,
                                                                        status: 2
                                                                    }, user?.accessToken)
                                                                    .then(async(result) => {
                                                                    console.log(result)
                                                                    await receiveRequestAddFriend({
                                                                    authorUserId: authorData?.userId,
                                                                    status: 2
                                                                    }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                  
                                                                });
                                                                await createUserFollow({
                                                                    authorId: authorData?.authorId
                                                                }, user?.accessToken)
                                                                .then(async(result) => {
                                                                  console.log(result)
                                                                await createUserToFollowerList({
                                                                  authorUserId: authorData?.userId
                                                                 }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                })
                                                                await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                                                await getAuthor({authorId: id}).then((author) => setAuthorData(author))
                                                                    }} 
                                                                  className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                                                >
                                                                    Xác nhận
                                                                </Link>
                                                                <Link href={``} 
                                                                    onClick={(e) => {
                                                                    e.preventDefault();
                                                                    deleteAddFriend({
                                                                        authorId: authorData?.authorId,
                                                                        }, user?.accessToken)
                                                                        .then(async(result) => {
                                                                          console.log(result)
                                                                        //update recoil
                                                                        deleteRecieveFriend({
                                                                          authorUserId: authorData?.userId
                                                                        }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                        const dataCall = await getProfile(user?.accessToken) 
                                                                        setUsingUser(dataCall)
                                                                            message.success('Đã xóa yêu cầu kết bạn');
                                                                    });
                                                                    }} 
                                                                    className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left">Xóa lời mời</Link>
                                                                </div>
                                                            </button>
                                                        }else  if(item?.authorId === authorData?.authorId && item?.status === 2){
                                                            return <button onClick={() => {
                                                                
                                                           }} 
                                                            type="button" 
                                                            class="flex items-center group gap-x-2 px-5 py-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                           >
                                                            <FaUserCheck size={20} />
                                                                Bạn bè
                                                                <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                                                {
                                                                    usingUser?.follows?.find(x => x.authorId === authorData?.authorId) ? 
                                                                    <Link href={``} 
                                                                 onClick={async (e) => {
                                                                    e.preventDefault();
                                                                   await deleteUserFollow({
                                                                        authorId: authorData?.authorId,
                                                                        }, user?.accessToken)
                                                                        .then(async(result) => {
                                                                          console.log(result)
                                                                        //update recoil
                                                                     await   deleteUserInFollowerList({
                                                                          authorUserId: authorData?.userId
                                                                        }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                        
                                                                    });
                                                                await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                                                await getAuthor({authorId: id}).then((author) => setAuthorData(author))
                                                                    }} 
                                                                  className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                                                >
                                                                    Hủy theo dõi
                                                                </Link>
                                                                : 
                                                                <Link href={``} 
                                                                 onClick={async (e) => {
                                                                    e.preventDefault();
                                                                   await createUserFollow({
                                                                        authorId: authorData?.authorId
                                                                    }, user?.accessToken)
                                                                    .then(async(result) => {
                                                                      console.log(result)
                                                                    await createUserToFollowerList({
                                                                      authorUserId: authorData?.userId
                                                                     }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                    });
                                                                await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                                                await getAuthor({authorId: id}).then((author) => setAuthorData(author))
                                                                    }} 
                                                                  className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left"
                                                                >
                                                                    Theo dõi
                                                                </Link>
                                                                }
                                                                <Link href={``} 
                                                                    onClick={async(e) => {
                                                                    e.preventDefault();
                                                                   await deleteAddFriend({
                                                                        authorId: authorData?.authorId,
                                                                        }, user?.accessToken)
                                                                        .then(async(result) => {
                                                                          console.log(result)
                                                                        //update recoil
                                                                      await  deleteRecieveFriend({
                                                                          authorUserId: authorData?.userId
                                                                        }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                    
                                                                    });
                                                                    await   deleteUserFollow({
                                                                           authorId: authorData?.authorId,
                                                                           }, user?.accessToken)
                                                                           .then(async(result) => {
                                                                             console.log(result)
                                                                           //update recoil
                                                                        await   deleteUserInFollowerList({
                                                                             authorUserId: authorData?.userId
                                                                           }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                                           
                                                                       });
                                                                    await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                                                    await getAuthor({authorId: id}).then((author) => setAuthorData(author))
                                                                    }} 
                                                                    className="hover:bg-[#c80000] text-black hover:text-white w-full rounded px-1.5 py-0.5 text-left">Xóa bạn</Link>
                                                                </div>
                                                           </button>
                                                        }
                                                        // else{
                                                        //     return <button onClick={() => {
                                                        //         sendRequestAddFriend({
                                                        //             authorId: authorData?.authorId
                                                        //         }, user?.accessToken)
                                                        //         .then(async(result) => {
                                                        //         console.log(result)
                                                        //         await receiveRequestAddFriend({
                                                        //         authorUserId: authorData?.userId
                                                        //         }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                        //             await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                                        //             await getAuthor({authorId: id}).then((author) => setAuthorData(author))
                                                        //             message.success('Đã gữi yêu cầu kết bạn.')
                                                        //         });
                                                        //    }} 
                                                        //     type="button" 
                                                        //     class="flex items-center gap-x-2 px-5 py-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                        //     ><FaUserPlus size={20} />Thêm bạn bè</button>
                                                        // }
                                                    })
                                                    :<button onClick={async () => {
                                                        if(user){

                                                            await sendRequestAddFriend({
                                                                authorId: authorData?.authorId
                                                            }, user?.accessToken)
                                                            .then(async(result) => {
                                                            console.log(result)
                                                            await receiveRequestAddFriend({
                                                            authorUserId: authorData?.userId
                                                            }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                            });
                                                            await createUserFollow({
                                                                authorId: authorData?.authorId
                                                            }, user?.accessToken)
                                                            .then(async(result) => {
                                                              console.log(result)
                                                            await createUserToFollowerList({
                                                              authorUserId: authorData?.userId
                                                             }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                            });
                                                        await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                                        await getAuthor({authorId: id}).then((author) => setAuthorData(author))
                                                        message.success('Đã gữi yêu cầu kết bạn.')
                                                        }else{
                                                            router.push(`/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/author/${slug}/${id}`)
                                                        }
                                                   }} 
                                                    type="button" 
                                                    class="flex items-center gap-x-2 px-5 py-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                                    ><FaUserPlus size={20} />Thêm bạn bè</button>
                                                }
                                            
                                            <button className="flex items-center gap-x-2 px-5 py-2 text-xs font-medium text-center text-black bg-gray-300 rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"><MdPending size={20} />Nhắn tin</button>
                                        </div>
                                        }
                                       
                                    </div>

                                </div>
                            </div>
                            <div className={`${authorData?.user?.email !== user?.email ? "mt-[8rem]" : "mt-20"} translate-y-6 px-3`}>
                                <div>
                                {
                                        authorData?.user?.email !== user?.email && usingUser?.friendList?.find(x => x?.authorId === authorData?.authorId && x?.type === "recieve" && x?.status === 1)
                                        && <div className="flex justify-between bg-white shadow-md shadow-gray-400 mb-[20px] px-[15px] py-[10px] mt-[8rem]">
                                           <div className="text-sm font-medium">
                                           {
                                                `${ authorData?.name} đã gửi lời mời kết bạn`
                                            }
                                           </div>
                                           <div className="flex gap-x-2">
                                            <button
                                             onClick={async (e) => {
                                                e.preventDefault();
                                               await deleteAddFriend({
                                                    authorId: authorData?.authorId,
                                                    }, user?.accessToken)
                                                    .then(async(result) => {
                                                      console.log(result)
                                                    //update recoil
                                                   await deleteRecieveFriend({
                                                      authorUserId: authorData?.userId
                                                    }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                });
                                               await sendRequestAddFriend({
                                                    authorId: authorData?.authorId,
                                                    status: 2
                                                }, user?.accessToken)
                                                .then(async(result) => {
                                                console.log(result)
                                                await receiveRequestAddFriend({
                                                authorUserId: authorData?.userId,
                                                status: 2
                                                }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                
                                            });
                                            await createUserFollow({
                                                authorId: authorData?.authorId
                                            }, user?.accessToken)
                                            .then(async(result) => {
                                              console.log(result)
                                            await createUserToFollowerList({
                                              authorUserId: authorData?.userId
                                             }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                            });
                                            await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                                            await getAuthor({authorId: id}).then((author) => setAuthorData(author))
                                                }} 
                                             className="px-3 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300">Chấp nhận</button>
                                            <button onClick={() => {
                                                deleteAddFriend({
                                                    authorId: authorData?.authorId,
                                                    }, user?.accessToken)
                                                    .then(async(result) => {
                                                      console.log(result)
                                                    //update recoil
                                                    deleteRecieveFriend({
                                                      authorUserId: authorData?.userId
                                                    }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                    const dataCall = await getProfile(user?.accessToken) 
                                                    setUsingUser(dataCall)
                                                        message.success('Đã xóa yêu cầu kết bạn');
                                                });
                                            }} 
                                            className="px-3 py-1 text-xs font-medium text-center text-black bg-gray-300 rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                                            >
                                                Xóa lời mời
                                            </button>
                                           </div>
                                        </div>
                                       }
                                </div>
                                <div className="flex text-base font-semibold bg-white shadow-md shadow-gray-400"> 
                                    <button 
                                        className={`relative group px-3 py-3 ${(active === 0 || active === 1) &&  "border-b-2 border-[#c80000]"}`}
                                        
                                    >
                                        Bài viết
                                        <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                                                <Link href={``} 
                                                                 onClick={async (e) => {
                                                                    e.preventDefault();
                                                                    setActive(0)
                                                                    }} 
                                                                  className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left ${active === 0 ? "text-white bg-[#c80000] bg-opacity-60": "text-black"}`}
                                                                >
                                                                    Feed
                                                                </Link>
                                                                <Link href={``} 
                                                                    onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setActive(1)
                                                                    }} 
                                                                    className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left ${active === 1 ? "text-white bg-[#c80000] bg-opacity-60": "text-black"}`}>Forum</Link>
                                        </div>
                                    </button>
                                    <button onClick={() => setActive(2)} className={`px-3 py-3 ${active === 2 && "border-b-2 border-[#c80000]"}`}>Giới thiệu</button>
                                    <button onClick={() => setActive(3)} className={`px-3 py-3 ${active === 3 && "border-b-2 border-[#c80000]"}`}>Bạn bè</button>
                                    <button  className={`relative group px-3 py-3 ${(active === 4 || active === 5) &&  "border-b-2 border-[#c80000]"}`}>
                                        Thư viện
                                        <div className="absolute hidden group-hover:flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[120px] rounded p-1">
                                                                <Link href={``} 
                                                                 onClick={async (e) => {
                                                                    e.preventDefault();
                                                                    setActive(4)
                                                                    }} 
                                                                  className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left ${active === 4 ? "text-white bg-[#c80000] bg-opacity-60": "text-black"}`}
                                                                >
                                                                    Ảnh
                                                                </Link>
                                                                <Link href={``} 
                                                                    onClick={(e) => {
                                                                    e.preventDefault();
                                                                    setActive(5)
                                                                    }} 
                                                                    className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left ${active === 5 ? "text-white bg-[#c80000] bg-opacity-60": "text-black"}`}>Video</Link>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                       <div className="mt-[60px]">
                       <AuthorLibrary
                       onCallback= {async () => {
                        await getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
                        await getAuthor({authorId: id}).then((author) => setAuthorData(author))
                       
                       }}
                        active={active} setActive={setActive} id={id} slug={slug} usingUser={usingUser}  setOpenLibrary={setOpenLibrary}/>
                       </div>
                    </div>
                </div>
                
                <TabbarBottom />
                <div className="md:mb-44 sm:mb-56 mb-60" />
                <BannerRight
                    isAppInstall={true}
                />
            </main>
    )
}
export default NewAuthorUI;