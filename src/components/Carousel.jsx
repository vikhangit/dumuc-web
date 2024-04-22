"use client";
import { Carousel } from "flowbite-react";
import Image from "next/image";
export default function Carousels({ items }) {
  return (
    <div className="min-h-96 h-[170px] w-full px-4">
      <Carousel slideInterval={5000}>
        {items?.map((item, index) => (
          <Image
            width={0}
            height={0}
            sizes="100vw"
            key={index}
            alt={item?.alt}
            src={item?.src}
          />
        ))}
      </Carousel>
    </div>
  );
}
