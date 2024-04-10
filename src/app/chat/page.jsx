
"use client"
import TabbarBottomChat from '@components/TabbarBottomChat';
import { useWindowSize } from '@hooks/useWindowSize';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@utils/firebase';;
import {collection, query, orderBy,onSnapshot,
  limit,} from 'firebase/firestore';
import { getAuthors } from '@apis/posts';
import ChatLeft from '@components/Chat/Left';
import ChatRight from '@components/Chat/Right';


export default function ChatGroup() {
    const [user] = useAuthState(auth)
    const sizes = useWindowSize()
    const [show, setShow] = useState(0)
    const [mobile, setMobile] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userRecieved, setUserRecieved] = useState();
    const [messageDetail, setMessageDetail] = useState([])
    useEffect(() => {
      if(sizes.width < 992){
        setShow(-1)
      }
    }, [sizes])
    useEffect(() => {
      const q = query(
        collection(db,"chat-rooms"),
        orderBy("createdAt", "asc")
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let fetchedMessages = [];
          QuerySnapshot.forEach((doc) => {
            let messages = []
            const q2 = query(
              collection(db, 'chat-rooms', doc.id, 'messages'),
            orderBy('createdAt', 'asc')
              );
              const unsubscribe1=  onSnapshot(
            q2,
            (querySnapshot) => {
                querySnapshot.forEach((doc1) => messages.push({
                  id: doc1.id,
                  ...doc1.data(),
              }));
            }
            )
            fetchedMessages.push({ ...doc.data(), id: doc.id, messages });
          });
          const sortedMessages = fetchedMessages
          .sort(
              (a, b) => a.createdAt - b.createdAt
            );
        setMessages(fetchedMessages?.sort((a, b) => a?.createdAt - b?.createdAt));
      });
      return () => unsubscribe;
    }, []);
    const [authors, setAuthors] = useState()
    useEffect(( ) =>{
      getAuthors().then(data => setAuthors(data))
    }, [])
  return (
    <main className="w-full h-full fixed left-0 top-0">
      <div className={`w-full h-full relative flex ${sizes.width > 992 ? "flex-row" : "flex-col"}`}>
        <ChatLeft setUserRecieved={setUserRecieved} userRecieved={userRecieved} 
        mobile={mobile} setMobile={setMobile} messages={messages} authors={authors} />
        <ChatRight userRecieved={userRecieved} setUserRecieved={setUserRecieved} mobile={mobile} setMobile={setMobile} messages={messages} authors={authors} />
      </div>
    {/* <div className={sizes.width > 411 ? "mb-24" :  "mb-16"} /> */}
    {
        sizes.width > 992 ? <TabbarBottomChat active="chat" /> : show < 0 && !mobile && <TabbarBottomChat active="chat" />
    }
    </main>
  )
}
