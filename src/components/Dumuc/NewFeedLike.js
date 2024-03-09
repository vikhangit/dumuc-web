"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import {createUserLike, deleteUserLike, getProfile, updateProfile} from '@apis/users';
import Image from "next/image";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const NewFeeLike = ({id, currentUrl}) => {
    const router = useRouter();
    const [user] = useAuthState(auth)
    const [setUser, updating, error] = useUpdateProfile(auth);
    const [usingUser, setUsingUser] = useState()
    useEffect(() =>{
      (async () => {
        try {
          const dataCall = await getProfile(user?.accessToken) 
          setUsingUser(dataCall)
        } catch (e) {
          console.log(e)
        }
      })();
    },[user])

    const icon = () =>  <Image width={0} height={0} sizes="100vw" alt="" src="/icons/heart-b.png" className="w-4 h-4" />

    const iconActive = () => <Image width={0} height={0} sizes="100vw" className='w-4 h-4' alt="" src="/icons/heart.png" />
    
    //has login
    if (user?.email) { 
        if (usingUser?.likes?.map(x => x?.likeValue)?.includes(id)) {
            return (
              <button
                type="button"
                onClick={() => {
                  deleteUserLike(
                    {
                      likeType: 'feed',
                      likeValue: id,
                    },
                    user?.accessToken
                  ).then(async() => {
                    //update recoil
                    updateProfile({
                      ...usingUser,
                      likes: usingUser?.likes.filter(
                        (x) => x.likeValue !== id && x.likeType === 'feed'
                      ),
                    });
                    const dataCall = await getProfile(user?.accessToken) 
                    setUsingUser(dataCall)
                    //message.success('Đã bỏ like thành công');
                  });
                }}
                tooltip="Bỏ like"
                className="w-10 h-10 rounded-full bg-white shadow shadow-gray-300"
              >
                <span className="flex flex flex-col items-center text-center text-white ">
                  {iconActive()}
                </span>
              </button>
            );
        } else {
            return (
              <button
                type="button"
                onClick={() => {
                  createUserLike(
                    {
                      likeType: 'feed',
                      likeValue: id,
                    },
                    user?.accessToken
                  ).then(async () => {
                    //update recoil
                    updateProfile({
                      ...usingUser,
                      likes: [
                        ...usingUser?.likes,
                        {
                          likeType: 'feed',
                          likeValue: id,
                        },
                      ],
                    }, user?.accessToken);
                    const dataCall = await getProfile(user?.accessToken) 
                    setUsingUser(dataCall)
                    //message.success('Đã like thành công')
                  });
                }}
                tooltip="Like"
                className="w-10 h-10 rounded-full bg-white shadow shadow-gray-300"
              >
                <span className="flex flex flex-col items-center text-center text-white ">
                  {icon()}
                </span>
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
            className="w-10 h-10 rounded-full bg-white shadow shadow-gray-300"
          >
            <span className="flex flex flex-col items-center text-center text-white ">
              {icon()}
            </span>
          </button>
        );
    }
}
export default NewFeeLike;