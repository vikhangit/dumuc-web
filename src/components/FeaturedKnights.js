"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import { Modal } from "flowbite-react";
import { useWindowSize } from "@hooks/useWindowSize";
import { getAuthorStatistics, getCategories } from "@apis/posts";

const FeaturedKnights = ({ usersRanking, limit }) => {
  const [details, setDetails] = useState();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const sizes = useWindowSize();
  const [authorStatistics, setAuthorStatistics] = useState();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => {
      setCategories(result.filter(x => x.type === 'soss'))
    });
  }, []);

  const Info = () => {
    return (
      <Modal
        dismissible
        show={showModal}
        onClose={() => setShowModal(false)}
        style={{
          padding: sizes.width > 369 ? 4 : 0,
        }}
        className="text-sm font-semibold"
      >
        <Modal.Header className="bg-[#c80000] bg-opacity-60 rounded-b-xl justify-center [&>h3]:text-white [&>h3]:mx-auto [&>h3]:text-base [&>h3]:sm:text-xl [&>button]:ml-0 [&>button]:text-white">
          Thống kê cứu trợ SOS
        </Modal.Header>
        <Modal.Body>
          <div className="flex items-end gap-x-3 border-b-2 py-2 border-dashed border-[#c80000] text-[#c80000] font-semibold">
            <div
              className={`${
                sizes.width > 369 ? "basis-1/2" : "basis-1/3"
              } text-sm sm:text-lg font-semibold`}
            >
              Dumuc.me!
            </div>
            <div
              className={`${
                sizes.width > 369 ? "basis-1/4" : "basis-1/3"
              }  sm:px-4 text-center text-xs sm:text-sm font-semibold`}
            >
              SOS
              <br />
              đã gửi (lần)
            </div>
            <div
              className={`${
                sizes.width > 369 ? "basis-1/4" : "basis-1/3"
              } sm:px-4 text-center text-xs sm:text-sm font-semibold`}
            >
              SOS
              <br />
              đã giúp (lần)
            </div>
          </div>
          {categories
                  .filter((x) => x.categoryParentId === "")
                  .map((item) => {
                    return (
                      categories
                        .filter((y) => y.categoryParentId === item.categoryId)
                        .map((sub) => {
                          return (
                                      <div className="flex py-4 mt-2 gap-x-3 items-center border-b border-gray-500">
                                      <div
                                        className={`${
                                          sizes.width > 369 ? "basis-1/2" : "basis-1/3"
                                        } text-sm sm:text-lg font-semibold`}
                                      >
                                         {sub.name}
                                      </div>
                                      <div
                                        className={`${
                                          sizes.width > 369 ? "basis-1/4" : "basis-1/3"
                                        } sm:px-4 flex justify-center`}
                                      >
                                        <span className="text-center py-1 sm:py-2 w-full bg-white shadow shadow-gray-500 rounded-full text-xs sm:text-sm font-semibold">
                                          {authorStatistics?.createdSoss?.filter((x) => x?.category === sub?.categoryId).length}
                                        </span>
                                      </div>
                                      <div
                                        className={`${
                                          sizes.width > 369 ? "basis-1/4" : "basis-1/3"
                                        } sm:px-4 flex justify-center`}
                                      >
                                        <span className="text-center py-1 sm:py-2 w-full bg-white shadow shadow-gray-500 rounded-full text-xs sm:text-sm font-semibold">
                                        {authorStatistics?.helpedSoss?.filter((x) => x?.category === sub?.categoryId).length}
                                        </span>
                                      </div>
                                    </div>
                          );
                        })
                    );
                  })}
          
        </Modal.Body>
      </Modal>
    );
  };
  return (
    <>
      <div className="px-2 md:px-4 lg:px-8 bg-white">
        {usersRanking?.map((item, index) => {
          if (index < limit) {
            return (
              <div
                key={index}
                onclick={`/author/${item?.author?.slug}/${item?.author?.authorId}`}
              >
                <div
                  class={`flex justify-between items-center sm:gap-x-4 sm:gap-x-2 py-3 ${
                    index !== 0 && "border-t"
                  } border-gray-300`}
                >
                  <div className="flex items-center gap-x-3 sm:basis-2/3">
                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      class="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                      src={item?.photo ? item?.photo : "/dumuc/avatar.png"}
                      alt={item?.name}
                    />
                    <div className="flex gap-1 lg:items-center flex-col lg:flex-row justify-between sm:w-[calc(100%-5rem)]">
                      <div className="flex flex-col">
                        <div className="text-sm sm:text-base font-medium line-clamp-1 break-all leading-none text-[#363535]">
                          {item?.name}
                        </div>
                        <div className="line-clamp-1 text-xs sm:text-sm mt-1 text-[#747272]">
                          Ngày tham gia:{" "}
                          <span className="">
                            {moment(item?.createdAt).format("DD/MM/YYYY")}
                          </span>
                        </div>
                      </div>
                      {/* <div className='flex  sm:gap-x-2 lg:justify-center'>
                      {
                        Array(5).fill().map(i => <Image alt='' src="/icons/star.png" width={0} height={0} sizes='100vw' className='w-5 h-5 sm:w-6 sm:h-6' />)
                      }
                    </div> */}
                    </div>
                  </div>
                  <div className="sm:basis-1/3 flex justify-end">
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex justify-center items-center border border-gray-700 rounded-[50%] w-16 h-10 sm:w-24 sm:h-12 box-point">
                        <div className="text-[#c80000]  text-base sm:text-lg font-semibold">
                          {item?.rankingValue}
                        </div>
                      </div>
                      <button
                        className="text-gray-700 text-[10px] sm:text-xs md:text-sm mt-2 text-center bg-white shadow shadow-gray-400 rounded-full py-0.5 px-1.5 sm:px-3 cursor-ponter relative z-50"
                        onClick={async () => {
                          setLoading(true);
                          await getAuthorStatistics({
                            authorId: item?.author?.authorId,
                          })
                          .then(result => {
             
                            setAuthorStatistics(result)
                            setLoading(false);
                          }).then(() => {
                            setShowModal(true);
                          })
                        }}
                      >
                        Xem thống kê
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <Info />
    </>
  );
};

export default FeaturedKnights;
