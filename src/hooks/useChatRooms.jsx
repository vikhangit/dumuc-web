"use client";
import { getChatRooms } from "@apis/chat";
import React, { useEffect, useState } from "react";

function useChatRoom() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = getChatRooms(setRooms);
    return unsubscribe;
  }, []);

  return rooms;
}

export { useChatRoom };
