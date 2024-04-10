import React from 'react'

export default function ChatListItem({item}) {
    return <div
    key={index}
    onClick={() => {
        setUserRecieved(item?.author)
        setMobile(true)
    }}
     className={`${userRecieved?.authorId === item?.authorId ? "bg-[#0084ff] bg-opacity-30" : "bg-white"} rounded-md shadow-md shadow-gray-400 flex items-center gap-x-2 pl-[15px] pr-2 py-[20px] mt-[10px] cursor-pointer`}>
    <Image src={item?.avatar && item?.user?.photo?.length > 0 ? item?.user?.photo : "/dumuc/avatar.png"} width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
    <div className='flex justify-between w-full'>
        <div>
            <Link href="" className='text-base'>{item?.name}</Link>
            {/* <p className='text-[13px] text-[#00000080] mt-2'>Tin nhắn mới nhất của bạn ....</p> */}
        </div>
        <span className='text-[13px] text-[#00000080]'>13 phút</span>
    </div>
</div>
}
