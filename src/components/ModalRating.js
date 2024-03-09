"use client"
import { Modal } from 'antd';
import React, { useState } from 'react'

const title = [
  "Chưa đánh giá",
  "Rất tệ",
  "Tệ",
  "Bình thường",
  "Gần hoàn hảo",
  "Tuyệt vời"
]
export default function ModalRating({visible, onCancel, onSubmit}) {
  const [rating, setRating] = useState(0);
  const [ratingNote, setRatingNote] = useState('')
  const [hover, setHover] = useState(0);
  const [helperRole, setHelperRole] = useState('primary')
  return (
    <Modal
      visible={visible}
      title={`Đánh giá`}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={
        <div className="w-full">
          <button
            onClick={() => onSubmit(rating, helperRole, ratingNote)}
            type="button"
            class={`w-ful text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full`}
          >
            Gửi
          </button>
        </div>
      }
      centered
      className="modal-rating"
    >
      <div>
        <div className="flex justify-between items-center select">
          <div className="text-base font-medium">Đây là người giúp đỡ</div>
          <div className="flex mt-4">
            <div class="flex mb-4">
              <input
                type="radio"
                value="primary"
                checked={helperRole === "primary"}
                onChange={(event) => setHelperRole(event.target.value)}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
              />
              <label
                for="default-radio-1"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Chính
              </label>
            </div>
            <div class="flex ml-4">
              <input
                type="radio"
                value="secondary"
                checked={helperRole === "secondary"}
                onChange={(event) => setHelperRole(event.target.value)}
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
              />
              <label
                for="default-radio-2"
                class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Phụ
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center select">
          <div className="text-base font-medium">{title[rating]}</div>
          <div>
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                  <button
                    type="button"
                    key={index}
                    className={
                      index <= (hover || rating)
                        ? "text-amber-400 text-3xl mx-2"
                        : "text-gray-200 text-3xl mx-2"
                    }
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    <span className="star">&#9733;</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        {/* <div className="border-t border-gray-300 ">
          <p className="text-sm mt-6">Bạn muốn nhận xét gì không?</p>
          <div className="text-sm mt-5">
            <div  className="flex justify-between gap-x-4"> 
              <button className="bg-gray-200 w-full rounded-full py-2">Thái độ</button>
            <button className="bg-gray-200 w-full rounded-full py-2">Thiếu món</button>
            <button className="bg-gray-200 w-full rounded-full py-2">Thiếu chuyên nghiệp</button>
            </div>
            <div class="w-full flex justify-center mt-3">
              <button className="bg-gray-200 w-fit rounded-full py-2 px-10"> 
            Không đeo khẩu trang</button>
            </div>
           <div className="flex justify-between gap-x-4 mt-3">
             <button className="bg-gray-200 w-full rounded-full py-2  basis-2/3">Cách giao không đúng yêu cầu</button>
            <button className=" bg-gray-200 w-full rounded-full py-2 basis-1/3">Tài xế không khỏe</button>
           </div>
          </div>
        </div> */}
        <div className="w-full mt-5">
          <textarea
            onChange={(e) => {
              setRatingNote(e.target.value);
            }}
            value={ratingNote}
            name=""
            id=""
            rows="3"
            className="w-full border-gray-300 rounded-lg"
            placeholder="Cụ thể (không bắt buộc)"
          ></textarea>
        </div>
      </div>
    </Modal>
  );
}
