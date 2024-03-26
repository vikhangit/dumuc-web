"use client"
import CustomCodeRenderer from "@components/editorjs/CustomCodeRenderer";
import CustomImageRenderer from "@components/editorjs/CustomImageRenderer";
import CustomHeaderRenderer from "@components/editorjs/CustomHeaderRenderer";
import CustomGalleryRenderer from "@components/editorjs/CustomGalleryRenderer";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";

import dynamic from "next/dynamic";

import { useWindowSize } from "@hooks/useWindowSize";
import CustomImageLinkRenderer from "./CustomImageLinkRenderer";
const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

const EditorjsRender = ({ item }) => {
  const sizes = useWindowSize()
  const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
    header: CustomHeaderRenderer,
    gallery: CustomGalleryRenderer,
    imageInline: CustomImageLinkRenderer
  };

  const style = {
    paragraph: {
      fontSize: sizes.width > 576 ? 16 : 14,
      fontWeigjt: sizes.width > 576 ? "400" : "500",
      textAlign: "justify",
      color: "#605F5F"
    },
  };

  return (
    item?.body?.blocks?.map((i, idx) => {
      switch (i?.type) {
        case "header": return <CustomHeaderRenderer data={i?.data} />
        case "imageInline": return <CustomImageLinkRenderer data={i?.data}/>
        case "code": return <CustomCodeRenderer data={i?.data} />
        case "image": return <CustomImageRenderer data={i?.data} />
        case "delimiter": return <div className="flex justify-center text-[50px]">*  *  *</div>
        case "quote": return <div className="my-2">
          <div>
            <span><RiDoubleQuotesL size={32} color="blue" /></span>
            <p style={{
               marginLeft: 30,
               marginRight: 30
            }} className="text-lg font-normal text-justify">{i?.data?.text}</p>
            <span className="flex justify-end"><RiDoubleQuotesR  size={32} color="blue" /></span>
          </div>
          <p className='text-sm italic text-center'>{i?.data.caption}</p>
        </div>
        case "paragraph": return <div className="my-2 text-lg font-normal text-justify" dangerouslySetInnerHTML={{__html: i?.data?.text}}></div>
        default:
      }
    })
  );
};

export default EditorjsRender;
