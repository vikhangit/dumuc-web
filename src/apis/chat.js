import { db } from "@utils/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";

function getChatRooms(callback){
  return onSnapshot(
    query(collection(db, "chat-rooms"), orderBy("createdAt", "asc")),
    (querySnapshot) => {
        const chatRooms = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data()?.createdAt?.toDate()
        }));
        callback(chatRooms);
    }
  );
}

function getMessages(roomId, callback) {
  return onSnapshot(
    query(
        collection(db, 'chat-rooms', roomId, 'messages'),
        orderBy("createdAt", "asc")
    ),
    (querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(messages);
    }
  );
}
export { getChatRooms, getMessages }