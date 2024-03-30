import { getAuthor } from '@apis/posts'
import { createUserFollow, createUserToFollowerList, deleteAddFriend, deleteRecieveFriend, receiveRequestAddFriend, sendRequestAddFriend } from '@apis/users'
import { auth } from '@utils/firebase'
import Image from 'next/image'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function RequestFriend({items, onCallback}) {
    const [user] = useAuthState(auth)
  return (
    <div>
        <div>Lời mời kết bạn</div>
        <div>        
      <ul class="pb-1 mt-3">
        {items && items?.map(async (item, index) => {
            const author = await getAuthor({authorId: item?.authorId})
           return <div>
            <div className='flex gap-x-3 items-center w-full'>
           <Image width={0} height={0} sizes="100vw" class="w-10 h-10 rounded-full" src={
                           author?.photo
                               ? author?.photo
                               : author?.user?.photo ? author?.user?.photo : "/dumuc/avatar.png"
                       } alt={author?.name} />
           <div className='text-base font-semibold'>{author?.name}</div>
       </div>
       <div className="w-full flex gap-x-2 mt-2">
                                            <button
                                             onClick={async (e) => {
                                                e.preventDefault();
                                               await deleteAddFriend({
                                                    authorId:  author?.authorId,
                                                    }, user?.accessToken)
                                                    .then(async(result) => {
                                                      console.log(result)
                                                    //update recoil
                                                   await deleteRecieveFriend({
                                                      authorUserId: author.userId
                                                    }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                });
                                               await sendRequestAddFriend({
                                                    authorId: author?.authorId,
                                                    status: 2
                                                }, user?.accessToken)
                                                .then(async(result) => {
                                                console.log(result)
                                                await receiveRequestAddFriend({
                                                authorUserId: author?.userId,
                                                status: 2
                                                }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                
                                            });
                                  
                                            await onCallback()
                                                }} 
                                             className="px-3 py-1 text-xs font-medium text-center text-white bg-[#c80000] rounded-[4px] hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300 basis-1/2">Chấp nhận</button>
                                            <button onClick={() => {
                                                deleteAddFriend({
                                                    authorId: authorData?.authorId,
                                                    }, user?.accessToken)
                                                    .then(async(result) => {
                                                      console.log(result)
                                                    //update recoil
                                                    deleteRecieveFriend({
                                                      authorUserId: authorData?.userId
                                                    }, user?.accessToken).then((e) => console.log(e)).catch(e => console.log(e))
                                                    const dataCall = await getProfile(user?.accessToken) 
                                                    setUsingUser(dataCall)
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
