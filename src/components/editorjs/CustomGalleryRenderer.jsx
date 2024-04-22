"use client";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Image from "next/image";
import { useEffect } from "react";

function CustomGalleryRenderer({ data }) {
  const galleryList = data.files;
  useEffect(() => {
    Fancybox.bind('[data-fancybox="gallery"]', {
      Thumbs: {
        type: "classic",
      },
      Toolbar: {
        display: {
          left: ["infobar"],
          middle: [],
          right: ["slideshow", "download", "iterateZoom", "thumbs", "close"],
        },
      },
      Images: {
        initialSize: "cover",
        content: (_ref, slide) => {
          let rez = "<picture>";
          const media = slide.media.split(";");
          slide.sources.split(";").map((source, index) => {
            rez += `<source
            key="${index}"
                        media="${media[index] || ""}"
                        srcset="${source}"
                        />`;
          });
          rez += `<img src="${slide.src}" style="height: 100%" alt="" />`;
          rez += "</picture>";

          return rez;
        },
      },
    });
  }, []);
  return (
    <div className="grid grid-cols-3 gap-x-4 gap-y-4 mt-4">
      {galleryList.slice(0, 3).map((item, index) => {
        return (
          <div key={index} className="h-full">
            <a
              className={`h-full w-full relative`}
              data-fancybox="gallery"
              data-src={item.url.replace("amp;", "")}
              data-media="(max-width: 799px);(min-width: 800px)"
              data-sources={item.url.replace("amp;", "")}
            >
              <Image
                alt="image"
                width={0}
                height={0}
                style={{ width: "100%", height: "100%" }}
                sizes="100vw"
                className=""
                src={item.url.replace("amp;", "")}
              />
              {index === 2 && (
                <div className="absolute top-0 right-0 bg-black bg-opacity-60 w-full h-full flex justify-center items-center">
                  <p className="text-lg text-white text-center">
                    +{data.files.length - 3}
                  </p>
                </div>
              )}
            </a>
          </div>
        );
      })}
      {galleryList.slice(3, galleryList.length).map((item, index) => {
        return (
          <div key={index} className="h-full hidden">
            <a
              className={`h-full w-full relative`}
              data-fancybox="gallery"
              data-src={item.url.replace("amp;", "")}
              data-media="(max-width: 799px);(min-width: 800px)"
              data-sources={item.url.replace("amp;", "")}
            >
              <Image
                alt="image"
                width={0}
                height={0}
                style={{ width: "100%", height: "100%" }}
                sizes="100vw"
                className=""
                src={item.url.replace("amp;", "")}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default CustomGalleryRenderer;
