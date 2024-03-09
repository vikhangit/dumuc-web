import ArticleLike from "./ArticleLike";
import ArticleComment from "./ArticleComment";
import ArticleShare from "./ArticleShare";

const ArticeFeedLikeShareComment = ({ item, url}) => {
  return (
    <div>
      <div class="flex py-3 space-x-6 justify-between">
        <span className="text-gray-500 text-sm">
          {item?.likesCount || "0"} Lượt thích
        </span>
        <span className="text-gray-500 text-sm">
          {item?.commentsCount} Bình luận
        </span>
      </div>
      <div class="flex py-3 space-x-6 border-t border-b border-gray-200 justify-between">
        <ArticleLike
          id={item?.postId}
          currentUrl={url}
          count={item?.likesCount}
        />
        <ArticleComment
          count={item?.commentsCount}
          url={url}
        />
        <ArticleShare item={item} />
      </div>
    </div>
  );
};

export default ArticeFeedLikeShareComment;