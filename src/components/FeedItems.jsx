"use client";
import { useEffect, useState } from "react";
import { createFeedView, getFeedsLoadMore } from "@apis/feeds";
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
  loading,
  authors,
  user,
  usingUser,
  onCallback,
}) => {
  const [hasLoadMore, setHasLoadMore] = useState(true);
  const [items, setItems] = useState(data?.items);
  useEffect(() => {
    setItems(data?.items?.sort((a, b) => b?.no - a?.no));
  }, [data]);

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
        <NewQuickPost
          onCallback={onCallback}
          user={user}
          usingUser={usingUser}
        />
      ) : authors?.find(
          (x) => x?.userId === user?.uid && x?.authorId === authorId
        ) ? (
        <NewQuickPost
          onCallback={onCallback}
          user={user}
          usingUser={usingUser}
        />
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
              user?.uid === item?.userId ? (
                <FeedItem
                  key={index}
                  data={item}
                  index={index}
                  user={user}
                  usingUser={usingUser}
                  authors={authors}
                />
              ) : !item?.isPrivate ? (
                <FeedItem
                  key={index}
                  data={item}
                  index={index}
                  user={user}
                  usingUser={usingUser}
                  authors={authors}
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
            data={item}
            index={index}
            user={user}
            usingUser={usingUser}
            authors={authors}
          />
        ))}
    </div>
  );
};

export default FeedItems;
