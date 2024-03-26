
"use client"
import moment from "moment";
import {completeSosHelper, cancelSosHelper} from '@apis/soss';
import {message} from 'antd'
import Image from "next/image";
import Timer from "./Timer";
import { DateTimeLog } from "@utils/dateFormat";

const SOSHelperList = ({ items, onCallback }) => {
  const [user, loading, error] = useAuthState(auth);
  const onCompleted = (item, accessToken) => {
    completeSosHelper({
      sosId: item?.sosId,
      helperId: item?.helper?.sossHelpId,
    }, accessToken)
    .then(result => {
      message.success(result.message);
      onCallback()
    })
    .catch((error) => {
      console.error(error);
      setLoadingSubmit(false);
    });
  }

  const onCancelled = (item, accessToken) => {
    cancelSosHelper({
      sosId: item?.sosId,
      helperId: item?.helper?.sossHelpId,
    }, accessToken)
    .then(result => {
      message.success(result.message);
      onCallback()
    })
    .catch((error) => {
      console.error(error);
      setLoadingSubmit(false);
    });
  }

  return (
    <div className="post-list">
      <div>
          {items &&
          items?.map((item, index) => {
            const photos = item?.photos.filter(x => x != "");
            return (
              <div className='border-b-2 my-4 mx-4' key={index}>
                <div className="mb-4">
                  <div className='flex flex-col pr-4 mt-2'>
                    <div className="flex justify-between items-center text-xs text-[#c80000]">
                      <div className="flex items-center">
                        <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">{item.categoryObj?.name}</span>
                        {item?.status === -1 && (
                          <span class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">Đã huỷ</span>
                        )}
                        {item?.status === 0 && (
                          <span class="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Đang mở</span>
                        )}
                        {item?.status === 1 && (
                          <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Đã kết thúc</span>
                        )}
                        <div className="text-xs text-gray-400">
                          {moment(item.createdAt).format("DD/MM/YYYY HH:ss")} 
                        </div>
                      </div>
                    </div>
                    <div className="line-clamp-1 text-sm text-gray-500 mt-1">
                      {item?.address}
                    </div>
                    <div className="line-clamp-5 my-1 text-base">
                      {item.description}
                    </div>
                    <div
                 className={`grid ${photos?.length === 3
                  ? "grid-cols-3"
                  : photos?.length === 2
                    ? "grid-cols-2"
                    : photos?.length === 1 && "grid-cols-1"
                  } gap-2`}
              >
                {photos?.map((photo, index) => {
                 if(photo !== ""){
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

                    <div className="flex justify-between tool-sos">
                      <div className="py-2 px-1">
                      <Timer
                        item={item}
                        end={DateTimeLog(item?.createdAt, item?.deadline)}
                        center={true}
                      />
                        <div className='text-gray-500 text-xs mt-2 tool-sos-center'>{moment(item?.createdAt).fromNow()}</div>
                      </div>
                      <div className="text-center">
                        {item?.helper?.isCompleted && (
                          <>
                          <div 
                            className="text-blue-800 flex text-center font-bold text-xs mt-4 ml-1 hover:scale-105 transition-all cursor-pointer tool-sos-text"
                          >
                            <svg class="w-4 h-4 text-blue-800 mr-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                            </svg> Bạn đã xác nhận hoàn thành
                          </div>
                          <div className='text-gray-500 text-xs mt-2'>{moment(item?.completedAt).fromNow()}</div>
                          </>
                        )}

                        {item?.helper?.isCancelled && (
                          <>
                          <div 
                            className="text-[#c80000] text-center font-bold text-xs mt-4 ml-1 hover:scale-105 transition-all cursor-pointer"
                          >
                            Bạn đã huỷ
                          </div>
                          <div className='text-gray-500 text-xs mt-2'>{moment(item?.cancelledAt).fromNow()}</div>
                          </>
                        )}

                        {(item?.helper?.isCancelled !== true && item?.helper?.isCompleted !== true) && (
                        <>
                        <div 
                          className="bg-[#c80000] text-white font-bold text-xs mt-2 px-2 py-1 rounded-xl hover:scale-105 transition-all cursor-pointer"
                          onClick={() => {
                            onCompleted(item, user?.accessToken);
                          }}
                        >
                          Xác nhận đã hoàn thành giúp đỡ
                        </div>
                        <div 
                          className="text-[#c80000] font-bold text-xs mt-2 ml-1 hover:scale-105 transition-all cursor-pointer"
                          onClick={() => onCancelled(item, user?.accessToken)}
                        >
                          Huỷ giúp đỡ
                        </div>
                        </>
                        )}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  );
};

export default SOSHelperList;
