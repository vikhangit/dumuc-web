"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import QuickPostModalEmoji from "@components/QuickPostModlEmoji";
const QuickPostModal = dynamic(
  () => {
    return import("@components/QuickPostModal");
  },
  { ssr: false }
);
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import dynamic from "next/dynamic";

const NewQuickPost = ({ onCallback, user, usingUser }) => {
  const router = useRouter();
  const [showPostText, setShowPostText] = useState(false);
  const [showPostEmotion, setShowPostEmotion] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [showImage, setShowImage] = useState(false);
  return (
    <>
      <div className="bg-white rounded-lg shadow my-4 border border-gray-300">
        <div className="flex items-center justify-between my-4 mx-[20px]">
          <a href={"/"} className="">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src={
                user?.photoURL?.length > 0
                  ? user?.photoURL
                  : "/dumuc/avatar.png"
              }
              alt=""
              className="rounded-full w-12 h-12"
            />
          </a>
          <a
            className="w-[calc(100%-55px)] sm:w-[calc(100%-70px)] h-14 sm:h-12 flex items-center rounded-[10px] bg-gray-300 font-medium sm:font-normal text-[13px] sm:text-sm md:text-base text-gray-500 cursor-text px-[20px]"
            onClick={() => {
              if (user) {
                setShowPostText(true);
                localStorage.removeItem("isPrivate");
              } else {
                router.push("/auth");
              }
            }}
          >
            {user?.displayName || "Bạn"} ơi bạn muốn chia sẻ gì?
          </a>
        </div>
      </div>
      <QuickPostModal
        visible={showPostText}
        setEmotion={setEmotion}
        emotion={emotion}
        onCancel={() => {
          setShowPostText(false);
        }}
        setShowPostEmotion={setShowPostEmotion}
        // showImage={showImage}
        // setShowImage={setShowImage}
        onCallback={onCallback}
        user={user}
        usingUser={usingUser}
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
    </>
  );
};
export default NewQuickPost;
