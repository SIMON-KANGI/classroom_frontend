import React from 'react'
import { Modal,ModalBody,ModalContent,ModalCloseButton,ModalOverlay, useDisclosure, ModalFooter,ModalHeader } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
function ModalField({title,body,buttontext, tooltiptext,icon, handleSubmit, isLoading}) {
    const {onOpen, isOpen, onClose}= useDisclosure()
  return (
    <div className='p-4'>

    <button onClick={onOpen} className='text-xl text-stone-100 rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-700 flex items-center px-8 py-3'>
    {icon}
    {buttontext}</button>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader className="text-center">
            {title}
          </ModalHeader>
          <ModalBody>
            {body}
          </ModalBody>
          <ModalFooter className='justify-between'>
            <button onClick={handleSubmit}  className='bg-blue-500 mr-8 text-white px-12 py-2 rounded-md'>
            {isLoading?<Spinner/>:tooltiptext}
              
            </button>
            <button onClick={onClose} className='text-gray-100 bg-rose-800 px-12 py-2 rounded-md'>
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ModalField
