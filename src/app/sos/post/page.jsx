"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@components/Header";
import { message } from "antd";

//apis
import { createUserRanking } from "@apis/users";

import { getCategories } from "@apis/posts";

import { getSos, createSos, updateSos } from "@apis/soss";
import { getAddressFromLatLng } from "@apis/other";
import { uploadImage } from "apis/other";
import { Spinner } from "flowbite-react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const SOSPostPage = ({ searchParams }) => {
  const sosId = searchParams?.id;

  const router = useRouter();
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);

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
  const [deadlineError, setDeadlineError] = useState();

  const maxPhotos = 3;
  const [photos, setPhotos] = useState([]);
  const [photosError, setPhotosError] = useState();
  const maximumSize = 5 * 1024 * 1024;

  const handleChange = (name) => (e) => {
    if (name === "photo") {
      if (photos.length < maxPhotos) {
        if (e.target.files[0].size > maximumSize) {
          message.error("Ảnh tải lên dung lượng quá lớn");
        } else {
          setLoadingImage(true);
          return uploadImage(e.target.files[0], user?.accessToken).then(
            (data) => {
              setPhotos([...photos, data?.url]);
              setLoadingImage(false);
            }
          );
        }
      }
    }
  };

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [address, setAddress] = useState("");
  const [address_components, setAddress_components] = useState();

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
    // if (!address) {
    //   message.error("Hệ thống lỗi tạm thời không lấy được vị trí của bạn");
    //   setLoading(false);
    //   return;
    // }

    if (category === undefined || category === "") {
      setCategoryError("Vui lòng chọn loại S.O.S!");
      setLoading(false);
      return;
    }

    if (description === undefined || description === "") {
      setDescriptionError("Vui lòng nhập mô tả chi tiết!");
      setLoading(false);
      return;
    }

    if (deadline === undefined || deadline === "") {
      setDeadlineError("Vui lòng chọn thời hạn!");
      setLoading(false);
      return;
    }

    //require photos
    if (photos.length <= 0 || photos === null) {
      setPhotosError("Vui lòng chọn ít nhất 1 hình ảnh!");
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
    item.photos = photos;
    item.status = 0;

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
      createSos(item, user?.accessToken)
        .then((result) => {
          message.success("SOS đã được gửi thành công");

          //ranking
          createUserRanking(
            {
              rankingType: "sos_creat",
              rankingValue: 5,
              rankingDocId: result?.sosId,
            },
            user?.accessToken
          ).then(() => {
            router.push("/sos/");
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
      <Header isBack={true} />
      <div className="w-full px-10 py-6" style={{ marginTop: 1 }}>
        <h2 className="text-[#c80000] font-bold text-center mb-2">
          Gửi yêu cầu hỗ trợ S.O.S
        </h2>

        <div class="mb-6">
          <label
            for="default-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Vị trí của bạn
          </label>
          <input
            type="text"
            id="default-input"
            class={
              "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            }
            value={address}
            readOnly
          />
        </div>

        <div class="mb-6 w-full">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Loại S.O.S
          </label>
          <select
            id="location"
            name="location"
            className={
              category === ""
                ? "mt-1 block w-full pl-3 pr-10 py-2 bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                : "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            }
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
              {"Chọn danh mục"}
            </option>
            {categories
              .filter((x) => x.categoryParentId === "")
              .map((item) => {
                return (
                  <optgroup key={item.categoryId} label={item.name}>
                    {categories
                      .filter((y) => y.categoryParentId === item.categoryId)
                      .map((sub) => {
                        return (
                          <option key={sub.categoryId} value={sub.categoryId}>
                            {sub.name}
                          </option>
                        );
                      })}
                  </optgroup>
                );
              })}
          </select>
          {categoryError !== "" && (
            <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
              {categoryError}
            </p>
          )}
        </div>

        <div class="mb-6 w-full">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Mô tả chi tiết
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700"
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
            <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
              {descriptionError}
            </p>
          )}
        </div>

        <div class="mb-6 w-full">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Thời hạn
          </label>
          <select
            id="location"
            name="location"
            className={
              deadline === undefined
                ? "mt-1 block w-full pl-3 pr-10 py-2 bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                : "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            }
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
          {deadlineError !== "" && (
            <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
              {deadlineError}
            </p>
          )}
        </div>

        <div class="mb-6 w-full">
          <label htmlFor="photos" className="block mb-2 text-sm">
            Hình ảnh
          </label>
          <div className="flex gap-x-4 image-sos gap-y-4">
            {photos.map((url, index) => {
              return (
                <div key={index} className="relative">
                  {url && (
                    <button
                      className="absolute -top-2 -right-2 bg-black rounded-full p-1 shadow shadow-white z-50 close-btn"
                      onClick={() => {
                        setPhotos(photos?.filter((x) => x !== url));
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
                      width={0}
                      height={0}
                      sizes="100vw"
                      src={url}
                      className="w-[100px] h-[100px] rounded-md"
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
            {photos.length < 3 && (
              <div className="relative">
                <input
                  type="file"
                  id={`photo`}
                  onChange={handleChange("photo")}
                  style={{ display: "none" }}
                />
                <label
                  for={`photo`}
                  className="cursor-pointer bg-gray-200 rounded-md w-[100px] h-[100px] flex justify-center items-center border-0 focus:border border-blue-600 image"
                >
                  <div className="flex justify-center items-center">
                    {loadingImage ? (
                      <Spinner />
                    ) : (
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
                    )}
                  </div>
                </label>
              </div>
            )}
          </div>
          <p class="mt-1 text-sm text-gray-500">PNG, JPG (Tối đa 5MB).</p>
          {photosError !== "" && (
            <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
              {photosError}
            </p>
          )}
        </div>

        <div className="w-full">
          {loading ? (
            <button
              disabled
              type="button"
              className="text-white w-full bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
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
              className="text-white w-full bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              {sosId ? "Cập nhật yêu cầu" : "Gửi yêu cầu"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default SOSPostPage;
