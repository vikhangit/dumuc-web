"use client"
import React, { useState, useEffect, useRef } from "react";
import { Modal} from "antd";
import { CaretDownOutlined} from '@ant-design/icons';
import { uploadImage } from "apis/other";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@utils/firebase';
import dynamic from 'next/dynamic';
import { createUserStories, deleteUserStories, getProfile, updateProfile } from "@apis/users";
import { createStoryByUser, updateStoryByUser } from "@apis/feeds";
import { Button, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import {Spinner} from "flowbite-react"
import { useRouter } from "next/navigation";
const CustomEditor = dynamic( () => {
  return import( './editorjs/CustomCKEditor' );
}, { ssr: false } );


export default function QuickAddStory({ visible, onCancel, onCallback, url, type, data, activeItem,setVideoChange}) {
  const [user] = useAuthState(auth)
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState("")
  const [photo, setPhoto] = useState("")
  const [photoChange, setPhotoChange] = useState("")
  const [usingUser, setUsingUser] = useState()
  const [active, setActive] = useState(0)
  const refImage = useRef(null)
  const [loadingChange, setLoadingChage] = useState(false)
  const router = useRouter();
  const [isMoout, setIsMount] = useState(false)
  useEffect(() =>{
    getProfile(user?.accessToken).then((dataCall) => setUsingUser(dataCall))
  },[user])
  useEffect(() => {
    if(typeof window !== "undefined"){
      setIsMount(true)
    }
  }, [])
  useEffect(() => {
    if(activeItem){
      setLink(activeItem?.description)
      setPhoto(activeItem?.photos)
      setActive(activeItem?.isPrivate ? 0 : 1)
    }
  }, [activeItem])
  const handleChange = e => {
    setLoadingChage(true)
    if (e.target.files[0]) {
      uploadImage(e.target.files[0], user?.accessToken).then((data) => {
        setPhotoChange(data?.url)
        setLoadingChage(false)
        
      });
    }
  }
  const save = async () => {
    setLoading(true);
   if(user){
    if(activeItem) {
      await updateStoryByUser({
        ...activeItem,
        description: link,
        photos: photoChange.length > 0 ? photoChange : photo,
        isPrivate: JSON.parse(localStorage.getItem("storyPrivate")) ? JSON.parse(localStorage.getItem("storyPrivate")) === "0" ? true : false : true
      }, user?.accessToken).then((result) => {
        let list = usingUser?.stories?.length > 0 ? usingUser?.stories : []
        deleteUserStories({
          type: activeItem?.type,
          storyId: activeItem?.storyId
        }, )
        createUserStories({...result?.data}, user?.accessToken)
        setVideoChange(photoChange.length > 0 ? photoChange : photo)
        getProfile(user?.accessToken).then((dataCall) =>  setUsingUser(dataCall))

      })
    }else{
      await createStoryByUser({
        type: type,
        description: link,
        photos: url,
        isPrivate: JSON.parse(localStorage.getItem("storyPrivate")) ? JSON.parse(localStorage.getItem("storyPrivate")) === "0" ? true : false : true
      }, user?.accessToken).then((result) => {
        let list = usingUser?.stories?.length > 0 ? usingUser?.stories : []
        createUserStories({...result?.data}, user?.accessToken)
        getProfile(user?.accessToken).then((dataCall) =>  setUsingUser(dataCall))

      })
    }
   }
   setLoading(false);
   onCallback();
   onCancel();
   window.location = "/"

   localStorage.removeItem("storyPrivate")
  }; 
  return (
    <Modal
      visible={visible}
      title={``}
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose={true}
      footer={
        <div className="w-full flex justify-between">
         <div className='relative rounded-[6px] mt-1 w-fit'>
            <select className='w-full h-full bg-[#e5e5e5] border-0 text-sm font-medium' value={active} onChange={(e) => {
              setActive(e.target.value)
              localStorage.setItem("storyPrivate", JSON.stringify(e.target.value))
            }}>
            <option className='text-xs font-medium' value={0}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
              </svg>
                Riêng tư
              </option>
              <option className='text-xs font-medium' value={1}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z" />
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z" clipRule="evenodd" />
              </svg>
              Công khai
              </option>
              
            </select>
              <div className='icon absolute right-2 top-1/2 -translate-y-1/2 text-black'>
              <CaretDownOutlined style={{
                fontSize: 11
              }} />
              </div>
            </div>
            {loading ? (
              <button
                disabled
                type="button"
                className={`text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5`}
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                {activeItem ? "Cập nhật" : "Chia sẽ"}...
              </button>
            ) : (
              <button
                onClick={() => {
                  save();
                }}
                type="button"
                class={`text-white bg-[#c80000] hover:brightness-110 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5`}
              >
               {
                activeItem ? "Cập nhật" : "Chia sẽ"
               } 
              </button>
            )}
        </div>
      }
      centered
      className="modal-quick-post private"
    >
      <div className="mt-8">
        {
          !activeItem && (
            type === "file" ? 
        <video className={`rounded-md w-full h-full`} controls autoPlay>
          <source src={url} type="video/mp4" />
        </video>
        : <CustomEditor
        initialData={link}
        setData={setLink}
        placeholder={`Nhập link video`}
      />
          )
        }
        {
          activeItem && (
            activeItem?.type === "file" ? 
        <div>
          
          {
            photoChange.length > 0 ? loadingChange ? <Spinner /> : <video className={`rounded-md w-full h-full`} controls autoPlay>
            <source src={photoChange} type="video/mp4" />
          </video>: loadingChange ? <Spinner /> : <video className={`rounded-md w-full h-full`} controls autoPlay>
            <source src={photo} type="video/mp4" />
          </video>
          } 
        <div className="flex justify-center">
        <Button  onClick={() => refImage.current.click()}  className="mt-3 mb-3" icon={ <UploadOutlined />}>Thay đổi video</Button>
        <input id="photo" name="photo" ref={refImage} accept="video/mp4" onChange={(e) => handleChange(e)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden" type="file"></input>
          </div>
        </div>
        : <div>
          <div className="flex justify-end text-[#c80000]">

          {
            link !== "" && <button className="ml-auto" onClick={() => setLink("")}>Xóa</button>
          }
          </div>
          <CustomEditor
        initialData={link}
        setData={setLink}
        placeholder={`Nhập link video`}
          />
        </div>
          )
        }
      </div> 
    </Modal>
    
  );
    
}
