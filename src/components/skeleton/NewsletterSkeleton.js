import React from "react";

const NewsletterSkeleton = ({ isFixed = true, isAppInstall = false }) => {
  if (isFixed) {
    return (
      <div className="banner-right banner-display-right">
        {isAppInstall && (
          <div className="flex items-center justify-center h-16 mb-3 bg-white rounded-lg dark:bg-gray-700 shadow-md">
            <svg
              className="w-6 h-6 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
        )}
        <div className="sticky top-0">
          <div className="bg-white w-[280px] mt-4 rounded-md">
            <div className="py-4 px-4">
              <div className="flex flex-col items-center">
                <div className="mb-1.5 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>
                <div className="mb-8 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full w-full"></div>
                <div className="mb-2.5 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                <div className="mb-2.5 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6"></div>
                <div className="mb-2.5 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>
                <div className="mb-10 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
              </div>
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 flex gap-x-2">
                <div className="w-5 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
              </div>
              <div className="border border-gray-300 dark:border-gray-700  shadow mt-4 bg-white rounded-lg py-3.5">
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="sticky top-0">
        <div className="bg-white w-[280px] mt-4 rounded-md">
          <div className="py-4 px-4">
            <div className="flex flex-col items-center">
              <div className="mb-1.5 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>
              <div className="mb-8 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full w-full"></div>
              <div className="mb-2.5 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              <div className="mb-2.5 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-5/6"></div>
              <div className="mb-2.5 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>
              <div className="mb-10 h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4"></div>
            </div>
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 flex gap-x-2">
              <div className="w-5 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-16"></div>
            </div>
            <div className="border border-gray-300 dark:border-gray-700  shadow mt-4 bg-white rounded-lg py-3.5">
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-2/4 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NewsletterSkeleton;
