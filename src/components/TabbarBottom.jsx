"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import Image from "next/image";
import { Modal, Spinner } from "flowbite-react";
import { getSossByUser } from "@apis/soss";
import moment from "moment";
import { DateTimeLog } from "@utils/dateFormat";
import { MdPending, MdPeople } from "react-icons/md";
import { useRouter } from "next/navigation";
import { auth, db } from "utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import dynamic from "next/dynamic";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
const PostSOSWithModal = dynamic(
  () => {
    return import("./PostSOSWithModal");
  },
  { ssr: false }
);
import { useWindowSize } from "@hooks/useWindowSize";
import { GoHomeFill } from "react-icons/go";
import { HiSpeakerWave } from "react-icons/hi2";
export default function TabbarBottom({ active = "home" }) {
  const [user, loading, error] = useAuthState(auth);
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const sizes = useWindowSize();
  const [soss, setSoss] = useState([]);
  const [check, setCheck] = useState(true);
  const router = useRouter();
  let now = moment();
  useEffect(() => {
    getSossByUser(user?.accessToken).then((result) => setSoss(result));
    setCheck(false);
  }, [user]);
  const [chats, setChats] = useState([]);
  const [groupPublic, setGroupPublic] = useState([]);
  const [groupPrivate, setGroupPrivate] = useState([]);
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "chat-rooms"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data()?.createdAt?.toDate(),
        });
      });
      setChats(
        fetchedMessages?.filter((a) =>
          a?.member?.find((x) => x?.userId === userId)
        )
      );
    });
    return () => unsubscribe;
  }, []);
  useEffect(() => {
    const q = query(
      collection(db, "chat-groups"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let fetchedGroup = [];
      QuerySnapshot.forEach((doc) => {
        let messages = [];
        fetchedGroup.push({
          ...doc.data(),
          id: doc.id,
          // member,
          messages,
          createdAt: doc.data()?.createdAt?.toDate(),
        });
      });
      setGroupPublic(
        fetchedGroup?.filter(
          (x) =>
            x?.isPrivate === false &&
            x?.member?.find((aa) => aa?.user === userId)
        )
      );
      setGroupPrivate(
        fetchedGroup?.filter(
          (x) =>
            x?.isPrivate === true &&
            x?.member?.find((aa) => aa?.user === userId)
        )
      );
    });
    return () => unsubscribe;
  }, []);
  useEffect(() => {
    const q = query(
      collection(db, "users", userId, "friendList"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let fetchedGroup = [];
      QuerySnapshot.forEach((doc) => {
        let messages = [];
        fetchedGroup.push({
          ...doc.data(),
          id: doc.id,
          // member,
          messages,
          createdAt: doc.data()?.createdAt?.toDate(),
        });
      });
      setFriendList(fetchedGroup);
    });
    return () => unsubscribe;
  }, []);
  return (
    <div className="tabbarBottom fixed bottom-0 w-full z-50 py-[10px] bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full mx-auto grid-cols-5 font-medium">
        <div
          onClick={() => router.push("/")}
          className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <GoHomeFill
            size={32}
            color={active === "home" ? "#c80000" : "#9C9C9C"}
          />
          <span
            class={`text-base md:text-lg font-semibold ${
              active === "home" ? "text-[#c80000]" : "text-[#9C9C9C]"
            }  bottomTabBarHiden1`}
          >
            Trang chủ
          </span>
        </div>
        <div
          onClick={() => router.push("/forum")}
          className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <MdPeople
            size={32}
            color={active === "forum" ? "#c80000" : "#9C9C9C"}
          />
          <span
            class={`text-base md:text-lg font-semibold  ${
              active === "forum" ? "text-[#c80000]" : "text-[#9C9C9C]"
            } bottomTabBarHiden1`}
          >
            Forum
          </span>
        </div>
        <div class="flex items-center justify-center">
          <button
            onClick={() => setIsOpenMenu(true)}
            data-tooltip-target="tooltip-new"
            type="button"
            class={`${
              sizes.width > 800 ? "w-[60px] h-[60px]" : "w-8 h-8"
            } inline-flex items-center justify-center rounded-full hover:bg-black group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800`}
          >
            <Image
              width={0}
              height={0}
              sizes="100vw"
              src="/icons/bottom/Vector.png"
              alt=""
              className="w-full h-full"
            />
            <span class="sr-only">New item</span>
          </button>
        </div>
        <div
          id="tooltip-new"
          role="tooltip"
          class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Create new item
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div
          onClick={() => router.push("#")}
          className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <HiSpeakerWave
            size={32}
            color={active === "sos" ? "#c80000" : "#9C9C9C"}
          />
          <span
            class={`text-base md:text-lg font-semibold ${
              active === "sos" ? "text-[#c80000]" : "text-[#9C9C9C]"
            }  bottomTabBarHiden1`}
          >
            S.O.S
          </span>
        </div>
        <div
          href={"/chat"}
          onClick={() =>
            user
              ? router.push("/chat")
              : router.push(
                  `/auth?url_return=${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/chat/`
                )
          }
          className="cursor-pointer inline-flex flex-col items-center justify-center px-0 sm:px-2 hover:bg-gray-50 dark:hover:bg-gray-800 group"
        >
          <div className="relative">
            <MdPending size={32} color="#9C9C9C" />
            {((chats &&
              chats?.find(
                (x) =>
                  x?.new === true &&
                  x?.lastMessage?.formAuthor?.userId !== userId
              )) ||
              (friendList &&
                friendList?.find(
                  (x) => x?.status === 1 && x?.type === "recieve"
                )) ||
              (groupPublic &&
                groupPublic?.find(
                  (x) =>
                    x?.new === true &&
                    x?.lastMessage?.formAuthor?.userId !== userId
                )) ||
              (groupPrivate &&
                groupPrivate?.find(
                  (x) =>
                    x?.new === true &&
                    x?.lastMessage?.formAuthor?.userId !== userId
                ))) && (
              <div className="w-[10px] h-[10px] bg-[#c80000] absolute -right-[5px] top-[1px] rounded-full"></div>
            )}
          </div>
          <span class="text-base md:text-lg font-semibold text-[#9C9C9C] text-center bottomTabBarHiden1">
            Chat
          </span>
        </div>
      </div>
      <div id="modal-bottom">
        <Drawer
          placement={"bottom"}
          closable={false}
          onClose={() => setIsOpenMenu(false)}
          visible={isOpenMenu}
          key={"right"}
          height={"auto"}
          style={{
            backgroundColor: "#FFFCFC",
          }}
        >
          {check ? (
            <div class="w-full relative mb-5 text-gray-500 flex justify-center md:gap-x-8 sm:gap-x-4 sm:gap-y-4 gap-2 text-base sm:text-xl uppercase">
              <div className="absolute w-full h-[50px] sm:h-20 top-5 sm:top-0 left-[0px] flex justify-center"></div>
              <Spinner />
            </div>
          ) : soss.length > 0 &&
            soss.filter((x) =>
              now.isBefore(
                moment(
                  DateTimeLog(x.createdAt, x?.deadline),
                  "DD/MM/YYYY hh:mm:ss"
                )
              )
            ).length > 0 ? (
            <div class="w-full relative mb-5 text-gray-500 flex justify-center md:gap-x-8 sm:gap-x-4 sm:gap-y-4 gap-2 text-base sm:text-xl uppercase">
              <div className="absolute w-full h-[50px] sm:h-20 top-5 sm:top-0 left-[0px] flex justify-center">
                <div className="w-1/2 sm:w-1/4 h-[50px] sm:h-20 bg-white rounded-[50%] shadow-md shadow-gray-300"></div>
              </div>
              <Link
                className="bottom-link relative flex items-center justify-center basis-full sm:basis-1/2 bg-[#c80000] bg-opacity-40 shadow-lg shadow-gray-500 text-white text-center h-[50px] rounded-xl hover:text-white"
                href={user ? "/account/library/sos?status=0" : "/auth"}
              >
                S O S ĐANG GỬI CỦA BẠN ...
              </Link>
            </div>
          ) : (
            <div class="w-full relative mb-5 text-gray-500 flex md:gap-x-8 sm:gap-x-4 sm:gap-y-4 gap-2 text-base sm:text-xl uppercase">
              <div className="absolute w-full h-[50px] sm:h-20 top-5 sm:top-0 left-[0px] flex justify-between">
                <div className="w-1/4 h-[50px] sm:h-20 bg-white rounded-[50%] shadow-md shadow-gray-300 flex justify-center ml-[12.5%]"></div>
                <div className="w-1/4 h-[50px] sm:h-20 bg-white rounded-[50%] shadow-md shadow-gray-300 flex justify-center mr-[12.5%]"></div>
              </div>
              {/* <Link
                className="bottom-link relative flex items-center justify-center basis-1/2 bg-[#c80000] bg-opacity-40 shadow-lg shadow-gray-500 text-white text-center h-[50px] rounded-xl hover:text-white"
                href={user ? "/sos" : "/auth"}
                onClick={(e) => {
                  if (user) {
                    e.preventDefault();
                    setIsOpenMenu(false);
                    setOpenModal(true);
                  } else {
                    const url_return = `${process.env.NEXT_PUBLIC_HOMEPAGE_URL}/sos/`;
                    router.push(`/auth?url_return=${url_return}`);
                  }
                }}
              >
                <span> Gửi SOS </span>
              </Link> */}
              <Link
                className="bottom-link  relative flex items-center justify-center basis-1/2 bg-[#c80000] bg-opacity-40 shadow-lg shadow-gray-500 text-white text-center h-[50px] rounded-xl hover:text-white"
                href={user ? "/forum/post" : "/auth"}
              >
                Đăng bài
              </Link>
            </div>
          )}
        </Drawer>
        <Modal
          show={openModal}
          onClose={() => setOpenModal(false)}
          style={{
            padding: sizes.width > 376 ? 4 : 0,
          }}
        >
          <Modal.Header className="bg-[#c80000] bg-opacity-60 rounded-b-xl justify-center text-center  text-white [&>h3]:text-white [&>h3]:w-full [&>h3]:text-base [&>h3]:sm:text-xl  [&>button]:ml-auto p-2.5 [&>button]:text-white">
            Tạo SOS mới
          </Modal.Header>
          <Modal.Body className="px-0 sm:px-2 sm:px-4">
            <PostSOSWithModal
              setModalSuccess={setModalSuccess}
              setCloseForm={setOpenModal}
            />
          </Modal.Body>
        </Modal>
        <Modal
          show={modalSuccess}
          onClose={() => {
            setModalSuccess(false);
          }}
          style={{
            padding: sizes.width > 376 ? 4 : 0,
          }}
        >
          <Modal.Header className="bg-[#c80000] bg-opacity-60 rounded-b-xl justify-center text-center  text-white [&>h3]:text-white [&>h3]:w-full [&>h3]:text-base [&>h3]:sm:text-xl  [&>button]:ml-auto p-2.5 [&>button]:text-white">
            Thông báo SOS
          </Modal.Header>
          <Modal.Body className="px-4 py-0 pb-6 flex flex-col items-center">
            <div className="text-2xl text-[#525050] mt-4">
              Bạn đã gửi
              <span className="text-[#D15156]">SOS</span>
              thành công !
            </div>
            <div className="text-[#525050] mt-4">
              Chúng tôi đang tìm Hiệp Sĩ cho bạn ...
            </div>
            <button
              className="mt-4 w-[200px] h-[30px] text-sm font-semibold bg-[#D15156] text-white rounded-full leading-normal flex justify-center items-center"
              onClick={() => router.push("/")}
            >
              Quay về trang chủ
            </button>
          </Modal.Body>
          <Modal.Footer className="flex justify-center items-center">
            <div className="text-[#525050] text-xs text-center">
              ***Bạn có thể
              <div
                className="underline px-1"
                onClick={() => router.push("/sos")}
              >
                xem lại
              </div>
              tình trạng SOS qua cảnh báo trang chủ
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
