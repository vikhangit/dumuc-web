import { getPopularAuthors, getPopularPosts } from '@apis/posts';
import { getUsersRanking } from '@apis/users';
// import { getHelperSossByMember } from '@apis/soss';

import BannerRight from '@components/BannerRight';
import FeaturedPost from '@components/FeaturedPost';
import FeaturedMember from '@components/FeaturedMember';
import FeaturedTab from '@components/FeaturedTab';
import Header from '@components/Header';
import TabbarBottom from '@components/TabbarBottom';
import Link from 'next/link'
import React from 'react';
import FeaturedKnights from '@components/FeaturedKnights';

const Featured =  async ({searchParams}) => {
  const [authors, popular, usersRanking] = await Promise.all([
    getPopularAuthors(),
    getPopularPosts(),
    getUsersRanking(),
  ]);
  return (
    <main className="w-full">
      <div>
        <Header isBack={true} />
        <FeaturedTab searchParams={searchParams} />
        {
          searchParams?.tab === "members" && <FeaturedMember items={authors} limit={10} />
        }
        {
          searchParams?.tab === "posts" && <FeaturedPost items={popular} limit={10} />
        }
        {
          searchParams?.tab === "knights" && <FeaturedKnights usersRanking={usersRanking} limit={10} />
        }
      </div>  
      <div className='mb-24'></div>
      <TabbarBottom active='featured' />
      <BannerRight isAppInstall={true} />
    </main>
  );
}

export default Featured;
