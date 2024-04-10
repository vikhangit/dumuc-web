import { getAuthor } from '@apis/posts'
import { createUserFollow, createUserToFollowerList, deleteAddFriend, deleteRecieveFriend, receiveRequestAddFriend, sendRequestAddFriend } from '@apis/users'
import { auth } from '@utils/firebase'
import Image from 'next/image'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Spinner } from "flowbite-react";
import { message } from "antd";

export default function RequestFriend({items, onCallback}) {
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState()
  return (
    <div>
        <div>Lời mời kết bạn</div>
        <div>        
      <ul class="pb-1 mt-3">
        {items && items?.map(async (item, index) => {
           return <div>
            <div className='flex gap-x-3 items-center w-full mt-2'>
           <Image width={0} height={0} sizes="100vw" class="w-10 h-10 rounded-full" src={
                           item?.author?.photo
                               ? item?.author?.photo
                               : item?.authorr?.user?.photo ?item?.author?.user?.photo : "/dumuc/avatar.png"
                       } alt={item?.author?.name} />
           <div className='text-base font-semibold'>{item?.author?.name}</div>
       </div>
       <div className="w-full flex gap-x-2 mt-2">
                                            <button
                                             onClick={async (e) => {
                                              setLoading(true)
                                                e.preventDefault();
                                               await deleteAddFriend({
                                                    authorId:  item?.author?.authorId,
                                                    }, user?.accessToken)
                                                    .then(async(result) => {
                                                      console.log(result)
                                                    //update recoil
                                                   await deleteRecieveFriend({
                                                      authorUserId: item?.author?.userId
                                                    }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                });
                                               await sendRequestAddFriend({
                                                    authorId: item?.author?.authorId,
                                                    status: 2
                                                }, user?.accessToken)
                                                .then(async(result) => {
                                                console.log(result)
                                                await receiveRequestAddFriend({
                                                authorUserId: item?.author?.userId,
                                                status: 2
                                                }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                
                                            });
                                  
                                            await onCallback()
                                            message.success('Đã chấp nhận yêu cầu kết bạn')
                                            setLoading(false)
                                                }} 
                                             className="px-3 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300 basis-1/2">
                                              {
                                                loading ?   <Spinner className="w-4 h-4" /> : "Chấp nhận"
                                              }
                                              </button>
                                            <button onClick={() => {
                                                deleteAddFriend({
                                                    authorId: item?.author?.authorId,
                                                    }, user?.accessToken)
                                                    .then(async(result) => {
                                                      console.log(result)
                                                    //update recoil
                                                    deleteRecieveFriend({
                                                      authorUserId: item?.author?.userId
                                                    }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                    await onCallback()
                                                        message.success('Đã xóa yêu cầu kết bạn');
                                                });
                                            }} 
                                            className="px-3 py-1 text-xs font-medium text-center text-black bg-gray-300 rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300 basis-1/2"
                                            >
                                                Xóa
                                            </button>
                                           </div>
           </div>
        })}
      </ul>
    </div>
    </div>
  )
}
