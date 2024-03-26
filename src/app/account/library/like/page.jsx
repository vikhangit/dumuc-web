"use client"
import React, { useState, useEffect } from "react";
import Link from 'next/link'

import _ from "lodash";

import { getProfile } from "@apis/users";
import { getPost } from "@apis/posts";
import { getFeed } from "@apis/feeds";

import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import AccountLibraryTabs from "@components/AccountLibraryTabs";
import ArticleItems from "@components/ArticleItems";
import FeedItems from "@components/FeedItems";
import router from "next/router";
import Loading from "./loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const LibraryPage = ({searchParams}) => {
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [postLikes, setPostLikes] = useState([]);
    const [feedLikes, setFeedLikes] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    const [usingUser, setUsingUser] = useState()
    useEffect(() =>{
      getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall)) 
    },[user])

    useEffect(() => {
      if (user && usingUser) {  
       const postLikesData = usingUser?.likes?.filter(x => x.likeType === 'post').map(async (item, index) => {
          let post = await getPost({
            postId: item?.likeValue,
          })
          return post;
        })
        setPostLikes(postLikesData);
        const feedLikesData = usingUser?.likes?.filter(x => x.likeType === 'feed').map(async (item, index) => {
          let feed = await getFeed({
            feedId: item?.likeValue,
          })
          return feed;
        })
        setFeedLikes(feedLikesData);
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
              href={`/account/library/like?status=0`}
              className={(parseInt(searchParams?.status) === 0 || searchParams?.status === undefined) ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">Bài viết ({postLikes?.length})</button>
            </Link>
            <Link 
              href={`/account/library/bookmark?status=1`}
              className={(parseInt(searchParams?.status) === 1) ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">Feed ({feedLikes?.length})</button>
            </Link>
          </div>
          {(parseInt(searchParams?.status) === 0 || searchParams?.status === undefined) && (
            <ArticleItems 
              data={{
                items: postLikes
              }} 
              layout="list"
            />
          )}

          {parseInt(searchParams?.status) === 1 && (
            <FeedItems 
              data={{
                items: feedLikes
              }} 
              layout="list"
            />
          )}
        </div>
        <BannerRight isAppInstall={true} />
      </main>
    );
};

export default LibraryPage;
