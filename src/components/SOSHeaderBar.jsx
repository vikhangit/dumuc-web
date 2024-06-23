"use client";
import React, { useState, useEffect } from "react";
import { Modal } from "flowbite-react";
import Image from "next/image";
import { message } from "antd";
import { register } from "swiper/element/bundle";
import { auth, firestore } from "@utils/firebase";
import _ from "lodash";
import moment from "moment";
import {
  getSossByUser,
  getHelperSossByUser,
  completeSosHelper,
  cancelSosHelper,
  completeConfirmSosHelper,
} from "@apis/soss";
const Timer = dynamic(
  () => {
    return import("@components/Timer");
  },
  { ssr: false }
);
import { DateTimeLog } from "@utils/dateFormat";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ModalRating from "@components/ModalRating";
import TimerHome from "./TimmerHome";
import { useAuthState } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";
export default function SOSHeaderBar() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [user] = useAuthState(auth);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [soss, setSoss] = useState([]);
  const [helperSoss, setHelperSoss] = useState([]);
  const [sos, setSos] = useState();
  const [lastLoggedIn, setLastLoggedIn] = useState("");
  const [openSOSModal, setOpenSOSModal] = useState();
  const [openHelperModal, setOpenHelperModal] = useState();
  const [showRating, setShowRating] = useState(false);
  const [valueRating, setValueRating] = useState();
  useEffect(() => {
    register();
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({
          lat: latitude,
          lng: longitude,
        });
      }
    );
  }, []);
  useEffect(() => {
    if (user) {
      getSossByUser(user?.accessToken).then((soosData) =>
        setSoss(
          soosData
            .filter((x) => x.status === 0)
            .map((item) => {
              return {
                ...item,
                type: "sos",
              };
            })
        )
      );
      getHelperSossByUser(user?.accessToken).then((helperSossData) =>
        setHelperSoss(
          helperSossData
            .filter((x) => x.status === 0)
            .map((item) => {
              return {
                ...item,
                type: "helper",
              };
            })
        )
      );
      setLoadingSkeleton(false);
    }
  }, [user]);

  const onDirectionClick = (userLocation, sosLocation) => {
    // window.open(
    //   "https://www.google.com/maps/dir/?api=1&origin=" +
    //     userLocation.lat +
    //     "," +
    //     userLocation.lng +
    //     "&destination=" +
    //     sosLocation.lat +
    //     "," +
    //     sosLocation.lng +
    //     "&travelmode=driving"
    // );
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // in kilometers
    const degToRad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance.toFixed(2); // Return the distance with 2 decimal places
  };

  const onCompleted = (item, accessToken) => {
    completeSosHelper(
      {
        sosId: item?.sosId,
        helperId: item?.helper?.sossHelpId,
      },
      accessToken
    )
      .then((result) => {
        message.success(result.message);
        setOpenHelperModal(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingSubmit(false);
      });
  };

  const onCancelled = (item, accessToken) => {
    cancelSosHelper(
      {
        sosId: item?.sosId,
        helperId: item?.helper?.sossHelpId,
      },
      accessToken
    )
      .then((result) => {
        message.success(result.message);
        setOpenHelperModal(false);
      })
      .catch((error) => {
        console.error(error);
        setLoadingSubmit(false);
      });
  };

  const onCompleteConfirmed = (item, accessToken, confirm) => {
    completeConfirmSosHelper(
      {
        sosId: item?.sosId,
        helperId: item?.sossHelpId,
        isCompletedConfirm: confirm === "YES" ? true : false,
      },
      accessToken
    )
      .then((result) => {
        message.success(result.message);
        onCallback();
      })
      .catch((error) => {
        console.error(error);
        setLoadingSubmit(false);
      });
  };

  if (user) {
    return (
      <div className={`w-full flex-col justify-between py-3 md:flex-row`}>
        <div className="h-full">
          {!loadingSkeleton ? (
            <div className="relative">
              <div className="relative z-10" id="sos-header">
                <Swiper
                  spaceBetween={20}
                  navigation={true}
                  modules={[Navigation]}
                  slidesPerView={1}
                  loop={true}
                  breakpoints={{
                    376: {
                      slidesPerView: 1,
                    },
                    720: {
                      slidesPerView: 2,
                    },
                    1080: {
                      slidesPerView: 3,
                    },
                    1500: {
                      slidesPerView: 4,
                    },
                    2000: {
                      slidesPerView: 5,
                    },
                  }}
                  className="w-full h-full"
                >
                  {[...soss, ...helperSoss].map((item, index) => {
                    if (item?.type === "sos") {
                      //S.O.S đã gửi
                      return (
                        <SwiperSlide
                          key={index}
                          className="cursor-pointer border shadow-md p-2 bg-white rounded"
                        >
                          <div
                            onClick={async () => {
                              setSos(item);
                              setOpenSOSModal(true);

                              //check sos expired
                              let end = moment(
                                DateTimeLog(item?.createdAt, item?.deadline),
                                "DD/MM/YYYY hh:mm:ss"
                              );
                              if (!end.isAfter(new moment())) {
                                expireSos({
                                  sosId: item?.sosId,
                                })
                                  .then((result) => {})
                                  .catch((error) => {
                                    console.error(error);
                                    setLoadingSubmit(false);
                                  });
                              }
                            }}
                          >
                            <div className="flex items-center justify-center  space-x-4 h-auto">
                              <div class="flex-shrink-0">
                                <a
                                  href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
                                >
                                  <Image
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    class="w-10 h-10 rounded-full"
                                    src={
                                      item?.author?.photo
                                        ? item?.author?.photo
                                        : "/dumuc/avatar.jpg"
                                    }
                                    alt={item?.author?.name}
                                  />
                                </a>
                              </div>
                              <div className="md:flex-1 md:min-w-0">
                                <div className="w-full flex justify-between">
                                  <div className="flex">
                                    <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                      {item.categoryObj?.name}
                                    </span>
                                    <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                      {item?.helpers?.length} người giúp
                                    </span>
                                  </div>
                                  <div className="items-center mt-2">
                                    <TimerHome
                                      item={item}
                                      end={DateTimeLog(
                                        item.createdAt,
                                        item.deadline
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="flex mt-2">
                                  <svg
                                    class="w-3 h-3 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 17 21"
                                  >
                                    <g
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                    >
                                      <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                      <path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z" />
                                    </g>
                                  </svg>
                                  <div className="ml-1 line-clamp-1 text-xs font-medium leading-tight text-gray-900">
                                    {item?.address}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    } else {
                      //S.O.S đã tiếp nhận giúp đỡ
                      return (
                        <SwiperSlide
                          key={index}
                          className="cursor-pointer border shadow-md p-2 bg-white rounded"
                        >
                          <div
                            onClick={async () => {
                              setSos(item);
                              setOpenHelperModal(true);

                              //lastLoggedIn
                              await firestore
                                .collection("users")
                                .doc(item?.userId)
                                .get()
                                .then((doc) => {
                                  let lastLoggedIn = doc.data()?.lastLoggedIn;
                                  if (lastLoggedIn) {
                                    setLastLoggedIn(
                                      moment(lastLoggedIn.toDate()).fromNow()
                                    );
                                  } else {
                                    setLastLoggedIn("");
                                  }
                                });

                              //check sos expired
                              let end = moment(
                                DateTimeLog(item?.createdAt, item?.deadline),
                                "DD/MM/YYYY hh:mm:ss"
                              );
                              if (!end.isAfter(new moment())) {
                                expireSos({
                                  sosId: item?.sosId,
                                })
                                  .then((result) => {})
                                  .catch((error) => {
                                    console.error(error);
                                    setLoadingSubmit(false);
                                  });
                              }
                            }}
                          >
                            <div className="flex items-center justify-center space-x-4 h-auto">
                              <div class="flex-shrink-0">
                                <a
                                  href={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
                                >
                                  <Image
                                    width={0}
                                    height={0}
                                    sizes="100vw"
                                    class="w-10 h-10 rounded-full"
                                    src={
                                      item?.author?.photo
                                        ? item?.author?.photo
                                        : "/dumuc/avatar.jpg"
                                    }
                                    alt={item?.author?.name}
                                  />
                                </a>
                              </div>
                              <div className="md:flex-1 md:min-w-0">
                                <div className="w-full flex justify-between">
                                  <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                                    {item.categoryObj?.name}
                                  </span>
                                  <TimerHome
                                    item={item}
                                    end={DateTimeLog(
                                      item.createdAt,
                                      item.deadline
                                    )}
                                  />
                                </div>
                                <div className="flex mt-2">
                                  <svg
                                    class="w-3 h-3 text-gray-500"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 17 21"
                                  >
                                    <g
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                    >
                                      <path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                      <path d="M13.8 12.938h-.01a7 7 0 1 0-11.465.144h-.016l.141.17c.1.128.2.252.3.372L8 20l5.13-6.248c.193-.209.373-.429.54-.66l.13-.154Z" />
                                    </g>
                                  </svg>
                                  <div className="ml-1 line-clamp-1 text-xs font-medium leading-tight text-gray-900">
                                    {item?.address}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
              </div>

              {/* SOS đã gửi */}
              <Modal show={openSOSModal} onClose={() => setOpenSOSModal(false)}>
                <Modal.Header>
                  {sos?.categoryObj?.name}
                  <br />
                  <div className="text-xs text-[#c80000] leading-relaxed">
                    Vị trí: {sos?.address}
                  </div>
                </Modal.Header>
                <Modal.Body className="p-3">
                  <div className="space-y-1">
                    <p className="text-sm leading-relaxed p-1">
                      {sos?.description}
                    </p>
                    <div
                      className={`grid  ${
                        sos?.photos.length === 3
                          ? "grid-rows-4 grid-flow-col"
                          : sos?.photos.length === 2
                          ? "grid-rows-2 grid-cols-2"
                          : "grid-rows-2 grid-cols-1"
                      } gap-2 h-60`}
                    >
                      {sos?.photos?.map((photo, index) => {
                        return (
                          <div
                            className={`rounded-md col-span-1 ${
                              sos?.photos?.length === 3 && index === 0
                                ? "row-span-4"
                                : "row-span-2"
                            } `}
                            key={index}
                          >
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              alt={`Photo}`}
                              src={photo}
                              className="rounded-md h-full w-full object-cover"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="ml-1 flex items-center flex-col sm:flex-row sm:justify-between w-full mb-4">
                      <div className="text-sm text-blue-800 w-full font-semibold pt-4 text-center sm:text-left">
                        Đã có {sos?.helpers?.length} người giúp đỡ
                      </div>
                      <Timer
                        item={sos}
                        end={DateTimeLog(sos?.createdAt, sos?.deadline)}
                        center={true}
                      />
                    </div>
                    {sos?.helpers?.map((helper) => {
                      return (
                        <div
                          key={helper?.sossHelpId}
                          className="p-1 flex flex-col sm:flex-row justify-between"
                        >
                          <div className="flex items-center">
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              class="w-12 h-12 rounded-full"
                              src={
                                helper?.user?.photo
                                  ? helper?.user?.photo
                                  : "/dumuc/avatar.jpg"
                              }
                              alt={helper?.user?.name}
                            />
                            <div className="ml-2">
                              <div className="flex items-center">
                                <div className="text-sm font-medium">
                                  {helper?.user?.name}
                                </div>
                                <div className="text-gray-500 ml-2 text-xs">
                                  Online {helper?.lastLoggedIn}
                                </div>
                              </div>
                              {helper?.isCompleted && (
                                <>
                                  <div className="text-blue-800 flex font-bold text-xs mt-1 ml-1">
                                    <svg
                                      class="w-4 h-4 text-blue-800 mr-1"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 16 12"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5.917 5.724 10.5 15 1.5"
                                      />
                                    </svg>{" "}
                                    Đã xác nhận hoàn thành từ người giúp đỡ
                                  </div>

                                  {helper?.isCompletedConfirm === true && (
                                    <div className="text-blue-800 flex font-bold text-xs mt-1 ml-1">
                                      <svg
                                        class="w-4 h-4 text-blue-800 mr-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 16 12"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M1 5.917 5.724 10.5 15 1.5"
                                        />
                                      </svg>{" "}
                                      Bạn đã xác nhận hoàn thành
                                    </div>
                                  )}

                                  {helper?.isCompletedConfirm === false && (
                                    <div className="text-[#c80000] flex font-bold text-xs mt-1 ml-1">
                                      <svg
                                        class="w-4 h-4 text-[#c80000] mr-1"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 16 12"
                                      >
                                        <path
                                          stroke="currentColor"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M1 5.917 5.724 10.5 15 1.5"
                                        />
                                      </svg>{" "}
                                      Bạn đã từ chối xác nhận hoàn thành
                                    </div>
                                  )}

                                  {helper?.isCompletedConfirm === undefined && (
                                    <>
                                      <div className="flex">
                                        <div
                                          className="bg-[#c80000] text-white text-center w-[110px] font-bold text-xs mt-2 px-2 py-1 rounded-xl hover:scale-105 transition-all cursor-pointer"
                                          onClick={() => {
                                            setShowRating(true);
                                            setValueRating({
                                              ...helper,
                                              sosId: sos?.sosId,
                                            });
                                          }}
                                        >
                                          Xác nhận đúng
                                        </div>
                                        <div
                                          className="text-[#c80000] font-bold text-xs mt-3 ml-3 hover:scale-105 transition-all cursor-pointer"
                                          onClick={() =>
                                            onCompleteConfirmed(
                                              {
                                                ...helper,
                                                sosId: sos?.sosId,
                                              },
                                              user?.accessToken,
                                              "NO"
                                            )
                                          }
                                        >
                                          Chưa đúng rồi!
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </>
                              )}
                              {helper?.isCancelled && (
                                <>
                                  <div className="text-[#c80000] font-bold text-xs mt-1 ml-1">
                                    Đã huỷ
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="pt-2 sm:pt-1">
                            <div
                              className="bg-[#c80000] flex px-3 py-1 rounded-xl hover:scale-105 transition-all cursor-pointer justify-center"
                              onClick={() =>
                                onDirectionClick(coordinates, {
                                  lat: helper?.lat,
                                  lng: helper?.lng,
                                })
                              }
                            >
                              <div className="text-white font-bold text-xs mt-2">
                                Xem vị trí
                              </div>
                              <div className="bg-[#c80000] flex py-2 pl-2 rounded-xl hover:scale-105 transition-all cursor-pointer">
                                <Image
                                  src="/dumuc/send.png"
                                  alt="nav"
                                  width={16}
                                  height={16}
                                />
                              </div>
                            </div>
                            <div className="text-[#c80000] flex justify-center sm:justify-end text-xs items-center mt-1 text-center sm:text-left">
                              Cách{" "}
                              {calculateDistance(
                                coordinates.lat,
                                coordinates.lng,
                                helper?.lat,
                                helper?.lng
                              )}{" "}
                              km
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Modal.Body>
              </Modal>

              {/* S.O.S đã giúp */}
              <Modal
                show={openHelperModal}
                onClose={() => setOpenHelperModal(false)}
              >
                <Modal.Header>
                  {sos?.categoryObj?.name}
                  <br />
                  <div className="text-xs text-[#c80000] leading-relaxed">
                    Vị trí: {sos?.address}
                  </div>
                </Modal.Header>
                <Modal.Body className="p-3">
                  <div className="space-y-1">
                    <div className="px-1 flex justify-between">
                      <div className="flex items-center">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          class="w-12 h-12 rounded-full"
                          src={
                            sos?.user?.photo
                              ? sos?.user?.photo
                              : "/dumuc/avatar.jpg"
                          }
                          alt={sos?.user?.name}
                        />
                        <div className="ml-2">
                          <a style={{ color: "black", fontWeight: "500" }}>
                            {sos?.user?.name}
                          </a>
                          <div className="text-gray-500 flex justify-between text-xs items-center">
                            Truy cập {lastLoggedIn}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div
                          className="bg-[#c80000] flex px-3 py-1 rounded-xl hover:scale-105 transition-all cursor-pointer"
                          onClick={() =>
                            onDirectionClick(coordinates, {
                              lat: sos?.lat,
                              lng: sos?.lng,
                            })
                          }
                        >
                          <div className="text-white font-bold text-xs mt-2">
                            Xem vị trí
                          </div>
                          <div className="bg-[#c80000] flex py-2 pl-2 rounded-xl hover:scale-105 transition-all cursor-pointer">
                            <Image
                              src="/dumuc/send.png"
                              alt="nav"
                              width={16}
                              height={16}
                            />
                          </div>
                        </div>
                        <div className="text-[#c80000] flex justify-end text-xs items-center mt-1">
                          Cách{" "}
                          {calculateDistance(
                            coordinates.lat,
                            coordinates.lng,
                            sos?.lat,
                            sos?.lng
                          )}{" "}
                          km
                        </div>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed p-1">
                      {sos?.description}
                    </p>
                    <div
                      className={`grid  ${
                        sos?.photos.length === 3
                          ? "grid-rows-4 grid-flow-col"
                          : sos?.photos.length === 2
                          ? "grid-rows-2 grid-cols-2"
                          : "grid-rows-2 grid-cols-1"
                      } gap-2 h-60`}
                    >
                      {sos?.photos?.map((photo, index) => {
                        return (
                          <div
                            className={`rounded-md col-span-1 ${
                              sos?.photos?.length === 3 && index === 0
                                ? "row-span-4"
                                : "row-span-2"
                            } `}
                            key={index}
                          >
                            <Image
                              width={0}
                              height={0}
                              sizes="100vw"
                              alt={`Photo}`}
                              src={photo}
                              className="rounded-md h-full w-full object-cover"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer className="p-2">
                  <div className="flex justify-between items-center flex-col sm:flex-row w-full">
                    <div className="flex-1">
                      <div className="text-center">
                        {sos?.helper?.isCompleted && (
                          <>
                            <div className="text-blue-800 flex text-center font-bold text-xs mt-4 ml-1 hover:scale-105 transition-all cursor-pointer">
                              <svg
                                class="w-4 h-4 text-blue-800 mr-1"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 12"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 5.917 5.724 10.5 15 1.5"
                                />
                              </svg>{" "}
                              Bạn đã xác nhận hoàn thành
                            </div>
                            <div className="text-gray-500 text-xs mt-2 sm:text-left">
                              {moment(sos?.completedAt).fromNow()}
                            </div>
                          </>
                        )}

                        {sos?.helper?.isCancelled && (
                          <>
                            <div className="text-[#c80000] text-center font-bold text-xs mt-4 ml-1 hover:scale-105 transition-all cursor-pointer">
                              Bạn đã huỷ
                            </div>
                            <div className="text-gray-500 text-xs mt-2 sm:text-left">
                              {moment(sos?.cancelledAt).fromNow()}
                            </div>
                          </>
                        )}

                        {sos?.helper?.isCancelled !== true &&
                          sos?.helper?.isCompleted !== true && (
                            <>
                              <div
                                className="bg-[#c80000] text-white font-bold text-xs mt-2 px-2 py-1 rounded-xl hover:scale-105 transition-all cursor-pointer"
                                onClick={() => {
                                  onCompleted(sos, user?.accessToken);
                                }}
                              >
                                Xác nhận đã hoàn thành giúp đỡ
                              </div>
                              <div
                                className="text-[#c80000] font-bold text-xs mt-2 ml-1 hover:scale-105 transition-all cursor-pointer"
                                onClick={() =>
                                  onCancelled(sos, user?.accessToken)
                                }
                              >
                                Huỷ giúp đỡ
                              </div>
                            </>
                          )}
                      </div>
                    </div>
                    <div className="flex-1 mt-2 sm:mt-0">
                      <Timer
                        item={sos}
                        end={DateTimeLog(sos?.createdAt, sos?.deadline)}
                        center={true}
                      />
                    </div>
                  </div>
                </Modal.Footer>
              </Modal>

              {/* Rating khi xác nhận đúng cho người giúp đỡ */}
              <ModalRating
                visible={showRating}
                onCancel={() => setShowRating(false)}
                onSubmit={(rating, isPrimaryHelper, ratingNote) => {
                  if (valueRating) {
                    onCompleteConfirmed(
                      {
                        ...valueRating,
                        rating,
                        isPrimaryHelper,
                        ratingNote,
                      },
                      user?.accessToken,
                      "YES"
                    );
                    setValueRating();
                    setShowRating(false);
                  }
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full flex gap-x-6">
              <div className="flex gap-x-4 items-center w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 border shadow-md p-2 bg-white">
                <svg
                  class="w-12 h-12 text-gray-200 dark:text-gray-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="w-full">
                  <div className="flex justify-between">
                    <div className="bg-gray-200 dark:bg-gray-700 w-14 h-2.5"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 w-16  h-2.5"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 w-14  h-2.5"></div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 my-2 w-full h-2.5"></div>
                </div>
              </div>
              <div className="hidden md:flex gap-x-4 items-center w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 border shadow-md p-2 bg-white">
                <svg
                  class="w-12 h-12 text-gray-200 dark:text-gray-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="w-full">
                  <div className="flex justify-between">
                    <div className="bg-gray-200 dark:bg-gray-700 w-14 h-2.5"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 w-16  h-2.5"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 w-14  h-2.5"></div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 my-2 w-full h-2.5"></div>
                </div>
              </div>
              <div className="hidden lg:flex gap-x-4 items-center w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 border shadow-md p-2 bg-white">
                <svg
                  class="w-12 h-12 text-gray-200 dark:text-gray-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="w-full">
                  <div className="flex justify-between">
                    <div className="bg-gray-200 dark:bg-gray-700 w-14 h-2.5"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 w-16  h-2.5"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 w-14  h-2.5"></div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 my-2 w-full h-2.5"></div>
                </div>
              </div>
              <div className="hidden 2xl:flex gap-x-4 items-center w-1/4 border shadow-md p-2 bg-white">
                <svg
                  class="w-12 h-12 text-gray-200 dark:text-gray-700"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="w-full">
                  <div className="flex justify-between">
                    <div className="bg-gray-200 dark:bg-gray-700 w-14 h-2.5"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 w-16  h-2.5"></div>
                    <div className="bg-gray-200 dark:bg-gray-700 w-14  h-2.5"></div>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 my-2 w-full h-2.5"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
