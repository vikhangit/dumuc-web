"use client"
import { useRouter } from 'next/navigation';
import React, {useState} from 'react';

const ArticleForumTab = ({tab}) => {
    const [active, setActive] = useState(0)
    const router = useRouter()
    return (
        <div className='flex justify-between items-center mt-4 gap-x-2 sm:gap-x-6 mb-2'>
            <button onClick={() => {
                router.push("?tab=new")
            }} className={`rounded text-sm basis-1/2 py-2 ${tab === "new" ? "bg-[#c80000] text-white" : "bg-white shadow shadow-gray-500 text-gray-600"}`}>
                Bài viết mới
            </button>
            {/* <button onClick={() => setActive(1)} className={`rounded text-xs sm:text-sm basis-1/4 py-1 ${active === 1 ? "bg-[#c80000] text-white" : "bg-white shadow shadow-gray-500 text-gray-600"}`}>
                Quan tâm
            </button> */}
            <button onClick={() => {
                router.push("?tab=featured")
            }}  className={`rounded text-sm basis-1/2 py-2 ${tab === "featured" ? "bg-[#c80000] text-white" : "bg-white shadow shadow-gray-500 text-gray-600"}`}>
                Bài viết nổi bật
            </button>
            {/* <button onClick={() => setActive(3)} className={`rounded text-xs sm:text-sm basis-1/4 py-1 ${active === 3 ? "bg-[#c80000] text-white" : "bg-white shadow shadow-gray-500 text-gray-600"}`}>
                Đề xuất
            </button> */}
        </div>
    );
}

export default ArticleForumTab;
