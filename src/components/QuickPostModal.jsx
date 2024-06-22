"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { Spinner } from "flowbite-react";
import { Modal, Input, Tag, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
import { uploadImage } from "apis/other";
import { createFeedByUser, updateFeedByUser } from "@apis/feeds";
import { updateProfile, getProfile } from "@apis/users";
import { CaretDownOutlined } from "@ant-design/icons";
import { IoMdCloseCircle } from "react-icons/io";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import dynamic from "next/dynamic";
import ModalWating from "./Dumuc/ModalWating";
import { useWindowSize } from "@hooks/useWindowSize";
const CustomEditor = dynamic(
  () => {
    return import("./editorjs/CustomCKEditor");
  },
  { ssr: false }
);
export default function QuickPostModal({
  user,
  usingUser,
  visible,
  setEmotion,
  onCancel,
  emotion,
  setShowPostEmotion,
  onCallback,
  feed,
  callData,
}) {
  const [showImage, setShowImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const refImage = useRef();
  const [description, setDescription] = useState();
  const [descriptionError, setDescriptionError] = useState();
  const [photos, setPhotos] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const sizes = useWindowSize();
  const handleChange = (e) => {
    setLoadingImage(true);
    if (e?.target?.files) {
      let array = [];
      for (let index = 0; index < e?.target?.files?.length; index++) {
        array.push(e?.target?.files[index]);
      }
      let newPhoto = [];
      array.map((x) => {
        uploadImage(x, user?.accessToken)
          .then((data) => {
            newPhoto.push({
              type: x?.type === "video/mp4" ? "video" : "image",
              url: `${data?.url}`,
            });
            setPhotos([...photos, ...newPhoto]);
            setLoadingImage(false);
          })
          .catch((err) => {
            message.error("Video có kích thước quá lớn");
            setLoadingImage(false);
          });
      });
    }
  };
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const [active, setActive] = useState();
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags?.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );

    return (
      <span
        key={tag}
        style={{
          display: "inline-block",
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = tags?.map(forMap);
  const tagPlusStyle = {
    borderStyle: "dashed",
    marginTop: 5,
  };
  useEffect(() => {
    if (feed) {
      setDescription(feed?.description);
      setPhotos(feed?.photos);
      setEmotion(feed?.emotion);
      setTags(feed?.tags);
      setActive(feed?.isPrivate == true ? 0 : 1);
      setShowImage(
        feed?.photos ? (feed?.photos?.length > 0 ? true : false) : false
      );
    }
  }, [feed]);
  const save = () => {
    setLoading(true);
    let item = {
      emotion,
      photos,
      tags,
      isPrivate: JSON.parse(localStorage.getItem("isPrivate"))
        ? JSON.parse(localStorage.getItem("isPrivate")) === "0"
          ? true
          : false
        : true,
    };

    if (description === undefined || description === "") {
      setDescriptionError("Vui lòng nhập mô tả chi tiết!");
      setLoading(false);
      return;
    } else {
      item.description = description;
    }
    if (feed) {
      updateFeedByUser(
        {
          ...feed,
          ...item,
          feedId: feed?.feedId,
          isPrivate: JSON.parse(localStorage.getItem("isPrivate"))
            ? JSON.parse(localStorage.getItem("isPrivate")) === "0"
              ? true
              : false
            : feed?.isPrivate,
        },
        user?.accessToken
      )
        .then((result) => {
          updateProfile(
            {
              ...usingUser,
              photos:
                usingUser?.photos?.length > 0
                  ? [...usingUser?.photos, ...photos]
                  : [...photos],
              userId: usingUser?.userId,
            },
            user?.accessToken
          );
          callData(feed?.feedId);
          setLoading(false);
          onCancel();
          message.success("Sửa tin thành công");
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      createFeedByUser(item, user?.accessToken)
        .then((result) => {
          updateProfile(
            {
              ...usingUser,
              photos:
                usingUser?.photos?.length > 0
                  ? [...usingUser.photos, ...photos]
                  : [...photos],
            },
            user?.accessToken
          );
          setLoading(false);
          setPhotos([]);
          setDescription();
          setEmotion("");
          setTags([]);
          setActive(0);
          onCancel();
          onCallback();
          message.success("Đăng tin thành công");
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
    localStorage.removeItem("isPrivate");
  };
  console.log(user);
  return (
    <>
      <Modal
        visible={visible}
        title={`Đăng tin`}
        onCancel={() => {
          onCancel();
          setLoading(false);
        }}
        destroyOnClose={true}
        footer={
          <div>
            <div
              className={`flex justify-between items-center border border-gray-400 rounded-md ${
                sizes.width > 300 ? "px-2 sm:px-3 " : "px-1.5"
              }  mb-2 py-3`}
            >
              <div className="font-bold text-xs sm:text-sm">
                Thêm vào bài viết của bạn
              </div>
              <div className="flex gap-x-2 sm:gap-x-3">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/icons/stack.png"
                  alt=""
                  className="w-5 sm:w-6 h-5 sm:h-6 cursor-pointer"
                  onClick={() => setShowImage(true)}
                />
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/icons/grind.png"
                  alt=""
                  className="w-5 sm:w-6 h-5 sm:h-6  cursor-pointer"
                  onClick={() => {
                    setShowPostEmotion(true);
                  }}
                />
              </div>
            </div>
            <div className="w-full">
              {loading ? (
                <button
                  disabled
                  type="button"
                  className={`text-white bg-[#c80000] w-full hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full`}
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
                  Đang đăng...
                </button>
              ) : (
                <button
                  onClick={() => {
                    save();
                  }}
                  type="button"
                  class={`w-ful text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full`}
                >
                  Đăng tin
                </button>
              )}
            </div>
          </div>
        }
        centered
        className="modal-quick-post private"
      >
        <>
          <div class="flex mb-4">
            <div className="flex items-center gap-x-3">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                class="w-10 h-10 rounded-full"
                src={
                  usingUser?.photo?.length > 0
                    ? usingUser?.photo
                    : "/dumuc/avatar.png"
                }
                alt={"avatars"}
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium">
                  {usingUser?.name}{" "}
                  {emotion && emotion.length > 0 ? emotion : ""}
                </p>
                <div className="relative rounded-[6px] mt-1 w-fit">
                  <select
                    className="w-full h-full bg-[#e5e5e5] border-0 text-sm font-medium"
                    value={active}
                    onChange={(e) => {
                      setActive(e.target.value);
                      localStorage.setItem(
                        "isPrivate",
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
                      Riêng tư
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
                      Công khai
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
              </div>
            </div>
          </div>
          <CustomEditor
            initialData={description}
            setData={setDescription}
            placeholder={`${usingUser?.name} ơi bạn đang nghĩ gì?`}
          />
          {descriptionError !== "" && (
            <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
              {descriptionError}
            </p>
          )}
          {showImage && (
            <div>
              <div className="mt-5">
                <div className="flex justify-end mb-3">
                  <button
                    onClick={() => setShowImage(false)}
                    className="text-xs font-semibold sm:text-sm hover:underline text-blue-600"
                  >
                    Ẩn
                  </button>
                </div>
              </div>
              <div
                className={`relative rounded-md p-3 w-full border border-gray-400 mt-2 mb-4 ${
                  photos.length < 0 && "h-40 sm:h-72"
                }`}
              >
                {photos.length > 0 && (
                  <div
                    className={`grid  ${"grid-cols-2"}  gap-2 ${
                      sizes.width > 410
                        ? "h-40 sm:h-44"
                        : sizes.width > 350
                        ? "h-32"
                        : "h-24"
                    } overflow-y-auto scroll-quick-post pr-1`}
                    id="photo"
                  >
                    {photos?.map((photo, indexC) => {
                      return (
                        <div
                          key={indexC}
                          className={`rounded-md h-full w-full relative`}
                        >
                          <button
                            onClick={() => {
                              photos.splice(indexC, 1);
                              setPhotos([...photos]);
                            }}
                            className="absolute top-1.5 right-1.5 z-10"
                          >
                            <IoMdCloseCircle size={20} color="red" />
                          </button>
                          <a className="w-full h-full">
                            {photo.type === "video" ? (
                              <video
                                className={`rounded-md w-full ${
                                  photos.length === 1
                                    ? "h-full"
                                    : sizes.width > 410
                                    ? "h-36 sm:h-40"
                                    : sizes.width > 350
                                    ? "h-28"
                                    : "h-20"
                                } `}
                                controls
                                loop
                              >
                                <source src={photo.url} type="video/mp4" />
                              </video>
                            ) : (
                              <Image
                                width={0}
                                height={0}
                                style={{
                                  objectFit: "cover",
                                }}
                                sizes="100vw"
                                className={`rounded-md w-full ${
                                  photos.length === 1
                                    ? "h-full"
                                    : sizes.width > 410
                                    ? "h-36 sm:h-40"
                                    : sizes.width > 350
                                    ? "h-28"
                                    : "h-20"
                                } `}
                                src={photo.url}
                                alt=""
                              />
                            )}
                          </a>
                        </div>
                      );
                    })}
                    {photos.length > 0 && (
                      <button
                        for={`photo`}
                        htmlFor="photo"
                        onClick={() => refImage.current.click()}
                        className="cursor-pointer px-3 py-1 rounded-md bg-gray-200 rounded-md hover:bg-gray-300 flex justify-center items-center"
                      >
                        <div className="w-full h-full flex justify-center items-center ">
                          {loadingImage ? (
                            <Spinner />
                          ) : (
                            <div
                              className={`flex  justify-center items-center flex-col ${
                                sizes.width > 410
                                  ? "h-36 sm:h-40"
                                  : sizes.width > 350
                                  ? "h-28"
                                  : "h-20"
                              } `}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 4.5v15m7.5-7.5h-15"
                                />
                              </svg>
                              {loadingImage ? <Spinner /> : "Thêm ảnh/video"}
                            </div>
                          )}
                        </div>
                      </button>
                    )}
                  </div>
                )}

                <input
                  type="file"
                  id={`photo`}
                  ref={refImage}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  hidden
                  multiple
                />
                {photos.length === 0 && (
                  <button
                    for={`photo`}
                    htmlFor="photo"
                    onClick={() => refImage.current.click()}
                    className="cursor-pointer flex h-full w-full justify-center items-center"
                  >
                    <div className="w-full h-[200px] flex justify-center items-center bg-gray-200 rounded-md hover:bg-gray-300">
                      {loadingImage ? (
                        <div className="w-full h-full flex">
                          <svg
                            aria-hidden="true"
                            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                          {loadingImage ? <Spinner /> : "Thêm ảnh/video"}
                        </div>
                      )}
                    </div>
                  </button>
                )}
              </div>
              {/* <p class="text-xs sm:text-sm text-gray-500">PNG, JPG (Tối đa 5MB).</p> */}
            </div>
          )}
          <div>
            <label
              for="default-input"
              class="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              #hashtag
            </label>

            <TweenOneGroup
              enter={{
                scale: 0.8,
                opacity: 0,
                type: "from",
                duration: 100,
              }}
              onEnd={(e) => {
                if (e.type === "appear" || e.type === "enter") {
                  e.target.style = "display: inline-block";
                }
              }}
              leave={{
                opacity: 0,
                width: 0,
                scale: 0,
                duration: 200,
              }}
              appear={false}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
          {inputVisible ? (
            <Input
              size={"small"}
              ref={inputRef}
              type="text"
              style={{
                width: "50%",
                borderRadius: 10,
              }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          ) : (
            <Tag onClick={showInput} style={tagPlusStyle}>
              <PlusOutlined /> New Tag
            </Tag>
          )}
        </>
      </Modal>
      <ModalWating openModal={loadingImage} setOpenModal={setLoadingImage} />
    </>
  );
}
