"use client"
import React, { useState, useEffect } from "react";

import { getHelperSossByUser } from "@apis/soss";

import Header from "@components/Header";
import AccountLibraryTabs from "@components/AccountLibraryTabs";

import BannerRight from "@components/BannerRight";
import SOSHelperList from "@components/SOSHelperList";
import router from "next/router";
import Loading from "./loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const LibraryPage = ({searchParams}) => {
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [helperSoss, setHelperSoss] = useState([]);

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
            const helperSossData = await getHelperSossByUser(user?.accessToken);
            setHelperSoss(helperSossData);

            setLoadingSkeleton(false);
          }
        } catch (e) {}
      })();
    }, [user, searchParams?.tab])

    return (
      loadingSkeleton ? <Loading /> :
      <main className="w-full">
        <Header isBack={true} />
        <AccountLibraryTabs active="sos-help" />
        <div className="p-4" style={{backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)"}}>
          <SOSHelperList 
            items={helperSoss} 
            onCallback={async () => {
              const helperSossData = await getHelperSossByUser(user?.accessToken);
              setHelperSoss(helperSossData);
            }}
          />
        </div>
        
        <BannerRight isAppInstall={true} />
      </main>
    );
};

export default LibraryPage;
