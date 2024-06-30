"use client";
import React, { useEffect, useState } from "react";
import {
  createFeedView,
  getFeedsLoadMore,
  getFeedsLoadMore2,
  getStories,
  getStoriesLoadMore,
  getTags,
} from "@apis/feeds";
const TabbarBottom = dynamic(
  () => {
    return import("@components/TabbarBottom");
  },
  { ssr: false }
);
import Header from "@components/Header";
import FeedItems from "@components/FeedItems";
import Newsletter from "@components/Newsletter";
import BannerRight from "@components/BannerRight";
import TrendingTopFive from "@components/TrendingTopFive";
import Loading from "app/loading";
import Story from "./Dumuc/Story";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
const RequestFriend = dynamic(
  () => {
    return import("./RequestFriend");
  },
  { ssr: false }
);
import { getProfile } from "@apis/users";
import dynamic from "next/dynamic";
import { getAuthors } from "@apis/posts";
import StoryWrapper from "./Dumuc/StoryWrapper";
const HomePageContent = () => {
  const [user] = useAuthState(auth);
  const [feedData, setFeedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [stories, setStories] = useState([]);
  const [usingUser, setUsingUser] = useState();
  const [requestFr, setRequestFr] = useState();
  const [authors, setAuthors] = useState();
  const [myFollow, setMyFollow] = useState([]);
  const [myFriend, setMyFriend] = useState([]);
  useEffect(() => {
    getAuthors().then((data) => {
      setAuthors(data);
    });
  }, []);
  useEffect(() => {
    getProfile(user?.accessToken).then((data) => {
      setUsingUser(data);
      setRequestFr(
        data?.friendList?.filter((x) => x.status === 1 && x.type === "recieve")
      );
      setMyFollow(data?.follows);
      setMyFriend(data?.friendList);
    });
    getFeedsLoadMore({ limit: 1000 }).then((result) => setFeedData(result));
    getTags().then((result) => setTags(result));
    getStoriesLoadMore({ limit: 1000 }).then((data) => {
      setStories(data);
    });
    setLoading(false);
  }, [user]);
  console.log("Friend", requestFr);
  return loading ? (
    <Loading />
  ) : (
    <main className="w-full">
      <div className="w-full relative">
        <Header />
        <div class="flex w-full ">
          <div class="hidden xl:block pb-4" aria-labelledby="sidebar-label">
            <div class="">
              <div className="bg-white rounded-lg shadow shadow-gray-400 py-2 px-2 w-[280px] mt-4">
                <div className="">
                  <TrendingTopFive items={tags} limit={5} />
                </div>
              </div>
              <div
                className={`rounded-lg hidden xl:block shadow-gray-400 w-[280px] ${
                  requestFr?.length > 0 ? "shadow bg-white py-2 px-2 mt-4" : ""
                }`}
              >
                <RequestFriend
                  items={requestFr}
                  onCallback={async () => {}}
                  authors={authors}
                  user={user}
                />
              </div>
              <div className="rounded-lg w-[280px] shadow shadow-gray-400">
                <Newsletter isFixed={false} isLeft={true} />
              </div>
            </div>
          </div>
          <div class="w-full xl:w-[calc(100%-290px)]">
            <section class="py-4 px-4 xl:pr-0 m-auto w-full">
              <div className="block xl:hidden relative">
                <div className="mb-4">
                  <div className="">
                    <TrendingTopFive items={tags} limit={5} />
                  </div>
                </div>
              </div>
              <div>
                <div className={`mt-4 block xl:hidden`}>
                  <div className="">
                    <RequestFriend
                      items={requestFr}
                      onCallback={async () => {}}
                      authors={authors}
                      user={user}
                    />
                  </div>
                </div>
              </div>
              <div>
                {
                  <Story
                    data={stories}
                    user={user}
                    usingUser={usingUser}
                    onCallback={() => {
                      getStoriesLoadMore({ limit: 100 }).then((data) => {
                        setStories(data);
                      });
                    }}
                    myFollow={myFollow}
                    myFriend={myFriend}
                    authors={authors}
                  />
                }
              </div>
              <FeedItems
                setFeedData={setFeedData}
                data={feedData}
                user={user}
                usingUser={usingUser}
                loading={loading}
                authors={authors}
                onCallback={() =>
                  getFeedsLoadMore({ limit: 1000 }).then((result) =>
                    setFeedData(result)
                  )
                }
              />
            </section>
          </div>
        </div>
        <div className="mb-20" />
      </div>
      <BannerRight isAppInstall={true} />
      <TabbarBottom active="home" />
    </main>
  );
};
export default HomePageContent;
