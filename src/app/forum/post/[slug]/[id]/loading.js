"use client";
import BannerCenter from "@components/BannerCenter";
import BannerRight from "@components/BannerRight";
import Header from "@components/Header";
import Newsletter from "@components/Newsletter";
import BannerCenterSkeleton from "@components/skeleton/BannerCenterSkeleton";
import BannerRightSkeleton from "@components/skeleton/BannerRightSkeleton";
import HeaderSkeleton from "@components/skeleton/HeaderSkeleton";
import { Spinner } from "flowbite-react";
import Image from "next/image";

export default function Loading({isPreview = false}) {
  // You can add any UI inside Loading, including a Skeleton.
  return (

    <main class="w-full dark:bg-gray-900 top-0 left-0 absolute">
        <div
          class="flex w-full"
        >
          <article
            class="px-4 bg-white w-full xl:w-[calc(100%-290px)] px-4"
           
          >
            <div className="border-b border-gray-200">
              <Header isBack={true} />
            </div>
            <div className="px-8 mt-4">
              {/* <div className="py-4">
                <BannerCenter />
              </div> */}
              <>
              <div className="h-2 mb-6 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
              <div className="flex justify-between">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
                <div class="w-6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
              </div>
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
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
                  <div>
                    <div class="w-6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                    <div class="w-6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-1"></div>
                  </div>
                </div>
              </div>
              <div class="mt-5 w-5/6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="w-3/4 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="h-2/3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="w-5/6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="flex items-center justify-center h-72 w-full bg-gray-300 rounded dark:bg-gray-700 my-4">
                <svg
                  class="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </div>
              <div class="mt-2 w-5/6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="w-3/4 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="h-2/3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              <div class="w-5/6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
              {isPreview && <div className="mb-8"></div>}
              {!isPreview && (
                <>
                  <div
                    className="flex gap-x-4"
                    style={{ marginTop: 10, paddingBottom: 20 }}
                  >
                    <div class="w-8 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                    <div class="w-8 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                  </div>
                  <div style={{ marginTop: 10, paddingBottom: 20 }}>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
                    <div className="border border-gray-200 dark:border-gray-700 px-4 py-3.5 mt-2 rounded-lg h-24">
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 p-4 flex justify-center mt-3 bg-white shadow-md rounded-lg w-fit">
                      <div class="w-28 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                    </div>
                    <div className="mt-4 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20 mb-4"></div>
                    <div class="flex items-starts mt-4 space-x-3">
                      <svg
                        class="w-10 h-10 text-gray-200 dark:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                      <div className="w-full">
                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                        <div class="mt-2 w-5/6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div class="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div class="w-3/4 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="flex gap-x-4">
                          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></div>
                          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></div>
                        </div>
                        <div class="flex items-start mt-4 space-x-3">
                          <svg
                            class="w-10 h-10 text-gray-200 dark:text-gray-700"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                          </svg>
                          <div className="w-full">
                            <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                            <div class="mt-2 w-5/6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div class="w-3/4 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                            <div className="flex gap-x-4">
                              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></div>
                              <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
              </div>
              <section>
            {!isPreview && (
              <div
                className="px-4 py-6"
                style={{
                  backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)",
                }}
              >
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="grid grid-cols-1 gap-y-6">
                  {[...Array(3)].map((item) => (
                    <div
                      key={item}
                      role="status"
                      className="animate-pulse flex items-center flex-col lg:flex-row"
                    >
                      <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded lg:w-96 dark:bg-gray-700 lg:h-64">
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
                      <div className="w-full mt-4 lg:mt-0">
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
                        <div className="flex justify-between items-center mt-2 ml-2">
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
                            <div className="flex gap-y-2 sm:gap-x-2 flex-col sm:flex-row">
                              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
                              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-20"></div>
                            </div>
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
              </div>
            )}
          </section>
          </article>
        </div>
          <BannerRight isAppInstall={true} />
      </main>
  );
}
