//components
import FeedItem from "@components/FeedItem";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect, useState } from "react";

const FeedSearchItems = ({ data, title, user, usingUser, authors }) => {
  const [items, setItems] = useState(data);
  useEffect(() => {
    setItems(data?.sort((a, b) => b?.no - a?.no));
  }, [data]);
  return (
    <div
      className="post-list px-4"
      style={{ backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)" }}
    >
      {title && (
        <h2 class="px-4 pt-8 text-2xl font-bold text-gray-900">{title}</h2>
      )}
      {items
        ?.sort((a, b) => b.no - a.no)
        ?.map((item, index) =>
          item?.userId === user?.uid ? (
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
    </div>
  );
};

export default FeedSearchItems;
