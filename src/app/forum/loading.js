"use client"
import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import TabbarBottom from "@components/TabbarBottom";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <main className="w-full">
        <div className="w-full animate-pulse">
          <Header />
          <div class="w-2/3 h-2.5 my-6 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          {[...Array(5)].map((_, item) => {
            return (
              <div
                key={item}
                class="w-[96%] m-4 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg"
              >
                <div className="block text-lg w-full px-4 py-3.5 bg-white border-b border-gray-200 rounded-t-lg dark:border-gray-700">
                  <div class="w-24 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                {[
                  ...Array(
                    item === 0
                      ? 3
                      : item === 1
                      ? 2
                      : item === 2
                      ? 4
                      : item === 3
                      ? 2
                      : 6
                  ),
                ].map((_, itemC) => (
                  <div
                    key={itemC}
                    className="grid grid-cols-1 xl:space-x-6 overflow-y-hidden xl:grid-cols-2 p-4 border-b border-gray-200 dark:border-gray-700"
                  >
                    <div class="col-span-1">
                      <div class="flex items-center space-x-6">
                        <div class="w-10 h-10 my-6 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
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
                        <div className="items-center flex flex-col">
                          <div class="w-6 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          <div class="w-12 mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                        <div className="items-center flex flex-col">
                          <div class="w-6 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          <div class="w-12 mt-2 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                      </div>
                      <div className="items-center bg-gray-100 p-2.5 ml-4 rounded text-xs font-medium text-gray-500">
                        <div className="items-center flex">
                          <div className="border border-gray-200 dark:border-gray-700 bg-white py-1 px-1.5">
                            <div class="w-8 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          </div>
                          <div class="w-28 h-1.5 ml-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                        {itemC === 1 && (
                          <div class="mt-1 w-2/3 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        )}
                        <div className="items-center flex gap-x-1 mt-2">
                          <div class="basis-1/2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                          <div class="basis-1/2 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          <div className="mb-20" />
        </div>
        <TabbarBottom />
        <BannerRight isAppInstall={true} />
      </main>
    );
}