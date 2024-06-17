import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdMore } from "react-icons/io";
import CommentForm from "./CommentForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import { message } from "antd";
import { MdFormatQuote } from "react-icons/md";
import { useRouter } from "next/navigation";
import { getPost, updateComment } from "@apis/posts";
import ModalImageZoom from "@components/ModalImageZoom";

export default function SingleComment({
  item,
  post,
  setComments,
  qoute,
  setQoute,
  onCallback,
  user,
}) {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [editItem, setEditItem] = useState();
  const router = useRouter();

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
  const url_return = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/forum/post/${post.slug}/${post.postId}`;
  const [showImage, setShowImage] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [indexImage, setIndexImage] = useState(0);
  return (
    <div
      className="flex flex-row w-full mt-2"
      key={item?.commentId}
      id={item?.commentId}
    >
      {editItem ? (
        <div className="w-full">
          <div className="flex justify-end text-xs font-medium text-indigo-800 mb-2">
            <button
              className="hover:underline"
              onClick={() => {
                setEditItem();
                setQoute([]);
                onCallback();
              }}
            >
              Hủy
            </button>
          </div>
          <CommentForm
            parentId={item?.commentId}
            post={post}
            replyToName={item?.user?.name}
            setComments={setComments}
            setShowReplyBox={setShowReplyBox}
            setQoute={setQoute}
            qoute={qoute}
            showReplyBox={showReplyBox}
            root={false}
            onCallback={onCallback}
            item={editItem}
            completed={() => {
              setEditItem();
              onCallback();
            }}
            user={user}
          />
        </div>
      ) : (
        <div className="flex justify-between my-2 w-full">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="w-10 h-10 rounded-full"
            src={item?.user?.photo ? item?.user?.photo : "/dumuc/avatar.png"}
            alt={item?.user?.name}
          />
          <div className="mx-2 w-[calc(100%-45px)]">
            <div className="relative">
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
                  className={`w-full grid grid-cols-3 gap-2 mt-4 ${
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
                  <div className="absolute hidden group-hover:flex flex-col top-full -right-10 z-50 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[100px] rounded p-1">
                    <Link
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        updateComment(
                          {
                            ...item,
                            isReport: true,
                            postId: post?.postId,
                            commentId: item?.commentId,
                          },
                          user?.accessToken
                        ).then((result) => {
                          message.success(
                            "Chúng tôi sẽ xem xét báo cáo của bạn về bình luận này. Xin cảm ơn!!!"
                          );
                          getPost({
                            postId: post?.postId,
                          });
                          onCallback();
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
                <div className="">
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
                    post={post}
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
