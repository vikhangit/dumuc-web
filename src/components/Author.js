"use client"
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useRouter } from 'next/navigation';
import {createUserFollow, deleteUserFollow, getProfile} from '@apis/users';
import Image from "next/image";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import { updateProfile } from "firebase/auth";

const Author = ({author, currentUrl = '/'}) => {
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

    return (
        <div className='flex justify-between pt-2 ml-8'>
            <div className='flex w-full'>
                <Image width={0} height={0} sizes="100vw" class="w-16 h-16 rounded-full" src={author?.photo ? author?.photo : '/dumuc/avatar.png'} alt={author?.name} />
                
                <div className="flex justify-between w-full">
                    <div className="flex flex-col ml-4 justify-center">
                        <a style={{color: 'black', fontWeight: '500'}} href={`/forum/author/${author?.slug}/${author?.authorId}`}>{author?.name}</a>
                        <p className="text-sm text-gray-800">{author?.description}</p>
                    </div>
                    <div className="pr-8 flex flex-col justify-center">
                    {user?.email ?
                        usingUser?.follows?.map(x => x?.authorId)?.includes(author?.authorId) ?
                        <button 
                            //unfollow
                            onClick={() => {
                                deleteUserFollow({
                                    authorId: author?.authorId,
                                    }, user?.accessToken)
                                    .then(async () => {
                                    //update recoil
                                    updateProfile({
                                        ...usingUser,
                                        follows: usingUser.follows.filter(x => x.authorId !== author?.authorId)
                                    }, user?.accessToken)
                                        const dataCall = await getProfile(user?.accessToken) 
                                        setUsingUser(dataCall)
                                        message.success('Đã bỏ theo dõi thành công');
                                });
                            }}
                            type="button" 
                            class="px-3 py-2 mt-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-lg hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >Đang theo dõi</button>            
                        :
                        <button 
                            onClick={() => {
                                createUserFollow({
                                    authorId: author?.authorId
                                }, user?.accessToken)
                                .then(async() => {
                                    //update recoil
                                    updateProfile({
                                    ...usingUser,
                                    follows: [...usingUser?.follows, {
                                        authorId: author?.authorId,
                                    }]
                                    }, user?.accessToken)
                                    const dataCall = await getProfile(user?.accessToken) 
                                    setUsingUser(dataCall)
                                    message.success('Đã theo dõi thành công.')
                                });
                            }} 
                            type="button" 
                            class="px-3 py-2 mt-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-lg hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >Theo dõi</button>            
                        :
                        <button 
                            onClick={() => {
                                router.push(`/auth?url_return=${currentUrl}`);
                            }}
                            type="button" 
                            class="px-3 py-2 mt-2 text-xs font-medium text-center text-white bg-[#c80000] rounded-lg hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >Theo dõi</button>
                    }
                    </div>
                </div>
                
            </div>
            <div className='flex'>
            </div>
        </div>
    )
}
export default Author;