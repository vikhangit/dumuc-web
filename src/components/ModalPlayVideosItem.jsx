"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  createUserFollow,
  createUserToFollowerList,
  deleteAddFriend,
  deleteRecieveFriend,
  deleteUserFollow,
  deleteUserInFollowerList,
  getProfile,
  receiveRequestAddFriend,
  sendRequestAddFriend,
} from "@apis/users";
import { message } from "antd";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { FaUserTimes } from "react-icons/fa";
import { FaPencil, FaUserCheck, FaUserPlus } from "react-icons/fa6";
import { useWindowSize } from "@hooks/useWindowSize";
import { useEffect } from "react";
import { IoMdMore } from "react-icons/io";
import { deleteStoryByUser, updateStoryByUser } from "@apis/feeds";
import StoryAuthorTool from "./Story/StoryAuthorTool";
const QuickAddStory = dynamic(
  () => {
    return import("./QuickAddStory");
  },
  { ssr: false }
);
const StoryLikeShareComment = dynamic(
  () => {
    return import("./Story/StoryLikeShareComment");
  },
  { ssr: false }
);
export default function ModalPlayVideosItem({
  item,
  user,
  usingUser,
  imageList,
  onCallback,
  myFollow,
  myFriend,
  close,
}) {
  return (
    <div className="bg-white w-full">
      {item?.type === "file" ? (
        <video className="w-full h-full object-contain" controls loop>
          <source src={item.photos} type="video/mp4" />
        </video>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: item?.description }}></div>
      )}
      <div className="mt-3">
        <StoryAuthorTool
          user={user}
          usingUser={usingUser}
          close={close}
          imageList={imageList}
          data={item}
          myFollow={myFollow}
          myFriend={myFriend}
          onCallback={onCallback}
        />

        <StoryLikeShareComment
          item={item}
          url={"/"}
          user={user}
          usingUser={usingUser}
        />
      </div>
    </div>
  );
}
