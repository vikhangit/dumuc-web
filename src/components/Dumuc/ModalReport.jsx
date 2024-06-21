"use client";
import React, { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { uploadImage } from "apis/other";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import dynamic from "next/dynamic";
import {
  createUserReport,
  createUserStories,
  deleteUserStories,
  getProfile,
  updateProfile,
} from "@apis/users";
import { createStoryByUser, updateStoryByUser } from "@apis/feeds";
import { Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa6";

export default function ModalReport({
  visible,
  onCancel,
  user,
  usingUser,
  reportTo,
}) {
  const reportArr = [
    {
      text: "Giả mạo người khác",
    },
    {
      text: "Tài khoản giả mạo",
    },
    {
      text: "Đăng nội dung không phù hơpj",
    },
    {
      text: "Quấy rồi bắt nạt",
    },
    {
      text: "Vấn đề khác",
    },
  ];
  const [activeList, setActiveList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("");
  const [photo, setPhoto] = useState("");
  const [photoChange, setPhotoChange] = useState("");
  const [active, setActive] = useState(0);
  const [error, setError] = useState("");
  const refImage = useRef(null);

  const save = () => {
    setLoading(true);
    createUserReport(
      {
        reportText: activeList,
        userId: reportTo,
      },
      user?.accessToken
    ).then((result) => {
      onCancel();
      setLoading(false);
      message.success(
        "Cảm ơn bạn đã để lại báo cáo. Chúng tôi sẽ xem xét để đưa ra hướng xử lý"
      );
    });
  };
  console.log(activeList);
  return (
    <Modal
      visible={visible}
      title={`Báo cáo tài khoản`}
      onCancel={() => {
        onCancel();
        setActiveList([]);
      }}
      destroyOnClose={true}
      footer={
        <div className="w-full flex justify-end">
          {loading ? (
            <button
              disabled
              type="button"
              className={`text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5`}
            >
              <svg
                aria-hidden="true"
                role="status"
                class="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Đang xác nhận...
            </button>
          ) : (
            <button
              onClick={() => {
                save();
              }}
              type="button"
              class={`text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5`}
            >
              Xác nhận
            </button>
          )}
        </div>
      }
      centered
      className="modal-quick-post private"
    >
      <div className="mt-6">
        <h4 className="text-lg font-bold">Hãy chọn vấn đề</h4>
        <p className="text-sm mt-1">
          Nếu bạn nhận thấy người dùng vi phạm, đừng chần chừ mà hãy để lại báo
          cáo cho chúng tôi
        </p>
        <div className="mt-2">
          {reportArr.map((item, index) => {
            return (
              <div
                className="flex items-center gap-4 w-full cursor-pointer py-1"
                onClick={() => {
                  const find = activeList?.findIndex((x) => x === item?.text);
                  if (find < 0) {
                    activeList.push(item?.text);
                  } else {
                    activeList.splice(find, 1);
                  }
                  setActiveList([...activeList]);
                }}
              >
                <div
                  className={`flex justify-center items-center w-[22px] h-[22px] rounded-[5px] border ${
                    activeList?.find((x) => x === item?.text)
                      ? "bg-green-400 border-green-400"
                      : "border-gray-400"
                  }`}
                >
                  {activeList?.find((x) => x === item?.text) && (
                    <FaCheck className="text-white" />
                  )}
                </div>
                <p className="w-full">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
