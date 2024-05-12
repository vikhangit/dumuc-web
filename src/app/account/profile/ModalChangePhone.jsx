"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import { getProfile, updateProfile } from "@apis/users";
import { dataCoutryCode } from "@utils/countryCode";
import { replaceStringByIndex } from "@utils/functions";
import { message } from "antd";
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  updatePhoneNumber,
} from "firebase/auth";
import Image from "next/image";
import { auth } from "utils/firebase";

export default function ModalChangePhone({ visible, onCancel }) {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const [usingUser, setUsingUser] = useState();
  const router = useRouter();
  const [signOut, loadingSignout, error] = useSignOut(auth);
  const [loadingAction, setLoadingAction] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [p2, setP2] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmResult, setConfirmResult] = useState(null);
  const [sendOtp, setSendOtp] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activePhoneCode, setActivePhoneCode] = useState("+84");
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall));
  }, [user]);
  useEffect(() => {
    setPhoneNumber(
      usingUser?.phone && usingUser?.phone?.length > 0 ? usingUser?.phone : ""
    );
    setActivePhoneCode(usingUser?.countryCode ? usingUser?.countryCode : "+84");
  }, [usingUser]);
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
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };
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
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(
        phoneNumberFormater,
        window.recaptchaVerifier
      );
      setConfirmResult(verificationId);
      setSendOtp(true);
      setLoadingAction(false);
      message.success("Mã xác thực OTP đã được gửi");
    } catch (error) {
      console.log(error);
    }
  };
  const handleOtpSubmit = async () => {
    setLoadingAction(true);
    try {
      const phoneCredential = PhoneAuthProvider.credential(confirmResult, otp);
      await updatePhoneNumber(user, phoneCredential);
      await updateProfile(
        {
          phone:
            phoneNumber.indexOf("0") === 0
              ? replaceStringByIndex(phoneNumber.replace(/\D/g, ""), 0, 0)
              : `0${phoneNumber.replace(/\D/g, "")}`,
          countryCode: activePhoneCode,
        },
        user?.accessToken
      ).then(async () => {
        await signOut().then(async (res) => {
          router.push("/auth");
          message.success("Đã thay đổi sđt thành công vui lòng đăng nhập lại");
          onCancel();
        });
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
        console.log("Outside Clicked. ");
      }
    };

    window.addEventListener("mousedown", handleOutSideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutSideClick);
    };
  }, [ref]);

  return (
    <div className="mt-8 w-full">
      <div className="w-full">
        {!sendOtp && (
          <div className="w-full flex gap-x-1">
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
          <div className="mt-3" id="recaptcha-container"></div>
        ) : null}
        {sendOtp && (
          <div className="w-full">
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
      </div>
      <div className="w-full flex justify-end mt-3 gap-x-2">
        {loadingAction ? (
          <button
            disabled
            type="button"
            class={`text-white border border-[#c80000] bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 rounded-lg font-medium text-xs px-4 py-1.5 hover:text-[#c80000] hover:bg-white`}
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
            {!sendOtp ? "Lấy mã xác thực" : "Xác thực OTP"}...
          </button>
        ) : (
          <button
            onClick={sendOtp ? handleOtpSubmit : handleSendOtp}
            type="button"
            class={`text-white border border-[#c80000] bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 rounded-lg font-medium text-xs px-4 py-1.5 hover:text-[#c80000] hover:bg-white`}
          >
            {!sendOtp ? "Lấy mã xác thực" : "Xác thực OTP"}
          </button>
        )}
        <button
          onClick={() => {
            onCancel();
          }}
          type="button"
          class={`text-black border border-gray-300 bg-white hover:brightness-110 focus:ring-4 focus:ring-gray-300 rounded-lg font-medium text-xs px-4 py-1.5 hover:bg-gray-300`}
        >
          Hủy
        </button>
      </div>
    </div>
  );
}
