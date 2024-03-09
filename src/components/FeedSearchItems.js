//components
import FeedItem from "@components/FeedItem";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const FeedSearchItems = ({
  items,
  title,
}) => {
  
  return (
    <div className="post-list px-4" style={{backgroundImage: "linear-gradient(to bottom, white, #F7F7F7)"}}>
      {title && (
        <h2 class="px-4 pt-8 text-2xl font-bold text-gray-900">{title}</h2>
      )}
      {items?.map((item, index) => (
        <FeedItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default FeedSearchItems;
