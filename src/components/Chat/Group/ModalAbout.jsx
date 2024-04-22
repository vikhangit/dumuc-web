"use client";
import React, { useRef, useState } from "react";
import { Button, Modal } from "antd";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@utils/firebase";
import { FaCamera } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { UploadOutlined } from "@ant-design/icons";
import { uploadImage } from "@apis/other";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSearchParams } from "next/navigation";

export default function ModalAbout({
  visible,
  onCancel,
  about,
  type,
  authors,
  member,
  avatarGroup,
}) {
  const [user] = useAuthState(auth);
  const search = useSearchParams();
  const userCreated = authors?.find((x) => x?.userId === about?.createdBy);
  const [avatar, setAvatar] = useState(avatarGroup[0]?.avatar);
  const refImage = useRef(null);
  const [loadingAvatar, setLoadigAvatar] = useState(false);
  useEffect(() => {
    if (search.get("groupId")) {
      const q = query(
        collection(db, "chat-groups", search.get("groupId"), "avatar"),
        orderBy("createdAt", "desc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let allMess = [];
        querySnapshot.forEach((doc) =>
          allMess.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate(),
          })
        );
        setAvatar(allMess);
      });
      return () => unsubscribe;
    } else {
      setAvatar([]);
    }
  }, [search]);
  console.log(avatarGroup);
  const handleChangeIamge = (e) => {
    setLoadigAvatar(true);
    if (e.target.files[0]) {
      uploadImage(e.target.files[0], user?.accessToken).then(async (data) => {
        setAvatar(data?.url);
        await addDoc(
          collection(db, "chat-groups", search.get("groupId"), "avatar"),
          {
            avatar: data?.url,
            createdAt: serverTimestamp(),
          }
        );
        setLoadigAvatar(false);
      });
    }
  };
  return (
    <Modal
      visible={visible}
      title={type === "about" ? `Thông tin nhóm` : "Thành viên nhóm"}
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose={true}
      footer={null}
      centered
      className="private"
    >
      <div className="mt-8 gap-x-2">
        {type === "about" && (
          <div>
            <div className="w-full rounded-full flex justify-center items-center">
              <div className="w-[100px] h-[100px] rounded-full flex justify-center items-center border border-gray-400">
                {loadingAvatar ? (
                  <Spinner className="w-4 h-4" />
                ) : avatar &&
                  avatar?.length > 0 &&
                  avatar[0]?.avatar?.length > 0 ? (
                  <Image
                    src={avatar[0]?.avatar}
                    width={0}
                    height={0}
                    className="w-full h-full rounded-full"
                    sizes="100vw"
                  />
                ) : (
                  <FaCamera color="#999" size={20} />
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                onClick={() => refImage.current.click()}
                className="mt-3 mb-3 py-1"
                icon={<UploadOutlined />}
              >
                Thay đổi
              </Button>
            </div>
            <div className="flex justify-center">
              <input
                className="hidden"
                onChange={(e) => {
                  handleChangeIamge(e);
                }}
                type="file"
                accept="image/*"
                ref={refImage}
              />
            </div>
            <div className="mt-2 flex gap-x-4 items-center">
              <strong>Tên nhóm:</strong> {about?.name}
            </div>
            <div className="flex gap-x-4 items-center mt-2">
              <strong>Người tạo:</strong>
              <div className="flex gap-x-2 items-center">
                <Image
                  src={
                    userCreated?.user?.photo &&
                    userCreated?.user?.photo?.length > 0
                      ? userCreated?.user?.photo
                      : "/dumuc/avatar.png"
                  }
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[30px] h-[30px] rounded-full"
                />
                {userCreated?.name}
              </div>
            </div>
          </div>
        )}
        {type === "member" && (
          <div>
            {member
              // ?.filter(
              //   (ele, ind) =>
              //     ind ===
              //     about?.member?.findIndex((elem) => elem?.user === ele?.user)
              // )
              ?.map((item, index) => {
                const author = authors?.find((x) => x?.userId === item?.user);
                console.log(item);
                return (
                  <div
                    key={index}
                    className={` rounded-md flex items-center gap-x-2 pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}
                  >
                    <Image
                      src={
                        author?.user?.photo && author?.user?.photo?.length > 0
                          ? author?.user?.photo
                          : "/dumuc/avatar.png"
                      }
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-[45px] h-[45px] rounded-full"
                    />
                    <div className="flex justify-between w-full">
                      <div>
                        <Link href="" className="text-base">
                          {author?.name}
                        </Link>
                        {item?.user === about?.createdBy && (
                          <p className="text-[13px] text-[#00000080] mt-1">
                            Trưởng nhóm
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </Modal>
  );
}
