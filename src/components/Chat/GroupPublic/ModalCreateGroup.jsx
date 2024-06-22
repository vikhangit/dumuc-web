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
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { CaretDownOutlined } from "@ant-design/icons";

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
  const [active, setActive] = useState(1);
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
    const docRef = await addDoc(collection(db, "chat-groups"), {
      name,
      avatar,
      createdBy: user?.uid,
      leader: user?.uid,
      deputyLeader: "",
      createdAt: serverTimestamp(),
      isPrivate: JSON.parse(localStorage.getItem("groupPrivate"))
        ? JSON.parse(localStorage.getItem("groupPrivate")) === "0"
          ? true
          : false
        : false,
    });
    const memberRef = doc(db, "chat-groups", docRef.id);
    await updateDoc(memberRef, {
      member: arrayUnion({
        user: user?.uid,
        createdBy: user?.uid,
      }),
    });
    setLoading(false);
    onCallback();
    setName("");
    setAvatar("");
    onCancel();
    JSON.parse(localStorage.getItem("groupPrivate"))
      ? JSON.parse(localStorage.getItem("groupPrivate")) === "0"
        ? router.push(`/chat/group?groupId=${docRef?.id}`)
        : router.push(`/chat/group-public?groupId=${docRef?.id}`)
      : router.push(`/chat/group-public?groupId=${docRef?.id}`);
    localStorage.removeItem("groupPrivate");
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
        <div className="flex justify-between">
          <div className="relative rounded-[6px] mt-1 w-fit">
            <select
              className="w-full h-full bg-[#e5e5e5] border-0 text-sm font-medium"
              value={active}
              onChange={(e) => {
                setActive(e.target.value);
                localStorage.setItem(
                  "groupPrivate",
                  JSON.stringify(e.target.value)
                );
              }}
            >
              <option className="text-xs font-medium" value={0}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                    clipRule="evenodd"
                  />
                </svg>
                Nhóm riêng tư
              </option>
              <option className="text-xs font-medium" value={1}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
                    clipRule="evenodd"
                  />
                </svg>
                Nhóm công khai
              </option>
            </select>
            <div className="icon absolute right-2 top-1/2 -translate-y-1/2 text-black">
              <CaretDownOutlined
                style={{
                  fontSize: 11,
                }}
              />
            </div>
          </div>
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
