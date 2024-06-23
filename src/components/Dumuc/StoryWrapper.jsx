"use client";
import dynamic from "next/dynamic";
import Story from "./Story";
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
  return (
    <>
      <Story
        authors={authors}
        data={data}
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
