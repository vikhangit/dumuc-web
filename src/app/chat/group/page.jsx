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
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuthors } from "@apis/posts";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
const ChatGroupLeft = dynamic(
  () => {
    return import("@components/Chat/Group/GroupLeft");
  },
  { ssr: false }
);
const ChatGroupRight = dynamic(
  () => {
    return import("@components/Chat/Group/GroupRight");
  },
  { ssr: false }
);

export default function Chat() {
  const [user] = useAuthState(auth);
  const sizes = useWindowSize();
  const search = useSearchParams();
  const [show, setShow] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userRecieved, setUserRecieved] = useState();
  const [activeGroup, setActiveGroup] = useState();
  useEffect(() => {
    if (sizes.width < 992) {
      setShow(-1);
    }
  }, [sizes]);
  useEffect(() => {
    const q = query(
      collection(db, "chat-groups"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let fetchedGroup = [];
      QuerySnapshot.forEach((doc) => {
        let messages = [];
        const q3 = query(
          collection(db, "chat-groups", doc.id, "messages"),
          orderBy("createdAt", "asc")
        );
        onSnapshot(q3, (querySnapshot) => {
          querySnapshot.forEach((doc1) =>
            messages.push({
              id: doc1.id,
              ...doc1.data(),
              createdAt: doc1.data()?.createdAt?.toDate(),
            })
          );
        });
        fetchedGroup.push({
          ...doc.data(),
          id: doc.id,
          // member,
          messages,
          createdAt: doc.data()?.createdAt?.toDate(),
        });
      });
      setMessages(fetchedGroup);
    });
    return () => unsubscribe;
  }, []);
  console.log("123", messages);
  const [authors, setAuthors] = useState();
  useEffect(() => {
    getAuthors().then((data) => setAuthors(data));
  }, []);
  console.log(messages);
  return (
    <main className="w-full h-full fixed left-0 top-0">
      <div
        className={`w-full h-full relative flex ${
          sizes.width > 992 ? "flex-row" : "flex-col"
        }`}
      >
        <ChatGroupLeft
          setUserRecieved={setUserRecieved}
          userRecieved={userRecieved}
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
          mobile={mobile}
          setMobile={setMobile}
          messages={messages}
          authors={authors}
        />
        <ChatGroupRight
          userRecieved={userRecieved}
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
          setUserRecieved={setUserRecieved}
          mobile={mobile}
          setMobile={setMobile}
          messages={messages}
          authors={authors}
        />
      </div>
      {/* <div className={sizes.width > 411 ? "mb-24" :  "mb-16"} /> */}
      {sizes.width > 992 ? (
        <TabbarBottomChat active="group" />
      ) : (
        show < 0 && !mobile && <TabbarBottomChat active="group" />
      )}
    </main>
  );
}
