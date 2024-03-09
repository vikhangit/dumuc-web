import _ from "lodash";
import { getPostsLoadMore, getAuthor } from "@apis/posts";
import { getFeedsLoadMore  } from "@apis/feeds";

import TabbarBottom from "@components/TabbarBottom";
import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import NewAuthorUI from '@components/Dumuc/NewAuthor';

const AuthorPage = async ({params, searchParams}) => {
  return (
    <NewAuthorUI params={params} searchParams={searchParams}/>
  );
};

export default AuthorPage;
