"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Fancybox } from "@fancyapps/ui";
import { Modal } from 'flowbite-react';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import {createFeedView, deleteFeedByUser, updateFeedByUser} from 'apis/feeds';

//components
import FeedBookmark from "@components/FeedBookmark";
import FeedComments from "@components/FeedComments";
import FeedLikeShareComment from "./FeedLikeShareComment";

import moment from "moment";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useRouter } from "next/navigation";

import { Dropdown } from "flowbite-react";
import { message } from "antd";
import { useWindowSize } from "@hooks/useWindowSize";
import { IoMdMore } from "react-icons/io";
import Link from "next/link";
import QuickPostModal from "./QuickPostModal";
import QuickPostModalEmoji from "./QuickPostModlEmoji";
import ModalImageZoom from "./ModalImageZoom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";


const FeedItem = ({ item, index, onCallback }) => {
  const [user, loading, error] = useAuthState(auth);
  const sizes = useWindowSize();
  const router = useRouter()
  const [showMore, setShowMore] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [showSlide, setshowSlide] = useState(false)
  const [showLike, setShowLike] = useState(false);
  const [showPostText, setShowPostText] = useState(false)
  const [showPostEmotion, setShowPostEmotion] = useState(false);
  const [emotion, setEmotion] = useState("")
  const [showImage, setShowImage] = useState(false)
  const [imageList, setImageList] = useState([]);
  const [indexImage, setIndexImage] = useState(0);

console.log(item)

  const url = `/forum/post/${item?.slug}/${item?.postId}`;
  return (
    item.isActive && <div key={item?.feedId} className="p-4 bg-white rounded-lg shadow shadow-gray-300 dark:bg-gray-800 xl:p-6 2xl:p-8 lg:space-y-3 mb-4">
    <div class="flex items-center space-x-4">
      <div class="flex-shrink-0">
        <a
          href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
        >
          <Image
            width={0}
            height={0}
            sizes="100vw"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            src={
              item?.author?.photo
                ? item?.author?.photo
                : item?.author?.user?.photo ? item?.author?.user?.photo: "/dumuc/avatar.png"
            }
            alt={item?.author?.name}
          />
        </a>
      </div>
      <div class="flex-1 min-w-0">
        <a
          class="text-lg sm:text-xl font-bold leading-none text-gray-900 dark:text-white"
          href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
        >
          {item?.author?.name} 
        </a>
        <p class="text-lg sm:text-xl font-normal mt-1 mb-1 leading-none text-gray-900 dark:text-white">
        {item?.emotion}
        </p>
        <p class="text-sm sm:text-base font-normal text-gray-500 truncate dark:text-gray-400 flex items-center">
          {moment(item.publishDate).format("DD")} tháng {moment(item.publishDate).format("MM")} <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-1">
            <path d="M15.75 8.25a.75.75 0 01.75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 11-.992-1.124A2.243 2.243 0 0015 9a.75.75 0 01.75-.75z" />
            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM4.575 15.6a8.25 8.25 0 009.348 4.425 1.966 1.966 0 00-1.84-1.275.983.983 0 01-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 012.328-.377L16.5 15h.628a2.25 2.25 0 011.983 1.186 8.25 8.25 0 00-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.575 15.6z" clipRule="evenodd" />
          </svg>
        </p>
      </div>
      <div className="flex justify-end items-center">
      {
        item?.user?.email === user?.email && <div className="relative cursor-pointer group">
        <IoMdMore size={24} />
        <div className="absolute z-40 hidden group-hover:flex flex-col top-full right-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[80px] rounded p-1">
          {item?.user?.email === user?.email && <Link href="" onClick={(e) => {
            e.preventDefault();
            setShowPostText(true);
            setShowImage(true)
          }} className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Sửa</Link>}
          <Link href="" 
          onClick={(e) => {
            e.preventDefault();
           return updateFeedByUser({
              isActive: false,
              feedId: item?.feedId
            }, user?.accessToken).then((result) =>{
              message.success("Ẩn bài viết thành công");
              onCallback();
            })
          }} 
          className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Ẩn</Link>
          {item?.user?.email === user?.email && <Link href="" onClick={(e) => {
            e.preventDefault();
           return deleteFeedByUser(
              item?.feedId
            , user?.accessToken).then((result) =>{
              message.success("Xóa bài viết thành công");
              onCallback();
            })
          }} className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5">Xóa</Link>}
        </div>
        </div>
        
      }
      <QuickPostModal
          feed={item}
          visible={showPostText}
          setEmotion={setEmotion}
          emotion={emotion}
          onCancel={() => {
            setShowPostText(false);
          }}
          setShowPostEmotion={setShowPostEmotion}
          showImage={showImage}
          setShowImage={setShowImage}
          onCallback={onCallback}
        />
       <QuickPostModalEmoji
          setEmotion={setEmotion}
          visible={showPostEmotion}
          onCancel={() => {
            setShowPostEmotion(false);
          }}
          onSaveEmotion={() => {
            setShowPostEmotion(false);
            setShowPostText(true);
          }}
        />
      <FeedBookmark id={item?.feedId} currentUrl={url} />
      </div>
      {/* <Dropdown id="custom-dropdown" placement="left-start" renderTrigger={() => <span><svg class="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg></span>}>
        <Dropdown.Item onClick={() => message.warning("Chúng tôi đang cập nhật tính năng này")}>
          <div class="block px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">Chặn người dùng</div>
        </Dropdown.Item>
      </Dropdown> */}
    </div>
    <div>
      <div
        className="text-base mt-4"
      >
        <p className={`text-lg font-normal text-justify`}>{!showMore ? item.description.slice(0, 70) : item.description} {
          item.description.length > 70 && <a
            className="font-bold text-sm sm:text-base cursor-pointer hover:underline"
            onClick={() => {
              setShowMore(!showMore)
              createFeedView({
                feedId: item.feedId,
              })
            }}
          >
            {showMore ? "Ẩn" : "...Xem thêm"}
          </a>
        }</p>
      </div>
      {item?.tags?.length > 0 && (
        <div className="mt-2">
          {item?.tags.map((tag, index) => (
            <a key={index} href={`/search?q=${tag}`}>
              <span class="mr bg-slate-100 text-gray-500 hover:bg-red-500 hover:text-white text-sm mr-2 px-2.5 py-0.5 rounded">
                #{tag}
              </span>
            </a>
          ))}
        </div>
      )}
      {item?.photos?.length > 0 && (
        <div
          className={`w-full grid ${
            item.photos?.slice(0, 2).length === 2
              ? "grid-cols-2"
              : "grid-cols-1"
            }  gap-2 mt-4`}
          id="photo"
        >
          {item?.photos?.slice(0, 2).map((photo, indexC) => {
            return (
              <div
                key={indexC}
                className={`rounded-md w-full h-full`}
              >  
                <a
                  onClick={() => {
                    setshowSlide(true)
                    setImageList(item?.photos)
                    setIndexImage(indexC);
                  }}
                  className={`w-full relative cursor-pointer h-full`}
                >
                  <Image
                    width={0}
                    height={0}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    sizes="100vw"
                    className="rounded-lg w-full h-full"
                    src={photo}
                    alt={photo}
                  />
                  {item?.photos?.length > 2 &&
                    indexC === item.photos?.slice(0, 2).length - 1 && (
                      <div className="absolute top-0 right-0 bg-black bg-opacity-60 w-full h-full flex justify-center items-center rounded-lg">
                        <p className="text-xl text-white text-center">
                          +{item?.photos?.length - 2}
                        </p>
                      </div>
                    )}
                </a>
              </div>
            );
          })}
          
        </div>
      )}
    </div>
    <FeedLikeShareComment
      // setShowComment={setShowComment}
      setShowLike={setShowLike}
      item={item}
      index={index}
      url={url}
      onCallback={onCallback}
    />
<ModalImageZoom openImage={showSlide} setOpenImage={setshowSlide} imageList={imageList} index={indexImage}/>
  </div>
  );
};

export default FeedItem;
