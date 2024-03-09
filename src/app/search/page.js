import { getPosts } from "@apis/posts";
import { getFeeds } from "@apis/feeds";

import Header from "@components/Header";
import ArticleItems from "@components/ArticleItems";

import FeedSearchItems from "@components/FeedSearchItems";

import TabbarBottom from "@components/TabbarBottom";
import BannerRight from "@components/BannerRight";

const SearchPage = async ({searchParams}) => {
  const query = searchParams;

  const [posts, feeds] = await Promise.all([
    getPosts(),
    getFeeds(),
  ]);

  return (
    <main className="w-full">
    <div className="w-full bg-white">
      <Header />
      <div class="text-sm font-medium text-center border-b border-gray-200">
        <ul class="flex flex-wrap -mb-px">
          <li className="mr-2">
            <a 
              href={`/search?q=${query?.q}&tab=feed`}
              className={query?.tab === 'feed' || query?.tab === undefined ? "inline-block p-4 font-semibold text-red-600 border-b-4 border-red-600 rounded-t-lg active dark:text-red-500 dark:border-red-500" : "inline-block p-4 font-semibold border-b-4 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300 dark:hover:text-red-300"}>
              Feed ({feeds?.filter(item => {
                try {
                  //let body = item.body?.blocks.filter(x => x.type === 'paragraph').map(item => item?.data?.text).toString();
                  if (
                      (item?.description?.toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    || (item?.tags?.toString().toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    //|| (body?.toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    ) {
                    return true
                  } else {
                    return false
                  }
                } catch (e) {
                  return false
                }
              })?.length})
            </a>
          </li>
          <li className="mr-2">
            <a 
              href={`/search?q=${query?.q}&tab=post`}
              className={query?.tab === 'post' ? "inline-block p-4 font-semibold text-red-600 border-b-4 border-red-600 rounded-t-lg active dark:text-red-500 dark:border-red-500" : "inline-block p-4 font-semibold border-b-4 border-transparent rounded-t-lg hover:text-red-600 hover:border-red-300 dark:hover:text-red-300"}>
              Bài viết ({posts?.filter(item => {
                try {
                  let body = item.body?.blocks.filter(x => x.type === 'paragraph').map(item => item?.data?.text).toString();
                  if (
                      (item?.title?.toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    || (item?.tags?.toString().toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    || (body?.toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    ) {
                    return true
                  } else {
                    return false
                  }
                } catch (e) {
                  return false
                }
              })?.length})
            </a>
          </li>
        </ul>
      </div>
      {(query?.tab === 'feed' || query?.tab === undefined) && (
        <div className='!bg-gray-20 m-y'>
          <FeedSearchItems items={feeds?.filter(item => {
                try {
                  //let body = item.body?.blocks.filter(x => x.type === 'paragraph').map(item => item?.data?.text).toString();
                  if (
                      (item?.description?.toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    || (item?.tags?.toString().toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    //|| (body?.toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    ) {
                    return true
                  } else {
                    return false
                  }
                } catch (e) {
                  return false
                }
              })} title={`Kết quả tìm kiếm: "${query?.q}"`}  />  
        </div>
      )}
      {(query?.tab === 'post') && (
        <div className='!bg-white'>
          <ArticleItems 
            data={{
              items: posts?.filter(item => {
                try {
                  let body = item.body?.blocks.filter(x => x.type === 'paragraph').map(item => item?.data?.text).toString();
                  if (
                      (item?.title?.toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    || (item?.tags?.toString().toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    || (body?.toLocaleLowerCase().search(query?.q.toLocaleLowerCase()) > -1)
                    ) {
                    return true
                  } else {
                    return false
                  }
                } catch (e) {
                  return false
                }
              })
            }} 
            title={`Kết quả tìm kiếm: "${query?.q}"`}
            layout="list"
          />   
        </div>
      )}
      
      <div className="mb-20" />
    </div>
    <TabbarBottom />
    <BannerRight isAppInstall={true} />
  </main>
  );
};



export default SearchPage;
