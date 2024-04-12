"use client";
import BannerRight from "@components/BannerRight";
import Header from "@components/Header";
import dynamic from "next/dynamic";
const TabbarBottom = dynamic( () => {
  return import( '@components/TabbarBottom' );
}, { ssr: false } );
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="w-full">
      <div className="w-full bg-white">
        <Header />
        <div className="flex justify-between items-center px-4">
          <div class="flex items-center gap-x-3 w-3/4">
            <svg
              class="w-16 h-16 text-gray-200 dark:text-gray-700"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <div className="w-full">
              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
              <div class="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
          <div class="border border-gray-200 rounded-lg dark:border-gray-700 px-3 py-2.5">
            <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-12 "></div>
          </div>
        </div>
        <div className="p-4">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-5"></div>
          <div className="grid grid-cols-1 gap-y-6">
            {[...Array(3)].map((item) => (
              <div
                key={item}
                role="status"
                className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 flex items-center"
              >
                <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                  <svg
                    className="w-10 h-10 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-6 mb-4"></div>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div classNames="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                  <div className="flex justify-between mt-2 ml-2">
                    <div className="flex items-center gap-x-2">
                      <svg
                        class="w-10 h-10 text-gray-200 dark:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>

                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
                    </div>
                    <div className="flex flex-row gap-4 mt-1">
                      <div>
                        <div class="w-6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                        <div class="w-6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-1"></div>
                      </div>
                      <div>
                        <div class="w-6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                        <div class="w-6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="sr-only">Loading...</span>
              </div>
            ))}
          </div>
          <div className="border mt-8 border-gray-200 dark:border-gray-700 py-3.5 flex justify-center mt-2 bg-white shadow-md rounded-full mx-4">
            <div class="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
          </div>
        </div>
      </div>
      <TabbarBottom/>
      <div className="mb-20" />
      <BannerRight />
    </main>
  );
}
