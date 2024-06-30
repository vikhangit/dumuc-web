"use client";
import dynamic from "next/dynamic";
import Story from "./Story";
import { useEffect, useState } from "react";
const QuickAddStory = dynamic(
  () => {
    return import("@components/QuickAddStory");
  },
  { ssr: false }
);
const ModalPlayVideos = dynamic(
  () => {
    return import("@components/ModalPlayVideos");
  },
  { ssr: false }
);

const StoryWrapper = ({
  data,
  onCallback,
  user,
  usingUser,
  myFollow,
  myFriend,
  authors,
}) => {
  const [items, setItems] = useState(data);
  useEffect(() => {
    setItems(data);
  }, [data]);
  return (
    <>
      <Story
        authors={authors}
        data={items}
        myFollow={myFollow}
        myFriend={myFriend}
        onCallback={onCallback}
        user={user}
        usingUser={usingUser}
      />
    </>
  );
};
export default StoryWrapper;
