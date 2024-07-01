"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { getPosts, getPostsByUser } from "@apis/posts";

import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import ArticleLibraryItems from "@components/ArticleLibraryItems";
import AccountLibraryTabs from "@components/AccountLibraryTabs";
import Loading from "./loading";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import { getProfile } from "@apis/users";
import { getFeeds, getFeedsByUser } from "@apis/feeds";
import FeedItems from "@components/FeedItems";

const LibraryPage = ({ searchParams }) => {
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [posts, setPosts] = useState([]);
  const [feeds, setFeeds] = useState([]);
  const [user, loading, error] = useAuthState(auth);
  const [usingUser, setUsingUser] = useState();
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall));
  }, [user]);
  useEffect(() => {
    if (user && usingUser) {
      getPosts().then((postsData) =>
        setPosts(postsData?.filter((x) => x?.userId == user?.uid))
      );
      getFeeds().then((data) =>
        setFeeds(data?.filter((x) => x?.userId == user?.uid))
      );
      setLoadingSkeleton(false);
    }
  }, [user, usingUser, searchParams?.tab]);
  return loadingSkeleton ? (
    <Loading />
  ) : (
    <main className="w-full">
      <Header isBack={true} />
      <AccountLibraryTabs active="post" />
      <div className="flex gap-2 p-4">
        <Link
          href={`/account/library/post?tab=forums`}
          className={
            searchParams?.tab === "forums" || searchParams?.tab === undefined
              ? "px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              : "px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          }
        >
          <button type="button">Forum ({posts?.length})</button>
        </Link>
        <Link
          href={`/account/library/post?tab=feeds`}
          className={
            searchParams?.tab === "feeds"
              ? "px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              : "px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          }
        >
          <button type="button">Feed ({feeds?.length})</button>
        </Link>
      </div>
      {(searchParams?.tab === "forums" || searchParams?.tab === undefined) && (
        <div
          className="px-2"
          style={{
            backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)",
          }}
        >
          <div className="flex gap-2 p-4">
            <Link
              href={`/account/library/post?tab=forums&status=0`}
              className={
                parseInt(searchParams?.status) === 0 ||
                searchParams?.status === undefined
                  ? "px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  : "px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
              }
            >
              <button type="button">
                Công khai ({posts?.filter((x) => x.isPrivate === false).length})
              </button>
            </Link>
            <Link
              href={`/account/library/post?tab=forums&status=1`}
              className={
                parseInt(searchParams?.status) === 1
                  ? "px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  : "px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
              }
            >
              <button type="button">
                Riêng tư ({posts?.filter((x) => x.isPrivate === true).length})
              </button>
            </Link>
          </div>
          <ArticleLibraryItems
            items={
              parseInt(searchParams?.status) === 1
                ? posts?.filter((x) => x.isPrivate === true)
                : posts?.filter((x) => x.isPrivate === false)
            }
            status={searchParams?.status}
            onCallback={async () =>
              getPostsByUser(user?.accessToken).then((postsData) =>
                setPosts(postsData)
              )
            }
            user={user}
            usingUser={usingUser}
          />
        </div>
      )}
      {searchParams?.tab === "feeds" && (
        <>
          <div className="flex gap-2 p-4">
            <Link
              href={`/account/library/post?tab=feeds&status=0`}
              className={
                parseInt(searchParams?.status) === 0 ||
                searchParams?.status === undefined
                  ? "px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  : "px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
              }
            >
              <button type="button">
                Công khai ({feeds?.filter((x) => x.isPrivate === false).length})
              </button>
            </Link>
            <Link
              href={`/account/library/post?tab=feeds&status=1`}
              className={
                parseInt(searchParams?.status) === 1
                  ? "px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                  : "px-3 py-2 text-xs font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
              }
            >
              <button type="button">
                Riêng tư ({feeds?.filter((x) => x.isPrivate === true).length})
              </button>
            </Link>
          </div>
          <FeedItems
            data={{
              items:
                parseInt(searchParams?.status) === 1
                  ? feeds?.filter((x) => x.isPrivate === true)
                  : feeds?.filter((x) => x.isPrivate === false),
            }}
            layout="list"
            onCallback={async () => {
              getFeeds().then((data) =>
                setFeeds(data?.filter((x) => x?.userId == user?.uid))
              );
            }}
            user={user}
            usingUser={usingUser}
            loading={loading}
          />
        </>
      )}
      <BannerRight isAppInstall={true} />
    </main>
  );
};

export default LibraryPage;
