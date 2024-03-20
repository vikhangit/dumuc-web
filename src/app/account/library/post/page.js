"use client"
import React, { useState, useEffect } from "react";
import Link from 'next/link'

import { getPostsByUser } from "@apis/posts";

import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import ArticleLibraryItems from "@components/ArticleLibraryItems";
import AccountLibraryTabs from "@components/AccountLibraryTabs";
import router from "next/router";
import Loading from "./loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const LibraryPage = ({searchParams}) => {
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [posts, setPosts] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
      if (user === undefined && loading === false) {
        const url_return = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/account/library/post`
        router.push(`/auth?url_return=${url_return}`);
      }
    }, [user, loading])

    useEffect(() => {
      (async () => {
        try {
          setLoadingSkeleton(true);
          if (user) {
            //posts
            const [postsData] = await Promise.all([
              getPostsByUser(user?.accessToken),
            ]);
            setPosts(postsData);
            setLoadingSkeleton(false);
          }
        } catch (e) {}
      })();
    }, [user, searchParams?.tab])

    return (
      loadingSkeleton ? <Loading /> :
      <main className="w-full">
        <Header isBack={true} />
        <AccountLibraryTabs active="post" />
        <div className="px-2" style={{backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)"}}>
          <div className="flex gap-2 p-4">
            <Link 
              href={`/account/library/post`}
              className={searchParams?.status === undefined ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">Bài đã đăng ({posts?.filter(x => x.status === 0).length})</button>
            </Link>
            <Link 
              href={`/account/library/post?status=1`}
              className={parseInt(searchParams?.status) === 1 ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">Bài đã duyệt ({posts?.filter(x => x.status === 1).length})</button>
            </Link>
            <Link 
              href={`/account/library/post?status=-1`}
              className={parseInt(searchParams?.status) === -1 ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">Bài đã từ chối ({posts?.filter(x => x.status === -1).length})</button>
            </Link>
          </div>
          <ArticleLibraryItems items={posts} status={searchParams?.status} />
        </div>
        <BannerRight isAppInstall={true} />
      </main>
    );
};

export default LibraryPage;
