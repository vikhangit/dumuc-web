"use client";
import BannerCenterSkeleton from "@components/skeleton/BannerCenterSkeleton";
import BannerRight from "@components/BannerRight";
import BottomToolBarSkeleton from "@components/skeleton/BottomToolBarSkeleton";
import Header from "@components/Header";
import { Card } from "antd";
import { Spinner } from "flowbite-react";
import TabbarBottom from "@components/TabbarBottom";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="w-full h-full">
      <div className="w-full relative animate-pulse">
        <Header />
        <div className="h-2.5 my-4 mx-4 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
        <div class="w-[96%] md:w-full lg:w-full text-gray-500 bg-white border border-gray-200 rounded-lg">
          {[...Array(5)].map((item) => (
            <div
              key={item}
              className="flex items-center border-b border-gray-200 px-4 py-4 gap-x-3"
            >
              <div className="h-8 w-8 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
            </div>
          ))}
        </div>
        {[...Array(2)].map((item) => (
          <Card
            key={item}
            className="w-[96%] md:w-full lg:w-full rounded-lg relative0"
            style={{ marginTop: 20 }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
                <div className="mt-4 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-5"></div>
              </div>
              <div>
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
              </div>
            </div>
            <div
              style={{ position: "absolute", bottom: -10 }}
              class="text-white bg-white px-5 py-3.5 text-center inline-flex items-center rounded-full shadow-md"
            >
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-14"></div>
              <div className="ml-3 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-6"></div>
            </div>
          </Card>
        ))}
        <div className="mb-40" />
      </div>

      <BannerRight />
      <TabbarBottom />
    </main>
  );
}
