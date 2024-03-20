"use client"
import {useState,  useEffect} from 'react'
import { Spinner } from "flowbite-react";

import {getPostsLoadMore} from "@apis/posts";

import ArticleLike from "@components/ArticleLike";
import ArticleComment from "@components/ArticleComment";
import ArticleMeta from "@components/ArticleMeta";
import ArticleAuthor from "@components/ArticleAuthor";

import InfiniteScroll from 'react-infinite-scroller';
import Image from 'next/image';

const ArticleItems = ({ data, title, authorId, category, tagId, layout='scroll', onCallback }) => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState(data?.items);
  const [last, setLast] = useState(data?.last);
  const [isLastResult, setIsLastResult] = useState(data?.last === data?.lastest)
  useEffect(() => {
    setItems(data?.items);
    setLast(data?.last);
    setIsLastResult( data?.last === data?.lastest)
  }, [data])
  const loadMore = () => {
    setLoading(true)
    let payload = {};

    if (category) {
      if (category?.categoryParentId === '') {
        payload["categoryParent"] = category.categoryId;
      } else {
        payload["category"] = category.categoryId;
      }
    }

    if (authorId) {
      payload["author"] = authorId;
    }

    if (tagId) {
      payload["tag"] = tagId;
    }

    payload["limit"] = 20;
    payload["last"] = last;

    getPostsLoadMore(payload)
    .then((result) => {
      setLast(result?.last);
      setIsLastResult(result?.last === result?.lastest)
      setItems([...items, ...result?.items]);
      setLoading(false)
    });
  }

  const renderItems = (items) => {
    return items?.map((item, index) => {
      const url = `/forum/post/${item?.slug}/${item?.postId}`;
      const photos = item?.body?.blocks.filter(x => x.type === "image");
      const photo = item?.photo ? item?.photo : photos[0]?.data?.file?.url

      return (
        item?.isActive &&
        <div className='my-8 mx-4' key={index}>
          <article className="article-item mb-14 flex gap-x-8 gap-y-4 flex-col sm:flex-row">
            <div className="">
              {
                photo && <a href={url}>
                <Image
                width={0} height={0} sizes="100vw"
                  alt={item?.title}
                  className="w-full sm:w-[180px] h-full sm:h-[135px] object-cover"
                  src={photo}
                />
              </a>
              }
            </div>
            <div className='flex flex-col pr-4 w-full'>
              <a href={url} className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-gray-900">
                {item?.title}
              </a>
              <div className="line-clamp-3 font-light text-base">{item?.description}</div>
              <ArticleMeta item={item} onCallback={onCallback} />
            </div>
          </article>
        </div>
      )
    })
  }

  return (
    <div className="post-list">
      {title && (
        <h2 class="pt-8 px-4 text-2xl font-bold text-gray-900">{title}</h2>
      )}
      <div className='flex flex-col overflow-y-hidden'>
        {(layout === 'scroll' && items) &&
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={!isLastResult}
            loader={
              <div className="text-center py-6">
                <Spinner aria-label="Đang tải" color="info" />
              </div>
            }
          >
            {renderItems(items)}
          </InfiniteScroll>
        }
        {(layout === 'loadmore' && items) && (
          <>
            {renderItems(items)}
            {(!isLastResult && loadMore) && (
              <div className='text-center mx-10 mb-4'>
                {loading ?
                <button onClick={() => loadMore()} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Đang tải</button>
                :
                <button onClick={() => loadMore()} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Xem thêm</button>
                }
              </div>
            )}
          </>
        )}
        {(layout === 'list' && items) && (
          <>
            {renderItems(items)}
          </>
        )}
      </div>
    </div>
  );
};

export default ArticleItems;
