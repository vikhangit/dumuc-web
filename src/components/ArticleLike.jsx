"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import {createUserLike, deleteUserLike, getProfile, updateProfile} from '@apis/users';
import { useAuthState} from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const ArticleLike = ({id, currentUrl, count = 0,  onCallback}) => {
    const router = useRouter();
    const [user] = useAuthState(auth)
    const [usingUser, setUsingUser] = useState()
    useEffect(() =>{
      getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall)) 
    },[user])

    const icon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
  

    const iconActive = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#c80000]">
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
    
    //has login
    if (user?.email) {
        if (usingUser?.likes?.map(x => x?.likeValue)?.includes(id)) {
            return (
              <button
                type="button"
                onClick={() => {
                  deleteUserLike(
                    {
                      likeType: 'post',
                      likeValue: id,
                    },
                    user?.accessToken
                  ).then(async () => {
                    //update recoil
                    updateProfile({
                      ...usingUser,
                      likes: usingUser?.likes.filter(
                        (x) => x.likeValue !== id && x.likeType === 'post'
                      ),
                    }, user?.accessToken);
                    getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall)) 
                    onCallback()
                  });
                }}
                tooltip="Bỏ like"
              >
                <div className="flex items-center text-center gap-1 text-center text-[#c80000] article-tool font-semibold sm:font-normal text-xs sm:text-sm">
                  {iconActive()}
                  <span className="text-[#c80000]">{count} Lượt thích</span>
                </div>
              </button>
            );
        } else {
            return (
              <button
                type="button"
                onClick={() => {
                  createUserLike(
                    {
                      likeType: 'post',
                      likeValue: id,
                      user: usingUser
                    },
                    user?.accessToken
                  ).then(async () => {
                    //update recoil
                    updateProfile({
                      ...usingUser,
                      likes:usingUser?.likes?.length > 0 ? [
                        ...usingUser?.likes,
                        {
                          likeType: 'post',
                          likeValue: id,
                        },
                      ] : [{
                        likeType: 'post',
                        likeValue: id,
                      }],
                    }, user?.accessToken);
                    getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall)) 
                    onCallback()
                  });
                }}
                tooltip="Like"
              >
                <div className="flex items-center text-center gap-1 text-center font-semibold sm:font-normal text-xs sm:text-sm article-tool">
                  {icon()}
                  <span className="">{count} Lượt thích</span>
                </div>
              </button>
            );
        }
    } else {
        return (
          <button
            type="button"
            onClick={() => {
              router.push(`/auth?url_return=${currentUrl}`);
            }}
            tooltip="Thích"
          >
            <div className="flex items-center text-center gap-1 text-center font-semibold sm:font-normal text-xs sm:text-sm article-tool">
              {icon()}
              <span className="">{count} Lượt thích</span>
            </div>
          </button>
        );
    }
}
export default ArticleLike;