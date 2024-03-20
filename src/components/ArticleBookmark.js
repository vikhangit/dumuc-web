"use client"
import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useRouter } from 'next/navigation';
import {createUserBookmark, deleteUserBookmark, getProfile, updateProfile} from '@apis/users';

import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const ArticleBookmark = ({id, currentUrl = '/', style = 'article'}) => {
    const icon = () => <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 20">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"/>
</svg>;

const iconActive = () => <svg class="w-4 h-4 sm:w-5 sm:h-5 text-[#c80000]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
    <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"/>
</svg>

    const router = useRouter();
    const [setUser, updating, error] = useUpdateProfile(auth);    
    const [user] = useAuthState(auth);
    const [usingUser, setUsingUser] = useState()
  useEffect(() =>{
    (async () => {
      try {
        const dataCall = await getProfile(user?.accessToken) 
        setUsingUser(dataCall)
      } catch (e) {
      }
    })();
  },[user])
    
    //dot not login
    if (user?.email) {
        if (usingUser?.bookmarks?.map(x => x?.bookmarkValue)?.includes(id)) {
            return (
                <button className="hover:bg-gray-100 mx-1" type="button" onClick={() => {
                    deleteUserBookmark({
                        bookmarkType: 'post',
                        bookmarkValue: id,
                        }, user?.accessToken)
                        .then(async () => {
                        //update recoil
                        updateProfile({
                            ...usingUser,
                            bookmarks: usingUser?.bookmarks?.filter(x => x.bookmarkValue !== id && x.bookmarkType === 'post')
                        },user?.accessToken)
                        const dataCall = await getProfile(user?.accessToken) 
        setUsingUser(dataCall)
                            message.success('Đã bỏ lưu thành công');
                    });
                }} tooltip="Bỏ lưu">
                    {style === 'article' && iconActive()}
                    {style === 'feed' && (
                        <>Bỏ lưu</>
                    )}
                </button>
            )
        } else {
            return (
                <button className="hover:bg-gray-100 mx-1" type="button" onClick={() => {
                    createUserBookmark({
                        bookmarkType: 'post',
                        bookmarkValue: id,
                    }, user?.accessToken)
                    .then(async () => {
                        //update recoil
                        updateProfile({
                        ...usingUser,
                        bookmarks: [...usingUser?.bookmarks, {
                            bookmarkType: 'post',
                            bookmarkValue: id,
                        }]
                        } , user?.accessToken)
                        const dataCall = await getProfile(user?.accessToken) 
        setUsingUser(dataCall)
                        message.success('Đã lưu thành công')
                    });
                }} tooltip="Lưu lại">
                    {style === 'article' && icon()}
                    
                    {style === 'feed' && (
                        <>Lưu lại</>
                    )}
                </button>    
            )
        }
    } else {
        return (
            <button className="hover:bg-gray-100 mx-1" type="button" onClick={() => {
                router.push(`/auth?url_return=${currentUrl}`);
            }} tooltip="Lưu lại">
                {style === 'article' && icon()}
                {style === 'feed' && (
                    <>Lưu lại</>
                )}
            </button> 
        )
    }
}
export default ArticleBookmark;