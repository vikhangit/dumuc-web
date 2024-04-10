
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
import { getAuthor, getAuthors } from '@apis/posts';
import ChatLeft from '@components/Chat/Left';
import ChatRight from '@components/Chat/Right';
import { useParams } from 'next/navigation';
import { moveArr } from '@utils/covertCommets';
import ChatGroupLeft from '@components/Chat/Group/GroupLeft';
import ChatGroupRight from '@components/Chat/Group/GroupRight';


export default function Chat() {
    const [user] = useAuthState(auth)
    const sizes = useWindowSize()
    const [show, setShow] = useState(0)
    const [mobile, setMobile] = useState(false);
    const [messages, setMessages] = useState([]);
    const [userRecieved, setUserRecieved] = useState();
    const [activeGroup, setActiveGroup] = useState()
    useEffect(() => {
      if(sizes.width < 992){
        setShow(-1)
      }
    }, [sizes])
    useEffect(() => {
      const q = query(
        collection(db,"chat-groups"),
        orderBy("createdAt", "desc")
        );
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let fetchedGroup = [];
          QuerySnapshot.forEach((doc) => {
            let member = []
            const q2 = query(
              collection(db, 'chat-groups', doc.id, 'member'),
            orderBy('createdAt', 'desc')
              );
              onSnapshot(
            q2,
            (querySnapshot) => {
                querySnapshot.forEach((doc1) => member.push({
                  id: doc1.id,
                  ...doc1.data(),
              }));
            }
            )

            let messages = []
            const q3 = query(
              collection(db, 'chat-groups', doc.id, 'messages'),
            orderBy('createdAt', 'asc')
              );
              onSnapshot(
            q3,
            (querySnapshot) => {
                querySnapshot.forEach((doc1) => messages.push({
                  id: doc1.id,
                  ...doc1.data(),
              }));
            }
            )
            fetchedGroup.push({ ...doc.data(), id: doc.id, member, messages });
          });
          
          const sortedMessages = fetchedGroup
          .sort(
              (a, b) => a.createdAt - b.createdAt
            );
        setMessages(fetchedGroup?.sort((a, b) => a?.createdAt - b?.createdAt));
      });
      return () => unsubscribe;
    }, []);
    const [authors, setAuthors] = useState()
    useEffect(( ) =>{
      getAuthors().then(data => setAuthors(data))
    }, [])
    console.log(messages)
  return (
    <main className="w-full h-full fixed left-0 top-0">
      <div className={`w-full h-full relative flex ${sizes.width > 992 ? "flex-row" : "flex-col"}`}>
        <ChatGroupLeft setUserRecieved={setUserRecieved} userRecieved={userRecieved} 
        activeGroup={activeGroup} setActiveGroup={setActiveGroup}
        mobile={mobile} setMobile={setMobile} messages={messages} authors={authors} />
        <ChatGroupRight userRecieved={userRecieved} activeGroup={activeGroup} setActiveGroup={setActiveGroup} setUserRecieved={setUserRecieved} mobile={mobile} setMobile={setMobile} messages={messages} authors={authors} />
      </div>
    {/* <div className={sizes.width > 411 ? "mb-24" :  "mb-16"} /> */}
    {
        sizes.width > 992 ? <TabbarBottomChat active="group" /> : show < 0 && !mobile && <TabbarBottomChat active="chat" />
    }
    </main>
  )
}
