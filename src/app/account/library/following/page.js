"use client"
import React, { useState, useEffect } from "react";

import { getProfile } from "@apis/users";
import { getAuthor } from "@apis/posts";

import Header from "@components/Header";
import AccountLibraryTabs from "@components/AccountLibraryTabs";

import BannerRight from "@components/BannerRight";
import AuthorLibraryItems from "@components/AuthorLibraryItems";
import router from "next/router";
import Loading from "./loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const LibraryPage = ({searchParams}) => {
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [followings, setFollowings] = useState([]);
    const [user, loading, error] = useAuthState(auth);
    useEffect(() => {
      if (user === undefined && loading === false) {
        const url_return = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/account/bookmark`
        router.push(`/auth?url_return=${url_return}`);
      }
    }, [user, loading])

    useEffect(() => {
      (async () => {
        try {
          setLoadingSkeleton(true);
          if (user) {  
            let user1 = await getProfile(user?.accessToken);
            //following
            const followingsData = await Promise.all(user1?.follows?.map(async (item, index) => {
              let author = await getAuthor({
                authorId: item?.authorId,
              })
              return author;
            }));
            setFollowings(followingsData);
            setLoadingSkeleton(false);
          }
        } catch (e) {}
      })();
    }, [user, searchParams?.tab])

    return (
      loadingSkeleton ? <Loading /> :
      <main className="w-full">
        <Header isBack={true} />
        <AccountLibraryTabs active="following" />
        <div className="px-2" style={{backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)"}}>
          <AuthorLibraryItems items={followings} />
        </div>
        <BannerRight isAppInstall={true} />
      </main>
    );
};

export default LibraryPage;
