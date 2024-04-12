"use client";
import BannerRight from "@components/BannerRight";
import Header from "@components/Header";;

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="w-full h-full">
      <div className="w-full relative animate-pulse">
        <Header />
        <div className="my-4 flex gap-x-3">
          {[...Array(4)].map((item) => (
            <div
              key={item}
              className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28"
            ></div>
          ))}
        </div>
        <div className="bg-white shadow-md px-4 py-4">
          <div className="flex gap-x-3">
            {[...Array(3)].map((item) => (
              <div
                key={item}
                class="text-white border border-gray-300 px-2 py-2.5 text-center inline-flex items-center rounded-lg dark:border-gray-700"
              >
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6">
            {[...Array(3)].map((item) => (
              <div
                key={item}
                role="status"
                className="animate-pulse flex items-center gap-x-4 flex-col lg:flex-row"
              >
                <div className="flex items-center justify-center w-full h-72 lg:h-48 bg-gray-300 rounded lg:w-96 dark:bg-gray-700">
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
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-36 mb-4"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div classNames="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                  <div className="flex items-center gap-x-8 mt-3">
                      <div className="flex gap-x-2">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                      </div>
                      <div className="flex gap-x-2">
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                      </div>
                    </div>
                </div>
                <span class="sr-only">Loading...</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-10" />
      </div>
     <BannerRight isAppInstall={true} />
    </main>
  );
}
