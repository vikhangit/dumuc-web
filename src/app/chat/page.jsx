"use client";
const TabbarBottomChat = dynamic(
  () => {
    return import("@components/TabbarBottomChat");
  },
  { ssr: false }
);
import { useWindowSize } from "@hooks/useWindowSize";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@utils/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { getAuthors } from "@apis/posts";
import dynamic from "next/dynamic";
import { getProfile } from "@apis/users";
import { useRouter, useSearchParams } from "next/navigation";
const ChatLeft = dynamic(
  () => {
    return import("@components/Chat/Left");
  },
  { ssr: false }
);
const ChatRight = dynamic(
  () => {
    return import("@components/Chat/Right");
  },
  { ssr: false }
);

export default function ChatGroup() {
  const search = useSearchParams();
  const [user] = useAuthState(auth);
  const sizes = useWindowSize();
  const [show, setShow] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userRecieved, setUserRecieved] = useState();
  const [usingUser, setUsingUser] = useState();
  const [friendList, setFriendList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    getProfile(user?.accessToken).then((dataCall) => {
      setUsingUser(dataCall);
      setFriendList(dataCall?.friendList);
    });
  }, [user]);
  useEffect(() => {
    if (sizes.width < 992) {
      setShow(-1);
    }
  }, [sizes]);
  useEffect(() => {
    const q = query(collection(db, "chat-rooms"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        let messages = [];
        const q2 = query(
          collection(db, "chat-rooms", doc.id, "messages"),
          orderBy("createdAt", "asc")
        );
        const unsubscribe1 = onSnapshot(q2, (querySnapshot) =>
          querySnapshot.forEach((doc1) =>
            messages.push({
              ...doc1.data(),
              id: doc1.id,
              createdAt: doc1.data()?.createdAt?.toDate(),
            })
          )
        );
        fetchedMessages.push({
          ...doc.data(),
          id: doc.id,
          messages,
          createdAt: doc.data()?.createdAt?.toDate(),
        });
        return () => unsubscribe1;
      });
      setMessages(fetchedMessages?.sort((a, b) => a?.createdAt - b?.createdAt));
    });
    return () => unsubscribe;
  }, []);
  const [activeMessage, setActiveMessage] = useState([]);

  useEffect(() => {
    if (search.get("chatId")) {
      const q = query(
        collection(db, "chat-rooms", search.get("chatId"), "messages"),
        orderBy("createdAt", "asc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let allMessData = [];
        querySnapshot.forEach((doc) =>
          allMessData.push({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate(),
          })
        );
        setActiveMessage(allMessData);
        setMobile(true);
      });
      return () => unsubscribe;
    } else {
      setActiveMessage();
    }
  }, [search]);
  const [authors, setAuthors] = useState();
  useEffect(() => {
    getAuthors().then((data) => setAuthors(data));
  }, []);

  const checkFriendType = useCallback(
    (friendAuthorId) => {
      const findFriend = friendList?.find(
        (x) => x?.authorId === friendAuthorId
      );
      if (findFriend) {
        if (findFriend?.status === 2) {
          return 2;
        } else {
          if (findFriend?.type === "send") {
            return 3;
          } else {
            return 4;
          }
        }
      }
      return 1;
    },
    [friendList]
  );

  const [typeFriend, setTypeFriend] = useState(1);
  useEffect(() => {
    if (userRecieved) {
      const type = checkFriendType(userRecieved?.authorId);
      setTypeFriend(type);
    }
  }, [userRecieved]);
  return (
    <main className="w-full h-full fixed left-0 top-0 overflow-x-hidden">
      <div
        className={`w-full h-full relative flex ${
          sizes.width > 992 ? "flex-row" : "flex-col"
        }`}
      >
        <ChatLeft
          setUserRecieved={setUserRecieved}
          userRecieved={userRecieved}
          mobile={mobile}
          setMobile={setMobile}
          data={messages}
          authors={authors}
          friendListP={friendList}
          user={user}
          usingUser={usingUser}
          activeMessage={activeMessage}
          checkFriendType={checkFriendType}
          myFriend={friendList}
          setFriendListp={setFriendList}
          typeFriend={typeFriend}
          setTypeFriend={setTypeFriend}
          setActiveMessage={setActiveMessage}
        />
        <ChatRight
          userRecieved={userRecieved}
          setUserRecieved={setUserRecieved}
          mobile={mobile}
          setMobile={setMobile}
          messages={messages}
          authors={authors}
          activeMessage={activeMessage}
          friendList={friendList}
          user={user}
          usingUser={usingUser}
          checkFriendType={checkFriendType}
          setFriendList={setFriendList}
          typeFriend={typeFriend}
          setTypeFriend={setTypeFriend}
        />
      </div>
      {/* <div className={sizes.width > 411 ? "mb-24" :  "mb-16"} /> */}
      {sizes.width > 992 ? (
        <TabbarBottomChat active="chat" />
      ) : (
        show < 0 && !mobile && <TabbarBottomChat active="chat" />
      )}
    </main>
  );
}
