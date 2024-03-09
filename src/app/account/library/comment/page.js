"use client"
import React, { useState, useEffect } from "react";
import Link from 'next/link'

import { getProfile } from "@apis/users";
import { getPost } from "@apis/posts";
import { getFeed } from "@apis/feeds";

import Header from "@components/Header";
import AccountLibraryTabs from "@components/AccountLibraryTabs";

import BannerRight from "@components/BannerRight";
import ArticleMyComments from "@components/ArticleMyComments";
import FeedMyComments from "@components/FeedMyComments";
import router from "next/router";
import Loading from "./loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const LibraryPage = ({searchParams}) => {
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [feedComments, setFeedComments] = useState([]);
    const [articleComments, setArticleComments] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
      if (user === undefined && loading === false) {
        const url_return = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/account/bookmark`
        router.push(`/auth?url_return=${url_return}`);
      }
    }, [user, loading])
    
    console.log('feedComments: ', feedComments)

    useEffect(() => {
      (async () => {
        try {
          setLoadingSkeleton(true);
          if (user) {  
            let user1 = await getProfile(user?.accessToken);
            
            //articleComments
            const articleCommentsData = await Promise.all(user1?.comments?.filter(x => x.commentType === 'post').map(async (item, index) => {
              let post = await getPost({
                postId: item?.postId,
              })
              return {
                post,
                ...item,
              };
            }));
            setArticleComments(articleCommentsData);

            //feedComments
            const feedCommentsData = await Promise.all(user1?.comments?.filter(x => x.commentType === 'feed').map(async (item, index) => {
              let feed = await getFeed({
                feedId: item?.feedId,
              })
              return {
                feed,
                ...item,
              };
            }));
            setFeedComments(feedCommentsData);

            setLoadingSkeleton(false);
          }
        } catch (e) {}
      })();
    }, [user?.accessToken, searchParams?.tab])

    return (
      loadingSkeleton ? <Loading /> :
      <main className="w-full">
        <Header isBack={true} />
        <AccountLibraryTabs active="comment" />
        <div className="px-2" style={{backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)"}}>
          <div className="flex gap-2 p-4">
            <Link 
              href={`/account/library/comment?status=0`}
              className={(parseInt(searchParams?.status) === 0 || searchParams?.status === undefined) ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">Bài viết ({articleComments?.length})</button>
            </Link>
            <Link 
              href={`/account/library/comment?status=1`}
              className={(parseInt(searchParams?.status) === 1) ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">Feed ({feedComments?.length})</button>
            </Link>
          </div>
          {(parseInt(searchParams?.status) === 0 || searchParams?.status === undefined) && (
            <ArticleMyComments items={articleComments} />
          )}

          {parseInt(searchParams?.status) === 1 && (
            <FeedMyComments items={feedComments} />
          )}
        </div>
        
        <BannerRight isAppInstall={true} />
      </main>
    );
};

export default LibraryPage;
