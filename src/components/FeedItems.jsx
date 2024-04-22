"use client";
import { useEffect, useState } from "react";
import { getFeedsLoadMore } from "@apis/feeds";
import FeedItem from "@components/FeedItem";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "flowbite-react";
import NewQuickPost from "./Dumuc/NewQuickPost";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";
import { getAuthors } from "@apis/posts";

const FeedItems = ({
  data,
  authorId,
  tagId,
  layout = "scroll",
  onCallback,
}) => {
  const [items, setItems] = useState(data?.items);
  const [authors, setAuthors] = useState();
  const [user, loading, error] = useAuthState(auth);
  const [hasLoadMore, setHasLoadMore] = useState(true);
  useEffect(() => {
    setItems(data?.items);
  }, [data]);
  useEffect(() => {
    getAuthors().then((data) => {
      setAuthors(data);
    });
  }, []);
  const loadMore = async () => {
    setHasLoadMore(true);
    let payload = {};
    authorId && (payload["author"] = authorId);
    tagId && (payload["tag"] = tagId);
    payload["limit"] = items ? items.length + 2 : 2;
    await getFeedsLoadMore(payload).then((result) => {
      let data = [];
      result?.items?.filter((x) => {
        const find = items.find((y) => x.feedId === y.feedId);
        if (find?.feedId === x.feedId) {
        } else {
          data.push(x);
        }
      });
      setItems([...items, ...data]);
      if (items?.length >= result?.items.length) {
        setHasLoadMore(false);
      }
    });
  };
  return (
    <div>
      {" "}
      {!authorId ? (
        <NewQuickPost onCallback={onCallback} />
      ) : authors?.find(
          (x) => x?.userId === user?.uid && x?.authorId === authorId
        ) ? (
        <NewQuickPost onCallback={onCallback} />
      ) : (
        ""
      )}
      {layout === "scroll" && items && (
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
          {[...items]
            ?.sort((a, b) => b.no - a.no)
            ?.map((item, index) =>
              user?.email === item?.author?.user?.email ? (
                <FeedItem
                  key={index}
                  item={item}
                  index={index}
                  onCallback={onCallback}
                />
              ) : !item?.isPrivate ? (
                <FeedItem
                  key={index}
                  item={item}
                  index={index}
                  onCallback={onCallback}
                />
              ) : (
                <div key={index}></div>
              )
            )}
        </InfiniteScroll>
      )}
      {layout === "list" &&
        items &&
        items?.map((item, index) => (
          <FeedItem
            key={index}
            item={item}
            index={index}
            onCallback={onCallback}
          />
        ))}
    </div>
  );
};

export default FeedItems;
