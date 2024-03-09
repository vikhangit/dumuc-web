"use client";
import BannerRight from "@components/BannerRight";
import Header from "@components/Header";  

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="w-full h-full">
      <div className="w-full relative animate-pulse">
        <Header />
        <div className="h-2.5 my-4 mx-auto bg-gray-200 rounded-full dark:bg-gray-700 w-28"></div>
        <div>
          {[...Array(3)].map((_, item) => (
            <div className="mb-5" key={item}>
              <div className="h-2 w-32 bg-gray-200 rounded-full dark:bg-gray-700 mb-3"></div>
              <div
                className={`border border-gray-300 px-4 py-4 dark:bg-gray-700 rounded-lg ${
                  item === 2 && "h-72"
                }`}
              >
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
        <div class="text-white bg-white p-3.5 justify-center flex items-center rounded-lg shadow-md w-full">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-1/5"></div>
        </div>
        <div className="mb-10" />
        <BannerRight isAppInstall={true} />
      </div>
    </main>
  );
}
