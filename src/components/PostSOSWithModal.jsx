"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Header from "@components/Header";
import Link from "next/link";
import { message } from "antd";

//apis
import { createUserRanking, generateCustomToken } from "@apis/users";

import { getCategories } from "@apis/posts";

import { getSos, createSos, updateSos } from "@apis/soss";
import { getAddressFromLatLng } from "@apis/other";
import { uploadImage } from "apis/other";
import { Modal, Spinner } from "flowbite-react";
import Image from "next/image";
import SOSMapGetLongLat from "./SOSMapGetLongLat";
import { auth } from "@utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useWindowSize } from "@hooks/useWindowSize";

function PostSOSWithModal({ searchParams, setModalSuccess, setCloseForm }) {
  const sosId = searchParams?.id;
  const router = useRouter();
  const pathname = usePathname();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(-1);
  const deadlines = [
    {
      id: 1,
      name: "15 phút",
      value: 15,
    },
    {
      id: 2,
      name: "30 phút",
      value: 30,
    },
    {
      id: 3,
      name: "1 giờ",
      value: 60,
    },
    {
      id: 4,
      name: "2 giờ",
      value: 120,
    },
    {
      id: 5,
      name: "3 giờ",
      value: 180,
    },
    {
      id: 6,
      name: "4 giờ",
      value: 240,
    },
    {
      id: 7,
      name: "5 giờ",
      value: 300,
    },
    {
      id: 8,
      name: "6 giờ",
      value: 360,
    },
  ];
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState();
  const [categoryError, setCategoryError] = useState("");

  const [description, setDescription] = useState();
  const [descriptionError, setDescriptionError] = useState();

  const [deadline, setDeadline] = useState();
  const [deadlineError, setDeadlineError] = useState("");

  const string = `${user?.numberPlate}`;

  const [numberPlate, setNumberPlate] = useState(string.split(","));
  const [activeNumber, setActiveNumber] = useState(numberPlate[0]);

  const maxPhotos = 3;
  const [photos, setPhotos] = useState(["", "", ""]);
  const [photosError, setPhotosError] = useState();
  const [linkLiveStream, setLinkLiveStream] = useState();
  const [linkLiveStreamError, setLiveStreamError] = useState("");
  const maximumSize = 5 * 1024 * 1024;
  const [showMap, setShowMap] = useState(false);

  const handleChange = (index) => (e) => {
    if (e.target?.files[0]) {
      setLoadingImage(index);
      return uploadImage(e.target.files[0], user?.accessToken).then((data) => {
        let newArr = [...photos];
        newArr[index] = data?.url;
        setPhotos([...newArr]);
        setLoadingImage(-1);
        setPhotosError("");
      });
    }
  };
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [address_components, setAddress_components] = useState();
  const sizes = useWindowSize();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({
          lat: latitude,
          lng: longitude,
        });
      }
    );
    getCategories().then((result) => {
      setCategories(result.filter((x) => x.type === "soss"));
    });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (user && coordinates.lat && coordinates.lng) {
          let addressData = await getAddressFromLatLng(
            {
              lat: coordinates.lat,
              lng: coordinates.lng,
            },
            user?.accessToken
          );
          setAddress(addressData?.results[0]?.formatted_address);
          setAddress_components(addressData?.results[0]?.address_components);
        }
      } catch (e) {}
    })();
  }, [user, coordinates]);

  const getMyLocation = async () => {
    if (address && address_components) {
      message.warning("Bạn đã lấy được địa chỉ rồi");
    } else {
      try {
        if (user && coordinates.lat && coordinates.lng) {
          let addressData = await getAddressFromLatLng(
            {
              lat: coordinates.lat,
              lng: coordinates.lng,
            },
            user?.accessToken
          );
          setAddress(addressData?.results[0]?.formatted_address);
          setAddress_components(addressData?.results[0]?.address_components);
        }
      } catch (e) {}
      setTimeout(() => {
        if (!address || !address_components) {
          message.error("Hệ thông đang giới hạn lượt lấy địa chỉ");
        } else {
          message.success("Lấy địa chỉ thành công");
        }
      }, 1000);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (sosId) {
          let sos = await getSos({
            sosId,
          });

          setCategory(sos?.category);
          setDescription(sos?.description);
          setDeadline(sos?.deadline);
          setPhotos(sos?.photos);
        }
      } catch (e) {}
    })();
  }, [sosId]);
  const save = () => {
    setLoading(true);
    let item = {
      deadline,
      description,
    };

    if (coordinates.lat === 0 && coordinates.lng === 0) {
      message.error("Vui lòng bật định vị!");
      setLoading(false);
      return;
    }
    // if (!address_components) {
    //   message.error("Hệ thống lỗi tạm thời không lấy được vị trí của bạn");
    //   setLoading(false);
    //   return;
    // }
    if (user?.name === undefined || user?.name === "") {
      message.error("Vui lòng cập nhật tên vào thông tin cá nhân của bạn");
      setLoading(false);
      return;
    }
    if (user?.numberPlate === undefined || user?.numberPlate === "") {
      message.error(
        "Vui lòng cập nhật biển số xe vào thông tin cá nhân của bạn"
      );
      setLoading(false);
      return;
    }

    if (category === undefined || category === "") {
      setCategoryError("Vui lòng chọn loại S.O.S!");
      setLoading(false);
      return;
    }
    if (deadline === undefined || deadline === "") {
      setDeadlineError("Vui lòng chọn thời hạn!");
      setLoading(false);
      return;
    }
    if (description === undefined || description === "") {
      setDescriptionError("Vui lòng nhập mô tả chi tiết!");
      setLoading(false);
      return;
    }

    //require photos
    if (photos.findIndex((x) => x !== "") < 0) {
      setPhotosError("Vui lòng chọn ít nhất 1 hình ảnh!");
      setLoading(false);
      return;
    }
    if (linkLiveStream === undefined || linkLiveStream == "") {
      setLiveStreamError("Vui lòng nhập link livestream");
      setLoading(false);
      return;
    }

    const cat = categories.find((item) => item.categoryId === category);
    let categoryParent;
    if (cat?.categoryParentId) {
      //menu 2 level
      categoryParent = cat?.categoryParentId;
    } else {
      //menu 1 level
      categoryParent = cat?.categoryId;
    }
    item.category = category;
    item.categoryParent = categoryParent;
    item.lat = coordinates.lat;
    item.lng = coordinates.lng;
    item.address = address;
    item.address_components = address_components;
    item.photos = photos.filter((x) => x !== "");
    item.status = 0;
    item.numberPlate = activeNumber;
    item.livestream_link = linkLiveStream;

    if (sosId) {
      //update
      updateSos(
        {
          ...item,
          sosId,
        },
        user?.accessToken
      )
        .then((result) => {
          message.success("SOS đã được cập nhật thành công");
          router.push("/account/library?tab=mysos");
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    } else {
      // update
      createSos(item, user?.accessTokenn)
        .then((result) => {
          setCloseForm(false);
          setModalSuccess(true);
          //ranking
          createUserRanking(
            {
              rankingType: "sos_creat",
              rankingValue: 5,
              rankingDocId: result?.sosId,
            },
            user?.accessToken
          ).then(() => {
            // router.push("/sos/");
            setLoading(false);
          });
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  return (
    <main className="w-full">
      <div className="w-full sm:px-6 py-2" style={{ marginTop: 1 }}>
        <div
          className={`mb-6 flex 
        justify-between  border-b border-[#CFC8C8] ${
          sizes.width > 380
            ? "flex-row items-center pb-14"
            : "flex-col items-start pb-6"
        }`}
        >
          <div
            className={`flex flex-col gap-y-3 items-start ${
              sizes.width > 450
                ? "w-[calc(100%-125px)] sm:w-[calc(100%-125px)]"
                : `${sizes.width > 380 ? "w-[calc(100%-80px)]" : "w-full"}`
            }`}
          >
            <div className={`flex w-full items-center justify-between`}>
              <div
                className={`${
                  sizes.width > 380
                    ? "w-[80px] sm:w-[100px] text-xs sm:text-sm "
                    : "w-[62px] text-[10px]"
                } font-semibold sm:font-medium`}
              >
                Tỉnh/ thành
              </div>
              <select
                disabled
                className={`${
                  sizes.width > 380
                    ? "w-[calc(100%-85px)] sm:w-[calc(100%-105px)] text-xs sm:text-sm "
                    : "w-[calc(100%-68px)] text-[10px]"
                } rounded-full font-semibold sm:font-medium  border border-[#CFC8C8]`}
              >
                <option>
                  {address_components ? address_components[3]?.short_name : ""}
                </option>
              </select>
            </div>
            <div className="flex w-full items-center justify-between">
              <div
                className={`${
                  sizes.width > 380
                    ? "w-[80px] sm:w-[100px] text-xs sm:text-sm "
                    : "w-[62px] text-[10px]"
                } font-semibold sm:font-medium`}
              >
                Quận huyện
              </div>
              <select
                disabled
                className={`${
                  sizes.width > 380
                    ? "w-[calc(100%-85px)] sm:w-[calc(100%-105px)] text-xs sm:text-sm "
                    : "w-[calc(100%-68px)] text-[10px]"
                } rounded-full font-semibold sm:font-medium border border-[#CFC8C8]`}
              >
                <option>
                  {address_components ? address_components[2]?.short_name : ""}
                </option>
              </select>
            </div>
            <div className="flex w-full items-center justify-between">
              <div
                className={`${
                  sizes.width > 380
                    ? "w-[80px] sm:w-[100px] text-xs sm:text-sm "
                    : "w-[62px] text-[10px]"
                } font-semibold sm:font-medium`}
              >
                Vị trí
              </div>
              <textarea
                className={`${
                  sizes.width > 380
                    ? "w-[calc(100%-85px)] sm:w-[calc(100%-105px)] text-xs sm:text-sm "
                    : "w-[calc(100%-68px)] text-[10px]"
                } rounded-lg font-semibold sm:font-medium  border border-[#CFC8C8]`}
                rows={4}
                readOnly
                value={`${
                  address
                    ? `${address_components[0]?.short_name} ${address_components[1]?.short_name}`
                    : ""
                }`}
              ></textarea>
            </div>
          </div>
          <div
            className={`${
              sizes.width > 380 ? "w-[110px]" : "w-full"
            }  flex justify-end`}
          >
            <div
              className={`${
                sizes.width > 480
                  ? "w-[80px]"
                  : `${
                      sizes.width > 380 && sizes.width < 480
                        ? "w-[70px]"
                        : "w-[calc(100%-68px)] ml-auto rounded-full mt-3"
                    }`
              } font-semibold sm:font-medium bg-white shadow-md rounded-[100%] shadow-gray-500 ${
                sizes.width > 380
                  ? "text-[10px] sm:text-xs py-3"
                  : "px-2 text-[10px] py-1"
              }  flex flex-col items-center justify-center text-center cursor-pointer`}
              onClick={() => getMyLocation()}
            >
              <Image
                src="/icons/map-check.png"
                alt="nav"
                width={24}
                height={24}
              />
              <div className="text-gray-400">Lấy vị trí</div>
            </div>
          </div>
        </div>
        <div
          className={`mb-0 flex 
        justify-between ${
          sizes.width > 380 ? "flex-row items-center" : "flex-col items-start"
        }`}
        >
          <div
            className={`flex flex-col items-start ${
              sizes.width > 480
                ? "w-[calc(100%-125px)] sm:w-[calc(100%-125px)]"
                : `${sizes.width > 380 ? "w-[calc(100%-105px)]" : "w-full"}`
            }`}
          >
            <div className={`flex w-full items-center justify-between`}>
              <div
                className={`${
                  sizes.width > 380
                    ? "w-[80px] sm:w-[100px] text-xs sm:text-sm "
                    : "w-[62px] text-[10px]"
                } font-semibold sm:font-medium`}
              >
                Chọn SOS
              </div>
              <select
                className={` border border-[#CFC8C8] ${
                  sizes.width > 380
                    ? "w-[calc(100%-85px)] sm:w-[calc(100%-105px)] text-xs sm:text-sm "
                    : "w-[calc(100%-68px)] text-[10px]"
                } rounded-full font-semibold sm:font-medium`}
                defaultValue={category}
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === "") {
                    setCategoryError("Vui lòng chọn danh mục!");
                  } else {
                    setCategoryError("");
                  }
                }}
              >
                <option key={""} value={""}>
                  {"Chọn loại SOS"}
                </option>
                {categories
                  .filter((x) => x.categoryParentId === "")
                  .map((item) => {
                    return categories
                      .filter((y) => y.categoryParentId === item.categoryId)
                      .map((sub) => {
                        return (
                          <option key={sub.categoryId} value={sub.categoryId}>
                            {sub.name}
                          </option>
                        );
                      });
                  })}
              </select>
            </div>
            {categoryError !== "" && (
              <div className={`flex w-full items-center`}>
                <div
                  className={`${
                    sizes.width > 380
                      ? "w-[80px] sm:w-[100px] text-xs sm:text-sm "
                      : "w-[62px] text-[10px]"
                  } font-semibold sm:font-medium`}
                ></div>
                <p class="mt-1.5 ml-2 text-[10px] sm:text-xs text-[#c80000] font-semibold sm:font-medium">
                  {categoryError}
                </p>
              </div>
            )}
            <div className="mt-3 flex w-full items-center justify-between">
              <div
                className={`${
                  sizes.width > 380
                    ? "w-[80px] sm:w-[100px] text-xs sm:text-sm "
                    : "w-[62px] text-[10px]"
                } font-semibold sm:font-medium`}
              >
                Số xe
              </div>
              <select
                className={` border border-[#CFC8C8] ${
                  sizes.width > 380
                    ? "w-[calc(100%-85px)] sm:w-[calc(100%-105px)] text-xs sm:text-sm "
                    : "w-[calc(100%-68px)] text-[10px]"
                } rounded-full font-semibold sm:font-medium`}
                defaultValue={activeNumber}
                value={activeNumber?.replace(/\s/g, "")}
                onChange={(e) => {
                  setActiveNumber(e.target.value?.replace(/\s/g, ""));
                }}
              >
                {numberPlate.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            {/* {numberPlateErr !== "" && (
              <p class="mt-1.5 text-[10px] sm:text-xs text-[#c80000] font-semibold sm:font-medium">
                {numberPlateErr}
              </p>
            )} */}
            <div className="mt-3 flex w-full items-center justify-between">
              <div
                className={`${
                  sizes.width > 380
                    ? "w-[80px] sm:w-[100px] text-xs sm:text-sm "
                    : "w-[62px] text-[10px]"
                } font-semibold sm:font-medium`}
              >
                Thời hạn
              </div>
              <select
                className={` border border-[#CFC8C8] ${
                  sizes.width > 380
                    ? "w-[calc(100%-85px)] sm:w-[calc(100%-105px)] text-xs sm:text-sm "
                    : "w-[calc(100%-68px)] text-[10px]"
                } rounded-full font-semibold sm:font-medium`}
                defaultValue={parseInt(deadline)}
                value={parseInt(deadline)}
                onChange={(e) => {
                  setDeadline(e.target.value);
                  if (e.target.value === "") {
                    setDeadlineError("Vui lòng chọn thời hạn!");
                  } else {
                    setDeadlineError("");
                  }
                }}
              >
                <option key={""} value={""}>
                  {"Chọn thời hạn"}
                </option>
                {deadlines.map((item) => {
                  return (
                    <option key={item.id} value={item.value}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {deadlineError !== "" && (
              <div className="flex w-full items-center">
                <div
                  className={`${
                    sizes.width > 380
                      ? "w-[80px] sm:w-[100px] text-xs sm:text-sm "
                      : "w-[62px] text-[10px]"
                  } font-semibold sm:font-medium`}
                ></div>
                <p
                  class="mt-1.5 ml-2 text-[10px] sm:text-xs text-[#c80000] font-semibold sm:font-medium"
                  style={{
                    color: "#c80000",
                  }}
                >
                  {deadlineError}
                </p>
              </div>
            )}
            <div className="flex w-full items-center justify-between">
              <label
                for="message"
                className={`${
                  sizes.width > 380
                    ? "w-[80px] sm:w-[100px] text-xs sm:text-sm "
                    : "w-[62px] text-[10px] hidden"
                } font-semibold sm:font-medium`}
              >
                Ghi chú khác
              </label>
            </div>
          </div>
          <div
            onClick={() => router.push("/account/profile")}
            className={`${
              sizes.width > 480
                ? "w-[110px]"
                : `${
                    sizes.width > 380 && sizes.width < 480
                      ? "w-[95px]"
                      : "w-[calc(100%-68px)] ml-auto mt-3 block"
                  }`
            } font-semibold sm:font-medium  border border-[#CFC8C8] px-2 border-dashed ${
              sizes.width > 380
                ? "text-[10px] sm:text-xs py-3"
                : "px-2 text-[10px] py-1"
            }  flex flex-col items-start justify-center text-center cursor-pointer`}
          >
            <div>Người gửi</div>
            <div className="ml-2">{user?.name}</div>
            <div>Số xe</div>
            <div className="ml-2">{user?.numberPlate}</div>
            <div className="text-[10px] underline">Cập nhật thông tin</div>
          </div>
        </div>
        <div class="mb-6 w-full">
          <label
            for="message"
            className={`${
              sizes.width > 380
                ? "w-[80px] sm:w-[100px] text-xs sm:text-sm hidden"
                : "w-[62px] text-[10px] block"
            } font-semibold sm:font-medium`}
          >
            Ghi chú khác
          </label>
          <textarea
            id="message"
            rows="4"
            className={`${
              sizes.width > 380
                ? "text-xs sm:text-sm mt-1.5"
                : "text-[10px] mt-1.5"
            } rounded-lg font-semibold sm:font-medium w-full py-2.5  border border-[#CFC8C8]`}
            placeholder=""
            onChange={(e) => {
              setDescription(e.target.value);
              if (e.target.value === "") {
                setDescriptionError("Vui lòng nhập mô tả chi tiết!");
              } else {
                setDescriptionError("");
              }
            }}
            value={description}
          />
          {descriptionError !== "" && (
            <p class="mt-1.5 text-[10px] sm:text-xs text-[#c80000] font-semibold sm:font-medium">
              {descriptionError}
            </p>
          )}
        </div>
        <div className="w-full">
          {loading ? (
            <button
              disabled
              type="button"
              className="text-white w-full bg-[#c80000] bg-opacity-60 hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 shadow-md shadow-gray-500"
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
              Đang gửi...
            </button>
          ) : (
            <button
              onClick={save}
              type="button"
              className="text-white w-full bg-[#c80000] bg-opacity-60 hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 shadow-md shadow-gray-500"
            >
              {sosId ? "CẬP NHẬT YÊU CẦU" : "GỬI YÊU CẦU"}
            </button>
          )}
        </div>
        <div class="w-full mt-3">
          <div class="text-[10px] text-xs text-gray-900  border-b border-[#CFC8C8] font-semibold py-1 w-full">
            png, jpg
          </div>
          <div className="grid grid-cols-3 gap-x-2 sm:gap-x-4 gap-y-4 mt-4">
            {/* {photos.map((url, index) => {
              return (
                <div key={index} className="relative">
                  {url && (
                    <button
                      className="absolute -top-2 -right-2 bg-black rounded-full p-1 shadow shadow-white z-50 close-btn"
                      onClick={() => {
                        setPhotos(photos?.filter(x => x !== url))
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-3 h-3 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                  <div className="cursor-pointer bg-gray-200 rounded-md w-[100px] h-[100px] flex justify-center items-center border-0 focus:border border-blue-600 image">
                    <Image
                      width={0} height={0} sizes="100vw"
                      src={url}
                      className="w-[100px] h-[100px] rounded-md"
                      alt=""
                    />
                  </div>
                </div>
              );
            })} */}
            {photos.map((item, index) => (
              <div
                key={index}
                className={`relative w-full ${
                  sizes.width > 450
                    ? "h-32"
                    : sizes.width > 376
                    ? "h-28"
                    : sizes.width > 300
                    ? "h-24"
                    : "h-20"
                }`}
              >
                <input
                  type="file"
                  id={`photo${index}`}
                  onChange={handleChange(index)}
                  style={{ display: "none" }}
                />
                <label
                  for={`photo${index}`}
                  className="cursor-pointer border-2 border-gray-200 rounded-md w-full h-full flex justify-center items-center shadow shadow-gray-300"
                >
                  {item != "" && item.length > 0 ? (
                    <Image
                      src={item}
                      alt="Image"
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="rounded-md w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex justify-center items-center w-full h-full">
                      {loadingImage === index ? (
                        <Spinner />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-gray-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>
                  )}
                </label>
              </div>
            ))}
          </div>
          {photosError !== "" && (
            <p class="mt-1.5 text-[10px] sm:text-xs text-[#c80000] font-semibold sm:font-medium">
              {photosError}
            </p>
          )}
          <div
            className={`grid  ${
              sizes.width > 420
                ? "grid-cols-3 gap-x-4 items-center"
                : "grid-cols-2 gap-x-2"
            } mt-4 `}
          >
            <div
              className={`${
                sizes.width > 420 ? "col-span-1 h-fit py-4" : "h-32"
              } bg-white shadow-lg shadow-gray-500 flex flex-col justify-center items-center rounded-3xl cursor-pointer`}
              onClick={() => {
                auth.onAuthStateChanged(async (currentUser) => {
                  if (currentUser) {
                    const [token] = await Promise.all([
                      currentUser.getIdToken(true),
                    ]);

                    generateCustomToken(token).then((result) => {
                      // window.open(`${process.env.NEXT_PUBLIC_COMMUNICAION_URL}/livestream/${result?.token}`, "_blank");
                    });
                  }
                });
              }}
            >
              <Image
                src="/icons/play.png"
                width={0}
                height={0}
                sizes="100vw"
                className="w-6 h-6"
              />
              <div className="text-[10px] sm:text-xs font-medium text-[#c80000] mt-2">
                STREAM LIVE VIDEO
              </div>
            </div>
            {/* <div className={`rounded-3xl ${sizes.width > 420 ? "col-span-2 shadow shadow-gray-400" : "shadow-lg shadow-gray-500" } bg-white h-32  flex justify-center items-center border border-gray-300 flex justify-center items-center`}>
            <Image src="/icons/play1.png" width={0} height={0} sizes="100vw" className="w-6 h-6" />
            </div> */}
            {/* <input className={  
                   ` px-2.5 rounded-3xl ${sizes.width > 420 ? "col-span-2 shadow shadow-gray-400" : "shadow-lg shadow-gray-500" } bg-white h-32  flex justify-center items-center border font-semibold sm:font-medium border-gray-300 flex justify-center items-center ${sizes.width > 380 ? "text-xs sm:text-sm" : "text-[10px]"}`
                }
                placeholder="Nhập link live"
                onChange={(e) => {
                  setLinkLiveStream(e.target.value);
                  if (e.target.value === "") {
                    setLiveStreamError("Vui lòng nhập link livestream");
                  } else {
                    setLiveStreamError("");
                  }
                }} /> */}
          </div>
          {linkLiveStreamError != "" && (
            <div
              className={`grid  ${
                sizes.width > 420
                  ? "grid-cols-3 gap-x-4 items-center"
                  : "grid-cols-2 gap-x-2"
              }`}
            >
              <div
                className={`${
                  sizes.width > 420 ? "col-span-1 h-fit py-4" : ""
                } flex flex-col justify-center items-center rounded-3xl cursor-pointer`}
              ></div>

              <div className={`${sizes.width > 420 ? "col-span-2" : ""}`}>
                <p
                  className={`${
                    sizes.width > 420 ? "mt-1.5" : "mt-3"
                  } ml-2 text-[10px] sm:text-xs text-[#c80000] font-semibold sm:font-medium`}
                >
                  {linkLiveStreamError}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        show={showMap}
        onClose={() => setShowMap(false)}
        style={{
          padding: sizes.width > 376 ? 4 : 0,
        }}
      >
        {/* <Modal.Header className="bg-[#c80000] bg-opacity-60 rounded-b-xl justify-center text-center  text-white [&>h3]:text-white [&>h3]:w-full [&>h3]:text-base [&>h3]:sm:text-xl  [&>button]:ml-auto p-2.5 [&>button]:text-white">
            {user ? "Tạo SOS mới" : "Xin mời đăng nhập"}
          </Modal.Header> */}
        <Modal.Body className="px-2 sm:px-4">
          <SOSMapGetLongLat />
        </Modal.Body>
      </Modal>
    </main>
  );
}

export default PostSOSWithModal;
