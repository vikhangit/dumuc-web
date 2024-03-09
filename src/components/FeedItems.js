"use client";
import { useEffect, useState } from "react";

//apis
import { getFeedsLoadMore } from "@apis/feeds";

//components
import FeedItem from "@components/FeedItem";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "flowbite-react";
import NewQuickPost from "./Dumuc/NewQuickPost";
import { userAtom } from "@recoils/atoms";
import { useRecoilValue } from "recoil";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const FeedItems = ({
  data,
  title,
  authorId,
  tagId,
  layout='scroll',
  onCallback,
  setFeedData
}) => {
  const [items, setItems] = useState(data?.items);
  const [last, setLast] = useState(data?.last);
  const [isLastResult, setIsLastResult] = useState(
    data?.last === data?.lastest
  );
  const [user, loading, error] = useAuthState(auth);
  const [hasLoadMore, setHasLoadMore] = useState(true);
  useEffect(() => {
    setItems(data?.items)
  },[data])
  const loadMore = async () => {
    setHasLoadMore(true)
    let payload = {};
    if (authorId) {
      payload["author"] = authorId;
    }

    if (tagId) {
      payload["tag"] = tagId;
    }

    payload["limit"] = items ? items.length + 2 : 2;
    // payload["last"] = last;
    
   await getFeedsLoadMore(payload).then((result) => {
      setLast(result?.last);
      setIsLastResult(result?.last === result?.lastest);
      let data = [];
      result?.items?.filter((x) =>{
       const find = items.find(y=>x.feedId === y.feedId)
       if(find?.feedId === x.feedId){
       }else{
        data.push(x)
       }
      })
      setItems([...items, ...data]);
      if(items?.length >= result?.items.length ){
        setHasLoadMore(false)
      }
    });
  };

  return (
    <div>
      {title && (
        <h2 class="pt-2 px-4 text-2xl font-bold text-gray-900">{title}</h2>
      )}

      { !authorId ? <NewQuickPost onCallback={onCallback} /> : authorId
=== user?.author?.authorId ? <NewQuickPost onCallback={onCallback} /> : ""}
      {layout === 'scroll' && items && (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasLoadMore}
          loader={
            <div className="flex justify-center">
                <Spinner />
            </div>
          }
        >
          {items?.map((item, index) => (
            <FeedItem key={index} item={item} index={index} onCallback={onCallback} />
          ))}
        </InfiniteScroll>
      )}

      {layout === 'list' && items && (
        items?.map((item, index) => (
          <FeedItem key={index} item={item} index={index} />
        ))
      )}
    </div>
  );
};

export default FeedItems;
