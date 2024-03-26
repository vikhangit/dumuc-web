"use client"
import React, { useState, useEffect } from "react";
import Link from 'next/link'

import { getProfile } from "@apis/users";
import { getPost } from "@apis/posts";
import { getFeed } from "@apis/feeds";

import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import ArticleItems from "@components/ArticleItems";
import FeedItems from "@components/FeedItems";

import AccountLibraryTabs from "@components/AccountLibraryTabs";

import router from "next/router";
import Loading from "./loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const BookmarkPage = ({searchParams}) => {
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [postBookmarks, setPostBookmarks] = useState([]);
    const [feedBookmarks, setFeedBookmarks] = useState([]);
    const [user, loading] = useAuthState(auth);
    const [usingUser, setUsingUser] = useState()
    useEffect(() =>{
      getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall)) 
    },[user])

    useEffect(() => {
      if (user && usingUser) {
        usingUser?.bookmarks?.filter(x => x.bookmarkType === 'post').map(async (item, index) =>
          await getPost({
            postId: item?.bookmarkValue,
          }).then((data) => setPostBookmarks([data, ...postBookmarks]))
        )
        usingUser?.bookmarks?.filter(x => x.bookmarkType === 'feed').map(async (item, index) =>
         await getFeed({
            feedId: item?.bookmarkValue,
          }).then((data) => setFeedBookmarks([data, ...feedBookmarks]))
        )
        setLoadingSkeleton(false);
      }
    }, [user, usingUser, searchParams?.tab])

    return (
      loadingSkeleton ? <Loading /> :
      <main className="w-full">
        <Header isBack={true} />
        <AccountLibraryTabs active="bookmark" />
        <div className="px-2" style={{backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)"}}>
          <div className="flex gap-2 p-4">
            <Link 
              href={`/account/library/bookmark?status=0`}
              className={(parseInt(searchParams?.status) === 0 || searchParams?.status === undefined) ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">Bài viết ({postBookmarks?.length})</button>
            </Link>
            <Link 
              href={`/account/library/bookmark?status=1`}
              className={(parseInt(searchParams?.status) === 1) ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">Feed ({feedBookmarks?.length})</button>
            </Link>
          </div>
          {(parseInt(searchParams?.status) === 0 || searchParams?.status === undefined) && (
            <ArticleItems 
              data={postBookmarks} 
              layout="list"
            />
          )}

          {parseInt(searchParams?.status) === 1 && (
            <FeedItems 
              data={{
                items: feedBookmarks
              }} 
              layout="list"
            />
          )}
        </div>
        
        <BannerRight isAppInstall={true} />
      </main>
    );
};

export default BookmarkPage;
