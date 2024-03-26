"use client";
import BottomToolBarSkeleton from "@components/skeleton/BottomToolBarSkeleton";
import Header from "@components/Header";
import NewsletterSkeleton from "@components/skeleton/NewsletterSkeleton";
import TabbarBottom from "@components/TabbarBottom";
import Newsletter from "@components/Newsletter";
import BannerRight from "@components/BannerRight";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="w-full">
      <div className="w-full animate-pulse">
        <Header />
        <div className="flex items-center gap-x-3 px-4">
          <div class="w-20 h-2.5 my-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4 text-gray-300 dark:text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          <div class="w-20 h-2.5 my-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-4 h-4 text-gray-300 dark:text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
          <div class="w-20 h-2.5 my-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
        <div class="w-[96%] m-4 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg pb-6">
          <div className="block text-lg w-full px-4 py-3.5 bg-white border-b border-gray-200 rounded-t-lg dark:border-gray-700">
            <div class="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
          {[...Array(5)].map((_, itemC) => (
            <div
              key={itemC}
              className="grid grid-cols-1 xl:space-x-6 overflow-y-hidden xl:grid-cols-2 p-4 border-b border-gray-200 dark:border-gray-700"
            >
              <div class="col-span-1">
                <div class="flex items-center space-x-6">
                  <svg
                    class="w-12 h-12 text-gray-200 dark:text-gray-700"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                  </svg>
                  <div class="w-full">
                    <div class="w-28 h-2.5 mb-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div class="w-3/4 h-2 mb-2.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div class="w-full h-2 mb-2.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div class="w-2/3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div class="col-span-1 flex">
                <div className="flex flex-none space-x-6 justify-between items-center">
                  <div className="items-center flex gap-x-2">
                    <div class="w-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div class="w-12 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="items-center flex gap-x-2">
                    <div class="w-4 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div class="w-12 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>
                <div className="items-center bg-gray-100 p-2.5 ml-4 rounded text-xs font-medium text-gray-500">
                  <div className="flex flex-col">
                    <div class="w-36 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div class="w-36 mt-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                  <div className="items-center flex gap-x-1 mt-2">
                    <div class="basis-1/2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div class="basis-1/2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="border mt-6 border-gray-200 dark:border-gray-700 py-3.5 flex justify-center mt-2 bg-white shadow-md rounded-full mx-8">
            <div class="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
          </div> */}
        </div>
        <div className="mb-20" />
      </div>
      <TabbarBottom active='forum' />
      <div className="mb-20"/>
      <BannerRight isAppInstall={true} />
    </main>
  );
}
