"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { message } from "antd";
import Header from "@components/Header";
import { createUser } from "@apis/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import isEmail from "validator/lib/isEmail";

import { auth, providerGoogle } from "utils/firebase";
import {
  signInWithPopup,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { useWindowSize } from "@hooks/useWindowSize";

const LoginWithModal = ({ searchParams, close, item }) => {
  const query = searchParams;
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  const [loadingAction, setLoadingAction] = useState(false);
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState("");
  const [errorMsg, setErrorMsg] = useState();
  const [errorCode, setErrorCode] = useState();

  const [emailForSignIn, setEmailForSignIn] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sizes = useWindowSize();

  const loginGoogle = () => {
    setLoadingAction(true);
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
                close();
                router.push(`#${item?.feedId}`);
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
  const subEmail = (str) => {
    const findIndex = str?.indexOf("@");
    return str.substring(0, findIndex);
  };

  const loginWithPasswordless = () => {
    setLoadingAction(true);
    //signin with email (passwordless)
    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      //url: `https://appfunnel.page.link/fxwk?email=${values.email}`,
      url: `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}?email=${email}&url_return=${query?.url_return}`,
      // This must be true.
      handleCodeInApp: true,
    };

    setEmailForSignIn(email);

    auth.languageCode = "vi";
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then((result) => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        localStorage.setItem("emailForSignIn", email);
        setIsModalOpen(true);
        setLoadingAction(false);
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        setIsModalOpen(false);
        setErrorMsg(error.message);
        setLoadingAction(false);
      });
  };

  useEffect(() => {
    setLoadingAction(true);
    const saved_email = localStorage.getItem("emailForSignIn");
    const link = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/auth?email=${searchParams?.email}&url_return=${searchParams?.url_return}&apiKey=${searchParams?.apiKey}&oobCode=${searchParams?.oobCode}&mode=${searchParams?.mode}&lang=${searchParams?.lang}`;
    if (isSignInWithEmailLink(auth, link) && !!saved_email) {
      //sign in with email link (Passwordless)
      signInWithEmailLink(auth, saved_email, link)
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
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    } else {
      setLoadingAction(false);
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        close();
        router.push(`#${item?.feedId}`);
      }
    });
  }, []);

  useEffect(() => {
    setLoadingAction(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        //userAtom
        user
          .getIdToken(true)
          .then(async (token) => {
            //redirect
            close();
            router.push(`#${item?.feedId}`);
            setLoadingAction(false);
          })
          .catch((err) => {
            setLoadingAction(false);
          });
      } else {
        setLoadingAction(false);
      }
    });
  }, []);

  //redirect already login
  useEffect(() => {
    const saved_email = localStorage.getItem("emailForSignIn");
    if (user && loading === false && saved_email === null) {
      //redirect
      close();
      router.push(`#${item?.feedId}`);
    }
  }, [user, loading]);

  return (
    <div className={`${sizes.width > 400 ? "px-6" : "px-0"} `}>
      <div className="flex flex-col">
        <div className="flex flex-col items-center py-6">
          <span>Chân thành cám ơn Bạn đã ghé thăm </span>
          <span className="text-[#c80000]">Dumuc.me!</span>
        </div>
        <button
          onClick={() => loginGoogle()}
          type="button"
          className={`flex items-center justify-center text-white bg-[#c80000] ${
            sizes.width > 350 ? "mx-10 sm:mx-20" : "mx-0"
          }  hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5`}
        >
          <svg
            class="w-5 h-5 mr-2"
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
      {/* <div className="text-center text-base font-semibold mt-6 mb-2 text-gray-500">Hoặc bằng email</div>
    <form className="flex flex-col gap-4">
        <div className="">
            <input 
                type="text" 
                id="email-input" 
                className={email === '' ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-full focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full py-2.5 px-6 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500":"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-6"} 
                onChange={e => {
                    setEmail(e.target.value)
                    if (e.target.value === '') {
                        setEmailError('Vui lòng nhập email!')
                    } else {
                        setEmailError('')
                    }
                }}
                placeholder="Email"
                value={email}
            />
            {emailError !== ''&& (
                <p class="mt-1.5 text-sm text-[#c80000] font-semibold">{emailError}</p>
            )}
        </div>
        {loading ?
            <button 
            disabled 
            type="button" 
            className={`${sizes.width > 350 ? "mx-10 sm:mx-20" : "mx-0"} text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2`}>
            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
            </svg>
                Loading...
            </button>
        :
            <button 
                onClick={() => {
                    if(email){
                        if (!isModalOpen) {
                            if (isEmail(email)) {
                                setErrorMsg()
                                setErrorCode()
                                loginWithPasswordless()
                            } else {
                                setErrorCode()
                                setErrorMsg("Email không hợp lệ")
                                setIsModalOpen(false)
                            }
                        }
                    }else{
                        setErrorCode()
                        setErrorMsg("Vui lòng nhập email")
                        setIsModalOpen(false)
                    }
                }}
                type="button" 
                class={`text-white ${sizes.width > 350 ? "mx-10 sm:mx-20" : "mx-0"} bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mb-2`}>
                    Bắt đầu
            </button>
        }
        {errorCode === 'auth/invalid-action-code' && (
            <div className="text-[#c80000] font-bold mt-2">{'The action code is invalid. This can happen if the code is malformed, expired, or has already been used.'}</div>
        )}
        {errorMsg && (
            <div className="text-[#c80000] font-bold mt-2">{errorMsg}</div>
        )}
        {isModalOpen && (
            <div className="">
                <div className="text-[#c80000] text-sm font-bold mt-2">Kiểm tra hộp thư của bạn</div>
                <p className="text-sm">
                Chúng tôi đã gửi link mật khẩu tới <span style={{ color: '#357FF7', fontWeight: 'bold' }}>{emailForSignIn}</span>. {`Vui lòng theo liên kết trong email chúng tôi đã gửi cho bạn. Nhớ kiểm tra thư mục thư rác nếu bạn không thể tìm thấy nó trong hộp thư đến của mình.`}
                </p>
            </div>
        )}
    </form> */}
    </div>
  );
};

export default LoginWithModal;
