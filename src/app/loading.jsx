"use client";
import BannerRight from "@components/BannerRight";
import Header from "@components/Header";
import TabbarBottom from "@components/TabbarBottom";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="w-full">
      <div className="w-full relative animate-pulse">
        <Header />
        <div class="flex">
          <aside class="hidden xl:block pb-4" aria-labelledby="sidebar-label">
            <div class="sticky top-5">
              <h3 id="sidebar-label" class="sr-only">
                Sidebar
              </h3>
              <div
                class="bg-white rounded-lg mt-6 mb-4 rounded-md px-4 py-4 bg-white"
                style={{
                  width: 280,
                }}
              >
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>
                  {[...Array(5)].map((item) => (
                    <div key={item} className="flex items-center gap-x-2 mt-2">
                      <svg
                        class="w-10 h-10 text-gray-200 dark:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                class="mb-4 rounded-md border px-4 py-4 bg-white"
                style={{
                  width: 280,
                }}
              >
                <div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>
                  {[...Array(2)].map((_, item) => (
                    <div key={item} className="flex items-center gap-x-3 mt-3">
                      <div className="h-8 w-10 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
                      <div className="w-full">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                        {item === 1 && (
                          <div className="mt-2 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          <article class="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert w-full">
            <section class="not-format py-4 px-4 xl:pr-0 m-auto overflow-hidden overflow-y-auto lg:pt-6">
              {[...Array(3)].map((item) => (
                <div className="bg-white p-4 rounded-lg mb-6" key={item}>
                  <div className="flex justify-between items-center">
                    <div class="flex items-center mt-4 space-x-3">
                      <svg
                        class="w-10 h-10 text-gray-200 dark:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                      <div>
                        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                        <div class="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </div>
                    <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-6 "></div>
                  </div>
                  <div class="mt-5 w-5/6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div class="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div class="w-3/4 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div class="h-2/3 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div class="w-5/6 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="grid grid-cols-1 sm:grid-col-3 gap-x-4 gap-y-4 mt-2">
                    <div class="flex items-center justify-center h-48 bg-gray-300 rounded dark:bg-gray-700">
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
                    <div class="flex items-center justify-center h-48 bg-gray-300 rounded dark:bg-gray-700">
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
                  </div>
                  <div className="border-y border-gray-200 dark:border-gray-700 py-3.5 flex justify-between mt-8">
                    <div class="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                    <div class="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                    <div class="w-20 h-2 bg-gray-200 rounded-full dark:bg-gray-700 "></div>
                  </div>
                </div>
              ))}
            </section>
          </article>
        </div>
        <div className="mb-20" />
      </div>
      <BannerRight isAppInstall={true} />
      <TabbarBottom />
    </main>
  );
}
