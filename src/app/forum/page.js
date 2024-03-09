"use client"
import Link from 'next/link';
import TabbarBottom from "@components/TabbarBottom";
import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import moment from 'moment';

//apis
import { getCategories, getPostsByCategory } from "@apis/posts";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Loading from './loading';

const HomePage = async () => {
  
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const [cate] = await Promise.all([
          getCategories(),
        ]);
        setCategories(cate)
        setLoading(false)
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    })();
  }, [])

  return (
    loading ? <Loading /> :
    <main className="w-full">
      <div className="w-full">
        <Header />
        <div className="mt-2 mb-4">
          <h2 class="text-lg font-medium text-[#c80000] dark:text-white text-center">CỘNG ĐỒNG DU MỤC VIỆT NAM</h2>
          <div className="flex justify-center items-end mt-2 gap-x-2">
            {
              Array(5).fill().map((item, index) =>
                <Image key={index} alt="" width={0} height={0} sizes='100vw' src="/icons/bottom/Vector.png" className={index === 2 ? 'w-6 h-6' : 'w-5 h-5'} />
              )
            }
          </div>
        </div>
        {categories?.filter(item => item.categoryParentId === '' && item.type === 'posts').map(item => {
          return (
            <div key={item.categoryId} class="sm:w-full w-[96%] mx-auto my-4 font-normal text-gray-900 bg-white shadow shadow rounded-lg">
              <div className="block text-base w-full px-4 py-2 text-white bg-[#c80000] border-b border-gray-200 rounded-t-lg">
                {item?.name.toUpperCase()}
              </div>
              {categories?.filter(x => x.categoryParentId === item.categoryId)?.map(async sub => {
                let posts = await getPostsByCategory({
                  category: sub?.categoryId,
                });
                let commentsCount = 0
                posts && posts?.map(post => {
                  return commentsCount = commentsCount + post?.commentsCount
                })
                const url = `/forum/topic/${sub.slug}/${sub.categoryId}`
                return (
                  <div
                    key={sub?.categoryId}
                    className="grid grid-cols-1 items-center overflow-y-hidden xl:grid-cols-2 p-4 border-b border-gray-200 gap-2"
                  >
                    <div class="">
                      <div class="flex items-center gap-x-2">
                        <div className="h-full pl-2 mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-[#c80000]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                          </svg>
                        </div>
                        <div class="font-medium">
                          <Link href={url} className="text-base capitalize hover:underline text-[#2A2727]">
                            {sub?.name}
                          </Link>
                          <div className="line-clamp-3 text-sm text-[#2A2727]">{sub?.description}</div>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col sm:flex-row sm:gap-x-4 ml-[42px] sm:ml-0">
                      <div className="flex flex-none gap-x-6 sm:gap-x-4 sm:justify-between items-center px-0 sm:px-2 sm:px-0">
                        <Link
                          href={url}
                          className="w-auto text-xs sm:text-sm  items-start sm:items-center flex sm:flex-col gap-1 font-normal text-[#838383] hover:underline hover:text-gray-900"
                        >
                          <div>{posts?.length}</div>
                          <div>Bài viết</div>
                        </Link>
                        <Link href={url} className="w-auto text-xs sm:text-sm  items-start sm:items-center flex gap-1 sm:flex-col font-normal text-[#838383] cursor-pointer hover:underline hover:text-gray-900">
                          <div>{commentsCount}</div>
                          <div>Bình luận</div>
                        </Link>
                      </div>
                      <div className="w-full mt-2 sm:mt-0 hidden sm:block">
                        {posts[0] && (
                          <div className="w-full items-center bg-gray-100 p-2.5 rounded text-xs font-medium text-gray-500">
                            <Link
                              className="line-clamp-2 text-justify hover:underline"
                              href={`/forum/post/${posts[0]?.slug}/${posts[0]?.postId}`}
                            >
                              {posts[0]?.title}
                            </Link>
                            <div className="text-xs">
                              <Link
                                className="text-[#c80000] hover:underline"
                                href={`/author/${posts[0]?.author?.slug}/${posts[0]?.author?.authorId}`}
                              >
                                {posts[0]?.user?.name}
                              </Link>
                              {" - "}
                              {moment(posts[0]?.publishDate).format("DD.MM")}{" "}
                            </div>
                          </div>
                        )}
                        {/* {posts[1] && (
                          <li className="mt-2 w-full">
                            <div className="w-full items-center bg-gray-100 p-2.5 ml:0 sm:ml-4 rounded text-xs font-medium text-gray-500">
                              <Link
                                className="line-clamp-2"
                                href={`/forum/post/${posts[0]?.slug}/${posts[1]?.postId}`}
                              >
                                {posts[1]?.title}
                              </Link>
                              <div className="text-xs">
                                {moment(posts[1]?.publishDate).format("DD.MM")}{" "}
                                <Link
                                  className="text-[#c80000]"
                                  href={`/forum/author/${posts[1]?.author?.slug}/${posts[1]?.author?.authorId}`}
                                >
                                  {posts[1]?.user?.name}
                                </Link>
                              </div>
                            </div>
                          </li>
                        )} */}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        })}

        <div className="mb-24" />
      </div>
      <TabbarBottom active='forum' />
      <BannerRight isAppInstall={true} />
    </main>
  )
}

export default HomePage;

