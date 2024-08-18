import React from 'react'
import { Modal,ModalBody,ModalContent,ModalCloseButton,ModalOverlay, useDisclosure, ModalFooter,ModalHeader } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
function ModalField({title,body,buttontext, tooltiptext,icon, handleSubmit, isLoading}) {
    const {onOpen, isOpen, onClose}= useDisclosure()
  return (
    <div>

    <button onClick={onOpen} className='flex items-center'>
    {icon}
    {buttontext}</button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader className="text-center">
            {title}
          </ModalHeader>
          <ModalBody>
            {body}
          </ModalBody>
          <ModalFooter>
            <button onClick={handleSubmit}  className='bg-blue-500 text-white px-12 py-2 rounded-md'>
            {isLoading?<Spinner/>:tooltiptext}
              
            </button>
            <button onClick={onClose} className='text-gray-500 px-12 py-2 rounded-md'>
              Cancel
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ModalField
