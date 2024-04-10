
import React, { useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Modal, Progress } from 'antd';
import { useWindowSize } from '@hooks/useWindowSize';
import { useEffect } from 'react';
import Image from 'next/image';
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export default function ModalViewFile({openImage, setOpenImage, file}) {
    const [swiper, setSwiper] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const sizes = useWindowSize();
    const [start, setStart] = useState(false)
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        if(start){
            const timeOut = setTimeout(() => {
                setPercent(percent + 10)
            }, 200);
            if(percent === 100){
                setPercent(0)
                swiper.slideNext();
            }
            return () => clearTimeout(timeOut);
        }
    })
    const docs = [
        { uri: file }
      ];
  return (
    openImage &&
    <div className='wrap-modal-image fixed w-full h-full left-0 top-0 z-[999] bg-black bg-opacity-90 flex justify-center items-center py-2 '
    style={{
        margin: "0px"
    }}>
        <div className='absolute right-0 top-0 z-[9999]'>
            <button className='p-2 hover:bg-[#999999] pointer' onClick={() => {
                setOpenImage(false);
                setStart(false);
                setPercent(0)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-8 h-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div className={`modal-image w-full sm:w-5/6 md:w-3/4 xl:w-1/2 ${sizes.height > 450 ? "h-full sm:h-5/6 xl:h-3/4" : "h-full"}  mx-auto`}>
            <div className='w-full h-full'>
            <DocViewer
                documents={docs}
                config={{
                    header: {
                      disableHeader: false,
                      disableFileName: false,
                      retainURLParams: false
                    }
                  }}
                pluginRenderers={DocViewerRenderers}
            />
        </div>
    </div>
    </div>
  )
}

