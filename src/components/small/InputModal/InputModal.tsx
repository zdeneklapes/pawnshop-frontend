import { Dispatch, SetStateAction, FC } from 'react'
import { Button } from '@components/small/Button'
import { Modal } from '@components/small/Modal'
import { InputNumber } from '@components/small/InputNumber'

interface SubmitModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  title?: string
  handleSubmit: () => void
  input: string
  setInput: Dispatch<SetStateAction<string | undefined>>
}

const InputModal: FC<SubmitModalProps> = ({ isOpen, setIsOpen, title = '', handleSubmit, input, setInput }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={title}>
      <div className="flex flex-col space-y-6 mt-2">
        <InputNumber value={input} onChange={(value) => setInput(value)} isDecimal />
        <div className="space-x-6">
          <Button text="Zrušiť" onClick={() => setIsOpen(false)} className="w-32" cancel />
          <Button text="Potvrdiť" onClick={() => handleSubmit()} className="w-32" submit />
        </div>
      </div>
    </Modal>
  )
}

export default InputModal
