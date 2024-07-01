"use client";
import { db } from "@utils/firebase";
import { Modal, message } from "antd";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function ModalNickame({
  visible,
  onCancel,
  nameActive,
  setNameActive,
  myAuthor,
  userRecieved,
  chatId,
  userId,
  friendList,
}) {
  const [newName, setNewName] = useState(nameActive);
  useEffect(() => {
    setNewName(nameActive);
  }, [nameActive]);
  return (
    <Modal
      visible={visible}
      title={"Đặt tên gợi nhớ"}
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose={true}
      footer={
        <div className="w-full flex justify-end">
          <button
            onClick={async () => {
              if (newName?.trim() !== "") {
                if (chatId) {
                  const findFriendId = friendList?.find(
                    (x) => x?.authorId === userRecieved?.authorId
                  )?.friendListId;
                  const wRef = doc(db, "chat-rooms", chatId);
                  await updateDoc(wRef, {
                    member: [
                      myAuthor,
                      { ...userRecieved, ten_goi_nho: newName },
                    ],
                  });
                  if (findFriendId) {
                    const friendRef = doc(
                      db,
                      "users",
                      userId,
                      "friendList",
                      findFriendId
                    );
                    await updateDoc(friendRef, {
                      ten_goi_nho: newName,
                    });
                  }
                  message.success("Đổi tên gợi nhớ thành công");
                  onCancel();
                } else {
                  message.error("Bạn chưa nhắn tin với người này");
                }
              }
            }}
            type="button"
            class={`text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5 ${
              newName?.trim() === "" &&
              "bg-opacity-30 ointer-events-none cursor-not-allowed"
            }`}
          >
            Xác nhận
          </button>
        </div>
      }
      centered
      className="modal-quick-post private"
    >
      <div className="mt-6">
        <div className="flex flex-col items-center">
          <span>
            Hãy đặt cho <span className="font-bold">{userRecieved?.name}</span>{" "}
            một cái tên dễ nhớ
          </span>
          <span>Lưu ý: Tên gợi nhớ chỉ hiển thị với riêng bạn</span>
        </div>
        <div className="w-full mt-6">
          <input
            type="text"
            id="default-input"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
            value={newName}
          />
        </div>
      </div>
    </Modal>
  );
}
