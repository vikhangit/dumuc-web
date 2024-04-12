'use client'

import Image from 'next/image';
import "@fancyapps/ui/dist/fancybox/fancybox.css";

function CustomImageRenderer({ data }) {
  const src = data.file.url;
  return (
    <div>
      <div className=''>
      <Image alt='image' width={0} height={0} style={{width: "100%", height: "auto"}} sizes='100vw' className='my-4' src={src} />
    </div>
    <p className='text-sm italic text-center'>{data.caption}</p>
    </div>
  )
}

export default CustomImageRenderer

