import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoMdMore } from "react-icons/io";
import CommentForm from "./CommentForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import { message } from "antd";
import { MdFormatQuote } from "react-icons/md";
import { useRouter } from "next/navigation";
import { getStory, updateCommentStories } from "@apis/feeds";
import dynamic from "next/dynamic";
const ModalImageZoom = dynamic(
  () => {
    return import("@components/ModalImageZoom");
  },
  { ssr: false }
);

export default function SingleComment({
  item,
  feed,
  setComments,
  qoute,
  setQoute,
  onCallback,
}) {
  const [user] = useAuthState(auth);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [editItem, setEditItem] = useState();
  const router = useRouter();
  const [showImage, setShowImage] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [indexImage, setIndexImage] = useState(0);
  const time = () => {
    moment.locale("vi");
    return moment(item.createdAt)
      .fromNow()
      .replace("ago", "")
      .replace("days", "ngày")
      .replace("day", "ngày")
      .replace("a ", "1 ")
      .replace("month", "tháng")
      .replace("year", "năm");
  };
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState(0);
  useEffect(() => {
    setFormHeight(formRef.current?.offsetHeight);
  });
  return (
    <div
      className="flex flex-row w-full mt-2"
      key={item?.commentId}
      id={item?.commentId}
    >
      {item?.children && item?.children.length > 0 && (
        <div className="w-[1px] h-[calc(100%-39px)] sm:h-[calc(100%-48px)] xl:h-[calc(100%-55px)] absolute top-6 sm:top-8 xl:top-10 left-5 bg-black"></div>
      )}
      {editItem ? (
        <div className="w-full relative py-2">
          <div className="flex justify-end text-xs font-medium text-indigo-800 mb-2 z-30 absolute -top-[15px] right-[10px]">
            <button
              className="hover:underline"
              onClick={() => {
                setEditItem();
                setQoute([]);
              }}
            >
              Hủy
            </button>
          </div>
          <CommentForm
            parentId={item?.commentId}
            feed={feed}
            replyToName={item?.user?.name}
            setComments={setComments}
            setShowReplyBox={setShowReplyBox}
            setQoute={setQoute}
            qoute={qoute}
            showReplyBox={showReplyBox}
            root={false}
            onCallback={onCallback}
            item={editItem}
            setEditItem={setEditItem}
          />
        </div>
      ) : (
        <div className="flex justify-between my-2 w-full">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="w-10 h-10 rounded-full overflow-hidden relative z-30"
            src={item?.user?.photo ? item?.user?.photo : "/dumuc/avatar.png"}
            alt={item?.user?.name}
          />
          <div className="mx-2 w-[calc(100%-45px)]">
            <div className="relative">
              {showReplyBox && (
                <div
                  className={`absolute w-[1px] -left-[27px] top-0 bg-black z-20`}
                  style={{
                    height: `calc(100% - ${formHeight}px + 45px)`,
                  }}
                ></div>
              )}
              {item?.qoute && item?.qoute.length > 0 && (
                <div className="mb-[10px]">
                  {item?.qoute.map((item, index) => {
                    return (
                      <Link
                        key={index}
                        className="bg-gray-200 flex mt-[5px] px-[10px] py-[8px] rounded-[10px] cursor-pointer"
                        href={`#${item.commentId}`}
                      >
                        <div className="w-full border-l-2 border-indigo-800 pl-[10px] ">
                          <MdFormatQuote size={28} className="text-gray-600" />
                          <div className="text-sm font-semibold">
                            {item?.user?.name}
                          </div>
                          <div className="text-sm">{item?.body}</div>
                          <div className="">
                            {item?.photos?.length > 0 && (
                              <div className="italic">[Hình ảnh]</div>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
              <div className="">
                <div className="text-sm font-semibold">{item?.user?.name}</div>
                <div className="text-sm">{item?.body}</div>
              </div>
              {item?.photos?.length > 0 && (
                <div
                  className={`w-full grid grid-cols-3 gap-2 ${
                    item?.photos?.length > 0 && "mb-2 mt-2"
                  }`}
                  id="photo"
                >
                  {item?.photos?.slice(0, 3).map((photo, indexC) => {
                    return (
                      <div key={indexC} className={`rounded-md w-full h-full`}>
                        <a
                          onClick={() => {
                            setShowImage(true);
                            setImageList(item?.photos);
                            setIndexImage(indexC);
                          }}
                          className={`w-full relative cursor-pointer h-full`}
                        >
                          <Image
                            width={0}
                            height={0}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                            sizes="100vw"
                            className="rounded-lg w-full h-full"
                            src={photo}
                            alt={photo}
                          />
                          {item?.photos?.length > 3 &&
                            indexC === item.photos?.slice(0, 3).length - 1 && (
                              <div className="absolute top-0 right-0 bg-black bg-opacity-60 w-full h-full flex justify-center items-center rounded-lg">
                                <p className="text-xl text-white text-center">
                                  +{item?.photos?.length - 3}
                                </p>
                              </div>
                            )}
                        </a>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className="text-sm text-gray-500 flex items-center gap-2 mt-[5px]">
                {time()}
                <button
                  className="text-[#c80000] font-bold cursor-pointer ml-2"
                  type="button"
                  onClick={() => {
                    if (user) {
                      setShowReplyBox(!showReplyBox);
                    } else {
                      router.push("/auth");
                    }
                  }}
                >
                  Phản hồi
                </button>
                <div className="relative cursor-pointer group flex items-center">
                  <IoMdMore size={18} />
                  <div className="absolute hidden group-hover:flex flex-col top-full -right-10 z-[999999] bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[100px] rounded p-1">
                    <Link
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        updateCommentStories(
                          {
                            ...item,
                            isReport: true,
                            feedId: feed?.storyId,
                            commentId: item?.commentId,
                          },
                          user?.accessToken
                        ).then((result) => {
                          message.success(
                            "Chúng tôi sẽ xem xét báo cáo của bạn về bình luận này. Xin cảm ơn!!!"
                          );
                          getStory({
                            storyId: feed?.storyId,
                          });
                        });
                      }}
                      className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                    >
                      Báo cáo
                    </Link>
                    <Link
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        if (!user) {
                          router.push(`/auth?url_return=${url_return}`);
                        } else {
                          if (
                            qoute?.find((x) => x.commentId === item.commentId)
                          ) {
                            message.warning(
                              "Bạn đã trích dẫn bình luận này rồi"
                            );
                          } else {
                            let newArr = qoute || [];
                            newArr?.push(item);
                            setQoute([...newArr]);
                          }
                        }
                      }}
                      className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                    >
                      {qoute?.find((x) => x.commentId === item.commentId)
                        ? "Đã trích dẫn"
                        : "Trích dẫn"}
                    </Link>
                    {user?.email === item?.user?.email && (
                      <Link
                        href={``}
                        onClick={(e) => {
                          e.preventDefault();
                          setEditItem(item);
                        }}
                        className="hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-0.5"
                      >
                        Sửa
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              {showReplyBox && (
                <div className="relative" ref={formRef}>
                  <div className="w-[50px] h-[1px] absolute top-[45px] -left-[27px] bg-black"></div>
                  <div className="flex justify-end text-xs font-medium text-indigo-800 mb-2">
                    <button
                      className="hover:underline"
                      onClick={() => setShowReplyBox(false)}
                    >
                      Đóng
                    </button>
                  </div>
                  <CommentForm
                    parentId={item?.commentId}
                    feed={feed}
                    replyToName={item?.user?.name}
                    setComments={setComments}
                    setShowReplyBox={setShowReplyBox}
                    setQoute={setQoute}
                    qoute={qoute}
                    showReplyBox={showReplyBox}
                    root={false}
                    onCallback={onCallback}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <ModalImageZoom
        openImage={showImage}
        setOpenImage={setShowImage}
        imageList={imageList}
        index={indexImage}
      />
    </div>
  );
}
