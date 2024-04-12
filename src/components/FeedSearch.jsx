"use client"
import { getFeeds } from '@apis/feeds';
import { getPosts } from '@apis/posts';;
import React, { useEffect, useState } from 'react'
import Header from './Header';
const TabbarBottom = dynamic( () => {
  return import( './TabbarBottom' );
}, { ssr: false } );
import BannerRight from './BannerRight';
import FeedSearchItems from './FeedSearchItems';
import ArticleItems from './ArticleItems';

export default function FeedSearch({searchParams}) {
    const [posts, setPosts] = useState([]);
    const [feeds, setFeeds] = useState([])
    const [tabs, setTabs] = useState(0)
    useEffect(() => {
        getFeeds().then((data) => {
          setFeeds(...feeds, data?.filter(item => {
            const search = item?.tags?.find(x => x ===  searchParams?.q)
            if(search){
              return item
            }
          }))
        })
        getPosts().then((data) => setPosts(...posts, data?.filter(item => {
          const search = item?.tags?.find(x => x ===  searchParams?.q)
          if(search){
            return item
          }
        })))
    }, [])
  console.log(feeds)
  return (
    <div>
        <main className="w-full">
    <div className="w-full bg-white">
      <Header />
      <div class="text-sm font-medium text-center border-b border-gray-200">
        <ul class="flex flex-wrap -mb-px">
          <li className="mr-2">
            <div 
              onClick={() =>setTabs(0)}
              className={`cursor-pointer inline-block p-4 font-semibold hover:text-red-600 hover:border-red-300 dark:hover:text-red-300 active dark:text-red-500 dark:border-red-500 ${tabs === 0 && " text-red-600 border-b-4 border-red-600 rounded-t-lg"}`}>
              Feed ({feeds?.length})
            </div>
          </li>
          <li className="mr-2">
            <div
             onClick={() =>setTabs(1)}
               className={`cursor-pointer inline-block p-4 font-semibold  rounded-t-lg active dark:text-red-500 dark:border-red-500 hover:text-red-600 hover:border-red-300 dark:hover:text-red-300 ${tabs === 1 && "text-red-600 border-b-4 border-red-600"}`}>
              Bài viết ({posts?.filter(item => item?.tags === searchParams?.q)?.length})
            </div>
          </li>
        </ul>
      </div>
      {tabs === 0 && (
        <div className='!bg-gray-20 m-y'>
          <FeedSearchItems items={feeds} title={`Kết quả tìm kiếm: "${searchParams?.q}"`}  />  
        </div>
      )}
      {tabs === 1 && (
        <div className='!bg-white'>
          <ArticleItems 
            data={posts}
            title={`Kết quả tìm kiếm: "${searchParams?.q}"`}
            layout="list"
          />   
        </div>
      )}
      
      <div className="mb-20" />
    </div>
    <TabbarBottom />
    <BannerRight isAppInstall={true} />
  </main>
    </div>
  )
}
