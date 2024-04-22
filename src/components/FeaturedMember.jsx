"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserFollow,
  createUserToFollowerList,
  deleteUserFollow,
  deleteUserInFollowerList,
  getProfile,
  updateProfile,
} from "@apis/users";
import { getAuthorStatistics } from "@apis/posts";
import { message } from "antd";
import Image from "next/image";
import moment from "moment";
import { Modal } from "flowbite-react";
import { useWindowSize } from "@hooks/useWindowSize";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const FeaturedMember = ({ items, limit }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [setUser, updating, error] = useUpdateProfile(auth);
  const [showModal, setShowModal] = useState(false);
  const sizes = useWindowSize();
  const [authorStatistics, setAuthorStatistics] = useState();
  const [usingUser, setUsingUser] = useState();
  useEffect(() => {
    (async () => {
      try {
        const dataCall = await getProfile(user?.accessToken);
        setUsingUser(dataCall);
      } catch (e) {}
    })();
  }, [user]);

  const Info = () => {
    return (
      <Modal
        dismissible
        show={showModal}
        onClose={() => setShowModal(false)}
        style={{
          padding: sizes.width > 369 ? 4 : 0,
        }}
        className="text-sm font-semibold"
      >
        <Modal.Header className="bg-[#c80000] bg-opacity-60 rounded-b-xl justify-center [&>h3]:text-white [&>h3]:mx-auto [&>h3]:text-base [&>h3]:sm:text-xl [&>button]:ml-0 [&>button]:text-white">
          Thống kê chi tiết
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-end gap-x-3 border-b-2 py-2 border-dashed border-[#c80000] text-[#c80000] font-semibold">
            <div
              className={`${
                sizes.width > 369 ? "basis-1/2" : "basis-1/3"
              } text-sm sm:text-lg font-semibold`}
            >
              Dumuc.me!
            </div>
            <div
              className={`${
                sizes.width > 369 ? "basis-1/4" : "basis-1/3"
              }  sm:px-4 text-center text-xs sm:text-sm font-semibold`}
            >
              Feeds
            </div>
            <div
              className={`${
                sizes.width > 369 ? "basis-1/4" : "basis-1/3"
              } sm:px-4 text-center text-xs sm:text-sm font-semibold`}
            >
              Forums
            </div>
          </div>
          <div className="flex py-4 mt-2 gap-x-3 items-center border-b border-gray-500">
            <div
              className={`${
                sizes.width > 369 ? "basis-1/2" : "basis-1/3"
              } text-sm sm:text-lg font-semibold`}
            >
              Thích
            </div>
            <div
              className={`${
                sizes.width > 369 ? "basis-1/4" : "basis-1/3"
              } sm:px-4 flex justify-center`}
            >
              <span className="text-center py-1 sm:py-2 w-full bg-white shadow shadow-gray-500 rounded-full text-xs sm:text-sm font-semibold">
                {authorStatistics?.totalLikesFeeds}
              </span>
            </div>
            <div
              className={`${
                sizes.width > 369 ? "basis-1/4" : "basis-1/3"
              } sm:px-4 flex justify-center`}
            >
              <span className="text-center py-1 sm:py-2 w-full bg-white shadow shadow-gray-500 rounded-full text-xs sm:text-sm font-semibold">
                {authorStatistics?.totalLikesPosts}
              </span>
            </div>
          </div>
          <div className="flex py-4 mt-2 gap-x-3 items-center border-b border-gray-500">
            <div
              className={`${
                sizes.width > 369 ? "basis-1/2" : "basis-1/3"
              } text-sm sm:text-lg font-semibold`}
            >
              Bình luận
            </div>
            <div
              className={`${
                sizes.width > 369 ? "basis-1/4" : "basis-1/3"
              } sm:px-4 flex justify-center`}
            >
              <span className="text-center py-1 sm:py-2 w-full bg-white shadow shadow-gray-500 rounded-full text-xs sm:text-sm font-semibold">
                {authorStatistics?.totalCommentsFeeds}
              </span>
            </div>
            <div
              className={`${
                sizes.width > 369 ? "basis-1/4" : "basis-1/3"
              } sm:px-4 flex justify-center`}
            >
              <span className="text-center py-1 sm:py-2 w-full bg-white shadow shadow-gray-500 rounded-full text-xs sm:text-sm font-semibold">
                {authorStatistics?.totalCommentsPosts}
              </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="bg-white px-2 sm:px-4">
      {items &&
        items?.map((item, index) => {
          if (index < limit) {
            return (
              <div
                key={index}
                class={`flex justify-between items-center sm:gap-x-4 py-3 ${
                  index !== 0 ? "border-t" : "border-0"
                } border-gray-400`}
              >
                <Link href={``}>
                  <div class="flex items-center gap-x-2">
                    <div class="flex-shrink-0">
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        class="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                        src={item?.photo ? item?.photo : "/dumuc/avatar.png"}
                        alt={item?.name}
                      />
                    </div>
                    <div className="md:flex-1 md:min-w-0 text-sm font-medium text-gray-900">
                      <div className="text-sm sm:text-base font-medium text-[#363535]">
                        {item?.name}
                      </div>
                      <div className="text-xs sm:text-sm mt-1 text-[#747272] mb-3">
                        Ngày tham gia:{" "}
                        <span className="">
                          {moment(item?.createdAt)?.format("DD/MM/YYYY")}
                        </span>
                      </div>
                      {user?.email ? (
                        usingUser?.follows
                          ?.map((x) => x?.authorId)
                          ?.includes(item?.authorId) ? (
                          <button
                            //unfollow
                            key={item?.authorId}
                            onClick={() => {
                              deleteUserFollow(
                                {
                                  authorId: item?.authorId,
                                },
                                user?.accessToken
                              ).then(async (result) => {
                                console.log(result);
                                //update recoil
                                deleteUserInFollowerList(
                                  {
                                    authorUserId: item?.userId,
                                  },
                                  user?.accessToken
                                )
                                  .then((e) => console.log(e))
                                  .catch((e) => console.log(e));
                                const dataCall = await getProfile(
                                  user?.accessToken
                                );
                                setUsingUser(dataCall);
                                message.success("Đã bỏ theo dõi thành công");
                              });
                            }}
                            type="button"
                            class="px-3 py-1 w-[108px] text-xs font-medium text-center text-white bg-[#c80000] rounded-full hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                          >
                            Đang theo dõi
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              createUserFollow(
                                {
                                  authorId: item?.authorId,
                                },
                                user?.accessToken
                              ).then(async (result) => {
                                console.log(result);
                                await createUserToFollowerList(
                                  {
                                    authorUserId: item?.userId,
                                  },
                                  user?.accessToken
                                )
                                  .then((e) => console.log(e))
                                  .catch((e) => console.log(e));
                                const dataCall = await getProfile(
                                  user?.accessToken
                                );
                                setUsingUser(dataCall);
                                message.success("Đã theo dõi thành công.");
                              });
                            }}
                            type="button"
                            class="px-3 py-1 w-[75px] text-xs font-medium text-center text-white bg-[#c80000] rounded-full hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                          >
                            Theo dõi
                          </button>
                        )
                      ) : (
                        <button
                          onClick={() => {
                            router.push(`/auth?url_return=${currentUrl}`);
                          }}
                          type="button"
                          class="px-3 py-1 w-[75px] text-xs font-medium text-center text-white bg-[#c80000] rounded-full hover:brightness-110 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                          Theo dõi
                        </button>
                      )}
                    </div>
                  </div>
                </Link>
                <div className="flex flex-col justify-center">
                  <button
                    className="text-gray-700 text-[10px] sm:text-xs md:text-sm mt-2 text-center bg-white shadow shadow-gray-400 rounded-full py-0.5 px-1.5 sm:px-3 cursor-ponter relative z-50"
                    onClick={async () => {
                      //getAuthorStatistics

                      await getAuthorStatistics({
                        authorId: item?.authorId,
                      })
                        .then((result) => {
                          setAuthorStatistics(result);
                        })
                        .then(() => {
                          setShowModal(true);
                        });
                    }}
                  >
                    Xem thống kê
                  </button>
                </div>
              </div>
            );
          }
        })}
      <Info />
    </div>
  );
};

export default FeaturedMember;
