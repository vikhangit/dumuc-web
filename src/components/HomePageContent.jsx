"use client"
import React, { useEffect, useState } from "react";
import { getFeedsLoadMore, getStories, getStoriesLoadMore, getTags } from "@apis/feeds";
import TabbarBottom from "@components/TabbarBottom";
import Header from "@components/Header";
import FeedItems from "@components/FeedItems";
import Newsletter from "@components/Newsletter";
import BannerRight from "@components/BannerRight";
import TrendingTopFive from "@components/TrendingTopFive";
import Loading from "app/loading";
import Story from "./Dumuc/Story";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
const HomePageContent = () => {
  const [user] = useAuthState(auth)
  const [feedData, setFeedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([])
  const [stories, setStories] = useState([])
  useEffect(() => {
    getFeedsLoadMore({limit: 5}).then((result) => setFeedData(result))
    getTags().then((result) => setTags(result))
    getStories().then((data) => {
      const author = data?.find(x => x?.author?.user?.email === user?.email)
      if(author){
        setStories(data);
      }else{
        setStories(data?.filter(x => x?.isPrivate === false))
      }
    })
    setLoading(false)
  }, [])
  return (
    loading 
      ? <Loading /> 
      : <main className="w-full">
          <div className="w-full relative">
            <Header />
            <div class="flex w-full ">
              <div class="hidden xl:block pb-4" aria-labelledby="sidebar-label">
                <div class="">
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
                    { stories.length > 0 ?
                    <Story stories={stories} onCallback={async (resut) =>  getStories().then((data) => setStories(data))} /> 
                    : user && <Story stories={stories} onCallback={async (resut) =>  getStories().then((data) => {
                      const author = data?.find(x => x?.author?.user?.email === user?.email)
                        if(author){
                          setStories(data);
                        }else{
                          setStories(data?.filter(x => x?.isPrivate === false))
                        }
                    })} /> 
                    }
                  </div>
                  <FeedItems 
                    setFeedData={setFeedData} 
                    data={feedData} 
                    onCallback={
                      async () => {
                        await getFeedsLoadMore({limit: 5}).then((result) => setFeedData(result))
                        await getTags().then((result) => setTags(result))
                      }
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
  )
};
export default HomePageContent;

