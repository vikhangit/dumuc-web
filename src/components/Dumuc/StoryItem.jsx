"use client";
import { uploadImage } from "@apis/other";
import { message } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiLink,
} from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineAdd } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import ModalWating from "./ModalWating";
const QuickAddStory = dynamic(
  () => {
    return import("@components/QuickAddStory");
  },
  { ssr: false }
);
const ModalPlayVideos = dynamic(
  () => {
    return import("@components/ModalPlayVideos");
  },
  { ssr: false }
);

const StoryItem = ({ data, element, index, setShowImage, setIndexImage }) => {
  const [stories, setStories] = useState(data);
  const [item, setItem] = useState(element);
  useEffect(() => {
    setItem(element);
  }, [element]);
  return (
    <>
      <div
        onClick={() => {
          setShowImage(true);
          setIndexImage(index);
        }}
        className="border border-gray-400 rounded-[10px] w-full h-full relative flex flex-col"
      >
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={item?.author?.user?.photo || "/dumuc/avatar.jpg"}
          alt=""
          className="absolute z-20 top-2 left-2 w-10 h-10 rounded-full border border-sky-700 p-0.5"
        />
        {item?.type === "file" ? (
          <video
            className={`w-full h-full rounded-t-[10px] relative z-10 h-[210px]`}
          >
            <source src={item?.photos} type="video/mp4" />
          </video>
        ) : (
          <div
            className="w-full h-full story"
            dangerouslySetInnerHTML={{
              __html: item?.description,
            }}
          ></div>
        )}
        <span className={`absolute bottom-2 left-2 text-sm font-medium z-20`}>
          {item?.author?.activeNickName &&
          item?.author?.nickName &&
          item?.author?.nickName !== ""
            ? item?.author?.nickName
            : item?.author?.name}
        </span>
      </div>
    </>
  );
};
export default StoryItem;
