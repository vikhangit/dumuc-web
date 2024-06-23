"use client"; // Error components must be Client Components

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-full fixed left-0 top-0">
      <main class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
          <p class="text-base font-semibold text-indigo-600">404</p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Không tìm dữ liệu
          </h1>
          <p class="mt-6 text-base leading-7 text-gray-600">
            Xin lỗi, đang có lỗi trong quá trình tải dữ liệu.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={() => {
                reset();
                router.back();
              }}
              class="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Quay lại
            </button>
            <button
              onClick={() => reset()}
              class="rounded-md bg-gray-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Tải lại
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
