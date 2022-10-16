import { Dispatch, SetStateAction, FC } from 'react'
import { Button } from '@components/small/Button'
import { Modal } from '@components/small/Modal'

interface SubmitModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  title?: string
  subtitle?: string
  handleSubmit?: () => void
}

const SubmitModal: FC<SubmitModalProps> = ({ isOpen, setIsOpen, title = '', subtitle = '', handleSubmit }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
      <div className="mt-2">
        <p className="text-gray-500 text-center text-lg">{subtitle}</p>
      </div>
      <div className="flex mt-4 space-x-6 justify-center">
        <Button text="Zrušiť" onClick={() => setIsOpen(false)} className="w-32" cancel />
        <Button
          text="Potvrdiť"
          onClick={() => {
            setIsOpen(false)
            handleSubmit && handleSubmit()
          }}
          className="w-32"
          submit
        />
      </div>
    </Modal>
  )
}

export default SubmitModal
