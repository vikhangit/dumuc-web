import { useWindowSize } from "@hooks/useWindowSize";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

const ModalPlayVideosItem = dynamic(
  () => {
    return import("./ModalPlayVideosItem");
  },
  { ssr: false }
);

export default function ModalPlayVideos({
  openImage,
  setOpenImage,
  imageList,
  index,
  onCallback,
  user,
  usingUser,
  myFollow,
  myFriend,
  authors,
}) {
  const [swiper, setSwiper] = useState(null);

  const sizes = useWindowSize();
  const [start, setStart] = useState(false);
  const [percent, setPercent] = useState(0);
  const [newImage, setNewImage] = useState([]);
  const search = useSearchParams();
  useEffect(() => {
    setNewImage(imageList);
    if (search.get("storyId")) {
      const index1 = imageList
        ?.filter((x) => user?.uid === x?.userId || !x?.isPrivate)
        ?.findIndex((x) => x?.storyId === search.get("storyId"));
      swiper?.slideTo(index1);
    }
  }, [imageList, search]);
  return (
    openImage && (
      <div
        className="wrap-modal-image fixed w-full h-full left-0 top-0 z-[999] bg-black bg-opacity-90 flex justify-center items-center py-2 "
        style={{
          margin: "0px",
        }}
      >
        <div className="absolute right-0 top-0 z-[9999]">
          <button
            className="p-2 hover:bg-[#999999] pointer"
            onClick={() => {
              setOpenImage(false);
              setStart(false);
              setPercent(0);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {imageList.length > 1 && (
          <>
            <button
              className="absolute z-[9999] left-0 top-1/2 -translate-y-1/2"
              onClick={() => {
                swiper.slidePrev();
                setStart(false);
                setPercent(0);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10 sm:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button
              className="absolute z-[9999] right-0 top-1/2 -translate-y-1/2"
              onClick={() => {
                swiper.slideNext();
                setStart(false);
                setPercent(0);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-10 h-10 sm:text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </>
        )}
        <div
          className={`modal-image w-full sm:w-5/6 md:w-3/4 xl:w-1/2 ${
            sizes.height > 450 ? "h-full sm:h-5/6 xl:h-3/4 my-auto" : "h-full"
          }  mx-auto overflow-y-auto`}
        >
          <div className="w-full h-full px-2 sm:px-0 bg-white pt-0">
            <Swiper
              className="mySwiper"
              onSwiper={(swiper) => setSwiper(swiper)}
              // onActiveIndexChange={(s) => setActiveSlide(s.realIndex)}
              loop={true}
              spaceBetween={20}
              initialSlide={index}
            >
              {newImage?.map((item, indexa) => {
                return (
                  <SwiperSlide
                    key={indexa}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      overflow: "auto",
                      // background: showComment ? "white" : "inherit",
                      // paddingBottom: showComment ? 20 : "inherit",
                      position: "relative",
                      zIndex: 2000,
                    }}
                    className="scroll-quick-post"
                  >
                    <ModalPlayVideosItem
                      item={item}
                      user={user}
                      usingUser={usingUser}
                      imageList={imageList}
                      onCallback={onCallback}
                      myFollow={myFollow}
                      myFriend={myFriend}
                      close={() => setOpenImage(false)}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    )
  );
}
