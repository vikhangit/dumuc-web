"use client";
import React, { useState } from "react";
const QuickPostModal = dynamic(
  () => {
    return import("./QuickPostModal");
  },
  { ssr: false }
);
import QuickPostModalEmoji from "./QuickPostModlEmoji";
import { useRouter } from "next/navigation";
import { auth } from "utils/firebase";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";

export default function QucickPost({ onCallback }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [showPostText, setShowPostText] = useState(false);
  const [showPostEmotion, setShowPostEmotion] = useState(false);
  const [emotion, setEmotion] = useState("");
  const [showImage, setShowImage] = useState(false);
  return (
    <>
      <div className="bg-white rounded-lg shadow my-4 p-4">
        <div className="flex items-start justify-between border-b border-gray-200 pb-4">
          <a href={"/"} className="">
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src={
                user?.photoURL?.length > 0
                  ? user?.photoURL
                  : "/dumuc/avatar.jpg"
              }
              alt=""
              className="rounded-full w-12 h-12 quick-post-avatar"
            />
          </a>
          <div
            className="w-[calc(100%-3.5rem)] h-12
          flex items-center px-4 sm:px-6 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-500 cursor-pointer text-sm sm:text-base quick-post-input"
            onClick={() => {
              if (user) {
                setShowPostText(true);
              } else {
                router.push("/auth");
              }
            }}
          >
            {user?.displayName || "Bạn"} ơi bạn đang nghĩ gì thế?
          </div>
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
    </>
  );
}
