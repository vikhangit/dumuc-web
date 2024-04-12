"use client"
import React, { useRef } from "react";
import { Modal} from "antd";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '@utils/firebase';
import { FaCamera} from "react-icons/fa6";
import Image from 'next/image';
import Link from 'next/link';
import { MdDelete } from "react-icons/md";

export default function ModalAbout({ visible, onCancel, about, type, authors}) {
  const [user] = useAuthState(auth)
  const userCreated = authors?.find(x => x?.userId === about?.createdBy)
  const refImage = useRef(null)
   return( <Modal
      visible={visible}
      title={type === "about" ? `Thông tin nhóm` : "Thành viên nhóm"}
      onCancel={() => {
        onCancel();
      }}
      destroyOnClose={true}
      footer={
       null
      }
      centered
      className="private"
    >
      <div className="mt-8 gap-x-2">
        {
          type === "about" && <div>
            <div className="w-full rounded-full flex justify-center items-center">
            <div className="w-[100px] h-[100px] rounded-full flex justify-center items-center border border-gray-400">
              {
                about?.avatar && about?.avatar?.length > 0 ? 
                <Image src={about?.avatar} width={0} height={0} className="w-full h-full rounded-full" sizes="100vw"  /> :
                <FaCamera color="#999" size={20} />
              }
            </div>
              
            </div>
            <div className="flex justify-center">
              <input className='hidden' 
              onChange={(e) => {
                handleChangeIamge(e)
              }} type='file' accept='image/*' ref={refImage}/>
            </div>
            <div className="mt-2 flex gap-x-4 items-center">
              <strong>Tên nhóm:</strong> {about?.name}
            </div>
            <div className="flex gap-x-4 items-center mt-2">
              <strong>Người tạo:</strong>
              <div className="flex gap-x-2 items-center">
              <Image src={userCreated?.user?.photo && userCreated?.user?.photo?.length > 0 ? userCreated?.user?.photo : "/dumuc/avatar.png"} width={0} height={0} sizes='100vw' className='w-[30px] h-[30px] rounded-full' />
              {
                userCreated?.name
              }
              </div>
            </div>
          </div>
        }
        {
          type === "member" && <div>
            {
              about?.member?.filter( (ele, ind) => ind === about?.member?.findIndex( elem => elem?.user === ele?.user ))?.map((item, index) => {
                const author = authors?.find(x => x?.userId === item?.user)
             return <div
             key={index}
              className={` rounded-md flex items-center gap-x-2 pl-[15px] pr-2 py-[10px] mt-[10px] cursor-pointer`}>
             <Image src={author?.user?.photo && author?.user?.photo?.length > 0 ? author?.user?.photo : "/dumuc/avatar.png"} width={0} height={0} sizes='100vw' className='w-[45px] h-[45px] rounded-full' />
             <div className='flex justify-between w-full'>
                 <div>
                     <Link href="" className='text-base'>{author?.name}</Link>
                     {
                      item?.user === about?.createdBy && <p className='text-[13px] text-[#00000080] mt-1'>Trưởng nhóm</p>
                     }
                 </div>
               
             </div>
         </div>
              })
            }
          </div>
        }
      </div> 
    </Modal>
    
  );
    
}
