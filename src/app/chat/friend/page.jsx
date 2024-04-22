"use client";
const TabbarBottomChat = dynamic(
  () => {
    return import("@components/TabbarBottomChat");
  },
  { ssr: false }
);
import { useWindowSize } from "@hooks/useWindowSize";
import React, { useEffect, useRef, useState } from "react";
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
const ChatLeft = dynamic(
  () => {
    return import("@components/Chat/Friend/Left");
  },
  { ssr: false }
);
const ChatRight = dynamic(
  () => {
    return import("@components/Chat/Friend/Right");
  },
  { ssr: false }
);

export default function ChatFriend() {
  const [user] = useAuthState(auth);
  const sizes = useWindowSize();
  const [show, setShow] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userRecieved, setUserRecieved] = useState();
  const [rooms, setRooms] = useState([]);
  const [allChat, setAllChat] = useState([]);
  useEffect(() => {
    if (sizes.width < 992) {
      setShow(-1);
    }
  }, [sizes]);
  useEffect(() => {
    const q = query(collection(db, "chat-rooms"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let fetchedRooms = [];
      QuerySnapshot.forEach((doc) => {
        fetchedRooms.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data()?.createdAt?.toDate(),
        });
      });
      setRooms(fetchedRooms);
    });
    return () => unsubscribe;
  }, []);
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
  const [authors, setAuthors] = useState();
  useEffect(() => {
    getAuthors().then((data) => setAuthors(data));
  }, []);
  return (
    <main className="w-full h-full fixed left-0 top-0">
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
          messages={messages}
          authors={authors}
          rooms={rooms}
        />
        <ChatRight
          userRecieved={userRecieved}
          setUserRecieved={setUserRecieved}
          mobile={mobile}
          setMobile={setMobile}
          messages={messages}
          authors={authors}
          rooms={rooms}
        />
      </div>
      {/* <div className={sizes.width > 411 ? "mb-24" :  "mb-16"} /> */}
      {sizes.width > 992 ? (
        <TabbarBottomChat active="friend" />
      ) : (
        show < 0 && !mobile && <TabbarBottomChat active="friend" />
      )}
    </main>
  );
}
