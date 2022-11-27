import clsx from 'clsx'
import { FC, useState } from 'react'
import { SubmitModal } from '@components/small/SubmitModal'

interface ButtonProps {
  onClick?: () => void
  type?: 'submit' | 'button'
  className?: string
  disabled?: boolean
  text: string
  submit?: boolean
  cancel?: boolean
  doubleCheck?: boolean
  doubleCheckTitle?: string
  doubleCheckSubtitle?: string
}

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  type = 'button',
  disabled = false,
  text,
  cancel = false,
  submit = false,
  doubleCheck = false,
  doubleCheckTitle = 'potvrdit',
  doubleCheckSubtitle = 'Skutečně chcete potvrdit?'
}) => {
  const [isOpenSubmitModal, setIsOpenSubmitModal] = useState(false)
  return (
    <>
      <button
        disabled={disabled}
        onClick={doubleCheck ? () => setIsOpenSubmitModal(true) : onClick}
        type={type}
        className={clsx(
          className,
          'border border-gray-400 rounded p-2 text-black hover:bg-gray-50 hover:font-medium placeholder-green-700  outline-none  ',
          { 'hover:border-gray-400': disabled },
          { 'hover:text-red-800 hover:border-red-800 hover:bg-red-100': cancel },
          { 'hover:text-green-800 hover:border-green-800 hover:bg-green-100': submit },
          { 'hover:border-black hover:bg-transparent': !cancel && !submit }
        )}
      >
        {text}
      </button>
      <SubmitModal
        isOpen={isOpenSubmitModal}
        setIsOpen={setIsOpenSubmitModal}
        handleSubmit={onClick}
        title={doubleCheckTitle}
        subtitle={doubleCheckSubtitle}
      />
    </>
  )
}

export default Button
