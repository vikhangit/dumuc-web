"use client";
import React, { useState, useEffect, useRef } from "react";
import { Modal } from "antd";
import { uploadImage } from "apis/other";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@utils/firebase";
import { getProfile } from "@apis/users";
import { FaCamera } from "react-icons/fa6";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ModalCreateGroup({
  visible,
  onCancel,
  onCallback,
  authors,
}) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [usingUser, setUsingUser] = useState();
  const router = useRouter();
  const [avatar, setAvatar] = useState("");
  const refAvatar = useRef(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const myAuthor = authors?.find((x) => x?.userId === user?.uid);
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall));
  }, [user]);
  const save = async () => {
    setLoading(true);
    if (name === undefined || name === "") {
      setError("Vui lòng nhập tên nhóm");
      setLoading(false);
      return;
    }
    await addDoc(collection(db, "chat-groups"), {
      name,

      createdBy: user?.uid,
      createdAt: serverTimestamp(),
    }).then(async (data) => {
      await addDoc(collection(db, "chat-groups", `${data?.id}`, "member"), {
        user: user?.uid,
        createdAt: serverTimestamp(),
        createdBy: user?.uid,
      });
      await addDoc(collection(db, "chat-groups", `${data?.id}`, "avatar"), {
        avatar,
        createdAt: serverTimestamp(),
      });
      setLoading(false);
      onCallback();
      setName("");
      setAvatar("");
      onCancel();
      router.push(`/chat/group?groupId=${data.id}`);
    });
  };
  const handleChangeIamge = (e) => {
    setLoadingAvatar(true);
    if (e?.target?.files) {
      uploadImage(e?.target?.files[0], user?.accessToken).then((data) => {
        setAvatar(data?.url);
        setLoadingAvatar(false);
      });
    }
  };
  return (
    <Modal
      visible={visible}
      title={`Tạo nhóm`}
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose={true}
      footer={
        <div className="flex justify-end">
          {loading ? (
            <button
              disabled
              type="button"
              className={`text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5`}
            >
              <Spinner className="w-4 h-4" />
              Tạo nhóm
            </button>
          ) : (
            <button
              onClick={() => {
                save();
              }}
              type="button"
              class={`text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1.5`}
            >
              Tạo nhóm
            </button>
          )}
        </div>
      }
      centered
      className="private"
    >
      <div className="mt-8 flex items-center gap-x-2">
        {avatar.length > 0 ? (
          <Image
            src={avatar}
            width={0}
            height={0}
            sizes="100vw"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <button
            onClick={() => refAvatar.current?.click()}
            className="w-14 h-12 flex justify-center items-center border border-gray-200 rounded-full"
          >
            {loadingAvatar ? (
              <Spinner className="w-4 h-4" />
            ) : (
              <FaCamera color="#999" />
            )}
          </button>
        )}

        <div className="w-full">
          <input
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value === "") {
                setError("Vui lòng nhập tên nhóm");
              } else {
                setError("");
              }
            }}
            placeholder="Nhập tên nhóm"
            aria-label="name"
            className={
              name === ""
                ? "bg-gray-50 border-b border-red-800 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5"
                : "bg-gray-50 border-b border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5"
            }
            type="text"
          />
          {error !== "" && (
            <p class="mt-1 text-xs sm:text-sm text-[#c80000] font-semibold">
              {error}
            </p>
          )}
        </div>
      </div>
      <input
        aria-label="avatar"
        accept="image/*"
        className="hidden"
        type="file"
        ref={refAvatar}
        onChange={(e) => handleChangeIamge(e)}
      />
    </Modal>
  );
}
