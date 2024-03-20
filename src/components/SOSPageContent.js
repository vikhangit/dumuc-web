"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Button, Modal, Spinner } from 'flowbite-react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { message } from "antd";

import Header from "@components/Header";
import SOSHeaderBar from "@components/SOSHeaderBar";

import BannerRight from "@components/BannerRight";
import TabbarBottom from "@components/TabbarBottom";

import SOSRangeSelect from "@components/SOSRangeSelect";
import { EnvironmentFilled } from '@ant-design/icons';
import GoogleMapReact from "google-map-react";

import { auth, firestore } from '@utils/firebase';
import moment from "moment";

import { getCategories } from "@apis/posts";
import { getSoss, createSosHelper, getHelperSossByUser, expireSos } from '@apis/soss';
import Timer from "@components/Timer";
import { DateTimeLog } from "@utils/dateFormat";
import _, { size } from 'lodash';
import SOSTab from "./SOSTabs";
import { useWindowSize } from "@hooks/useWindowSize";
import PasswordlessPage from "app/auth/page";
import LoginWithModal from "./LoginWithModal";
import { generateCustomToken } from "@apis/users";
import { useAuthState } from "react-firebase-hooks/auth";

const SOSPageContent = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const [hiddenFilter, setHiddenFilter] = useState(false);
  const sizes = useWindowSize()
  let now = moment();

  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');

  const [radius, setRadius] = useState(5);

  const [soss, setSoss] = useState([]);
  const [sossOriginal, setSossOrigina] = useState([]);
  const [helperSoss, setHelperSoss] = useState([]);
  const [sos, setSos] = useState();
  const [photoSos, setPhotoSos] =useState([]);

  const [lastLoggedIn, setLastLoggedIn] = useState('');
  const [sosOverlay, setSosOverlay] = useState();

  const [openModal, setOpenModal] = useState(false);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // in kilometers
    const degToRad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = earthRadius * c;

    return distance.toFixed(2); // Return the distance with 2 decimal places
  };

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          let helperSossData = await getHelperSossByUser(user?.accessToken);
          setHelperSoss(helperSossData);
        }
      } catch (e) { }
    })();
  }, [user])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({
        lat: latitude,
        lng: longitude
      })
    })
  }, []);

  //soss
  useEffect(() => {
    (async () => {
      try {
        setLoadingFetch(true)

        let categoriesData = await getCategories();
        setCategories(categoriesData.filter(x => x.type === 'soss'))

        let soosData = await getSoss();
        let newSOSS = [];
        soosData.map((x) => newSOSS.push({
          ...x,
          khoang_cach: calculateDistance(
            coordinates.lat,
            coordinates.lng,
            x?.lat,
            x?.lng
          )
        }))
        setSossOrigina(newSOSS);
        setSoss(newSOSS);
        setLoadingFetch(false)
        let locationsData = soosData?.map(item => {
          let location = `${item?.address_components[2]?.short_name} - ${item?.address_components[3]?.short_name}`
          return location
        })

        setLocations(_.union(locationsData))
      } catch (e) { }
    })();
  }, [coordinates])
  useEffect(() => {
    (async () => {
      try {
        if (coordinates.lat && coordinates.lng) {
          // filter by category
          let sossFilter = sossOriginal.filter(item => {
            let locationFilter = `${item?.address_components[2]?.short_name} - ${item?.address_components[3]?.short_name}`
            let radiusFilter = calculateDistance(
              coordinates.lat,
              coordinates.lng,
              item.lat,
              item.lng
            )

            if (
              (item?.category?.categoryId === category || category === '' || category === undefined)
              && (locationFilter === location || location === '' || location === undefined)
              && (radiusFilter <= radius)
            ) {
              return true;
            } else {
              return false;
            }
          })

          //filter by radius, 

          setSoss(sossFilter);
        }
      } catch (e) { }
    })();
  }, [coordinates, radius, location, category])

  //Search
  //const [bounds, setBounds] = useState(null)

  const onDirectionClick = (userLocation, sosLocation) => {
    window.open('https://www.google.com/maps/dir/?api=1&origin=' +
      userLocation.lat + ',' + userLocation.lng + '&destination='
      + sosLocation.lat
      + ',' + sosLocation.lng + '&travelmode=driving')
  }


  const onClickSos = async (item) => {
    //check sos expired
    let end = moment(DateTimeLog(item?.createdAt, item?.deadline), 'DD/MM/YYYY hh:mm:ss');
    if (!end.isAfter(new moment())) {
      expireSos(
        {
          sosId: item?.sosId,
        },
      )
        .then((result) => {
        })
        .catch((error) => {
          console.error(error);
          setLoadingSubmit(false);
        });
      setSos({
        ...item,
        status: 1,
      });
    } else {
      setSos(item);
    }
    setPhotoSos(item?.photos.filter(x => x != ""))
    setOpenModal(true);

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

  }
  const [active, setActive] = useState(0)
  const Status1 = ({ detail }) => {
    return <div style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%2311F10DFF' stroke-width='2' stroke-dasharray='20' stroke-dashoffset='4' stroke-linecap='square'/%3e%3c/svg%3e")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 25
    }}
      className={`${!detail && `absolute top-1/3 sm:top-1/2 -rotate-[15deg] -translate-y-1/3 sm:-translate-y-1/2 translate-x-1/2 ${sizes.width > 450 ? "right-1/3 xl:right-1/2" : "right-[40%]"}`} ${detail ? "text-sm sm:text-base md:text-lg" : "text-lg"}  ${sizes.width > 376 ? "w-[160px] md:w-[200px] h-[48px]" : "w-fit px-5 h-[40px] text-xs text-center"}  font-semibold flex justify-center items-center text-[#11F10D]`}>Mới gửi
    </div>
  }
  const Status2 = ({ detail }) => {
    return <div style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%23C82027FF' stroke-width='2' stroke-dasharray='20' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 25
    }}
      className={`${!detail && `absolute top-1/3 sm:top-1/2 -rotate-[15deg] -translate-y-1/3 sm:-translate-y-1/2 translate-x-1/2  ${sizes.width > 450 ? "right-1/3 xl:right-1/2" : "right-[40%]"}`}  ${detail ? "text-sm sm:text-base md:text-lg" : "text-lg"} ${sizes.width > 376 ? "w-[160px] md:w-[200px] h-[48px]" : "w-fit px-5 h-[40px] text-xs text-center"} font-semibold flex justify-center items-center text-[#C82027]`}>Đang hỗ trợ
    </div>
  }
  const Status3 = ({ detail }) => {
    return <div style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%230F78DAFF' stroke-width='2' stroke-dasharray='20' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 25
    }}
      className={`${!detail && `absolute top-1/3 sm:top-1/2 -rotate-[15deg] -translate-y-1/3 sm:-translate-y-1/2  translate-x-1/2  ${sizes.width > 450 ? "right-1/3 xl:right-1/2" : "right-[40%]"}`} ${detail ? "text-sm sm:text-base md:text-lg" : "text-lg"}  ${sizes.width > 376 ? "w-[160px] md:w-[200px] h-[48px]" : "w-fit px-5 h-[40px] text-xs text-center"} font-semibold flex justify-center items-center text-[#0F78DA]`}>Hoàn thành
    </div>
  }
  const Status4 = ({ detail }) => {
    return <div style={{
      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='25' ry='25' stroke='%230F5E666D' stroke-width='2' stroke-dasharray='20' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      borderRadius: 25
    }}
      className={`${!detail && `absolute top-1/3 sm:top-1/2 -rotate-[15deg] -translate-y-1/3 sm:-translate-y-1/2  translate-x-1/2  ${sizes.width > 450 ? "right-1/3 xl:right-1/2" : "right-[40%]"}`} ${detail ? "text-sm sm:text-base md:text-lg" : "text-lg"}  ${sizes.width > 376 ? "w-[160px] md:w-[200px] h-[48px]" : "w-fit px-5 h-[40px] text-xs text-center"} font-semibold flex justify-center items-center text-[#5E666D]`}>Hết hạn
    </div>
  }
  return (
    <main className="w-full">
      <div className="w-full">
        <Header />
        <div className="container mx-auto bg-white">
          <SOSTab active={active} setActive={setActive} user={user} callBack={async () => {
            try {
              // er
              setLoadingFetch(true)

              let categoriesData = await getCategories();
              setCategories(categoriesData.filter(x => x.type === 'soss'))

              let soosData = await getSoss();
              let newSOSS = [];
              soosData.map((x) => newSOSS.push({
                ...x,
                khoang_cach: calculateDistance(
                  coordinates.lat,
                  coordinates.lng,
                  x?.lat,
                  x?.lng
                )
              }))
              setSossOrigina(newSOSS);
              setSoss(newSOSS);
              setLoadingFetch(false)
              let locationsData = soosData?.map(item => {
                let location = `${item?.address_components[2]?.short_name} - ${item?.address_components[3]?.short_name}`
                return location
              })

              setLocations(_.union(locationsData))
            } catch (e) { }
          }} />
          {
            active === 0 && <div className="px-4">
              {
                !loadingFetch ? soss.length > 0 ? (
                  soss.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={async () => onClickSos(item)}
                      // onMouseEnter={() => setSosOverlay(item?.sosId)}
                      // onMouseLeave={() => setSosOverlay()}
                      >
                        <div className="relative w-full bg-white cursor-pointer  border-b border-[#CFC8C8] border-dashed py-4">
                          <div className="flex justify-between pb-2 mt-2 text-sm sm:text-base">
                            <div className="">
                              <div>
                                Tên User: <strong>{item.user?.name}</strong>
                              </div>
                              <div>
                                Loại Sos: <strong>{item.category?.name}</strong>
                              </div>
                            </div>
                            <div>
                              Số xe: <strong>{item?.numberPlate && item?.numberPlate?.length > 0 ? item?.numberPlate :"Chưa có"}</strong>
                            </div>
                          </div>

                          <div className="flex items-start justify-between pb-2 mt-2 text-sm sm:text-base">
                            <div>
                              <div className="flex text-gray-500 items-center gap-x-2 text-[#919191]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 text-[#919191]">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {moment(item?.createdAt).fromNow()}
                              </div>
                              <div>
                                <div className={`flex items-center line-clamp-1 ${item?.address_components ? "text-[#919191]" : "text-[#c80000]"}  gap-x-2 mt-2`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                  </svg>
                                  {
                                    item?.address_components ?
                                      <>
                                        {item?.address_components[2]?.short_name || ""} -{" "}
                                        {item?.address_components[3]?.short_name || ""}
                                      </>
                                      : "Không lấy được địa chỉ"
                                  }
                                </div>
                              </div>
                              <div>
                              
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div
                                className="bg-[#c80000] flex items-center justify-center p-2.5 rounded-full hover:scale-105 transition-all cursor-pointer"
                              // onClick={(e) => {
                              //   onDirectionClick(coordinates, {
                              //     lat: item.lat,
                              //     lng: item.lng,
                              //   });
                              // }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                              </div>
                              {/* <div className="text-[#c80000] flex justify-between text-xs items-center mt-1">
                                Cách{" "}
                                {item.khoang_cach}{" "}
                                km
                              </div> */}
                            </div>
                          </div>
                          {
                            item?.status === 1 && item?.helpers.length > 0 && now.isAfter(moment(DateTimeLog(item?.createdAt, item?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                              ? <Status3 />
                              : item?.status === 0 && item?.helpers.length > 0 && now.isBefore(moment(DateTimeLog(item?.createdAt, item?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                                ? <Status2 />
                                : item?.status === 1 && item?.helpers.length <= 0 && now.isAfter(moment(DateTimeLog(item?.createdAt, item?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                                  ? <Status4 /> :
                                  item?.status === 0 && item?.helpers.length <= 0 && now.isBefore(moment(DateTimeLog(item?.createdAt, item?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                                    ? <Status1 />
                                    : <Status4 />
                          }
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center mt-10">
                    Không tìm thấy thông tin S.O.S
                  </div>
                ) : <div className="flex justify-center items-center h-32">
                  <Spinner />
                </div>
              }
            </div>
          }
          {
            active === 1 && <div className="px-4">
              {loadingFetch === false ?
                (soss.length > 0 && soss.filter(x => x?.status === 0 && x?.helpers.length <= 0 && now.isBefore(moment(DateTimeLog(x?.createdAt, x?.deadline), 'DD/MM/YYYY hh:mm:ss'))).length > 0 ? (
                  soss.filter(x => x?.status === 0 && x?.helpers.length <= 0 && now.isBefore(moment(DateTimeLog(x?.createdAt, x?.deadline), 'DD/MM/YYYY hh:mm:ss'))).map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={async () => onClickSos(item)}
                      // onMouseEnter={() => setSosOverlay(item?.sosId)}
                      // onMouseLeave={() => setSosOverlay()}
                      >
                        <div className="relative w-full bg-white cursor-pointer border-b border-gray-400 py-4">

                          <div className="flex justify-between pb-2 mt-2 text-sm sm:text-base">
                            <div className="">
                              <div>
                                Tên User: <strong>{item?.user?.name}</strong>
                              </div>
                              <div>
                                Loại Sos: <strong>{item?.category?.name}</strong>
                              </div>
                            </div>
                            <div>
                              Số xe: <strong>{item?.numberPlate && item?.numberPlate?.length > 0 ? item?.numberPlate :"Chưa có"}</strong>
                            </div>
                          </div>

                          <div className="flex items-start justify-between pb-2 mt-2 text-sm sm:text-base">
                            <div>
                              <div className="flex text-gray-500 items-center gap-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {moment(item?.createdAt).fromNow()}
                              </div>
                              <div>
                                <div className={`flex items-center line-clamp-1 ${item?.address_components ? "text-gray-500" : "text-[#c80000]"}  gap-x-2 mt-2`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                  </svg>
                                  {
                                    item?.address_components ?
                                      <>
                                        {item?.address_components[2]?.short_name || ""} -{" "}
                                        {item?.address_components[3]?.short_name || ""}
                                      </>
                                      : "Không lấy được địa chỉ"
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div
                                className="bg-[#c80000] flex items-center justify-center p-2.5 rounded-full hover:scale-105 transition-all cursor-pointer"
                              // onClick={(e) => {
                              //   onDirectionClick(coordinates, {
                              //     lat: item.lat,
                              //     lng: item.lng,
                              //   });
                              // }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                              </div>
                              {/* <div className="text-[#c80000] flex justify-between text-xs items-center mt-1">
                                Cách{" "}
                                {item.khoang_cach}{" "}
                                km
                              </div> */}
                            </div>
                          </div>
                          <Status1 />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center mt-10">
                    Không tìm thấy thông tin S.O.S
                  </div>
                )) :
                <div className="flex justify-center items-center h-32">
                  <Spinner />
                </div>
              }
            </div>
          }
          {
            active === 2 && <div className="px-4">
              {loadingFetch === false ?
                (soss.length > 0 && soss.filter(x => x?.status === 0 && x?.helpers.length > 0 && now.isBefore(moment(DateTimeLog(x?.createdAt, x?.deadline), 'DD/MM/YYYY hh:mm:ss'))).length > 0 ? (
                  soss.filter(x => x?.helpers?.length > 0 && x?.status === 0).map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={async () => onClickSos(item)}
                      // onMouseEnter={() => setSosOverlay(item?.sosId)}
                      // onMouseLeave={() => setSosOverlay()}
                      >
                        <div className="relative w-full bg-white cursor-pointer border-b border-gray-400 py-4">

                          <div className="flex justify-between pb-2 mt-2 text-sm sm:text-base">
                            <div className="">
                              <div>
                                Tên User: <strong>{item.user?.name}</strong>
                              </div>
                              <div>
                                Loại Sos: <strong>{item.category?.name}</strong>
                              </div>
                            </div>
                            <div>
                              Số xe: <strong>{item?.numberPlate && item?.numberPlate?.length > 0 ? item?.numberPlate :"Chưa có"}</strong>
                            </div>
                          </div>

                          <div className="flex items-start justify-between pb-2 mt-2 text-sm sm:text-base">
                            <div>
                              <div className="flex text-gray-500 items-center gap-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {moment(item?.createdAt).fromNow()}
                              </div>
                              <div>
                                <div className={`flex items-center line-clamp-1 ${item?.address_components ? "text-gray-500" : "text-[#c80000]"}  gap-x-2 mt-2`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                  </svg>
                                  {
                                    item?.address_components ?
                                      <>
                                        {item?.address_components[2]?.short_name || ""} -{" "}
                                        {item?.address_components[3]?.short_name || ""}
                                      </>
                                      : "Không lấy được địa chỉ"
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div
                                className="bg-[#c80000] flex items-center justify-center p-2.5 rounded-full hover:scale-105 transition-all cursor-pointer"
                              // onClick={(e) => {
                              //   onDirectionClick(coordinates, {
                              //     lat: item.lat,
                              //     lng: item.lng,
                              //   });
                              // }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                              </div>
                              {/* <div className="text-[#c80000] flex justify-between text-xs items-center mt-1">
                                Cách{" "}
                                {item.khoang_cach}{" "}
                                km
                              </div> */}
                            </div>
                          </div>
                          <Status2 />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center mt-10">
                    Không tìm thấy thông tin S.O.S
                  </div>
                )) :
                <div className="flex justify-center items-center h-32">
                  <Spinner />
                </div>
              }
            </div>
          }
          {
            active === 3 && <div className="px-4">
              {loadingFetch === false ?
                (soss.length > 0 && soss.filter(x => x?.status === 1 && x?.helpers.length > 0 && now.isAfter(moment(DateTimeLog(x?.createdAt, x?.deadline), 'DD/MM/YYYY hh:mm:ss'))).length > 0 ? (
                  soss.filter(x => x?.status === 1 && x?.helpers.length > 0 && now.isAfter(moment(DateTimeLog(x?.createdAt, x?.deadline), 'DD/MM/YYYY hh:mm:ss'))).map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={async () => onClickSos(item)}
                      // onMouseEnter={() => setSosOverlay(item?.sosId)}
                      // onMouseLeave={() => setSosOverlay()}
                      >
                        <div className="relative w-full bg-white cursor-pointer border-b border-gray-400 py-4">

                          <div className="flex justify-between pb-2 mt-2 text-sm sm:text-base">
                            <div className="">
                              <div>
                                Tên User: <strong>{item.user?.name}</strong>
                              </div>
                              <div>
                                Loại Sos: <strong>{item.category?.name}</strong>
                              </div>
                            </div>
                            <div>
                              Số xe: <strong>{item?.numberPlate && item?.numberPlate?.length > 0 ? item?.numberPlate : "Chưa có"}</strong>
                            </div>
                          </div>

                          <div className="flex items-start justify-between pb-2 mt-2 text-sm sm:text-base">
                            <div>
                              <div className="flex text-gray-500 items-center gap-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {moment(item?.createdAt).fromNow()}
                              </div>
                              <div>
                                <div className={`flex items-center line-clamp-1 ${item?.address_components ? "text-gray-500" : "text-[#c80000]"}  gap-x-2 mt-2`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                  </svg>
                                  {
                                    item?.address_components ?
                                      <>
                                        {item?.address_components[2]?.short_name || ""} -{" "}
                                        {item?.address_components[3]?.short_name || ""}
                                      </>
                                      : "Không lấy được địa chỉ"
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div
                                className="bg-[#c80000] flex items-center justify-center p-2.5 rounded-full hover:scale-105 transition-all cursor-pointer"
                              // onClick={(e) => {
                              //   onDirectionClick(coordinates, {
                              //     lat: item.lat,
                              //     lng: item.lng,
                              //   });
                              // }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                              </div>
                              {/* <div className="text-[#c80000] flex justify-between text-xs items-center mt-1">
                                Cách{" "}
                                {item.khoang_cach}{" "}
                                km
                              </div> */}
                            </div>
                          </div>
                          <Status3 />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center mt-10">
                    Không tìm thấy thông tin S.O.S
                  </div>
                ))
                :
                <div className="flex justify-center items-center h-32">
                  <Spinner />
                </div>
              }
            </div>
          }
          {
            active === 4 && <div className="px-4">
              {loadingFetch === false ?
                (soss.length > 0 && soss.filter(x => now.isAfter(moment(DateTimeLog(x?.createdAt, x?.deadline), 'DD/MM/YYYY hh:mm:ss')) && x?.status === 1 && x?.helpers?.length <= 0).length > 0 ? (
                  soss.filter(x => now.isAfter(moment(DateTimeLog(x?.createdAt, x?.deadline), 'DD/MM/YYYY hh:mm:ss')) && x?.status === 1 && x?.helpers?.length <= 0).map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={async () => onClickSos(item)}
                      // onMouseEnter={() => setSosOverlay(item?.sosId)}
                      // onMouseLeave={() => setSosOverlay()}
                      >
                        <div className="relative w-full bg-white cursor-pointer border-b border-gray-400 py-4">

                          <div className="flex justify-between pb-2 mt-2 text-sm sm:text-base">
                            <div className="">
                              <div>
                                Tên User: <strong>{item.user?.name}</strong>
                              </div>
                              <div>
                                Loại Sos: <strong>{item.category?.name}</strong>
                              </div>
                            </div>
                            <div>
                              Số xe: <strong>{item?.numberPlate && item?.numberPlate?.length > 0 ? item?.numberPlate :"Chưa có"}</strong>
                            </div>
                          </div>

                          <div className="flex items-start justify-between pb-2 mt-2 text-sm sm:text-base">
                            <div>
                              <div className="flex text-gray-500 items-center gap-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {moment(item?.createdAt).fromNow()}
                              </div>
                              <div>
                                <div className={`flex items-center line-clamp-1 ${item?.address_components ? "text-gray-500" : "text-[#c80000]"}  gap-x-2 mt-2`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                  </svg>
                                  {
                                    item?.address_components ?
                                      <>
                                        {item?.address_components[2]?.short_name || ""} -{" "}
                                        {item?.address_components[3]?.short_name || ""}
                                      </>
                                      : "Không lấy được địa chỉ"
                                  }
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div
                                className="bg-[#c80000] flex items-center justify-center p-2.5 rounded-full hover:scale-105 transition-all cursor-pointer"
                              // onClick={(e) => {
                              //   onDirectionClick(coordinates, {
                              //     lat: item.lat,
                              //     lng: item.lng,
                              //   });
                              // }}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                                </svg>
                              </div>
                              {/* <div className="text-[#c80000] flex justify-between text-xs items-center mt-1">
                                Cách{" "}
                                {item.khoang_cach}{" "}
                                km
                              </div> */}
                            </div>
                          </div>
                          <Status4 />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center mt-10">
                    Không tìm thấy thông tin S.O.S
                  </div>
                ))
                :
                <div className="flex justify-center items-center h-32">
                  <Spinner />
                </div>
              }
            </div>
          }
        </div>
        <Modal show={openModal} onClose={() => setOpenModal(false)} style={{
          padding: sizes.width > 376 ? 4 : 0
        }}>
          <Modal.Header className="bg-[#c80000] bg-opacity-60 rounded-b-xl justify-center text-center  text-white [&>h3]:text-white [&>h3]:w-full [&>h3]:text-base [&>h3]:sm:text-xl  [&>button]:ml-auto p-2.5 [&>button]:text-white">

            {user ? `Loại SOS: ${sos?.category?.name}` : "Xin mời đăng nhập"}
          </Modal.Header>
          <Modal.Body className="px-4 py-0 pb-6">
            {
              user ?
                <div className="space-y-1">
                  <div className={`py-4 px-0 sm:px-4 text-gray-500 border-b-2 border-dashed border-[#c80000] ${sizes.width > 376 ? "text-sm sm:text-base" : "text-xs"}`}>
                    <div className="flex justify-between items-center">
                    <div>
                      <div>
                        Tên User: <strong>{sos?.user?.name}</strong>
                      </div>
                      <div>
                        Số xe: <strong>{sos?.numberPlate && sos?.numberPlate?.length > 0 ? sos?.numberPlate : "Chưa có"}</strong>
                      </div>
                      <div className="flex text-gray-500 items-center gap-x-1 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${sizes.width > 376 ? "w-6 h-6" : "w-4 h-4"} `}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {moment(sos?.createdAt).fromNow()}
                      </div>
                    </div>
                    <div className="">
                      {
                        sos?.status === 1 && sos?.helpers.length > 0 && now.isAfter(moment(DateTimeLog(sos?.createdAt, sos?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                          ? <Status3 detail={true} />
                          : sos?.status === 0 && sos?.helpers.length > 0 && now.isBefore(moment(DateTimeLog(sos?.createdAt, sos?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                            ? <Status2 detail={true} />
                            : sos?.status === 1 && sos?.helpers.length <= 0 && now.isAfter(moment(DateTimeLog(sos?.createdAt, sos?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                              ? <Status4 detail={true} />
                              : sos?.status === 0 && sos?.helpers.length <= 0 && now.isBefore(moment(DateTimeLog(sos?.createdAt, sos?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                                ? <Status1 detail={true} />
                                : <Status4 detail={true} />
                      }
                    </div>
                    </div>
                    <div className={`flex items-center line-clamp-1 ${sos?.livestream_link ? "text-[#919191]" : "text-[#c80000]"}  gap-x-2 mt-2`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${sizes.width > 376 ? "w-6 h-6" : "w-4 h-4"}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                                  </svg>

                                  <div className="hover:underline hover:text-indigo-600" style={{
                                    cursor: "pointer"
                                  }} onClick={() => {
              auth.onAuthStateChanged(async currentUser => { 
                if (currentUser) {
                  const [token] = await Promise.all([
                    currentUser.getIdToken(true),
                  ]);

                  generateCustomToken(token)
                  .then(result => {
                    window.open(`${sos?.livestream_link}`, "_blank");
                  })
                  }
              });
            }}>{sos?.livestream_link || "Chưa có link livestream"}</div>
                              </div>
                  </div>
                  {
                    sos?.address_components ?
                      <div className={`py-3  px-0 sm:px-4 flex text-gray-500 justify-between items-center ${sizes.width > 376 ? "text-sm sm:text-base" : "text-xs"}`}>
                        <div className="flex flex-col gap-y-1 items-start w-[calc(100%-105px)]">
                          <div>
                            Tỉnh/ thành: <strong>{sos?.address_components[3]?.short_name}</strong>
                          </div>
                          <div>
                            Quận/ huyện: <strong>{sos?.address_components[2]?.short_name}</strong>
                          </div>
                          <div className="w-full h-16 border-2 border-dashed border-gray-400">
                            Vị trí: <strong>{sos?.address_components[0]?.short_name} {sos?.address_components[1]?.short_name}</strong>
                          </div>
                        </div>
                        <div>
                          <div
                            className={`bg-white shadow shadow-gray-500 rounded-[100%] ${sizes.width > 320 ? "px-4 text-xs sm:text-sm py-3" : "px-2  text-[10px] py-1"}  flex flex-col items-center justify-center text-center cursor-pointer`}
                            onClick={() =>
                              onDirectionClick(coordinates, {
                                lat: sos?.lat,
                                lng: sos?.lng,
                              })
                            }
                          >
                            <Image
                              src="/icons/map-check.png"
                              alt="nav"
                              width={24}
                              height={24}
                            />
                            <div className="text-gray-400">
                              Xem map
                            </div>
                          </div>
                          {/* <div className="text-[#c80000] flex justify-between text-xs items-center mt-1">
                  Cách{" "}
                  {calculateDistance(
                    coordinates.lat,
                    coordinates.lng,
                    sos?.lat,
                    sos?.lng
                  )}{" "}
                  km
                </div> */}
                        </div>
                      </div>
                      : <div className={`py-3  px-0 sm:px-4 flex text-[#c80000] justify-center items-center ${sizes.width > 376 ? "text-sm sm:text-base" : "text-xs"}`}>
                        Lỗi địa chỉ
                      </div>
                  }
                  <>
                    <div className={`mb-4 flex gap-x-2 gap-y-4 w-full px-0 sm:px-4 ${sizes.width > 420 ? "flex-row items-center" : "flex-col items-start"}`}>
                      <div className="w-full">
                        {now.isBefore(moment(DateTimeLog(sos?.createdAt, sos?.deadline), 'DD/MM/YYYY hh:mm:ss')) && helperSoss?.findIndex((x) => x.sosId === sos?.sosId) > -1
                          ? (<div className="text-[#C82027] font-medium text-sm">
                            Bạn {sos?.helpers.length > 1 && `và ${sos?.helpers.length - 1} người khác`} đã tiếp nhận giúp đỡ S.O.S này
                          </div>)
                          : now.isBefore(moment(DateTimeLog(sos?.createdAt, sos?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                            ? (<>
                              {
                                sos?.user?.email !== user?.email && <Button
                                  isProcessing={loadingSubmit}
                                  color="failure"
                                  className={`bg-[#D15156] w-full rounded-full ${sizes.width > 450 ? "[&>span]:text-sm [&>span]:sm:text-base" : `[&>span]:text-xs`} p-1.5`}
                                  onClick={() => {
                                  
                                    setLoadingSubmit(true);
                                    //require login
                                    if (user === undefined && loading === false) {
                                      const url_return = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/sos/`;
                                      router.push(`/auth?url_return=${url_return}`);
                                      setLoadingSubmit(false);
                                    } else {
                                      //create a helper
                                      let item = {};
                                      item.helperId = `${sos?.sosId}_${user?.userId}`;
                                      item.sosId = sos?.sosId;
                                      item.lat = coordinates.lat;
                                      item.lng = coordinates.lng;

                                      createSosHelper(item, user?.accessToken)
                                        .then(async (result) => {
                                          let payload = {
                                            lat: coordinates.lat,
                                            lng: coordinates.lng,
                                            category,
                                            location,
                                            radius,
                                          };
                                          let soosData = await getSoss(payload);
                                          setSoss(soosData);

                                          let helperSossData = await getHelperSossByUser(
                                            user?.accessToken
                                          );
                                          setHelperSoss(helperSossData);
                                          message.success(
                                            "Bạn đã nhận giúp đỡ S.O.S thành công. Nào bắt đầu thôi!"
                                          );
                                          setOpenModal(false);
                                          setLoadingSubmit(false);
                                        })
                                        .catch((error) => {
                                          console.error(error);
                                          setLoadingSubmit(false);
                                        });
                                    }
                                  }}
                                >
                                  Yes, Tiếp nhận giúp đỡ
                                </Button>
                              }
                              {sos?.helpers?.length > 0 ? <div className="text-[#C82027] font-medium text-sm">Đã có {sos?.helpers?.length} người tiếp nhận</div> : <div className="font-medium text-sm text-[#C82027]">Chưa có người tiếp nhận</div>}
                            </>)
                            : sos?.status === 1 && sos?.helpers.length > 0 && now.isAfter(moment(DateTimeLog(sos?.createdAt, sos?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                              ? <div className="text-[#0F78DA] font-medium text-sm">S.O.S đã hoàn thành</div>
                              : sos?.status === 1 && sos?.helpers.length <= 0 && now.isAfter(moment(DateTimeLog(sos?.createdAt, sos?.deadline), 'DD/MM/YYYY hh:mm:ss'))
                                ? <div className="text-[#5E666D] font-medium text-sm">S.O.S đã hết hạn</div>
                                : <div className="text-[#5E666D] font-medium text-sm">S.O.S đã hết hạn</div>
                        }
                        {/* {sos?.helpers?.length === 0 ? (
                <div className="text-xs text-gray-500 mt-1 text-left">
                  Chưa có người nào giúp đỡ, Bạn hãy là người đầu tiên nào!
                </div>
              ) : (
                <div className="text-xs text-gray-500 mt-1 text-left">
                  Đã có {sos?.helpers?.length} người giúp đỡ
                </div>
              )} */}
                      </div>
                      <Timer
                        item={sos}
                        end={DateTimeLog(sos?.createdAt, sos?.deadline)}
                        center={true}
                      />
                    </div>
                    <div className="w-full h-2"></div>
                  </>
                  <div
                    className={`grid ${photoSos?.length === 3
                      ? "grid-cols-3"
                      : photoSos?.length === 2
                        ? "grid-cols-2"
                        : photoSos?.length === 1 && "grid-cols-1"
                      } gap-2`}
                  >
                    {photoSos?.map((photo, index) => {
                      if (photo !== "") {
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
                  <div className="w-full h-2"></div>
                  <div className="w-full h-24 border-2 border-dashed border-gray-400 py-2 px-3">
                    <div className={`${sizes.width > 376 ? "text-sm" : "text-xs"}  leading-tight`}>Ghi chú khác: <br />{sos?.description}</div>
                  </div>
                  <div>
                    {
                       sos?.helpers?.filter(x => x?.isCompleted && x?.isCompletedConfirm).length > 0 &&
                      <div className="border-t-2 border-gray-300 mt-3">
                      <div className="text-sm sm:text-base font-semibold py-2">Hiệp sĩ đã đến</div>
                      <div className="flex w-full items-center">
                        <div className={`w-[calc(100%-35px)] grid ${sizes.width > 510 ? "grid-cols-4" : sizes.width > 400 ? "grid-cols-3" : "grid-cols-2"} gap-x-4`}>
                              
                              {
                                sos?.helpers?.filter(x => x?.isCompleted && x?.isCompletedConfirm)?.map((item, index) => {
                                  return <div className="shadow shadow-gray-500 text-xs sm:text-sm p-2">
                                <div className="text-[#c80000] font-medium">
                                  {item?.user?.name ? item?.user?.name : `Dumuc ${item?.user?.username}`}
                                </div>
                                <div className="">
                                  {item?.user?.phone}
                                </div>
                                <div className="font-medium">
                                  {item?.user?.rankingValue}
                                </div>
                              </div>
                                
                                })
                              }
                          
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                      </div>
                    </div>
                    }
                    {
                       sos?.helpers?.filter(x => !x?.isCompleted && !x?.isCompletedConfirm).length > 0 &&
                      <div className="border-t-2 border-gray-300 mt-3">
                        {
                          now.isAfter(moment(DateTimeLog(sos?.createdAt, sos?.deadline), 'DD/MM/YYYY hh:mm:ss')) 
                          ? 
                          <>
<div className="text-sm sm:text-base font-semibold py-2">Hiệp sĩ không đến</div>
                      <div className="flex w-full items-center">
                        <div className={`w-[calc(100%-35px)] grid ${sizes.width > 510 ? "grid-cols-4" : sizes.width > 400 ? "grid-cols-3" : "grid-cols-2"} gap-x-4`}>
                              
                              {
                                sos?.helpers?.filter(x => !x?.isCompleted && !x?.isCompletedConfirm)?.map((item, index) => {
                                  return <div className="shadow shadow-gray-500 text-xs sm:text-sm p-2">
                                <div className="text-[#c80000] font-medium">
                                  {item?.user?.name ? item?.user?.name : `Dumuc ${item?.user?.username}`}
                                </div>
                                <div className="">
                                  {item?.user?.phone}
                                </div>
                                <div className="font-medium">
                                  {item?.user?.rankingValue}
                                </div>
                              </div>
                                
                                })
                              }
                          
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                      </div>
                          </>
                          :
                          <>
                          <div className="text-sm sm:text-base font-semibold py-2">Hiệp sĩ đang đến</div>
                      <div className="flex w-full items-center">
                        <div className={`w-[calc(100%-35px)] grid ${sizes.width > 510 ? "grid-cols-4" : sizes.width > 400 ? "grid-cols-3" : "grid-cols-2"} gap-x-4`}>
                              
                              {
                                sos?.helpers?.filter(x => !x?.isCompleted && !x?.isCompletedConfirm)?.map((item, index) => {
                                  return <div className="shadow shadow-gray-500 text-xs sm:text-sm p-2">
                                <div className="text-[#c80000] font-medium">
                                  {item?.user?.name ? item?.user?.name : `Dumuc ${item?.user?.username}`}
                                </div>
                                <div className="">
                                  {item?.user?.phone}
                                </div>
                                <div className="font-medium">
                                  {item?.user?.rankingValue}
                                </div>
                              </div>
                                
                                })
                              }
                          
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                      </div>
                          </>
                        }
                      
                    </div>
                    }
                  </div>
                </div>
                : <LoginWithModal setClose={() => setOpenModal(false)} />
            }
          </Modal.Body>
        </Modal>

        <div className="mb-32"></div>
        <BannerRight />
        <TabbarBottom active="sos" />

      </div>
    </main >
  );
};

export default SOSPageContent;
