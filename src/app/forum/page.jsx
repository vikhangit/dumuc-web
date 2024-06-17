"use client";
import dynamic from "next/dynamic";
const TabbarBottom = dynamic(
  () => {
    return import("@components/TabbarBottom");
  },
  { ssr: false }
);
import Header from "@components/Header";
import BannerRight from "@components/BannerRight";
import { getCategories } from "@apis/posts";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "./loading";
import CategoryList from "@components/Forums/CategoryList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@utils/firebase";

const HomePage = () => {
  const [user] = useAuthState(auth);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
      setParent(
        data?.filter(
          (item) => item.categoryParentId === "" && item.type === "posts"
        )
      );
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <main className="w-full">
      <div className="w-full">
        <Header />
        <div className="mt-2 mb-4">
          <h2 class="text-lg font-medium text-[#c80000] dark:text-white text-center">
            CỘNG ĐỒNG DU MỤC VIỆT NAM
          </h2>
          <div className="flex justify-center items-end mt-2 gap-x-2">
            {Array(5)
              .fill()
              .map((item, index) => (
                <Image
                  key={index}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  src="/icons/bottom/Vector.png"
                  className={index === 2 ? "w-6 h-6" : "w-5 h-5"}
                />
              ))}
          </div>
          <CategoryList categories={categories} parent={parent} user={user} />
        </div>
        <div className="mb-24" />
      </div>
      <TabbarBottom active="forum" />
      <BannerRight isAppInstall={true} />
    </main>
  );
};

export default HomePage;
