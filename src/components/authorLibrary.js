import { getFeedsLoadMore } from '@apis/feeds';
import { getAuthor, getPostsLoadMore } from '@apis/posts';
import { useWindowSize } from '@hooks/useWindowSize';
import React, { useEffect, useState } from 'react';
import FeedItems from './FeedItems';
import ArticleItems from './ArticleItems';
import Image from 'next/image';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function AuthorLibrary({active, setActive, id, slug, setOpenLibrary}) {
    const [loading, setLoading] = useState(false)
    const [postsData, setPostsData] = useState();
    const [feedsData, setFeedsData] = useState();
    const [authorData, setAuthorData] = useState();

    const sizes = useWindowSize();

    useEffect(() => {
        (async () => {
            setLoading(true)
            try {
                let payload = {
                    limit: 20,
                    author: id,
                };

                const [posts, feeds, author] = await Promise.all([
                    getPostsLoadMore(payload),
                    getFeedsLoadMore(payload),
                    getAuthor({
                        authorId: id,
                    }),
                ]);
                setPostsData(posts);
                setFeedsData(feeds);
                setAuthorData(author)
                setLoading(false)
            } catch (e) { }
        })();
    }, [id, slug])
    console.log("Feed.Data", authorData)
    return (
        <div>
            <div className='flex shadow-md shadow-gray-500 px-3 py-6 items-center'>
                <button onClick={() => setOpenLibrary(false)}>
                <IoIosArrowRoundBack size={42} color='#000000B2' />
                </button>
                {
                    active === 2 ? <div className={`w-full flex justify-center text-lg sm:text-xl font-bold sm:font-semibold text=[#000000B2]`}>
                    Giới thiệu về {authorData?.name}
                </div>: <div className={`w-full flex justify-center text-lg sm:text-xl font-bold sm:font-semibold text=[#000000B2]`}>
                    Thư viện {active == 3 ? "hình ảnh" : active === 4 ? "video": "bài viết"} 
                </div>
                }
            </div>
            <div className="px-3">
        {
            active !== 2 && (active === 0 || active === 1 ) &&   <>
              <div class="text-sm font-medium text-center border-gray-200 mt-10 mb-6 mx-3">
                    <ul class="flex items-center bg-[#D9D9D9] rounded-full px-[5px] py-[5px] sm:px-[10px] sm:py-[10px]">
                        <li className="basis-1/2">
                            <button
                               onClick={() => setActive(0)}
                                className={`${active === 0 ? "text-black bg-white": "bg-transparent text-transparent"} font-semibold w-full -full rounded-full py-[5px] sm:py-[10px] text-base sm:text-lg`}>
                                 Bài Feed
                            </button>
                        </li>
                        <li className="basis-1/2">
                            <button
                               onClick={() => setActive(1)}
                                className={`${active === 1 ? "text-black bg-white": "bg-transparent text-transparent"} font-semibold w-full -full rounded-full py-[5px] sm:py-[10px] text-base sm:text-lg`}>
                                Bài Forums
                            </button>
                        </li>
                    </ul>
                </div>
                {active === 0 && (
                    <div className=''>
                        <FeedItems data={feedsData} authorId={id} onCallback={async () => {
                            try {
                                let payload = {
                                    limit: 20,
                                    author: id,
                                };

                                const [feeds] = await Promise.all([
                                    getFeedsLoadMore(payload),
                                ]);
                                setFeedsData(feeds);
                            } catch (e) { }
                        }} />
                    </div>
                )}
                {active === 1 && (
                    <div className='!bg-white'>
                        <ArticleItems data={postsData} authorId={id} onCallback={async () => {
                            try {
                                let payload = {
                                    limit: 20,
                                    author: id,
                                };

                                const [posts] = await Promise.all([
                                    getPostsLoadMore(payload),
                                ]);
                                setPostsData(posts);
                            } catch (e) { }
                        }} />
                    </div>
                )}</>
        }
        {
            active !== 2 && (active === 3 || active === 4 ) &&   <>
              <div class="text-sm font-medium text-center border-gray-200 mt-10 mb-6 mx-3">
                    <ul class="flex items-center bg-[#D9D9D9] rounded-full px-[5px] py-[5px] sm:px-[10px] sm:py-[10px]">
                        <li className="basis-1/2">
                            <button
                               onClick={() => setActive(3)}
                                className={`${active === 3 ? "text-black bg-white": "bg-transparent text-transparent"} font-semibold w-full -full rounded-full py-[5px] sm:py-[10px] text-base sm:text-lg`}>
                                 Hình Ảnh
                            </button>
                        </li>
                        <li className="basis-1/2">
                            <button
                               onClick={() => setActive(4)}
                                className={`${active === 4 ? "text-black bg-white": "bg-transparent text-transparent"} font-semibold w-full -full rounded-full py-[5px] sm:py-[10px] text-base sm:text-lg`}>
                                Video
                            </button>
                        </li>
                    </ul>
                </div>
               { active === 3 && <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
                {
                    authorData?.photos?.map((photo) =>
                        <Image alt="" src={photo} sizes="100vw" width={0} height={0} className="w-full h-full rounded-md" />
                    )
                }
            </div>
               }
            </>
        }
        {
            active === 2 && <div className="flex flex-col mt-6 justify-center">
                <p className="text-sm text-gray-800 px-4">{authorData?.description}</p>
            </div>
        }
        {
           
        }
        {
            active === 2 && <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {/* {
                    authorData?.photos?.map((photo) =>
                        <Image alt="" src={photo} sizes="100vw" width={0} height={0} className="w-full h-full rounded-md" />
                    )
                } */}
            </div>
        }
        </div>
        </div>
    
    )
        
}
