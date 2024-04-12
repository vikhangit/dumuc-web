"use client"
import { getPopularAuthors, getPopularPosts } from '@apis/posts';
import { getUsersRanking } from '@apis/users';
// import { getHelperSossByMember } from '@apis/soss';

import BannerRight from '@components/BannerRight';
const FeaturedPost = dynamic( () => {
  return import( '@components/FeaturedPost' );
}, { ssr: false } );
const FeaturedTab = dynamic( () => {
  return import( '@components/FeaturedTab' );
}, { ssr: false } );
const FeaturedMember = dynamic( () => {
  return import( '@components/FeaturedMember' );
}, { ssr: false } );

import Header from '@components/Header';
import dynamic from 'next/dynamic';
const TabbarBottom = dynamic( () => {
  return import( '@components/TabbarBottom' );
}, { ssr: false } );
import Link from 'next/link'
import React from 'react';
const FeaturedKnights = dynamic( () => {
  return import( '@components/FeaturedKnights' );
}, { ssr: false } );

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
