
"use client"
import TabbarBottom from '@components/TabbarBottom';
import TabbarBottomChat from '@components/TabbarBottomChat';
import { useWindowSize } from '@hooks/useWindowSize';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import { HiVideoCamera } from 'react-icons/hi';
import { IoIosCall, IoMdSearch } from 'react-icons/io';
import { IoCall, IoChevronBackOutline, IoImageOutline, IoImages, IoSend, IoVideocam } from 'react-icons/io5';
import { MdEmojiEmotions, MdOutlinePersonAddAlt } from 'react-icons/md';
import { RiFolderVideoFill, RiFolderVideoLine } from 'react-icons/ri';
import { GoFileDirectory, GoFileDirectoryFill } from "react-icons/go";
import { LuFileVideo } from "react-icons/lu";
import { HiArrowLongLeft } from "react-icons/hi2";
import { PrettyChatWindow } from 'react-chat-engine-pretty';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@utils/firebase';;
import { getFirestore, collection, addDoc, serverTimestamp,query, orderBy,onSnapshot,
  limit,} from 'firebase/firestore';import { getProfile } from '@apis/users';
import { getAuthor } from '@apis/posts';
import ChatLeft from '@components/Chat/Left';
import ChatRight from '@components/Chat/Right';
import { useParams } from 'next/navigation';
;

const chatRooms = [
  { id: 1, title: "A" },
  { id: 2, title: 'B' },
  { id: 3, title: 'C' },
  { id:4, title: 'D' },
  { id: 5, title: 'E' },
  { id: 6, title: 'F' },
]


export default function Chat() {
  const params = useParams();
  console.log(params)
    const [user] = useAuthState(auth)
    const sizes = useWindowSize()
    const [show, setShow] = useState(0)
    const [mobile, setMobile] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userRecieved, setUserRecieved] = useState();
    useEffect(() => {
      getAuthor({authorId: params?.id}).then((data) => setUserRecieved(data))
    })
    useEffect(() => {
      if(sizes.width < 992){
        setShow(-1)
      }
    }, [sizes])
    useEffect(() => {
      const q = query(
        collection(db,"chat-rooms", "123", "messages"),
        // orderBy("createdAt", "desc"),
        limit(50)
      );
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const fetchedMessages = [];
        QuerySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        // const sortedMessages = fetchedMessages.sort(
        //   (a, b) => a.createdAt - b.createdAt
        // );
        setMessages(fetchedMessages);
      });
      return () => unsubscribe;
    }, []);
  return (
    <main className="w-full h-full fixed left-0 top-0">
      <div className={`w-full h-full relative flex ${sizes.width > 992 ? "flex-row" : "flex-col"}`}>
        <ChatLeft setUserRecieved={setUserRecieved} show={show} setShow={setShow} userRecieved={userRecieved} 
        mobile={mobile} setMobile={setMobile} messages={messages?.filter((item) => item?.sent?.uid === user?.uid || item?.recieved?.uid === user?.uid)}  />
        <ChatRight userRecieved={userRecieved} mobile={mobile} setMobile={setMobile} messages={messages?.filter((item) => item?.sent?.uid === user?.uid || item?.recieved?.uid === user?.uid)} />
      </div>
    {/* <div className={sizes.width > 411 ? "mb-24" :  "mb-16"} /> */}
    {
        sizes.width > 992 ? <TabbarBottomChat active="chat" /> : show < 0 && !mobile && <TabbarBottomChat active="chat" />
    }
    </main>
  )
}
