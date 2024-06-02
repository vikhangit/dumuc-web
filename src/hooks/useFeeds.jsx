"use client";
import { getFeedsLoadMore2 } from "@apis/feeds";
// import { getChatRooms } from "@apis/chat";
import React, { useEffect, useState } from "react";

function useFeeds(num) {
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    const unsubscribe = getFeedsLoadMore2(setFeeds, num);
    return unsubscribe;
  }, []);

  return feeds;
}

export { useFeeds };
