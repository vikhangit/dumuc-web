import PostDetailContent from "@components/PostDetailContent";

const PostDetailPage = ({ params: { slug, id } }) => {
  return (
    <PostDetailContent id={id} slug={slug}  />
  )
};

export default PostDetailPage;
