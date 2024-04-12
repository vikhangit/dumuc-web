"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const { arrange } = require("emoji-api");
import { Spinner } from 'flowbite-react';
import { Modal } from "antd";
import { emotionData } from "@utils/emotionData";

export default function QuickPostModalEmoji({ visible, onCancel, setEmotion, onSaveEmotion}) {
  const router = useRouter();
  const [emojiData, setEmojiData] = useState(arrange()['Smileys & Emotion']?.filter((x) => {
  return x
  }));
  return (
    <Modal
      visible={visible}
      title={`Bạn đang cảm thấy thế nào?`}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={null}
      centered
      className="modal-quick-post"
    >
      <div>
        {
          emotionData.length > 0 ? <div className='grid grid-cols-2 gap-x-2 gap-y-2'>
          {
            emotionData.map((item, index) => {
              return (
                <button
                  key={index}
                  className="flex items-center p-2 gap-x-4 rounded-lg hover:bg-gray-300"
                  onClick={() => {
                    setEmotion(`đang ${item.icon} cảm thấy ${item?.title.toLocaleLowerCase()}`);
                    onSaveEmotion()
                  }}
                >
                  <div className="basis-1/6 text-3xl bg-gray-200 rounded-full p-2">
                    {item.icon}
                  </div>
                  <div className="basis-5/6 text-sm text-left">
                    {
                      item?.title
                      // ?.slice(5)?.replace(/^\s+|\s+$/gm,'')
                    }
                  </div>
                </button>
              );
            })
          }
        </div> : <div className="flex justify-center">
          <Spinner />
        </div>
        }
      </div>
    </Modal>
  );
}
