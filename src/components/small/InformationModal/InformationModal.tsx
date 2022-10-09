import { Dialog, Transition } from '@headlessui/react'
import { Fragment, Dispatch, SetStateAction, FC } from 'react'
import { Button } from '@components/small/Button'
import clsx from 'clsx'
import { Modal } from '@components/small/Modal'

interface InformationModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  title?: string
  subtitle?: string
  isError?: boolean
  isSuccess?: boolean
}

const InformationModal: FC<InformationModalProps> = ({
  isOpen,
  setIsOpen,
  title = '',
  subtitle = '',
  isError = false,
  isSuccess = false
}) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
      <div className="mt-2">
        <p className="text-black text-center text-lg">{subtitle}</p>
      </div>
      <div className=" flex mt-4 space-x-6 justify-center text-black">
        <Button text="Zatvoriť" onClick={() => setIsOpen(false)} className="w-32" submit={isSuccess} cancel={isError} />
      </div>
    </Modal>
  )
}

export default InformationModal
