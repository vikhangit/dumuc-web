"use client"
import { getCategories, getPostsLoadMore} from "@apis/posts";
const TabbarBottom = dynamic( () => {
  return import( '@components/TabbarBottom' );
}, { ssr: false } );
import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import ArticleForumItems from "@components/ArticleForumItems";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loading from "app/forum/topic/[slug]/[id]/loading";
import dynamic from "next/dynamic";

export default function ({ params, searchParams }) {
    const [category, setCategory] = useState([])
    const [categories, setCategories] = useState([])
    const [initResults, setInitResults] = useState()
    const [popular, setPopular] = useState()
    const [loading, setLoading] = useState(true);
    const [user] =useAuthState(auth)
    const id = params?.id || '';
    useEffect(() => {
      let payload = {
        limit: 5,
      };
      getCategories().then((data) => {
        setCategories(data)
        let cate = data?.find((item) => item?.categoryId === params?.id)
        setCategory(cate)
        cate?.categoryParentId === '' ?  (payload["categoryParent"] = cate?.categoryId) : payload["category"] = cate?.categoryId;
        getPostsLoadMore(payload).then((data) => {
          let newarr = data.items;
          const myPost = newarr?.filter(a => a?.author?.user?.email === user?.email)
          if(myPost && myPost?.length > 0){
            setInitResults(newarr)
          }else{
            const publishPosts = newarr?.filter( a => a?.isPrivate === false)
            setInitResults(publishPosts)
          }
        })
      })
      setLoading(false) 
    }, [params])
    return (
      loading ? <Loading /> :
      <main className="w-full">
        <div className="w-full">
          <div><Header /></div>
          <div className="shadow-md shadow-gray-500 pb-2 px-4">
          <div className="pt-4 mb-4">
            <h2 class="text-lg font-medium text-[#c80000] dark:text-white text-center">CỘNG ĐỒNG DU MỤC VIỆT NAM</h2>
            <div className="flex justify-center items-end mt-2 gap-x-2">
              {
                Array(5).fill().map((item, index) =>
                  <Image key={index} alt="" width={0} height={0} sizes='100vw' src="/icons/bottom/Vector.png" className={index === 2 ? 'w-6 h-6' : 'w-5 h-5'} />
                )
              }
            </div>
          </div>
          <nav className="flex flex-col md:flex-row mt-4 gap-2" aria-label="Breadcrumb">
            <Link href={user ? "/forum/post" : `/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/forum/post`} className="bg-[#c80000] text-white flex pl-2 pr-3 py-0.5 rounded-md md:rounded-e-md items-center text-sm gap-1 w-fit mx-auto md:mx-0"><IoMdAddCircleOutline size="18" />Thêm bài</Link>
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center text-[#828181]">
                <a href="/" class="inline-flex gap-x-2 items-center text-xs sm:text-sm font-medium text-[#828181] hover:text-blue-600 breadcrumb-mobile">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#c80000]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                  </svg>                Forum
                </a>
              </li>
              <li>
                <div class="flex items-center ">
                <span className="font-semibold">{">>"}</span>
                  <a href="/forum" class="ml-1 text-xs sm:text-sm font-medium text-[#828181] hover:text-blue-600 md:ml-2 breadcrumb-mobile">{categories?.find(x => x.categoryId === category?.categoryParentId)?.name}</a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                <span className="font-semibold">{">>"}</span>
                  <span class="ml-1 text-xs sm:text-sm font-medium text-[#828181] md:ml-2 dark:text-gray-400 breadcrumb-mobile">{category?.name}</span>
                </div>
              </li>
            </ol>
          </nav>
          </div>
          <div key={category.categoryId} class="w-full sm:w-[96%] mx-auto mt-3 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg">
           
          </div>
            {
              (!initResults || initResults?.length === 0) ?
            <p className="text-sm sm:text-base font-normal mt-4 text-center">Hiện tại chưa có bài viết về danh mục này</p>
          :  <ArticleForumItems data={initResults} category={category} />  
          }
        </div>
        <TabbarBottom active='forum' />
        <div className="mb-28" />
        <BannerRight isAppInstall={true} />
      </main>
    )
}
