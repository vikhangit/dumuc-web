
'use client'
import { useEffect, useState } from "react";
import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import BannerCenter from "@components/BannerCenter";
import TableOfContent from "@components/TableOfContent";

import moment from "moment";
import _ from "lodash";

import CustomCodeRenderer from '@components/editorjs/CustomCodeRenderer'
import CustomImageRenderer from '@components/editorjs/CustomImageRenderer'
import CustomHeaderRenderer from '@components/editorjs/CustomHeaderRenderer'

import { getPost } from "@apis/posts";


import dynamic from 'next/dynamic'
import Loading from "../loading";
import Image from "next/image";
const Output = dynamic(
  async () => (await import('editorjs-react-renderer')).default,
  { ssr: false }
)

const PostDetailPage = ({ params: { slug, id } }) => {
  //post
  const [post, setPost] = useState();
  const [loading, setLoading] =useState(true)

  useEffect(() => {
    getPost({
      postId: id,
    }).then(result => {
      setPost(result)
      setLoading(false);
    })
  }, [id])



  const url = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/forum/post/${slug}/${id}`;
  const urlCategory = `/forum/topic/${post?.categoryObj?.slug}/${post?.categoryObj?.categoryId}`;

  const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
    header: CustomHeaderRenderer,
  }
  
  const style = {
    paragraph: {
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
    },
  }

  return loading ? (
    <Loading isPreview={true} />
  ) : (
    <main className="w-full">
      <Header isBack={true} />
      <div
        className="bg-white mt-[1px] px-8"
        style={{
          backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)",
        }}
      >
        <div className="py-4">
          <BannerCenter />
        </div>
        <div className="text-gray-500 text-xs my-1">
            {moment(post?.publishDate).format("MMMM DD, YYYY")}
          </div>
          <div className="flex justify-between text-[#c80000] my-1">
            <a href={urlCategory}>
              {post?.categoryObj?.name.toUpperCase()}
            </a>
          </div>
        <h1 className="text-xl font-bold leading-tight text-gray-900">
          {post?.title}
        </h1>
        <p className="text-gray-500 italic my-3">
          {post?.description}
        </p>
        <div className="flex justify-between mt-2 ml-2">
          <div className="flex items-center">
            <Image
              width={0} height={0} sizes="100vw"
              class="w-10 h-10 rounded-full"
              src={post?.author?.photo}
              alt={post?.author?.name}
            />
            <a
              style={{ color: "black", fontWeight: "500", marginLeft: 10 }}
              href={`/author/${post?.author?.slug}/${post?.author?.authorId}`}
            >
              {post?.author?.name}
            </a>
            <li className="text-gray-500 ml-2">
              {moment(post?.publishDate).format("MMMM DD, YYYY")}
            </li>
          </div>
        </div>

        <TableOfContent
          headers={post?.body.blocks.filter((x) => x.type === "header")}
        />

        <Output
          style={style}
          className="text-sm"
          renderers={renderers}
          data={post?.body}
        />
        {
          post?.tags &&
        <div style={{ marginTop: 10, paddingBottom: 20 }}>
          {post?.tags?.map((item, index) => (
            <a
              key={index}
              href={`/search?q=${item}`}
            >
              <span class="mr bg-yellow-100 text-yellow-800 text-sm font-medium mr-2 px-3 py-1.5 rounded">
                #{item}
              </span>
            </a>
          ))}
        </div>
        }
      </div>
      <BannerRight />
    </main>
  );
};

export default PostDetailPage;
