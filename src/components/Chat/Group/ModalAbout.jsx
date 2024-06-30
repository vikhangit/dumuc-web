"use client";
import React, { useRef, useState } from "react";
import { Button, Dropdown, Modal, Popconfirm, message } from "antd";
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
  arrayRemove,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineDotsHorizontal, HiPencil } from "react-icons/hi";
import dynamic from "next/dynamic";
const CustomEditor = dynamic(
  () => {
    return import("@components/editorjs/CustomCKEditor");
  },
  { ssr: false }
);

export default function ModalAbout({
  visible,
  onCancel,
  about,
  type,
  authors,
  member,
  avatarGroup,
  setShowModalLeader,
}) {
  const user = JSON.parse(localStorage.getItem("userLogin"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const search = useSearchParams();
  const router = useRouter();
  const userCreated = authors?.find((x) => x?.userId === about?.createdBy);
  const userLeader = authors?.find((x) => x?.userId === about?.leader);
  const userDeputyLeader = authors?.find(
    (x) => x?.userId === about?.deputyLeader
  );
  const [avatar, setAvatar] = useState(about?.avatar);
  const [isEditName, setIsEditName] = useState(false);
  const [name, setName] = useState(about?.name);
  const refImage = useRef(null);
  const [loadingAvatar, setLoadigAvatar] = useState(false);
  const [noiQuy, setNoiQuy] = useState(about?.noiQuy);
  const [editNoiQuy, setEditNoiQuy] = useState(false);
  const [gioiThieu, setGioiThieu] = useState(about?.gioiThieu);
  const [editGioiThieu, setEditGioiThieu] = useState(false);

  useEffect(() => {
    setAvatar(about?.avatar);
    setName(about?.name);
    setNoiQuy(about?.noiQuy);
    setGioiThieu(about?.gioiThieu);
  }, [about]);
  const handleChangeIamge = (e) => {
    setLoadigAvatar(true);
    if (e.target.files[0]) {
      uploadImage(e.target.files[0], userToken).then(async (data) => {
        const washingtonRef = doc(db, "chat-groups", about?.id);

        await updateDoc(washingtonRef, {
          avatar: data?.url,
          createdAt: serverTimestamp(),
        })
          .then(async (result) => {
            await addDoc(
              collection(db, "chat-groups", search.get("groupId"), "messages"),
              {
                notify: true,
                type: "avatar",
                text: `Ảnh đại diện nhóm đã được thay đổi`,
                user: userId,
                createdAt: serverTimestamp(),
              }
            );
            setAvatar(data?.url);
            message.success("Thay đổi ảnh đại diện thành công");
          })
          .catch((err) => {
            message.error("hay đổi ảnh đại diện thất bại");
          });

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
        setIsEditName(false);
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
                ) : avatar && avatar?.length > 0 ? (
                  <Image
                    src={avatar}
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
            {userId === userLeader?.userId && (
              <div className="flex justify-center">
                <Button
                  onClick={() => refImage.current.click()}
                  className="mt-3 mb-3 py-1"
                  icon={<UploadOutlined />}
                >
                  Thay đổi
                </Button>
              </div>
            )}
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
            <div
              className={`mt-2 flex ${
                isEditName
                  ? " sm:items-center flex-col sm:flex-row"
                  : "items-center"
              }`}
            >
              <div className="w-[90px]">
                <strong className="text-nowrap">Tên nhóm</strong>
              </div>
              {isEditName ? (
                <div className="flex items-end sm:items-center flex-col sm:flex-row gap-x-4 w-full">
                  <input
                    type="text"
                    aria-label="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-0 w-full py-1 text-sm border-0 border-b focus:ring-white dark:bg-white focus:border-indigo-700 dark:text-black dark:border-indigo-700"
                  />
                  <div className="flex items-center gap-x-4">
                    <button
                      onClick={async () => {
                        const washingtonRef = doc(db, "chat-groups", about?.id);
                        await updateDoc(washingtonRef, {
                          name,
                          createdAt: serverTimestamp(),
                        })
                          .then(async (result) => {
                            await addDoc(
                              collection(
                                db,
                                "chat-groups",
                                search.get("groupId"),
                                "messages"
                              ),
                              {
                                type: "name",
                                notify: true,
                                text: name,
                                user: userId,
                                createdAt: serverTimestamp(),
                              }
                            );
                            message.success("Đổi tên thành công");
                            setIsEditName(false);
                          })
                          .catch((err) => {
                            message.error("Đổi tên thất bại");
                          });
                      }}
                    >
                      Lưu
                    </button>
                    <button onClick={() => setIsEditName(false)}>Hủy</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-x-2">
                  {about?.name}
                  {userId === userLeader?.userId && (
                    <HiPencil size={16} onClick={() => setIsEditName(true)} />
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-x-4 items-center mt-1">
              <strong className="text-nowrap">Người tạo</strong>
              <div className="flex gap-x-2 items-center">
                <Image
                  src={
                    userCreated?.user?.photo &&
                    userCreated?.user?.photo?.length > 0
                      ? userCreated?.user?.photo
                      : "/dumuc/avatar.jpg"
                  }
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[30px] h-[30px] rounded-full"
                />
                {userCreated?.name}
              </div>
            </div>

            <div className="flex gap-x-4 items-center mt-1">
              <strong className="text-nowrap">Nhóm trưởng</strong>
              <div className="flex gap-x-2 items-center">
                <Image
                  src={
                    userLeader?.user?.photo &&
                    userLeader?.user?.photo?.length > 0
                      ? userLeader?.user?.photo
                      : "/dumuc/avatar.jpg"
                  }
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[30px] h-[30px] rounded-full"
                />
                {userLeader?.name}
              </div>
            </div>
            <div className="flex gap-x-4 items-center mt-1">
              <strong className="text-nowrap">Nhóm phó</strong>
              {userDeputyLeader ? (
                <div className="flex gap-x-2 items-center">
                  <Image
                    src={
                      userDeputyLeader?.user?.photo &&
                      userDeputyLeader?.user?.photo?.length > 0
                        ? userDeputyLeader?.user?.photo
                        : "/dumuc/avatar.jpg"
                    }
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-[30px] h-[30px] rounded-full"
                  />
                  {userDeputyLeader?.name}
                </div>
              ) : (
                <div>Chưa có</div>
              )}
            </div>
            <div className="mt-1">
              <div className="flex gap-x-4 items-center">
                <strong className="text-nowrap">Giới thiệu</strong>
                {!editGioiThieu && (
                  <div className={"flex items-center gap-x-2"}>
                    {gioiThieu && gioiThieu?.length > 0 ? (
                      <div
                        className="w-full"
                        dangerouslySetInnerHTML={{ __html: gioiThieu }}
                      ></div>
                    ) : (
                      <div>Chưa có</div>
                    )}
                    {userId === userLeader?.userId && (
                      <HiPencil
                        size={16}
                        onClick={() => setEditGioiThieu(true)}
                      />
                    )}
                  </div>
                )}
              </div>
              {editGioiThieu && (
                <>
                  <div className="border border-gray-200 w-full mt-1">
                    <CustomEditor
                      initialData={gioiThieu}
                      setData={setGioiThieu}
                      placeholder={`Nhập giới thiệu`}
                    />
                  </div>
                  <div className="flex justify-end items-center gap-x-4">
                    <button
                      onClick={async () => {
                        const washingtonRef = doc(db, "chat-groups", about?.id);
                        await updateDoc(washingtonRef, {
                          gioiThieu,
                          createdAt: serverTimestamp(),
                        })
                          .then(async (result) => {
                            await addDoc(
                              collection(
                                db,
                                "chat-groups",
                                search.get("groupId"),
                                "messages"
                              ),
                              {
                                type: "gioi_thieu",
                                notify: true,

                                user: userId,
                                createdAt: serverTimestamp(),
                              }
                            );
                            message.success(
                              "Thay đổi thông tin giới thiệu về nhóm thành công"
                            );
                            setEditGioiThieu(false);
                          })
                          .catch((err) => {
                            message.error(
                              "Thay đổi thông tin giới thiệu về nhóm thất bại"
                            );
                          });
                      }}
                    >
                      Lưu
                    </button>
                    <button onClick={() => setEditGioiThieu(false)}>Huỷ</button>
                  </div>
                </>
              )}
            </div>
            <div className="mt-1">
              <div className="flex gap-x-4 items-center">
                <strong className="text-nowrap">Nội quy</strong>
                {!editNoiQuy && (
                  <div className="flex items-center gap-x-2">
                    {noiQuy && noiQuy?.length > 0 ? (
                      <div
                        className="w-full"
                        dangerouslySetInnerHTML={{ __html: noiQuy }}
                      ></div>
                    ) : (
                      <div>Chưa có</div>
                    )}
                    {userId === userLeader?.userId && (
                      <HiPencil size={16} onClick={() => setEditNoiQuy(true)} />
                    )}
                  </div>
                )}
              </div>
              {editNoiQuy && (
                <>
                  <div className="border border-gray-200 w-full mt-1">
                    <CustomEditor
                      initialData={noiQuy}
                      setData={setNoiQuy}
                      placeholder={`Nhập nội quy`}
                    />
                  </div>
                  <div className="flex justify-end items-center gap-x-4">
                    <button
                      onClick={async () => {
                        const washingtonRef = doc(db, "chat-groups", about?.id);
                        await updateDoc(washingtonRef, {
                          noiQuy,
                          createdAt: serverTimestamp(),
                        })
                          .then(async (result) => {
                            await addDoc(
                              collection(
                                db,
                                "chat-groups",
                                search.get("groupId"),
                                "messages"
                              ),
                              {
                                type: "noi_quy",
                                notify: true,

                                user: userId,
                                createdAt: serverTimestamp(),
                              }
                            );
                            message.success("Thay đổi nội quy nhóm thành công");
                            setEditNoiQuy(false);
                          })
                          .catch((err) => {
                            message.error("Thay đổi nội quy nhóm thất bại");
                          });
                      }}
                    >
                      Lưu
                    </button>
                    <button onClick={() => setEditNoiQuy(false)}>Huỷ</button>
                  </div>
                </>
              )}
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
                return (
                  <div
                    key={index}
                    className={` rounded-md flex items-center gap-x-2 pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}
                  >
                    <div className="flex justify-between w-full items-center">
                      <div className="flex items-center gap-x-4">
                        <Image
                          src={
                            author?.user?.photo &&
                            author?.user?.photo?.length > 0
                              ? author?.user?.photo
                              : "/dumuc/avatar.jpg"
                          }
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-[45px] h-[45px] rounded-full"
                        />
                        <div>
                          <Link href="" className="text-base">
                            {author?.name}
                          </Link>
                          {item?.user === about?.leader && (
                            <p className="text-[13px] text-[#00000080] mt-1">
                              Trưởng nhóm
                            </p>
                          )}
                          {item?.user === about?.deputyLeader && (
                            <p className="text-[13px] text-[#00000080] mt-1">
                              Phó nhóm
                            </p>
                          )}
                        </div>
                      </div>

                      <Dropdown
                        placement="bottomRight"
                        menu={{
                          items: [
                            {
                              label: (
                                <Link
                                  href={`/author/${author?.slug}/${author?.authorId}`}
                                  className={`w-full text-left`}
                                >
                                  Xem trang cá nhân
                                </Link>
                              ),
                            },
                            {
                              label: (
                                <Link
                                  href={`/chat?friendId=${author?.authorId}`}
                                  className={` w-full text-left`}
                                >
                                  Nhắn tin riêng
                                </Link>
                              ),
                              disabled: userId !== item?.user ? false : true,
                            },
                            {
                              label:
                                about?.deputyLeader !== item?.user ? (
                                  <Popconfirm
                                    placement="bottomRight"
                                    title="Để cử phó nhóm"
                                    description={`Bạn có chắc chắn đề cử ${author?.name} trở thành phó nhóm không?`}
                                    onConfirm={async () => {
                                      const washingtonRef = doc(
                                        db,
                                        "chat-groups",
                                        about?.id
                                      );
                                      await updateDoc(washingtonRef, {
                                        deputyLeader: item?.user,
                                        createdAt: serverTimestamp(),
                                      })
                                        .then(async (result) => {
                                          await addDoc(
                                            collection(
                                              db,
                                              "chat-groups",
                                              search.get("groupId"),
                                              "messages"
                                            ),
                                            {
                                              type: "deputy-leader",
                                              notify: true,
                                              user: item?.user,
                                              createdAt: serverTimestamp(),
                                            }
                                          );
                                          message.success(
                                            "Đề cử phó nhóm thành công"
                                          );
                                        })
                                        .catch((err) => {
                                          message.error(
                                            "Đề cử phó nhóm thất bại"
                                          );
                                        });
                                    }}
                                    onCancel={() => {}}
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                  >
                                    <button
                                      className={`w-full text-left`}
                                      type="primary"
                                    >
                                      Đề cử phó nhóm
                                    </button>
                                  </Popconfirm>
                                ) : (
                                  <Popconfirm
                                    placement="bottomRight"
                                    title="Xóa quyền phó nhóm"
                                    description={`Bạn có chắc chắn xóa quyền nhóm của ${author?.name} không?`}
                                    onConfirm={async () => {
                                      const washingtonRef = doc(
                                        db,
                                        "chat-groups",
                                        about?.id
                                      );
                                      await updateDoc(washingtonRef, {
                                        deputyLeader: "",
                                        createdAt: serverTimestamp(),
                                      })
                                        .then(async (result) => {
                                          await addDoc(
                                            collection(
                                              db,
                                              "chat-groups",
                                              search.get("groupId"),
                                              "messages"
                                            ),
                                            {
                                              type: "deputy-leader-remove",
                                              notify: true,
                                              user: item?.user,
                                              createdAt: serverTimestamp(),
                                            }
                                          );
                                          message.success(
                                            "Xóa quyền phó nhóm thành công"
                                          );
                                        })
                                        .catch((err) => {
                                          message.error(
                                            "Xóa quyền phó nhóm thất bại"
                                          );
                                        });
                                    }}
                                    onCancel={() => {}}
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                  >
                                    <button
                                      className={`w-full text-left`}
                                      type="primary"
                                    >
                                      Xóa quyền phó nhóm
                                    </button>
                                  </Popconfirm>
                                ),
                              disabled:
                                userId === about?.leader &&
                                about?.leader !== item?.user
                                  ? false
                                  : true,
                            },
                            {
                              label: (
                                <Popconfirm
                                  placement="bottomRight"
                                  title="Để cử trưởng nhóm"
                                  description={`Bạn có chắc chắn đề cử ${author?.name} trở thành trưởng nhóm không?`}
                                  onConfirm={async () => {
                                    const washingtonRef = doc(
                                      db,
                                      "chat-groups",
                                      about?.id
                                    );
                                    if (about?.deputyLeader === item?.user) {
                                      await updateDoc(washingtonRef, {
                                        leader: item?.user,
                                        deputyLeader: "",
                                        createdAt: serverTimestamp(),
                                      });
                                    } else {
                                      await updateDoc(washingtonRef, {
                                        leader: item?.user,
                                        createdAt: serverTimestamp(),
                                      });
                                    }
                                    await addDoc(
                                      collection(
                                        db,
                                        "chat-groups",
                                        search.get("groupId"),
                                        "messages"
                                      ),
                                      {
                                        type: "leader",
                                        notify: true,
                                        user: item?.user,
                                        createdAt: serverTimestamp(),
                                      }
                                    );
                                    message.success(
                                      "Để cử trưởng nhóm thành công"
                                    );
                                  }}
                                  onCancel={() => {}}
                                  okText="Xác nhận"
                                  cancelText="Hủy"
                                >
                                  <button
                                    className={` w-full text-left`}
                                    type="primary"
                                    onClick={() => {}}
                                  >
                                    Đề cử trưởng nhóm
                                  </button>
                                </Popconfirm>
                              ),
                              disabled:
                                userId === about?.leader &&
                                about?.leader !== item?.user
                                  ? false
                                  : true,
                            },
                            {
                              label: (
                                <Popconfirm
                                  placement="bottomRight"
                                  title="Xóa thành viên ra khỏi nhóm"
                                  description={`Bạn có chắc chắn muốn xóa thành viên ${author?.name} ra khỏi nhóm?`}
                                  onConfirm={async () => {
                                    const washingtonRef = doc(
                                      db,
                                      "chat-groups",
                                      about?.id
                                    );
                                    await updateDoc(washingtonRef, {
                                      member: arrayRemove(item),
                                      createdAt: serverTimestamp(),
                                    })
                                      .then(async (result) => {
                                        if (
                                          author?.userId === about?.deputyLeader
                                        ) {
                                          await updateDoc(washingtonRef, {
                                            deputyLeader: "",
                                            createdAt: serverTimestamp(),
                                          });
                                        }
                                        await addDoc(
                                          collection(
                                            db,
                                            "chat-groups",
                                            search.get("groupId"),
                                            "messages"
                                          ),
                                          {
                                            type: "remove",
                                            notify: true,
                                            user: item?.user,
                                            createdAt: serverTimestamp(),
                                          }
                                        );

                                        message.success(
                                          "Xóa thành viên nhóm thành công"
                                        );
                                      })
                                      .catch((err) => {
                                        message.error(
                                          "Xóa thành viên nhóm thất bại"
                                        );
                                      });
                                  }}
                                  onCancel={() => {}}
                                  okText="Đồng ý"
                                  cancelText="Hủy bỏ"
                                >
                                  <button className={`w-full text-left`}>
                                    Xóa khỏi nhóm
                                  </button>
                                </Popconfirm>
                              ),
                              disabled:
                                userId === about?.leader &&
                                about?.leader !== item?.user
                                  ? false
                                  : true,
                            },
                            {
                              label: (
                                <Popconfirm
                                  placement="bottomRight"
                                  title="Xóa thành viên ra khỏi nhóm"
                                  description={`Bạn có chắc chắn muốn xóa thành viên ${author?.name} ra khỏi nhóm?`}
                                  onConfirm={async () => {
                                    const washingtonRef = doc(
                                      db,
                                      "chat-groups",
                                      about?.id
                                    );
                                    await updateDoc(washingtonRef, {
                                      member: arrayRemove(item),
                                      createdAt: serverTimestamp(),
                                    })
                                      .then(async (result) => {
                                        if (
                                          author?.userId === about?.deputyLeader
                                        ) {
                                          await updateDoc(washingtonRef, {
                                            deputyLeader: "",
                                            createdAt: serverTimestamp(),
                                          });
                                        }
                                        await addDoc(
                                          collection(
                                            db,
                                            "chat-groups",
                                            search.get("groupId"),
                                            "messages"
                                          ),
                                          {
                                            type: "remove",
                                            notify: true,
                                            user: item?.user,
                                            createdAt: serverTimestamp(),
                                          }
                                        );

                                        message.success(
                                          "Xóa thành viên nhóm thành công"
                                        );
                                      })
                                      .catch((err) => {
                                        message.error(
                                          "Xóa thành viên nhóm thất bại"
                                        );
                                      });
                                  }}
                                  onCancel={() => {}}
                                  okText="Đồng ý"
                                  cancelText="Hủy bỏ"
                                >
                                  <button className={`w-full text-left`}>
                                    Xóa khỏi nhóm
                                  </button>
                                </Popconfirm>
                              ),
                              disabled:
                                userId === about?.deputyLeader &&
                                about?.leader !== item?.user &&
                                about?.deputyLeader !== item?.user
                                  ? false
                                  : true,
                            },
                            {
                              label: (
                                <Popconfirm
                                  placement="bottomRight"
                                  title="Xác nhận rời nhóm"
                                  description={`Bạn có chắc chắn khỏi nhóm nhóm không?`}
                                  onConfirm={async () => {
                                    const washingtonRef = doc(
                                      db,
                                      "chat-groups",
                                      about?.id
                                    );
                                    if (item?.user === about?.leader) {
                                      if (
                                        about?.deputyLeader !== "" &&
                                        about?.deputyLeader?.length > 0
                                      ) {
                                        await updateDoc(washingtonRef, {
                                          member: arrayRemove(item),
                                        })
                                          .then(async (result) => {
                                            await updateDoc(washingtonRef, {
                                              leader: about?.deputyLeader,
                                              deputyLeader: "",
                                              createdAt: serverTimestamp(),
                                            });
                                            await addDoc(
                                              collection(
                                                db,
                                                "chat-groups",
                                                search.get("groupId"),
                                                "messages"
                                              ),
                                              {
                                                type: "exit",
                                                notify: true,
                                                user: item?.user,
                                                createdAt: serverTimestamp(),
                                              }
                                            );
                                            await addDoc(
                                              collection(
                                                db,
                                                "chat-groups",
                                                search.get("groupId"),
                                                "messages"
                                              ),
                                              {
                                                type: "leader",
                                                notify: true,
                                                user: about?.deputyLeader,
                                                createdAt: serverTimestamp(),
                                              }
                                            );
                                            message.success(
                                              "Bạn đã rời khỏi nhóm thành công"
                                            );
                                            onCancel();
                                            router.push("/chat/group-public");
                                          })
                                          .catch((err) => {
                                            message.error(
                                              "Bạn đã rời khỏi nhóm thất bại"
                                            );
                                          });
                                      } else {
                                        setShowModalLeader(true);
                                      }
                                    } else {
                                      await updateDoc(washingtonRef, {
                                        member: arrayRemove(item),
                                        createdAt: serverTimestamp(),
                                      })
                                        .then(async (result) => {
                                          if (
                                            item?.user === about?.deputyLeader
                                          ) {
                                            await updateDoc(washingtonRef, {
                                              deputyLeader: "",
                                              createdAt: serverTimestamp(),
                                            });
                                          }
                                          await addDoc(
                                            collection(
                                              db,
                                              "chat-groups",
                                              search.get("groupId"),
                                              "messages"
                                            ),
                                            {
                                              type: "exit",
                                              notify: true,
                                              user: item?.user,
                                              createdAt: serverTimestamp(),
                                            }
                                          );
                                          message.success(
                                            "Rời khỏi nhóm thành công"
                                          );
                                          onCancel();
                                          // router.push("/chat/group-public");
                                        })
                                        .catch((err) => {
                                          message.error(
                                            "Rời khỏi nhóm thất bại"
                                          );
                                        });
                                    }
                                  }}
                                  onCancel={() => {}}
                                  okText="Đồng ý"
                                  cancelText="Hủy bỏ"
                                >
                                  <button className={`w-full text-left`}>
                                    Rời nhóm
                                  </button>
                                </Popconfirm>
                              ),
                              disabled: item?.user === userId ? false : true,
                            },
                          ],
                        }}
                      >
                        <HiOutlineDotsHorizontal size={16} />
                      </Dropdown>
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
