"use client"
import React from "react";
import Link from 'next/link'

const AccountLibraryTabs = ({active = 'bookmark'}) => {
    return (
      <div class="text-sm font-medium text-center border-b border-gray-200">
          <ul class="flex flex-wrap -mb-px">
            <li className="mr-2">
              <Link 
                href={`/account/library/bookmark`}
                className={active === 'bookmark' ? "inline-block p-4 font-semibold text-red-600 border-b-4 border-red-600 rounded-t-lg active" : "inline-block p-4 font-semibold border-b-4 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300"}>
                Đã lưu
              </Link>
            </li>
            <li className="mr-2">
              <Link 
                href={`/account/library/post`}
                className={active === 'post' ? "inline-block p-4 font-semibold text-red-600 border-b-4 border-red-600 rounded-t-lg active" : "inline-block p-4 font-semibold border-b-4 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300"}>
                Bài viết
              </Link>
            </li>
            {/* <li className="mr-2">
              <Link 
                href={`/account/library/sos`}
                className={active === 'sos' ? "inline-block p-4 font-semibold text-red-600 border-b-4 border-red-600 rounded-t-lg active" : "inline-block p-4 font-semibold border-b-4 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300"}>
                S.O.S
              </Link>
            </li>
            <li className="mr-2">
              <Link 
                href={`/account/library/sos-help`}
                className={active === 'sos-help' ? "inline-block p-4 font-semibold text-red-600 border-b-4 border-red-600 rounded-t-lg active" : "inline-block p-4 font-semibold border-b-4 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300"}>
                S.O.S đã giúp
              </Link>
            </li> */}
            <li className="mr-2">
              <Link 
                href={`/account/library/following`}
                className={active === 'following' ? "inline-block p-4 font-semibold text-red-600 border-b-4 border-red-600 rounded-t-lg active" : "inline-block p-4 font-semibold border-b-4 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300"}>
                Đang theo dõi
              </Link>
            </li>
            {/* <li className="mr-2">
              <Link 
                href={`/account/library/comment`}
                className={active === 'comment' ? "inline-block p-4 font-semibold text-red-600 border-b-4 border-red-600 rounded-t-lg active" : "inline-block p-4 font-semibold border-b-4 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300"}>
                Bình luận
              </Link>
            </li> */}
            {/* <li className="mr-2">
              <Link 
                href={`/account/library?tab=forbidden`}
                className={searchParams?.tab === 'forbidden' ? "inline-block p-4 font-semibold text-red-600 border-b-4 border-red-600 rounded-t-lg active dark:text-red-500 dark:border-red-500" : "inline-block p-4 font-semibold border-b-4 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300 dark:hover:text-red-300"}>
                Đã chặn
              </Link>
            </li> */}
          </ul>
        </div>
    )
}
export default AccountLibraryTabs;