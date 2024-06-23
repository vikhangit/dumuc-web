"use client";
import React, { useRef, useState } from "react";
import { Modal, message } from "antd";
import { uploadImage } from "@apis/other";
import Image from "next/image";
import { Spinner } from "flowbite-react";
import { IoImageOutline, IoSend } from "react-icons/io5";
import { useWindowSize } from "@hooks/useWindowSize";
import { IoMdCloseCircle } from "react-icons/io";

const FeedCommentReplyModal = ({
  setIsCommentModal,
  onCreateReply,
  replyToName,
  commentId,
  onCallback,
  user,
}) => {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [photos, setPhotos] = useState([]);
  const [loadingImage, setLoadingImage] = useState(false);
  const [focusComment, setFocusComment] = useState(false);
  const sizes = useWindowSize();
  const refImage = useRef();

  const handleChange = () => (e) => {
    setFocusComment(true);
    setLoadingImage(true);
    if (e?.target?.files) {
      let array = [];
      for (let index = 0; index < e?.target?.files?.length; index++) {
        array.push(e?.target?.files[index]);
      }
      let newPhoto = [];
      array.map((x) => {
        uploadImage(x, user?.accessToken).then((data) => {
          newPhoto.push(`${data?.url}`);
          setPhotos([...photos, ...newPhoto]);
        });
      });
    }
    setLoadingImage(false);
  };
  return (
    <>
      <div className="flex justify-between w-full mt-4">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          src={user?.photoURL || "/dumuc/avatar.jpg"}
          alt=""
          className="rounded-full w-8 h-8"
        />
        <div
          className={`w-[calc(100%-40px)] border border-gray-300 rounded-lg p-2.5 bg-gray-100 ${
            !focusComment && "flex"
          }`}
        >
          <textarea
            value={body}
            onClick={() => setFocusComment(true)}
            onChange={(e) => {
              setBody(e.target.value);
              // if (e.target.value === '') {
              //     setBodyError('Vui lòng nhập bình luận!')
              // } else {
              //   setBodyError('')
              // }
            }}
            id="message"
            rows={focusComment ? "2" : "1"}
            class="block w-full p-0 text-sm text-gray-900 border-0 shadow-none bg-gray-100"
            style={{
              boxShadow: "none",
              resize: "none",
            }}
            placeholder="Bạn đang nghĩ gì?"
          />
          <div className="flex justify-end gap-2">
            <label onClick={() => refImage.current.click()}>
              <IoImageOutline size={24} color="rgb(107 114 128)" />
            </label>
            {focusComment && (
              <button
                onClick={() => {
                  setLoading(true);
                  let values = {};
                  values.body = body;
                  values.replyToName = replyToName;
                  values.commentId = commentId;
                  values.photos = photos;
                  if (body === "" && photos.length === 0) {
                    message.error("Vui lòng nhập bình luận hoặc hình ảnh");
                    return;
                  } else {
                    onCreateReply(values, () => {
                      setLoading(false);
                      setIsCommentModal(false);
                      setBody("");
                      message.success("Đăng bình luận thành công");
                      setBody("");
                      setPhotos([]);
                      onCallback();
                    });
                  }
                }}
              >
                <IoSend size={20} color="rgb(79 70 229)" />
              </button>
            )}
            <input
              type="file"
              id="comment"
              ref={refImage}
              className="hidden"
              multiple
              onChange={handleChange()}
            />
          </div>
        </div>
      </div>
      {photos.length > 0 && (
        <div
          className={`relative grid grid-cols-2 sm:grid-cols-3 ${
            sizes.width > 410 ? "h-40" : sizes.width > 350 ? "h-36" : "h-28"
          } overflow-y-auto justify-center items-center gap-2 ${
            photos.length > 0 && "mt-5"
          } scroll-quick-post pr-2`}
        >
          {photos?.map((photo, index) => (
            <div
              key={index}
              className={`w-full relative ${
                sizes.width > 410 ? "h-36" : sizes.width > 350 ? "h-32" : "h-24"
              }`}
            >
              <button
                onClick={() => {
                  photos.splice(index, 1);
                  setPhotos([...photos]);
                }}
                className="absolute top-1.5 right-1.5"
              >
                <IoMdCloseCircle size={20} color="red" />
              </button>
              <Image
                alt=""
                width={0}
                height={0}
                sizes="100vw"
                src={photo}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          ))}
          {photos.length > 0 && (
            <button
              for={`comment`}
              htmlFor="comment"
              onClick={() => refImage.current.click()}
              className="cursor-pointer rounded-md bg-gray-200 rounded-md hover:bg-gray-300 flex justify-center items-center"
            >
              {loadingImage ? (
                <Spinner />
              ) : (
                <div
                  className={`flex  justify-center items-center flex-col  ${
                    sizes.width > 410
                      ? "h-36"
                      : sizes.width > 350
                      ? "h-32"
                      : "h-24"
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
                  Thêm ảnh
                </div>
              )}
            </button>
          )}
          <div className="w-full h-full flex justify-center items-center">
            {loadingImage && <Spinner />}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedCommentReplyModal;
