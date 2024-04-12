"use client"

import Header from "@components/Header";
import TableOfContent from "@components/TableOfContent";
import ArticleItems from "@components/ArticleItems";
import ArticleComments from "@components/ArticleComments";
const ArticleMeta = dynamic( () => {
  return import( '@components/ArticleMeta' );
}, { ssr: false } );
const EditorjsRender = dynamic( () => {
  return import( '@components/editorjs/EditorjsRender' );
}, { ssr: false } );
import Scroll from "react-scroll";
const TabbarBottom = dynamic( () => {
  return import( '@components/TabbarBottom' );
}, { ssr: false } );
import {getPost} from "@apis/posts";
import Image from "next/image";
import Link from "next/link";
import BannerRight from "@components/BannerRight";
import { useEffect, useState } from "react";
import Loading from "app/forum/post/[slug]/[id]/loading";
import { useWindowSize } from "@hooks/useWindowSize";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import dynamic from "next/dynamic";

const PostDetailContent = ({ slug, id }) => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [user] = useAuthState(auth);
  const [label, setLabel] = useState([])
  useEffect(() => {
    getPost({postId: id}).then((data) => setPost(data))
    setLoading(false)
  }, [id, slug]);
  const url = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/forum/post/${slug}/${id}`;
  console.log(post)
  return (
    <div className="">
     {
      loading ? <Loading /> :  <main className="w-full dark:bg-gray-900">
      <div className="flex w-full">
        <article className="bg-white py-4 px-4 xl:pr-0 m-auto w-full">
          <div className="border-b border-gray-200">
            <Header isBack={true} />
          </div>
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
              {
                <Link href={user ? "/forum/post" : `/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/forum/post`} className="bg-[#c80000] text-white flex pl-2 pr-3 py-0.5 rounded-md md:rounded-e-md items-center text-sm gap-1 w-fit mx-auto md:mx-0"><IoMdAddCircleOutline size="18" />Thêm bài</Link>
              }
              <ol class="inline-flex items-center space-x-1 md:space-x-3">
                <li class="inline-flex items-center text-[#828181]">
                  <a href="/forum" class="inline-flex gap-x-2 items-center text-xs sm:text-sm font-medium text-[#828181] hover:text-blue-600 breadcrumb-mobile">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#c80000]">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                    </svg> Forum
                  </a>
                </li>
                <li>
                  <div class="flex items-center ">
                  <span className="font-semibold">{">>"}</span>
                    <a href={`/forum/topic/${post?.categoryObj?.slug}/${post?.categoryObj?.categoryId}`} class="ml-1 text-xs sm:text-sm font-medium text-[#828181] hover:text-blue-600 md:ml-2 breadcrumb-mobile">{post?.categoryParentObj?.name}</a>
                  </div>
                </li>
                <li aria-current="page">
                  <div class="flex items-center">
                  <span className="font-semibold">{">>"}</span>
                    <Link href={`/forum/topic/${post?.categoryObj?.slug}/${post?.categoryObj?.categoryId}`} class="ml-1 text-xs sm:text-sm font-medium text-[#828181] md:ml-2 dark:text-gray-400 breadcrumb-mobile">{post?.categoryObj?.name}</Link>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          <div className="px-2 sm:px-4 md:px-8 mt-4 shadow-md shadow-gray-500 rounded py-4">
            <div className="">
            <div className='flex items-center'>
                     {
                      post?.isPopular &&  <span class="bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded flex justify-center items-center">
                      Nổi bật
                </span>
                     }
                     {
                   post?.label &&  Object.keys(post?.label).length > 0 &&
                      <span style={{
                        color: post?.label?.color
                      }} class={`bg-indigo-100 text-indigo-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded text-center w-fit`}>{post?.label?.name}</span>
                     }
                      </div>
            
            <h1 className={`my-2 text-xl font-semibold sm:font-bold leading-tight text-[#4A4949] capitalizie`}>{post?.title}</h1>
            </div>
            {/* <p className={`text-gray-500 italic text-justify my-3 text-[#605F5F] ${sizes.width > 576 ? "text-base" : "text-sm"}`}>{post?.description}</p> */}
            <ArticleMeta item={post} onCallback={async () =>{
                          await getPost({postId: id}).then((data) => setPost(data))
                        }} />
            <TableOfContent
              headers={post?.body?.blocks.filter((x) => x.type === "header")}
              onShowScroll={() => setShowScroll(true)}
            />
            <div className="text-xl font-normal text-justify"><EditorjsRender  item={post} />
            </div>
            
            {post?.tags && post?.tags.length > 0 && (
              <div style={{ marginTop: 10, paddingBottom: 20 }}>
                {post?.tags.map((item, index) => (
                  <a key={index} href={`/search?q=${item}`}>
                    <span class="mr bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-3 py-1.5 rounded">
                      #{item}
                    </span>
                  </a>
                ))}
              </div>
            )}
             {
              showScroll && <Scroll.Link className="fixed cursor-pointer flex justify-center items-center bottom-[30px] left-[50px] rounded-full z-50 bg-white shadow-lg shadow-gray-600 w-10 h-10"
              spy={true}
              smooth={true}
              offset={-90}
              to="tab-content"
             onClick={() => setShowScroll(false)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                </svg>
            </Scroll.Link>
             }
             <div className="mt-4"></div>
            <ArticleComments items={post?.comments || []}
              post={post}  onCallback={async () => {
                await getPost({postId: id}).then((data) => setPost(data))
              }}
            />
            <div className="mb-10"></div>
          </div>
          {post?.relatedPosts?.length > 0 && (
            <div
              className="px-4"
              style={{
                backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)",
              }}
            >
              <ArticleItems
                data={{
                  items: post?.relatedPosts
                }}
                layout="list"
              />
            </div>
          )}
        </article>
      </div>
        <div className="mb-44" />
      <BannerRight isAppInstall={true} />
      <TabbarBottom active="forum" />
    </main>
     }
    </div>
  )
};

export default PostDetailContent;