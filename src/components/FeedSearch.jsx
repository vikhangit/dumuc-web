"use client";
import { getFeeds } from "@apis/feeds";
import { getAuthors, getPosts } from "@apis/posts";
import React, { useEffect, useState } from "react";
import Header from "./Header";
const TabbarBottom = dynamic(
  () => {
    return import("./TabbarBottom");
  },
  { ssr: false }
);
import BannerRight from "./BannerRight";
import FeedSearchItems from "./FeedSearchItems";
import ArticleItems from "./ArticleItems";
import dynamic from "next/dynamic";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import { getProfile } from "@apis/users";
import { useRouter } from "next/navigation";

export default function FeedSearch({ searchParams }) {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);
  const [tabs, setTabs] = useState(0);
  const [authors, setAuthors] = useState();
  const [usingUser, setUsingUser] = useState();
  useEffect(() => {
    getAuthors().then((data) => {
      setAuthors(data);
    });
  }, []);
  useEffect(() => {
    getFeeds().then((data) => {
      setFeeds(
        ...feeds,
        data?.filter((item) => {
          if (searchParams?.q) {
            const search = item?.tags?.find((x) => x === searchParams?.q);
            if (search) {
              return item;
            }
          } else {
            if (searchParams?.description) {
              const search = item?.description
                ?.toLowerCase()
                ?.includes(searchParams?.description?.toLowerCase());
              if (search) {
                return item;
              }
            }
          }
        })
      );
    });
    getPosts().then((data) =>
      setPosts(
        ...posts,
        data?.filter((item) => {
          if (searchParams?.q) {
            const search = item?.tags?.find((x) => x === searchParams?.q);
            if (search) {
              return item;
            }
          } else {
            if (searchParams?.description) {
              const search = item?.description
                ?.toLowerCase()
                ?.includes(searchParams?.description?.toLowerCase());
              const search2 = item?.title
                ?.toLowerCase()
                ?.includes(searchParams?.description?.toLowerCase());
              if (search || search2) {
                return item;
              }
            }
          }
        })
      )
    );
  }, []);
  useEffect(() => {
    getProfile(user?.accessToken).then((data) => {
      setUsingUser(data);
    });
    setLoading(false);
  }, [user]);
  const router = useRouter();
  return (
    <div>
      <main className="w-full">
        <div className="w-full bg-white">
          <Header />
          <div class="text-sm font-medium text-center border-b border-gray-200">
            <ul class="flex flex-wrap -mb-px">
              <li className="mr-2">
                <div
                  onClick={() => setTabs(0)}
                  className={`cursor-pointer inline-block p-4 font-semibold hover:text-red-600 hover:border-red-300 dark:hover:text-red-300 active dark:text-red-500 dark:border-red-500 ${
                    tabs === 0 &&
                    " text-red-600 border-b-4 border-red-600 rounded-t-lg"
                  }`}
                >
                  Feed ({feeds?.length})
                </div>
              </li>
              <li className="mr-2">
                <div
                  onClick={() => setTabs(1)}
                  className={`cursor-pointer inline-block p-4 font-semibold  rounded-t-lg active dark:text-red-500 dark:border-red-500 hover:text-red-600 hover:border-red-300 dark:hover:text-red-300 ${
                    tabs === 1 && "text-red-600 border-b-4 border-red-600"
                  }`}
                >
                  Bài viết ({posts?.length})
                </div>
              </li>
            </ul>
          </div>
          {tabs === 0 && (
            <div className="">
              <FeedSearchItems
                data={feeds}
                title={`Kết quả tìm kiếm: "${
                  searchParams?.q || searchParams?.description
                }"`}
                user={user}
                usingUser={usingUser}
                authors={authors}
              />
            </div>
          )}
          {tabs === 1 && (
            <div className="">
              <ArticleItems
                data={posts}
                title={`Kết quả tìm kiếm: "${
                  searchParams?.q || searchParams?.description
                }"`}
                layout="list"
                user={user}
                usingUser={usingUser}
                searchParams={searchParams}
                authors={authors}
              />
            </div>
          )}
        </div>
        <div className="mb-20"></div>
        <TabbarBottom />
        <BannerRight isAppInstall={true} />
      </main>
    </div>
  );
}
