'use client'

import Image from 'next/image'

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function CustomImageLinkRenderer({ data }) {
  const src = data.url;
  return (
    <div>
      <div className=''>
      <img alt='image' style={{width: "100%", height: "auto"}} className='my-4' src={src} />
    </div>
    <p className='text-sm italic text-center'>{data.caption}</p>
    </div>
  )
}

export default CustomImageLinkRenderer

