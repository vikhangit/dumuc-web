"use client"
import React, { useEffect, useState } from "react";
import { getFeedsLoadMore, getTags } from "@apis/feeds";

//components
import TabbarBottom from "@components/TabbarBottom";
import Header from "@components/Header";
import FeedItems from "@components/FeedItems";
import Newsletter from "@components/Newsletter";
import BannerRight from "@components/BannerRight";

import TrendingTopFive from "@components/TrendingTopFive";
import Loading from "app/loading";
import Story from "./Dumuc/Story";

const HomePageContent = () => {
  const [feedData, setFeedData] = useState({});
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([])
  let payloadLatest = {
    limit: 5,
  };
  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const [latest, tags] = await Promise.all([
          getFeedsLoadMore(payloadLatest),
          getTags()
        ]);
        setFeedData(latest)
        setTags(tags)
        setLoading(false)
      } catch (e) {
        console.log(e)
      }
    })();
  }, [])
  return (
    loading ? <Loading /> :
    <main className="w-full">
      <div className="w-full relative">
        <Header />
        <div class="flex w-full ">
          <div class="hidden xl:block pb-4" aria-labelledby="sidebar-label">
            <div class="">
              <h3 id="sidebar-label" class="sr-only">
                Sidebar
              </h3>
              <div className="bg-white rounded-lg shadow shadow-gray-400 py-2 px-2 w-[280px] mt-4 ">
              <div className="">
                <TrendingTopFive items={tags} limit={5} />
              </div>
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
                <Story />
              </div>
              <FeedItems setFeedData={setFeedData} data={feedData} onCallback={async () => {
                try {              //latest
                  const [latest] = await Promise.all([
                    getFeedsLoadMore(payloadLatest)
                  ]);
                  setFeedData(latest)
                } catch (e) { }
              }} />
            </section>
          </div>
        </div>
        <div className="mb-20" />
      </div>
      <BannerRight isAppInstall={true} />
      <TabbarBottom active="home" />
    </main>
  )
};

export default HomePageContent;

