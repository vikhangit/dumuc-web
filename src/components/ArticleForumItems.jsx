"use client";
import { useEffect, useState } from "react";
import { getPostsLoadMore } from "@apis/posts";
import InfiniteScroll from "react-infinite-scroller";
import { Spinner } from "flowbite-react";
import ArticeForumChild from "./ArticeForumChild";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const ArticleForumItems = ({ data, user, authorId, category, tagId }) => {
  const [posts, setPosts] = useState(data?.items);
  const [hasLoadMore, setHasLoadMore] = useState(true);
  useEffect(() => {
    setPosts(data);
  }, [data]);
  const loadMore = async () => {
    setHasLoadMore(true);
    let payload = {};
    category && category?.categoryParentId === ""
      ? (payload["categoryParent"] = category.categoryId)
      : (payload["category"] = category.categoryId);
    authorId && (payload["author"] = authorId);
    tagId && (payload["tag"] = tagId);
    payload["limit"] = posts ? posts.length + 2 : 2;
    await getPostsLoadMore(payload).then((result) => {
      let data = [];
      result?.items?.filter((x) => {
        const find = posts.find((y) => x.postId === y.postId);
        if (find?.postId === x.postId) {
        } else {
          data.push(x);
        }
      });
      setPosts([...posts, ...data]);
      if (posts?.length >= result?.items.length) {
        setHasLoadMore(false);
      }
    });
  };

  return (
    <>
      {posts && (
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
          {[...posts]
            ?.sort((a, b) => b.no - a.no)
            .map((item, index) =>
              user?.email === item?.author?.user?.email ? (
                <ArticeForumChild key={index} item={item} />
              ) : !item?.isPrivate ? (
                <ArticeForumChild key={index} item={item} />
              ) : (
                <div key={index}></div>
              )
            )}
        </InfiniteScroll>
      )}
    </>
  );
};

export default ArticleForumItems;
