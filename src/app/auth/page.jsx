"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { createUser } from "@apis/auth";
import Header from "@components/Header";
import { Select, message } from "antd";
import BannerRight from "@components/BannerRight";
import {
  RecaptchaVerifier,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import dynamic from "next/dynamic";
import { auth, providerGoogle } from "utils/firebase";
import { dataCoutryCode } from "@utils/countryCode";
import { replaceStringByIndex } from "@utils/functions";
import { getUnicode } from "emoji-dictionary";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import isEmail from "validator/lib/isEmail";
const TabbarBottom = dynamic(
  () => {
    return import("@components/TabbarBottom");
  },
  { ssr: false }
);

export default function PasswordlessPage({ searchParams }) {
  const query = searchParams;
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [user, loading] = useAuthState(auth);
  const [loadingAction, setLoadingAction] = useState(false);
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [errorCode, setErrorCode] = useState();
  const [emailForSignIn, setEmailForSignIn] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [sendOtp, setSendOtp] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activePhoneCode, setActivePhoneCode] = useState("+84");
  const [selectedItem, setSelectedItem] = useState(
    <div className="flex items-center gap-x-2">
      <Image
        src={`https://flagcdn.com/16x12/vn.png`}
        srcset={`https://flagcdn.com/32x24/vn.png 2x,
https://flagcdn.com/48x36/vn.png 3x`}
        width={16}
        height={12}
        alt={"Vietnam"}
      ></Image>
      +84
    </div>
  );

  const loginGoogle = () => {
    signInWithPopup(auth, providerGoogle)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //let token = result.credential.accessToken;
        let userCreate = result.user;

        createUser({
          uid: userCreate.uid,
          email: userCreate.email,
          name: userCreate.displayName,
          phone: userCreate.phoneNumber,
          photo: userCreate.photoURL,
        })
          .then((result) => {
            setLoadingAction(false);
            message.success("Đăng nhập thành công");
            onAuthStateChanged(auth, (user) => {
              if (user) {
                //redirect
                localStorage.setItem("userLogin", JSON.stringify(user));
                localStorage.setItem("userId", JSON.stringify(user?.uid));
                localStorage.setItem(
                  "userToken",
                  JSON.stringify(user?.accessToken)
                );
                if (
                  query?.url_return !== undefined &&
                  query?.url_return !== "undefined"
                ) {
                  const url_return = query?.url_return;
                  router.push(url_return);
                } else {
                  router.push("/");
                }
              }
            });
          })
          .catch((err) => {
            setLoadingAction(false);
            message.error(err.message);
          });
      })
      .catch(function (error) {
        setLoadingAction(false);
        message.error(error.message);
      });
  };
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );
  }, [auth]);
  const handleSendOtp = async () => {
    setLoadingAction(true);
    try {
      const phoneNumberFormater =
        phoneNumber.indexOf("0") === 0
          ? replaceStringByIndex(
              phoneNumber.replace(/\D/g, ""),
              0,
              activePhoneCode
            )
          : `${activePhoneCode}${phoneNumber.replace(/\D/g, "")}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneNumberFormater,
        window.recaptchaVerifier
      );
      setConfirmResult(confirmation);
      setSendOtp(true);
      setLoadingAction(false);
      message.success("Mã xác thực OTP đã được gửi");
    } catch (error) {}
  };
  const handleOtpSubmit = async () => {
    setLoadingAction(true);
    try {
      await confirmResult.confirm(otp);
      setOtp("");
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          createUser({
            uid: user.uid,
            email: user.email,
            name: user.phoneNumber,
            phone:
              phoneNumber.indexOf("0") === 0
                ? replaceStringByIndex(phoneNumber.replace(/\D/g, ""), 0, 0)
                : `0${phoneNumber.replace(/\D/g, "")}`,
            countryCode: activePhoneCode,
            photo: user.photoURL,
          }).then((res) => {
            message.success("Đăng nhập thành công");
            if (
              query?.url_return !== undefined &&
              query?.url_return !== "undefined"
            ) {
              const url_return = query?.url_return;
              router.push(url_return);
            } else {
              router.push("/");
            }
          });
          localStorage.setItem("userLogin", JSON.stringify(user));
          localStorage.setItem("userId", JSON.stringify(user?.uid));
          localStorage.setItem("userToken", JSON.stringify(user?.accessToken));
        }
      });
    } catch (error) {
      if (error.code === "auth/invalid-verification-code") {
        message.error("Sai mã OTP. Vui lòng kiểm tra lại");
      }
    }
    setLoadingAction(false);
  };
  const ref = useRef(null);
  useEffect(() => {
    const handleOutSideClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);
  const [type, setType] = useState(0);

  const loginWithPasswordless = () => {
    setLoadingAction(true);
    const actionCodeSettings = {
      url: `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/auth?email=${email}&url_return=${query?.url_return}`,
      handleCodeInApp: true,
    };
    setEmailForSignIn(email);

    auth.languageCode = "vi";
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then((result) => {
        localStorage.setItem("emailForSignIn", email);
        setIsModalOpen(true);
        setLoadingAction(false);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setIsModalOpen(false);
        setErrorMsg(error.message);
        setLoadingAction(false);
      });
  };
  const subEmail = (str) => {
    let ca = `${str?.charAt(0).toUpperCase()}${str
      ?.slice(1, str?.length)
      .toLowerCase()}`;
    const findIndex = ca?.indexOf("@");
    return ca?.substring(0, findIndex);
  };

  useEffect(() => {
    setLoadingAction(true);
    const saved_email = localStorage.getItem("emailForSignIn");
    const link = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/auth?email=${searchParams?.email}&url_return=${searchParams?.url_return}&apiKey=${searchParams?.apiKey}&oobCode=${searchParams?.oobCode}&mode=${searchParams?.mode}&lang=${searchParams?.lang}`;
    if (isSignInWithEmailLink(auth, window.location.href) && !!saved_email) {
      signInWithEmailLink(auth, saved_email, window.location.href)
        .then(async (result) => {
          let userCreate = result.user;
          // Clear email from storage.
          localStorage.removeItem("emailForSignIn");
          createUser({
            uid: userCreate.uid,
            email: userCreate.email,
            name:
              userCreate.displayName || subEmail(userCreate.email || "No name"),
            phone: userCreate.phoneNumber,
            photo: userCreate.photoURL,
          })
            .then((result) => {
              setLoadingAction(true);
            })
            .catch((error) => {});
        })
        .catch((error) => {
          setErrorCode(error.code);
          setLoadingAction(false);
        });
    } else {
      setLoadingAction(false);
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("userLogin", JSON.stringify(user));
        localStorage.setItem("userId", JSON.stringify(user?.uid));
        localStorage.setItem("userToken", JSON.stringify(user?.accessToken));
        if (
          query?.url_return !== undefined &&
          query?.url_return !== "undefined"
        ) {
          const url_return = query?.url_return;
          router.push(url_return);
        } else {
          router.push("/");
        }
      }
    });
  }, [user]);

  useEffect(() => {
    setLoadingAction(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("userLogin", JSON.stringify(user));
        localStorage.setItem("userId", JSON.stringify(user?.uid));
        localStorage.setItem("userToken", JSON.stringify(user?.accessToken));
        user
          .getIdToken(true)
          .then(async (token) => {
            //redirect
            if (
              query?.url_return !== undefined &&
              query?.url_return !== "undefined"
            ) {
              const url_return = query?.url_return;
              router.push(url_return);
            } else {
              router.push("/");
            }
            setLoadingAction(false);
          })
          .catch((err) => {
            setLoadingAction(false);
          });
      } else {
        setLoadingAction(false);
      }
    });
  }, [user]);

  // useEffect(() => {
  //   const saved_email = localStorage.getItem("emailForSignIn");
  //   if (user && loading === false && saved_email === null) {
  //     //redirect
  //     localStorage.setItem("userLogin", JSON.stringify(user));
  //     localStorage.setItem("userId", JSON.stringify(user?.uid));
  //     localStorage.setItem("userToken", JSON.stringify(user?.accessToken));
  //     if (
  //       query?.url_return !== undefined &&
  //       query?.url_return !== "undefined"
  //     ) {
  //       const url_return = query?.url_return;
  //       router.push(url_return);
  //     } else {
  //       router.push("/");
  //     }
  //   }
  // }, [user, loading]);

  return (
    <main className="w-full">
      <Header />
      <div className="flex flex-col gap-4 mt-14" ref={ref}>
        <div className="mx-8 lg:mx-20 flex shadow-md shadow-gray-400 rounded-lg">
          <button
            className={`w-1/2 text-lg font-semibold py-2 rounded-s-lg text-sm ${
              type === 0 ? "text-white bg-[#c80000]" : "bg-white text-black"
            }`}
            onClick={() => setType(0)}
          >
            Đăng nhập bằng email
          </button>
          <button
            className={`w-1/2 text-lg font-semibold py-2 rounded-e-lg text-sm ${
              type === 1 ? "text-white bg-[#c80000]" : "bg-white text-black"
            }`}
            onClick={() => setType(1)}
          >
            Đăng nhập bằng số điện thoại
          </button>
        </div>
        {type === 0 ? (
          <form className="flex flex-col gap-4">
            <div className="mx-8 lg:mx-20">
              <input
                type="text"
                id="email-input"
                className={
                  email === ""
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                    : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                }
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value === "") {
                    setEmailError("Vui lòng nhập email!");
                  } else {
                    setEmailError("");
                  }
                }}
                placeholder="Email"
                value={email}
              />
              {emailError !== "" && (
                <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
                  {emailError}
                </p>
              )}
            </div>
            {loadingAction ? (
              <button
                disabled
                type="button"
                className="text-white mx-8 lg:mx-20 bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
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
                Loading...
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!isModalOpen) {
                    if (isEmail(email)) {
                      setErrorMsg();
                      setErrorCode();
                      loginWithPasswordless();
                    } else {
                      setErrorCode();
                      setErrorMsg(t.EMAIL_INVALID);
                      setIsModalOpen(false);
                    }
                  }
                }}
                type="button"
                class="text-white mx-8 lg:mx-20 bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
              >
                Đăng nhập
              </button>
            )}
            {errorCode === "auth/invalid-action-code" && (
              <div className="mx-8 lg:mx-20 text-[#c80000] font-bold mt-2">
                {/* {
                  "The action code is invalid. This can happen if the code is malformed, expired, or has already been used."
                } */}
                Mã hành động không hợp lệ. Điều này có thể xảy ra nếu mã không
                đúng định dạng, hết hạn hoặc đã được sử dụng.
              </div>
            )}
            {errorMsg && (
              <div className="mx-8 lg:mx-20 text-[#c80000] font-bold mt-2">
                {errorMsg}
              </div>
            )}
            {isModalOpen && (
              <div className="mx-8 lg:mx-20">
                <div className="text-[#c80000] text-sm font-bold mt-2">
                  {/* Check your inbox */}
                  Kiểm tra hộp thư của bạn
                </div>
                <p className="text-sm">
                  Chúng tôi đã gửi một liên kết mật khẩu đến{" "}
                  <span style={{ color: "#357FF7", fontWeight: "bold" }}>
                    {emailForSignIn}
                  </span>
                  .{" "}
                  {
                    // `Please follow the link in the email we sent you. Kindly remember to check your spam folder if you cannot find it in your inbox.`
                    "Vui lòng nhấn vào liên kết trong email mà Dumuc đã gửi cho bạn. Vui lòng nhớ kiểm tra thư mục thư rác nếu bạn không thể tìm thấy nó trong hộp thư đến của mình."
                  }
                </p>
              </div>
            )}
          </form>
        ) : (
          <div></div>
        )}
        <div className={`mt-4 flex flex-col gap-4 ${type === 0 && "hidden"}`}>
          {!sendOtp && (
            <div className="mx-8 flex gap-x-1 lg:mx-20">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative w-[90px] flex justify-center items-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                {selectedItem}
                {showDropdown && (
                  <div className="absolute h-[250px] overflow-y-auto scroll-quick-post z-[9999] flex flex-col justify-start items-start top-full left-0 bg-white shadow-sm shadow-gray-500 text-[10px] sm:text-xs font-medium w-[200px] rounded p-1">
                    {dataCoutryCode.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedItem(
                            <div className="flex items-center gap-x-2">
                              <Image
                                src={`https://flagcdn.com/16x12/${item.code.toLocaleLowerCase()}.png`}
                                srcset={`https://flagcdn.com/32x24/${item.code.toLocaleLowerCase()}.png 2x,
                      https://flagcdn.com/48x36/${item.code.toLocaleLowerCase()}.png 3x`}
                                width={16}
                                height={12}
                                alt={item.name}
                              ></Image>
                              {item.dial_code}
                            </div>
                          );
                          setActivePhoneCode(item.dial_code);
                        }}
                        className={`hover:bg-[#c80000] hover:text-white w-full rounded px-1.5 py-2 text-left ${
                          activePhoneCode === item.dial_code
                            ? "text-white bg-[#c80000] bg-opacity-60"
                            : "text-black"
                        }`}
                      >
                        <div className="flex items-center gap-x-2">
                          <Image
                            src={`https://flagcdn.com/16x12/${item.code.toLocaleLowerCase()}.png`}
                            srcset={`https://flagcdn.com/32x24/${item.code.toLocaleLowerCase()}.png 2x,
          https://flagcdn.com/48x36/${item.code.toLocaleLowerCase()}.png 3x`}
                            width={16}
                            height={12}
                            alt={item.name}
                          ></Image>
                          ({item.dial_code}) {item.name}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </button>
              <div class="relative w-full">
                <input
                  type="text"
                  id="phone-input"
                  className={
                    phoneNumber === ""
                      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                      : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  }
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="123-456-7890"
                  required
                  onChange={handlePhoneNumberChange}
                  value={phoneNumber}
                />
              </div>
            </div>
          )}
          {!sendOtp ? (
            <div className="mx-8 lg:mx-20" id="recaptcha-container"></div>
          ) : null}
          {sendOtp && (
            <div className="mx-8 lg:mx-20">
              <input
                className={
                  otp === ""
                    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                    : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                }
                onChange={handleOtpChange}
                placeholder="OTP"
                value={otp}
              />
            </div>
          )}
          {loadingAction ? (
            <button
              disabled
              type="button"
              className="text-white mx-8 lg:mx-20 bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
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
              Loading...
            </button>
          ) : (
            <button
              onClick={sendOtp ? handleOtpSubmit : handleSendOtp}
              type="button"
              class="text-white mx-8 lg:mx-20 bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
            >
              {!sendOtp ? "Lấy mã xác thực" : "Xác thực OTP"}
            </button>
          )}
        </div>
      </div>
      <div className="text-center text-lg my-4 text-gray-500 my-4 font-bold">
        Hoặc
      </div>
      <div className="flex flex-col ">
        <button
          onClick={() => loginGoogle()}
          type="button"
          className="flex items-center justify-center text-[#c80000] gap-x-2 mx-8 lg:mx-20 bg-white border border-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 19"
          >
            <path
              fill-rule="evenodd"
              d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
              clip-rule="evenodd"
            />
          </svg>
          Đăng nhập bằng Google
        </button>
      </div>
      <div className="mb-24"></div>
      <TabbarBottom active="" />
      <BannerRight isAppInstall={true} />
    </main>
  );
}
