"use client"
import React, { useState, useEffect } from "react";
import Link from 'next/link'

import { getSossByUser } from "@apis/soss";

import Header from "@components/Header";
import AccountLibraryTabs from "@components/AccountLibraryTabs";
import BannerRight from "@components/BannerRight";
import SOSListByUser from "@components/SOSListByUser";
import router from "next/router";
import Loading from "./loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const LibraryPage = ({searchParams}) => {
    const [loadingSkeleton, setLoadingSkeleton] = useState(true);
    const [soss, setSoss] = useState([]);
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
            //soss
            const [soosData] = await Promise.all([
              getSossByUser(user?.accessToken),
            ]);
            setSoss(soosData);
            console.log(soosData)
            
            setLoadingSkeleton(false);
          }
        } catch (e) {}
      })();
    }, [user, searchParams?.tab])

    return (
      loadingSkeleton ? <Loading /> :
      <main className="w-full">
        <Header isBack={true} />
        <AccountLibraryTabs active="sos" />
        <div className="px-2" style={{backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)"}}>
          <div className="flex gap-2 p-4">
            <Link 
              href={`/account/library/sos?status=0`}
              className={(parseInt(searchParams?.status) === 0 || searchParams?.status === undefined) ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">S.O.S đã gửi ({soss?.filter(x => x.status === 0)?.length})</button>
            </Link>
            <Link 
              href={`/account/library/sos?status=1`}
              className={(parseInt(searchParams?.status) === 1) ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">S.O.S đã kết thúc ({soss?.filter(x => x.status === 1)?.length})</button>
            </Link>
            <Link 
              href={`/account/library/sos?status=-1`}
              className={(parseInt(searchParams?.status) === -1) ? 'px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300': 'px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200'}>
              <button type="button">S.O.S đã huỷ ({soss?.filter(x => x.status === -1)?.length})</button>
            </Link>
          </div>
          {(parseInt(searchParams?.status) < 2 || searchParams?.status === undefined) && (
            <SOSListByUser 
              items={searchParams?.status === undefined ? soss?.filter(x => x.status === 0): soss?.filter(x => x.status === parseInt(searchParams?.status))} 

              onCallback={async () => {
                const [soosData] = await Promise.all([
                  getSossByUser(user?.accessToken),
                ]);
                setSoss(soosData);

                // //S.O.S đã gửi
                // if (parseInt(searchParams?.status) === 0) {
                //   setSoss(soosData?.filter(x => x.status === 0));
                // }

                // //S.O.S đã kết thúc
                // if (parseInt(searchParams?.status) === 1) {
                //   setSoss(soosData?.filter(x => x.status === 1));
                // }

                //S.O.S đã huỷ
                // if (parseInt(searchParams?.status) === -1) {
                //   setSoss(soosData?.filter(x => x.status === -1));
                // }
              }}
            />
          )}
        </div>
        
        <BannerRight isAppInstall={true} />
      </main>
    );
};

export default LibraryPage;
