"use client"
import { useState } from "react";
import Image from "next/image";
import {message} from 'antd';

import {createContact} from 'apis/contacts'

const Newsletter = ({isFixed = true, isAppInstall = false, isLeft=true}) => {
  const [email, setEmail] = useState()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    setLoading(true);
    let item = {
      email,
    };

    if (!email) {
      message.error("Vui lòng nhập email!");
      setLoading(false);
      return;
    }
    
    createContact(item)
    .then((result) => {
      message.success("Đã đăng ký thành công");
      setEmail('')
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  };

  if (isFixed) {
      return (
        <div className="banner-right banner-display-right">
          {isAppInstall && (
            <a href="#"><Image width={0} height={0} sizes="100vw" src="/dumuc/appstore.gif" style={{ width: 280 }} alt="Appstore" /></a>
          )}
          <div class={`bg-white w-[280px] rounded-md mt-2`}>
            <div class="py-4 px-4">
              <div class="text-center">
                <h3 class="mb-4 text-base font-bold text-gray-900 sm:text-2xl">CÁC BÀI VIẾT NỔI BẬT BẠN KHÔNG NÊN BỎ LỠ!</h3>
                <p class="mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-lg dark:text-gray-400">Thứ Năm hàng tuần, DuMuc sẽ gửi bạn email tổng hợp những bài viết đáng đọc nhất tuần qua.</p>
                <form action="#">
                  <div class="items-center mb-3 space-y-4 flex-col">
                    <div class="relative bg-white w-full z-10">
                      <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                      <div class="flex absolute top-0 left-0 items-center w-5 h-5 pointer-events-none z-40">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                        </svg>
                      </div>
                      <input 
                        class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 " 
                        placeholder="Your email" 
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (e.target.value === "") {
                            setError("Vui lòng nhập Email!");
                          } else {
                            setError("");
                          }
                        }}
                        value={email}
                      />
                      {error !== "" && (
                        <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
                          {error}
                        </p>
                      )}
                    </div>
                    <div>
                      <button 
                        onClick={onSubmit} 
                        type="button" 
                        className="w-full px-5 py-3 text-sm font-medium text-center text-white rounded-lg cursor-pointer bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">Đăng ký!</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
  } else {
      return (
        <div className="sticky top-0">
          <div
            class={`bg-white ${
              isLeft ? "w-full" : "w-[280px]"
            }  mt-4 rounded-md`}
          >
            <div class="py-4 px-4">
              <h3 class="mb-3 text-base font-bold text-gray-900 flex">
                <svg class="w-5 h-5 text-gray-800 mr-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4a4 4 0 0 1 4 4v6M5 4a4 4 0 0 0-4 4v6h8M5 4h9M9 14h10V8a3.999 3.999 0 0 0-2.066-3.5M9 14v5m0-5h4v5m-9-8h2m8-4V1h2"/>
                </svg>ĐĂNG KÝ NHẬN BẢN TIN
              </h3>
              <p class="mb-8 text-xs font-normal text-center">
                Thứ Năm hàng tuần, DuMuc sẽ gửi bạn email tổng hợp những bài
                viết đáng đọc nhất tuần qua.
              </p>
              <form action="#">
                <div class="items-center mb-3 space-y-4 flex-col">
                  <div class="relative w-full">
                    <label
                      for="email"
                      class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Email address
                    </label>
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    </div>
                    <input
                      class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Your email"
                      type="email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value === "") {
                          setError("Vui lòng nhập Email!");
                        } else {
                          setError("");
                        }
                      }}
                      value={email}
                    />
                    {error !== "" && (
                      <p class="mt-1.5 text-sm text-[#c80000] font-semibold">
                        {error}
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={onSubmit} 
                      type="button"
                      class="w-full px-5 py-3 text-sm font-medium text-center text-white rounded-full cursor-pointer bg-[#c80000] hover:bg-opacity-60 focus:ring-4 focus:ring-primary-300"
                    >
                      Đăng ký!
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
  }
    
}
export default Newsletter;