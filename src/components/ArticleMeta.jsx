"use client"
import { Dropdown } from "flowbite-react";
import ArticleBookmark from "@components/ArticleBookmark";
import { useWindowSize } from "@hooks/useWindowSize";
import ArticleComment from "./ArticleComment";
import moment from "moment";
import ArticleLike from "./ArticleLike";
import ArticleShare from "./ArticleShare";
import Image from "next/image";
import { IoMdMore } from "react-icons/io";
import Link from "next/link";
import { updatePostByUser } from "@apis/posts";
import { message } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";


// category, minRead, bookmark, block
const ArticleMeta = ({ item, onCallback }) => {
  const sizes = useWindowSize()
  const [user, loading, error] = useAuthState(auth);
  const url = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/forum/post/${item?.slug}/${item?.postId}`;
  const urlCategory = `/forum/topic/${item?.categoryObj?.slug}/${item?.categoryObj?.categoryId}`;
  return (
    <div className={`flex ${sizes.width > 365 ? "flex-row items-center justify-between" : "flex-col-reverse items-end"} w-full mt-2 py-3 border-b border-t border-[#BFAEAE]"`}>
              <div className="w-full">
                <div className='flex items-center gap-x-4'>
                  <div className='flex items-center'>
                    <Image width={0} height={0} sizes="100vw" className="w-10 h-10 rounded-full" src={ item?.author?.photo ? item?.author?.photo : item?.author?.user?.photo ? item?.author?.user?.photo : '/dumuc/avatar.png'} />
                  </div>
                  <div>
                    <div className="font-semibold sm:font-normal text-xs sm:text-sm text-[#747272]">
                      <a className="text-[#FC1A1A] pr-2 font-medium" href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}>{item?.author?.name}</a>
                      Ngày {moment(item?.publishDate).format("DD/MM/YYYY")}
                    </div>
                    <div className="flex items-start flex-row gap-x-4 gap-y-2 mt-1">
                      <ArticleComment count={item?.commentsCount} url={`${url}#comments`}  onCallback={onCallback} />
                      <ArticleLike
                        id={item?.postId}
                        currentUrl={url}
                        count={item?.likesCount}
                        onCallback={onCallback}
                      />
                      <ArticleShare item={item} />
                    </div>
                  </div>
                </div>
              </div>
              <div className={`flex flex-end  ${sizes.width > 365 ? "w-auto" : "w-auto"}`}>
             {
              item?.author?.user?.email === user?.email &&
             <div className="relative cursor-pointer group">
              <IoMdMore size={24} />
              <div className="absolute hidden group-hover:flex flex-col top-full right-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[80px] rounded p-1">
                <Link href={`/forum/post?id=${item?.postId}`} className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Sửa</Link>
                <Link href=""   
                onClick={(e) => {
                  e.preventDefault();
                  if(item?.isPrivate){
                    return updatePostByUser(
                      {
                        ...item,
                        isPrivate: false
                      }, 
                    user?.accessToken).then((result) =>{
                      message.success("Công khai bài viết thành công");
                       
                        onCallback();
                      })
                  }else{
                    return updatePostByUser(
                      {
                        ...item,
                        isPrivate: true
                      }, 
                    user?.accessToken).then((result) =>{
                      message.success("Ẩn bài viết thành công");
                        onCallback();
                      })
                  }
                   
                }}  
                className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">
                  { item?.isPrivate ? "Hủy ẩn" :"Ẩn"}
                </Link>
              <Link href={``} 
                onClick={(e) => {
                  e.preventDefault();
                  let data = {
                    ...item,
                    isReport: true
                  };
                    return updatePostByUser(
                    data, 
                    user?.accessToken).then((result) =>{
                        message.success("Chúng tôi sẽ xem xét báo cáo của bạn về bài viết này. Xin cảm ơn");
                        onCallback();
                  })
                }} 
                className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Báo cáo</Link>
              </div>
              </div>
             } 
              <ArticleBookmark id={item?.postId} onCallback={onCallback} currentUrl={url} />
              </div>
            </div>
  );
};

export default ArticleMeta;
