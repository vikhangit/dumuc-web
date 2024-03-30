"use client"
import { getFeedsLoadMore } from '@apis/feeds';
import { getAuthor, getPostsLoadMore } from '@apis/posts';
import { useWindowSize } from '@hooks/useWindowSize';
import React, { useEffect, useState } from 'react';
import FeedItems from './FeedItems';
import ArticleItems from './ArticleItems';
import Image from 'next/image';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@utils/firebase';
import { HiPencil } from 'react-icons/hi';
import { getUser } from '@apis/users';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AuthorLibrary({active, setActive, id, slug, setOpenLibrary, usingUser, onCallback}) {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const [postsData, setPostsData] = useState();
    const [feedsData, setFeedsData] = useState();
    const [authorData, setAuthorData] = useState();
    const [userAuthor, setUserAuthor] = useState();
    const [tab, setTab] = useState(0)
    const router = useRouter()
    const sizes = useWindowSize();

    useEffect(() => {
        let payload = {
            limit: 5,
            author: id,
        };
        // getPostsLoadMore(payload).then((posts) => setPostsData(posts))
        getPostsLoadMore(payload).then((data) => {
            let newarr = data.items;
            const myPost = newarr?.filter(a => a?.author?.user?.email === user?.email)
            if(myPost && myPost?.length > 0){
                setPostsData(newarr)
            }else{
              const publishPosts = newarr?.filter( a => a?.isPrivate === false)
              setPostsData(publishPosts)
            }
          })
        getFeedsLoadMore(payload).then((feeds) => setFeedsData(feeds))
        getAuthor({
            authorId: id,
        }).then((author) => setAuthorData(author))
        
        setLoading(false)
    }, [id, slug])
    useEffect(() => {
        getUser({
            userId: authorData?.userId
        }).then((data)  => setUserAuthor(data))
    }, [authorData])
    return (
        <div>
            
            <div className="px-3">
            {active === 0 && (
                    <div className=''>
                        <FeedItems data={feedsData} authorId={id} onCallback={async () => {
                           await getFeedsLoadMore({limit: 5,author: id}).then((feeds) => setFeedsData(feeds))
                        }} />
                    </div>
                )}
                {active === 1 && (
                    <div className='!bg-white'>
                        <ArticleItems data={postsData} authorId={id} onCallback={async () => {
                             getPostsLoadMore({limit: 5,author: id}).then((data) => {
                                let newarr = data.items;
                                const myPost = newarr?.filter(a => a?.author?.user?.email === user?.email)
                                if(myPost && myPost?.length > 0){
                                    setPostsData(newarr)
                                }else{
                                  const publishPosts = newarr?.filter( a => a?.isPrivate === false)
                                  setPostsData(publishPosts)
                                }
                              })   
                        }}
                         />
                        
                    </div>
                )}
                {
            active === 2 && <div className="flex flex-col mt-6 justify-center">
                <div className="bg-white rounded-xl shadow-md shadow-gray-400 px-[15px] py-[15px] sm:px-[25px] sm:py-[20px]">
                            <div className="flex justify-end mt-3">
                                    {user?.email === authorData?.user?.email && <button onClick={() => router.push("/account/profile")} className={`flex items-center justify-center rounded-lg bg-[#c80000] shadow-md shadow-gray-400 py-[5px] px-2 text-white text-sm  font-normal gap-x-2`}>
                                        <HiPencil size={16} />
                                        Chỉnh sửa
                                        </button>}
                                    </div>
                                    <div className="flex flex-col gap-1 text-sm font-normal text-[#000000]">
                                        <p><strong>ID:</strong> dumuc{authorData?.user?.username}</p>
                                        {authorData?.user?.phone && <p><strong>Phone:</strong> {authorData?.user?.phone}</p>}
                                        {authorData?.user?.email && <p><strong>Email:</strong> {authorData?.user?.email}</p>}
                                        {authorData?.user?.numberPlate && <p><strong>Biển số xe:</strong> {authorData?.user?.numberPlate}</p>}
                                        {authorData?.user?.address && <p><strong>Địa chỉ:</strong> {authorData?.user?.address}</p>}
                                    </div>
                                    
                                </div>
            </div>
           
        }
         {
                active === 3 && <div className='px-5'>
                    <div>
                    <div className="flex text-dm font-semibold bg-white"> 
                    <button onClick={() => setTab(0)} className={`px-3 py-3 ${tab === 0 && "border-b-2 border-[#c80000]"}`}>Bạn bè</button>
                    <button onClick={() => setTab(2)} className={`px-3 py-3 ${tab === 2 && "border-b-2 border-[#c80000]"}`}>Người theo dõi</button>
                    <button onClick={() => setTab(1)} className={`px-3 py-3 ${tab === 1 && "border-b-2 border-[#c80000]"}`}>Đang theo dõi</button>
                                </div>
                    </div>
                   <div className='mt-5 grid sm:grid-cols-2 gap-4'>
                    { tab === 0 &&
                            userAuthor?.friendList?.filter(x => x.status === 2)?.map(async (item, index) => {
                                const author = await getAuthor({authorId: item?.authorId})
                                return <div className='flex gap-x-3 items-center cursor-pointer w-full'>
                                <Image width={0} height={0} sizes="100vw" class="w-24 h-24 sm:w-32 sm:h-32 " src={
                                                author?.photo
                                                    ? author?.photo
                                                    : author?.user?.photo ? author?.user?.photo : "/dumuc/avatar.png"
                                            } alt={author?.name} 
                                            onClick={() => router.push(`/author/${author?.slug}/${author?.authorId}`)}
                                            />
                                <p  onClick={() => router.push(`/author/${author?.slug}/${author?.authorId}`)} className='text-base font-semibold'>{author?.name}</p>
                            </div>
                            })
                        }
                        { tab === 1 &&
                            userAuthor?.follows?.map(async (item, index) => {
                                let newarr = [];
                                const author = await getAuthor({authorId: item?.authorId})
                                return <div className='flex gap-x-3 items-center cursor-pointer w-full'>
                                <Image width={0} height={0} sizes="100vw" class="w-24 h-24 sm:w-32 sm:h-32 " src={
                                                author?.photo
                                                    ? author?.photo
                                                    : author?.user?.photo ? author?.user?.photo : "/dumuc/avatar.png"
                                            } alt={author?.name} 
                                            onClick={() => router.push(`/author/${author?.slug}/${author?.authorId}`)}
                                            />
                                <p  onClick={() => router.push(`/author/${author?.slug}/${author?.authorId}`)} className='text-base font-semibold'>{author?.name}</p>
                            </div>
                            })
                        }
                        { tab === 2 &&
                            userAuthor?.follower?.map(async (item, index) => {
                                let newarr = [];
                                const author = await getAuthor({authorId: item?.authorId})
                                return <div className='flex gap-x-3 items-center cursor-pointer w-full'>
                                <Image width={0} height={0} sizes="100vw" class="w-24 h-24 sm:w-32 sm:h-32 " src={
                                                author?.photo
                                                    ? author?.photo
                                                    : author?.user?.photo ? author?.user?.photo : "/dumuc/avatar.png"
                                            } alt={author?.name} 
                                            onClick={() => router.push(`/author/${author?.slug}/${author?.authorId}`)}
                                            />
                                <p  onClick={() => router.push(`/author/${author?.slug}/${author?.authorId}`)} className='text-base font-semibold'>{author?.name}</p>
                            </div>
                            })
                        }
                   </div>
                </div>
            }
        { active === 4 && <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {
                    authorData?.photos?.map((photo) =>
                        photo?.type === "image" && <Image alt="" src={photo?.url} sizes="100vw" width={0} height={0} className="w-full h-full rounded-md" />
                    )
                }
            </div>
}      
        { active === 5 && <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {
                    authorData?.photos?.map((photo) =>
                    photo?.type === "video" 
                    && <video className="rounded-lg w-full h-[200px]" controls loop>
                    <source src={photo.url} type="video/mp4" />
                  </video> 
                    )
                }
            </div>
}      
        </div>
        </div>
    
    )
        
}
