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
    const [usingUser, setUsingUser] = useState()
    useEffect(() =>{
      getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall)) 
    },[user])
    useEffect(() => {
      if (user && usingUser) {  
        usingUser?.follows?.map(async (item, index) =>
          await getAuthor({
            authorId: item?.authorId,
          }).then((data) => setFollowings([data, ...followings]))
        )
        setLoadingSkeleton(false);
      }
    }, [user, usingUser, searchParams?.tab])
    console.log(followings)

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
