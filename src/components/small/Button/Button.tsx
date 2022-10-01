import clsx from 'clsx'
import { FC } from 'react'

interface ButtonProps {
  onClick?: () => void
  type?: 'submit' | 'button'
  className?: string
  disabled?: boolean
  text: string
}

const Button: FC<ButtonProps> = ({ className, onClick, type = 'button', disabled = false, text }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={clsx(
        className,
        'border border-gray-400 rounded p-2 hover:border-black hover:bg-gray-50 hover:font-medium placeholder-green-700 focus:bg-gray-50 outline-black',
        { 'group-hover:border-gray-400': disabled }
      )}
    >
      {text}
    </button>
  )
}

export default Button
