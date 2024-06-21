"use client";
import React, { useRef, useState } from "react";
import { Button, Modal, Popconfirm, message } from "antd";
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
  arrayUnion,
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
  const router = useRouter();
  const userCreated = authors?.find((x) => x?.userId === about?.createdBy);
  const userLeader = authors?.find((x) => x?.userId === about?.leader);
  const [avatar, setAvatar] = useState(about?.avatar);
  const [isEditName, setIsEditName] = useState(false);
  const [memberList, setMemberList] = useState();
  const [name, setName] = useState(about?.name);
  const refImage = useRef(null);
  const [loadingAvatar, setLoadigAvatar] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openAlertDeputy, setOpenAlertDeputy] = useState(false);
  const [openAlertLeader, setOpenAlertLeader] = useState(false);
  const [openAlertRemove, setOpenAlertRemove] = useState(false);
  const [openAlertExit, setOpenAlertExit] = useState(false);
  useEffect(() => {
    setAvatar(about?.avatar);
    setName(about?.name);
  }, [about]);
  const handleChangeIamge = (e) => {
    setLoadigAvatar(true);
    if (e.target.files[0]) {
      uploadImage(e.target.files[0], user?.accessToken).then(async (data) => {
        const washingtonRef = doc(db, "chat-groups", about?.id);

        await updateDoc(washingtonRef, {
          avatar: data?.url,
        })
          .then(async (result) => {
            await addDoc(
              collection(db, "chat-groups", search.get("groupId"), "messages"),
              {
                notify: true,
                type: "avatar",
                text: `Ảnh đại diện nhóm đã được thay đổi`,
                user: user.uid,
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
      title={
        type === "about"
          ? `Thông tin nhóm`
          : type === "member"
          ? "Thành viên nhóm"
          : "Yêu cầu tham gia"
      }
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
            {user.uid === userLeader?.userId && (
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
                <strong>Tên nhóm</strong>
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
                                user: user.uid,
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
                  {user.uid === userLeader?.userId && (
                    <HiPencil size={16} onClick={() => setIsEditName(true)} />
                  )}
                </div>
              )}
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

            <div className="flex gap-x-4 items-center mt-2">
              <strong>Nhóm trưởng:</strong>
              <div className="flex gap-x-2 items-center">
                <Image
                  src={
                    userLeader?.user?.photo &&
                    userLeader?.user?.photo?.length > 0
                      ? userLeader?.user?.photo
                      : "/dumuc/avatar.png"
                  }
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-[30px] h-[30px] rounded-full"
                />
                {userLeader?.name}
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
                    <div className="flex justify-between w-full items-center">
                      <div className="flex items-center gap-x-4">
                        <Image
                          src={
                            author?.user?.photo &&
                            author?.user?.photo?.length > 0
                              ? author?.user?.photo
                              : "/dumuc/avatar.png"
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
                      <button className="relative group">
                        <HiOutlineDotsHorizontal />
                        <div className="absolute z-[9999] hidden group-hover:flex flex-col justify-start items-start top-full right-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[140px] rounded p-1">
                          <Link
                            href={`/author/${author?.slug}/${author?.authorId}`}
                            className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left text-black`}
                          >
                            Xem trang cá nhân
                          </Link>
                          {user.uid !== item?.user && (
                            <Link
                              href={`/chat?friendId=${author?.authorId}`}
                              className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left text-black`}
                            >
                              Nhắn tin riêng
                            </Link>
                          )}
                          {user.uid === about?.leader &&
                            about?.leader !== item?.user && (
                              <>
                                {about?.deputyLeader !== item?.user ? (
                                  <Popconfirm
                                    title="Để cử phó nhóm"
                                    description={`Bạn có chắc chắn đề cử ${author?.name} trở thành phó nhóm không?`}
                                    open={openAlertDeputy}
                                    onConfirm={async () => {
                                      setConfirmLoading(true);
                                      const washingtonRef = doc(
                                        db,
                                        "chat-groups",
                                        about?.id
                                      );
                                      await updateDoc(washingtonRef, {
                                        deputyLeader: item?.user,
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
                                          setConfirmLoading(false);
                                          setOpenAlertDeputy(false);
                                        })
                                        .catch((err) => {
                                          message.error(
                                            "Đề cử phó nhóm thất bại"
                                          );
                                          setConfirmLoading(false);
                                        });
                                    }}
                                    okButtonProps={{ loading: confirmLoading }}
                                    onCancel={() => {
                                      setOpenAlertDeputy(false);
                                    }}
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                  >
                                    <button
                                      className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left text-black`}
                                      type="primary"
                                      onClick={() => setOpenAlertDeputy(true)}
                                    >
                                      Đề cử phó nhóm
                                    </button>
                                  </Popconfirm>
                                ) : (
                                  <Popconfirm
                                    title="Xóa quyền phó nhóm"
                                    description={`Bạn có chắc chắn sóa quyền nhóm của ${author?.name} không?`}
                                    open={openAlertDeputy}
                                    onConfirm={async () => {
                                      setConfirmLoading(true);
                                      const washingtonRef = doc(
                                        db,
                                        "chat-groups",
                                        about?.id
                                      );
                                      await updateDoc(washingtonRef, {
                                        deputyLeader: "",
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
                                          setConfirmLoading(false);
                                          setOpenAlertDeputy(false);
                                        })
                                        .catch((err) => {
                                          message.error(
                                            "Xóa quyền phó nhóm thất bại"
                                          );
                                          setConfirmLoading(false);
                                        });
                                    }}
                                    okButtonProps={{ loading: confirmLoading }}
                                    onCancel={() => {
                                      setOpenAlertDeputy(false);
                                    }}
                                    okText="Xác nhận"
                                    cancelText="Hủy"
                                  >
                                    <button
                                      className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left text-black`}
                                      type="primary"
                                      onClick={() => setOpenAlertDeputy(true)}
                                    >
                                      Xóa quyền phó nhóm
                                    </button>
                                  </Popconfirm>
                                )}
                                <button
                                  className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left text-black`}
                                >
                                  Đề cử trưởng nhóm
                                </button>
                              </>
                            )}
                          <button
                            onClick={async () => {
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
                                      router.push("/chat/group");
                                    })
                                    .catch((err) => {
                                      message.error(
                                        "Bạn đã rời khỏi nhóm thất bại"
                                      );
                                    });
                                } else {
                                  alert("Vui lòng đề cử nhóm trưởng mới");
                                  // await updateDoc(washingtonRef, {
                                  //   member: arrayRemove(item),
                                  // })
                                  //   .then(async (result) => {
                                  //     if (
                                  //       author?.userId === about?.deputyLeader
                                  //     ) {
                                  //       await updateDoc(washingtonRef, {
                                  //         deputyLeader: "",
                                  //       });
                                  //     }
                                  //     await addDoc(
                                  //       collection(
                                  //         db,
                                  //         "chat-groups",
                                  //         search.get("groupId"),
                                  //         "messages"
                                  //       ),
                                  //       {
                                  //         type:
                                  //           user.uid === author?.userId
                                  //             ? "exit"
                                  //             : "remove",
                                  //         notify: true,
                                  //         user: item?.user,
                                  //         createdAt: serverTimestamp(),
                                  //       }
                                  //     );
                                  //     message.success(
                                  //       "Xóa thành viên nhóm thành công"
                                  //     );
                                  //   })
                                  //   .catch((err) => {
                                  //     message.error(
                                  //       "Xóa thành viên nhóm thất bại"
                                  //     );
                                  //   });
                                }
                              } else {
                                await updateDoc(washingtonRef, {
                                  member: arrayRemove(item),
                                })
                                  .then(async (result) => {
                                    if (
                                      author?.userId === about?.deputyLeader
                                    ) {
                                      await updateDoc(washingtonRef, {
                                        deputyLeader: "",
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
                                        type:
                                          user.uid === item?.user
                                            ? "exit"
                                            : "remove",
                                        notify: true,
                                        user: item?.user,
                                        createdAt: serverTimestamp(),
                                      }
                                    );

                                    message.success(
                                      user.uid === item?.user
                                        ? "Rời khỏi nhóm thành công"
                                        : "Xóa thành viên nhóm thành công"
                                    );
                                    if (user.uid === item?.user) {
                                      onCancel();
                                      router.push("/chat/group");
                                    }
                                  })
                                  .catch((err) => {
                                    message.error(
                                      user.uid === item?.user
                                        ? "Rời khỏi nhóm thất bại"
                                        : "Xóa thành viên nhóm thất bại"
                                    );
                                  });
                              }
                            }}
                            className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5 text-left text-black`}
                          >
                            {user.uid === author?.userId
                              ? "Rời nhóm"
                              : "Xóa khỏi nhóm"}
                          </button>
                        </div>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {type === "request" && (
          <div>
            {about?.requestList
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
                              : "/dumuc/avatar.png"
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
                      <div>
                        <button
                          onClick={async () => {
                            const washingtonRef = doc(
                              db,
                              "chat-groups",
                              search.get("groupId")
                            );
                            await updateDoc(washingtonRef, {
                              member: arrayUnion({
                                user: item?.user,
                                createdBy: user?.uid,
                              }),
                              requestList: arrayRemove({
                                user: item?.user,
                              }),
                            }).then(() => {
                              onCancel();
                            });
                          }}
                          className="cursor-pointer bg-indigo-600 text-white px-[10px] font-semibold border border-indigo-600 hover:bg-white hover:text-indigo-600 "
                        >
                          Phê duyêt
                        </button>
                        <button
                          onClick={async () => {
                            const washingtonRef = doc(
                              db,
                              "chat-groups",
                              search.get("groupId")
                            );
                            await updateDoc(washingtonRef, {
                              requestList: arrayRemove({
                                user: item?.user,
                              }),
                            }).then(() => {
                              onCancel();
                            });
                          }}
                          className="cursor-pointer bg-[#C82027] text-white px-[10px] font-semibold  border border-[#C82027] hover:bg-white hover:text-[#C82027] ml-2 "
                        >
                          Hủy bỏ
                        </button>
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
