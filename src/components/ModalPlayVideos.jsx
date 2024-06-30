import { useWindowSize } from "@hooks/useWindowSize";
import { Modal } from "flowbite-react";
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
    <Modal
      show={openImage}
      onClose={() => {
        setOpenImage(false);
      }}
      size="3xl"
      position="center"
    >
      {/* <Modal.Header></Modal.Header> */}
      <Modal.Body className="p-0">
        <div
          className=" justify-center items-center py-2 relative"
          style={{
            margin: "0px",
          }}
        >
          <div className="absolute right-[10px] top-[10px] z-[9999]">
            <button
              className="p-1 hover:bg-gray-200 pointer rounded-[5px] focus:border-0"
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
                className="w-4 h-4 text-gray-900"
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
                  className="w-6 h-6 "
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
                  className="w-6 h-6 "
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
            className={`modal-image  mx-auto overflow-y-auto mt-[30px] px-[40px]`}
          >
            <div className="w-full h-full bg-white pt-0">
              <Swiper
                className="mySwiper"
                onSwiper={(swiper) => setSwiper(swiper)}
                // onActiveIndexChange={(s) => setActiveSlide(s.realIndex)}
                loop={true}
                spaceBetween={32.5}
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
      </Modal.Body>
    </Modal>
  );
}
