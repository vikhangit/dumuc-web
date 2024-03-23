"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';

import moment from "moment";
import Image from "next/image";
import Timer from "./Timer";
import { DateTimeLog } from "@utils/dateFormat";

//apis
import { createUserRanking } from "@apis/users";

import { completeConfirmSosHelper, cancelSos } from "@apis/soss";

import ModalRating from "./ModalRating";
import { useRouter } from "next/navigation";

import { generateCustomToken } from "apis/users";
import { auth } from 'utils/firebase';
import { useAuthState } from "react-firebase-hooks/auth";

const SOSListByUser = ({ items, onCallback }) => {
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()
  const [showRating, setShowRating] = useState(false);
  const [valueRating, setValueRating] = useState();

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({
          lat: latitude,
          lng: longitude,
        });
      }
    );
  }, []);
  const onDirectionClick = (userLocation, sosLocation) => {
    window.open(
      "https://www.google.com/maps/dir/?api=1&origin=" +
        userLocation.lat +
        "," +
        userLocation.lng +
        "&destination=" +
        sosLocation.lat +
        "," +
        sosLocation.lng +
        "&travelmode=driving", "_blank"
    );
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

  const onCompleteConfirmed = (item, accessToken, confirm) => {
    completeConfirmSosHelper(
      {
        sosId: item?.sosId,
        helperId: item?.sossHelpId,
        isCompletedConfirm: confirm === "YES" ? true : false,
        rating: item?.rating,
        helperRole: item?.helperRole,
        ratingNote: item?.ratingNote,
      },
      accessToken
    )
      .then((result) => {
        message.success(result.message);

        //ranking
        createUserRanking(
          {
            rankingType: item?.helperRole === 'primary' ? 'sos_help_primary' : 'sos_help_secondary',
            rankingValue: item?.helperRole === 'primary' ? 2 : 1,
            rankingDocId: item?.sosId,
          },
          accessToken
        ).then(() => {
          setValueRating();
          setShowRating(false);
          onCallback();
        });
      })
      .catch((error) => {
        console.error(error);
        setLoadingSubmit(false);
      });
  };

  return (
    <div className="post-list">
      <div>
        {items &&
          items?.map((item, index) => {
            const photos = item?.photos.filter(x => x != "");
            return (
              <div className="border-b-2 my-8 mx-4 pb-4" key={index}>
                <div className="flex flex-col pr-4 mt-2">
                    <div className="flex justify-between items-center text-xs text-[#c80000]">
                      <div className="flex items-center">
                        <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{item.categoryObj?.name}</span>
                        {item?.status === -1 && (
                          <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Đã huỷ</span>
                        )}
                        {item?.status === 0 && (
                          <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Đang mở</span>
                        )}
                        {item?.status === 1 && (
                          <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Đã kết thúc</span>
                        )}
                        <div className="text-xs text-gray-400">
                          {moment(item.createdAt).format("DD/MM/YYYY HH:ss")} 
                        </div>
                      </div>
                      <div className="flex">
                        {item?.status === 0 && (
                          <button
                            className="text-[#c80000] font-bold pt-1 "
                            onClick={() => {
                              Modal.confirm({
                                icon: <ExclamationCircleOutlined />,
                                content: "Bạn có chắc chắn muốn huỷ S.O.S này không?",
                                onOk() {
                                  cancelSos(
                                    {
                                      sosId: item?.sosId,
                                    },
                                    user?.accessToken
                                  )
                                    .then((result) => {
                                      message.success(result.message);
                                      onCallback();
                                      router.push("/account/library?tab=mysos&status=-1")
                                    })
                                    .catch((error) => {
                                      console.error(error);
                                      setLoadingSubmit(false);
                                    });
                                },
                                onCancel() {
                                },
                                cancelText: 'Không',
                                cancelButtonProps: {
                                  type: 'link'
                                },
                                okText: 'Có',
                                okButtonProps: {
                                  type: 'default',
                                }
                              });
                            }}
                          >
                            Huỷ
                          </button>
                        )}
                        
                        {item?.status === 0 && (
                          <Link
                            target="_blank"
                            href={`/sos/post?id=${item?.sosId}`}
                            className="ml-4 bg-gray-400 text-white text-center w-[90px] font-bold text-xs px-2 py-1 rounded-xl hover:scale-105"
                          >
                            Cập nhật
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="line-clamp-1 text-sm text-gray-500 mt-1">
                      {item?.address}
                    </div>
                    <div className="line-clamp-5 my-1 text-base">
                      {item.description}
                    </div>
                    <div
                className={`grid ${photos?.length === 3
                ? "grid-cols-3"
                : photos?.length === 2
                  ? "grid-cols-2"
                  : photos?.length === 1 && "grid-cols-1"
                } gap-2`}
                
              >
                {photos?.map((photo, index) => {
                 if(photo !== ""){
                  return (
                    <div
                      className={`rounded-md`}
                      key={index}
                    >
                      <Image
                        width={0} height={0} sizes="100vw"
                        alt={`Photo`}
                        src={photo}
                        className="rounded-md h-full w-full object-cover"
                      />
                    </div>
                  );
                 }
                })}
              </div>
                    <div className="ml-1 flex flex-row justify-between w-full mt-4 mb-4 items-center tool-sos">
                      <div className="text-sm text-blue-800 w-full font-semibold pt-4 text-left tool-sos-text">
                        Đã có {item?.helpers?.length} người giúp đỡ
                      </div>
                      <Timer
                        item={item}
                        end={DateTimeLog(item.createdAt, item.deadline)}
                        center={"right"}
                      />
                    </div>

                    {item?.helpers?.map((helper) => {
                      return (
                        <div
                          key={helper?.sossHelpId}
                          className="p-1 flex items-center tool-sos justify-between"
                        >
                          <div className="flex items-center">
                            <Image width={0} height={0} sizes="100vw"
                              class="w-12 h-12 rounded-full"
                              src={
                                helper?.user?.photo
                                  ? helper?.user?.photo
                                  : "/dumuc/avatar.png"
                              }
                              alt={helper?.user?.name}
                            />
                            <div className="ml-2">
                              <div className="flex items-center pt-2">
                                <div className="text-sm font-medium ml-1">
                                  {helper?.user?.name}
                                </div>
                                <div className="text-gray-500 ml-2 text-xs flex items-center">
                                  <span className="mr-2">Online {helper?.lastLoggedIn} </span>
                                  <a onClick={async () => {
                                      auth.onAuthStateChanged(async currentUser => { 
                                        if (currentUser) {
                                          const [token] = await Promise.all([
                                            currentUser.getIdToken(true),
                                          ]);

                                          generateCustomToken(token)
                                          .then(result => {
                                            window.open(`${process.env.NEXT_PUBLIC_COMMUNICAION_URL}/chat/${result?.token}/${helper?.user?.id}`, "_blank");
                                          })
                                          }
                                      });
                                    }}
                                    className="mx-1 relative text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5"
                                  >
                                    <svg
                                      class="w-5 h-5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 18"
                                      fill="currentColor"
                                    >
                                      <path
                                        d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    <span class="sr-only">Chat</span>
                                  </a>
                                  <a onClick={async () => {
                                      auth.onAuthStateChanged(async currentUser => { 
                                        if (currentUser) {
                                          const [token] = await Promise.all([
                                            currentUser.getIdToken(true),
                                          ]);
                                          generateCustomToken(token)
                                          .then(result => {
                                            window.open(`${process.env.NEXT_PUBLIC_COMMUNICAION_URL}/call/${result?.token}`, "_blank");
                                          })
                                          }
                                      });
                                    }}
                                    className="relative text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5"
                                  >
                                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                      <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
                                    </svg>
                                    <span class="sr-only">Call</span>
                                  </a>
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
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
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
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
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
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
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
                                              sosId: item?.sosId,
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
                                                sosId: item?.sosId,
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

                          <div className="pt-1">
                            <div
                              className="bg-[#c80000] flex px-3 py-1 rounded-xl hover:scale-105 tool-sos-btn transition-all justify-center cursor-pointer"
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
                            <div className="text-[#c80000] flex justify-end text-xs items-center mt-1 tool-sos-text">
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
              </div>
            );
          })}
      </div>
      <ModalRating
        visible={showRating}
        onCancel={() => setShowRating(false)}
        onSubmit={(rating, helperRole, ratingNote) => {
          if (valueRating) {
            onCompleteConfirmed(
              {
                ...valueRating,
                rating,
                helperRole,
                ratingNote,
              },
              user?.accessToken,
              "YES"
            )
          }
        }}
      />
    </div>
  );
};

export default SOSListByUser;
