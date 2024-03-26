import { Modal, Spinner } from 'flowbite-react'
import React from 'react'

export default function ModalWating({openModal, setOpenModal}) {
  return (
    <Modal 
        show={openModal} 
        onClose={() => setOpenModal(false)}
        size="sm"
        theme={{
            "root": {
                "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
                "show": {
                  "on": "flex bg-gray-900 bg-opacity-50 dark:bg-opacity-80",
                  "off": "hidden"
                },
                "sizes": {
                  "sm": "w-auto"
                },
            }
        }}
    >
        <Modal.Body className='flex justify-center items-center p-2' >
          <div className='flex gap-x-2 justify-center items-center'>
            <Spinner />
            <p className='text-base font-normal'>Vui lòng chờ...</p>
          </div>
        </Modal.Body>
      </Modal>
  )
}
