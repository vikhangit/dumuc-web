"use client"
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';

import { Button, message } from "antd";

import { updateProfile, getProfile, updateCCCDFrontPhoto, updateCCCDBackSidePhoto } from "@apis/users";
import Header from "@components/Header";
import { MdOutlineControlPoint } from "react-icons/md";

import BannerRight from "@components/BannerRight";
//apis
import { uploadImage } from "apis/other";
import Image from "next/image";
import TabbarBottom from "@components/TabbarBottom";
import { useWindowSize } from "@hooks/useWindowSize";
import { UploadOutlined } from '@ant-design/icons';
import { Spinner } from "flowbite-react";
import { useAuthState, useUpdateProfile } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const ProfilePage = () => {
  const router = useRouter();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [user, loading, errorAuth] = useAuthState(auth);
  const [setUser, updating, error] = useUpdateProfile(auth);

  const [name, setName] = useState(user?.displayName);
  const [nameError, setNameError] = useState("");

  const [phone, setPhone] = useState();
  const [phoneError, setPhoneError] = useState("");

  const [address, setAddress] = useState();
  const [addressError, setAddressError] = useState("");

  const [sex, setSex] = useState();
  const [sexError, setSexError] = useState("");
  const [plateArray, setPlateArray] = useState([])
  const [numberPlate, setNumberPlate] = useState(plateArray[0]);
  const [numberPlate2, setNumberPlate2] = useState(plateArray[1]);
  const [numberPlateError, setNumberPlateError] = useState("");
  const refImage = useRef(null);
  const refFontSide = useRef(null);
  const refBackSide = useRef(null)
  const [loadingAvatar, setLoadigAvatar] = useState(false);
  const [loadingFontSide, setLoadingFontSide] = useState(false);
  const [loadingBackSide, setLoadingBackSide] = useState(false);
  const [usingUser, setUsingUser] = useState()
  useEffect(() =>{
    (async () => {
      try {
        const dataCall = await getProfile(user?.accessToken) 
        setUsingUser(dataCall)
      } catch (e) {
        console.log(e)
      }
    })();
  },[user])
  console.log(usingUser)
  useEffect(() => {
    setName(usingUser?.name?.length > 0 ? usingUser?.name : user?.displayName)
    setAddress(usingUser?.address)
    setPhone(usingUser?.phone)
    setSex(usingUser?.sex)
    setPlateArray(usingUser?.numberPlate ? `${usingUser?.numberPlate}`?.replace(/\s/g, "")?.split(",") : [])
    
  },[usingUser])
  useEffect(() => {
    setNumberPlate(plateArray[0])
    setNumberPlate2(plateArray[1])
  },[plateArray])
  

  const size = useWindowSize()
  const handleChange = name => e => {
    setLoadigAvatar(true)
    if (name === 'photo' && e.target.files[0]) {
      uploadImage(e.target.files[0], user?.accessToken).then((data) => {
        updateProfile({
          photo: data?.url,
          userId: user?.userId
        }, user?.accessToken)
          .then(() => {
            setUser({
              photoURL: data?.url,
              displayName: name,
            })
            message.success("Cập nhật thành công");
            setLoadigAvatar(false)
          });
      });
    }
  };
  const handleChangeFontSide = name => e => {
    setLoadingFontSide(true)
    if (name === 'photo' && e.target.files[0]) {
      updateCCCDFrontPhoto(e.target.files[0], user?.accessToken).then((data) => {
        updateProfile({
          ...usingUser,
          cccdFrontPhoto: data?.url
        }, user?.accessToken)
        setLoadingFontSide(false)
        message.success("Cập nhật thành công");
      });
    }
  };
  const handleChangeBackSide = name => e => {
    setLoadingBackSide(true)
    if (name === 'photo' && e.target.files[0]) {
      updateCCCDBackSidePhoto(e.target.files[0], user?.accessToken).then((data) => {
        updateProfile({
          ...usingUser,
          cccdBackPhoto: data.url
        }, user?.accessToken)
        setLoadingBackSide(false)
        message.success("Cập nhật thành công");
      });
    }
  };

  useEffect(() => {
    if (user === undefined && loading === false) {
      const url_return = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/account/profile`
      router.push(`/auth?url_return=${url_return}`);
    }
  }, [user, loading])


  const save = () => {
    setLoadingSubmit(true);
    if (name === undefined || name === "") {
      setNameError("Vui lòng nhập Họ tên!");
      setLoadingSubmit(false);
      return;
    }

    if (phone === undefined || phone === '') {
      setPhoneError('Vui lòng nhập Số điện thoại!');
      setLoadingSubmit(false);
      return;
    }

    if (address === undefined || address === '') {
      setAddressError('Vui lòng nhập Địa chỉ!');
      setLoadingSubmit(false);
      return;
    }

    // if (sex === undefined || sex === '') {
    //   setSexError('Vui lòng chọn Giới tính!');
    //   setLoadingSubmit(false);
    //   return;
    // }

    if (numberPlate === undefined || numberPlate === '') {
      setNumberPlateError('Vui lòng nhập Biển số xe!');
      setLoadingSubmit(false);
      return;
    }

    //post data
    let item = {
      displayName: name,
      phone,
      address,
      sex,
      numberPlate: numberPlate2 != undefined && numberPlate2 != "" ? `${numberPlate?.replace(/\s/g, "")},${numberPlate2?.replace(/\s/g, "")}` : `${numberPlate?.replace(/\s/g, "")}`,
      userId: user?.userId,
    };
    updateProfile(item, user?.accessToken)
      .then(() => {
        setLoadingSubmit(false);
        message.success("Cập nhật thành công");

        getProfile(user?.accessToken)
          .then(profile => {
            setUser({
              displayName: name,
              photoURL: profile.photo
            })
            console.log('profile: ', profile)
          })
      });
  };
  // const string = `${numberPlate}, ${numberPlate}`

  return (
    <main className="w-full">
      <Header isBack={true} />
      <div class="px-0 sm:px-4 dark:bg-gray-900">
        <div >
          <div className="my-4 px-4 text-sm sm:text-md text-[#424141B2] font-semibold">Thông tin cơ bản</div>
          <div >
            <div class="bg-white rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-gray-800 border-b" style={{
              boxShadow: "0px 4px 4px 0px #00000040 inset"
            }}>
              {/* <h3 class="text-xl font-bold dark:text-white">Tài khoản</h3>
              <div className="mb-3 text-xs">Username: <span classname="text-[#c80000]">dumuc{user?.username}</span> (Dùng để tìm khi Chat, Call)</div> */}
              <div class="items-center flex justify-center flex-col mb-3">
                <label onClick={() => refImage.current.click()} class="flex justify-center items-center w-[150px] h-[120px] sm:w-[200px] sm:h-[160px] border border-[#00000033] rounded-lg cursor-pointer">
                  {
                    loadingAvatar ? <Spinner /> :  user?.photoURL?.length > 0 ? <Image width={0} height={0} sizes="100vw" className="w-full h-full rounded-lg" src={user?.photoURL} alt={user?.displayName} /> : <MdOutlineControlPoint color="#00000033" size="24" />
                  }
                </label>
               {user?.photoURL?.length > 0 && <Button  onClick={() => refImage.current.click()}  className="mt-3 mb-3" icon={<UploadOutlined />}>Thay đổi</Button>}
                <input id="photo" name="photo" ref={refImage} accept="image/png, image/jpeg" onChange={handleChange('photo')} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden" type="file"></input>
              </div>

              <div class="mb-3 flex items-center">
                <label
                  for="default-input"
                  class="block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white w-[105px]"
                >
                  Họ tên
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    id="default-input"
                    class={
                      name === ""
                        ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-xs sm:text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full px-2.5 py-1.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5"
                    }
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value === "") {
                        setNameError("Vui lòng nhập Họ tên!");
                      } else {
                        setNameError("");
                      }
                    }}
                    value={name}
                  />
                  {nameError !== "" && (
                    <p class="mt-1 text-xs sm:text-sm text-[#c80000] font-semibold">
                      {nameError}
                    </p>
                  )}
                </div>
              </div>
              <div class="mb-3 flex items-center">
                <label
                  for="default-input"
                  class="block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white w-[105px]"
                >
                  Email
                </label>
                <input
                  disabled
                  type="text"
                  id="default-input"
                  class={"bg-gray-200 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5"}
                  value={user?.email}
                />
              </div>
              <div class="mb-3 flex items-center">
                <label
                  for="default-input"
                  class="block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white w-[105px]"
                >
                  Điện thoại
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    id="default-input"
                    class={
                      phone === ""
                        ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-xs sm:text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full px-2.5 py-1.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5"
                    }
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (e.target.value === "") {
                        setPhoneError("Vui lòng nhập Số điện thoại!");
                      } else {
                        setPhoneError("");
                      }
                    }}
                    value={phone}
                  />
                  {phoneError !== "" && (
                    <p class="mt-1 text-sm text-[#c80000] font-semibold">
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>
              <div class="mb-3 w-full flex items-center">
                <label
                  htmlFor="sex"
                  className="block text-xs sm:text-sm font-medium text-gray-700 w-[105px]"
                >
                  Giới tính
                </label>
                <div className="w-full">

                  <select
                    id="sex"
                    name="sex"
                    className={
                     "mt-1 block w-full pl-3 pr-10 py-1.5 text-xs sm:text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    }
                    defaultValue={sex}
                    value={sex}
                    onChange={(e) => {
                      setSex(e.target.value);
                      // if (e.target.value === "") {
                      //   setSexError("Vui lòng chọn giới tính!");
                      // } else {
                      //   setSexError("");
                      // }
                    }}
                  >
                    <option key={""} value={""}>
                      {"Chọn giới tính"}
                    </option>
                    <option key={0} value={0}>
                      Nam
                    </option>
                    <option key={1} value={1}>
                      Nữ
                    </option>
                  </select>
                  {/* {sexError !== "" && (
                    <p class="mt-1 text-xs sm:text-sm text-[#c80000] font-semibold">
                      {sexError}
                    </p>
                  )} */}
                </div>
              </div>
              <div class="mb-3 flex items-center">
                <label
                  for="default-input"
                  class="block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white w-[105px]"
                >
                  Địa chỉ
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    id="default-input"
                    class={
                      address === ""
                        ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-xs sm:text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full px-2.5 py-1.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5"
                    }
                    onChange={(e) => {
                      setAddress(e.target.value);
                      if (e.target.value === "") {
                        setAddressError("Vui lòng nhập Địa chỉ!");
                      } else {
                        setAddressError("");
                      }
                    }}
                    value={address}
                  />
                  {addressError !== "" && (
                    <p class="mt-1 text-xs sm:text-sm text-[#c80000] font-semibold">
                      {addressError}
                    </p>
                  )}
                </div>
              </div>
              <div class="mb-3 flex items-center">
                <label
                  for="default-input"
                  class="block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white w-[105px]"
                >
                  Số xe 1
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    id="default-input"
                    class={
                      numberPlate === ""
                        ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-xs sm:text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full px-2.5 py-1.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        : "bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5"
                    }
                    onChange={(e) => {
                      setNumberPlate(e.target.value?.replace(/\s/g, ""));
                      if (e.target.value === "") {
                        setNumberPlateError("Vui lòng nhập Biển số xe!");
                      } else {
                        setNumberPlateError("");
                      }
                    }}
                    value={numberPlate?.replace(/\s/g, "")}
                  />
                  {numberPlateError !== "" && (
                    <p class="mt-1 text-xs sm:text-sm text-[#c80000] font-semibold">
                      {numberPlateError}
                    </p>
                  )}
                </div>
              </div>
              <div class="mb-3 flex items-center">
                <label
                  for="default-input"
                  class="block mb-2 text-xs sm:text-sm font-medium text-gray-900 dark:text-white w-[105px]"
                >
                  Số xe 2
                </label>
                <div className="w-full">
                  <input
                    type="text"
                    id="default-input"
                    class={
                      "bg-gray-50 border border-gray-300 text-gray-900 text-xs sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5"
                    }
                  onChange={(e) => {
                    setNumberPlate2(e.target.value?.replace(/\s/g, ""))
                  }}
                  value={numberPlate2?.replace(/\s/g, "")}
                  />
                  {/* {numberPlateError !== "" && (
                    <p class="mt-1 text-xs sm:text-sm text-[#c80000] font-semibold">
                      {numberPlateError}
                    </p>
                  )} */}
                </div>
              </div>
            </div>

            <div>
              <div className="my-4 px-4 text-sm sm:text-md text-[#424141B2] font-semibold">Cập nhật thông tin nâng cấp VIP</div>
              <div class="bg-white rounded-lg p-4 sm:p-6 xl:p-8 dark:bg-gray-800 mb-3 border-b" style={{
                boxShadow: "0px 4px 4px 0px #00000040 inset"
              }}>
                <div class={`items-center flex justify-center mb-3  ${size.width > 340 ? "gap-x-4" : "gap-x-2"}`}>
                  <div className={` flex flex-col items-center ${size.width > 340 ? "basis-auto" : "basis-1/2"}`}>
                    <div class={`items-center flex justify-center w-full`}>
                      <label  onClick={() => refFontSide.current.click()}  class={`flex justify-center items-center ${size.width > 340 ? "w-[150px] h-[120px] sm:w-[200px] sm:h-[160px]" : "w-full h-[120px]"} border border-[#00000033] rounded-lg cursor-pointer`}>
                        {
                         loadingFontSide ? <Spinner /> : usingUser?.cccdFrontPhoto ? <Image width={0} height={0} sizes="100vw" className="w-full h-full rounded-lg" src={usingUser?.cccdFrontPhoto} alt={usingUser?.name} /> :  <MdOutlineControlPoint color="#00000033" size="24" />
                        }
                      </label>                  
                      <input id="cccd-1" ref={refFontSide} name="photo1" onChange={handleChangeFontSide('photo')} accept="image/png, image/jpeg" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden" type="file"></input>
                    </div>
                    <div className="mt-2 text-sm sm:text-md text-[#424141B2] font-semibold text-center">CCCD mặt trước</div>
                    {user?.cccdFrontPhoto && <Button  onClick={() => refFontSide.current.click()}  className="mt-2 mb-3" icon={<UploadOutlined />}>Thay đổi</Button>}
                  </div>
                  <div className={`flex flex-col items-center ${size.width > 340 ? "basis-auto" : "basis-1/2"}`}>
                    <div class={`items-center flex justify-center w-full`}>
                      <label  onClick={() => refBackSide.current.click()} class={`flex justify-center items-center ${size.width > 340 ? "w-[150px] h-[120px] sm:w-[200px] sm:h-[160px]" : "w-full h-[120px]"} border border-[#00000033] rounded-lg cursor-pointer`}>
                        {
                        loadingBackSide ?  <Spinner /> : usingUser?.cccdBackPhoto ? <Image width={0} height={0} sizes="100vw" className="w-full h-full rounded-lg" src={usingUser?.cccdBackPhoto} alt={usingUser?.name} /> : <MdOutlineControlPoint color="#00000033" size="24" />
                        }
                      </label>
                      
                      <input id="cccd-2" ref={refBackSide} name="photo" onChange={handleChangeBackSide('photo')} accept="image/png, image/jpeg" className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden" type="file"></input>
                    </div>
                    <div className="mt-2 text-sm sm:text-md text-[#424141B2] font-semibold text-center">CCCD mặt sau</div>
                    {user?.cccdBackPhoto && <Button  onClick={() => refBackSide.current.click()}  className="mt-2 mb-3" icon={<UploadOutlined />}>Thay đổi</Button>}
                  </div>
                </div>
                <div className="w-full mt-6 flex justify-center">
                  {loadingSubmit ? (
                    <button
                      disabled
                      type="button"
                      className="text-white w-[160px] sm:w-1/2 bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm py-1.5 mb-2"
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
                      Đang cập nhật...
                    </button>
                  ) : (
                    <button
                      onClick={save}
                      type="button"
                      class="text-white w-[160px] sm:w-1/2  bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs sm:text-sm py-1.5 mb-2"
                    >
                      Cập nhật
                    </button>
                  )}
                </div>
                <div className="text-sm sm:text-md text-[#424141B2] font-medium mt-3">Mã ID hệ thống là: dumuc{user?.username}</div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-28"></div>
      </div>
      <BannerRight isAppInstall={true} />
      <TabbarBottom />
    </main>
  );
};

export default ProfilePage;
