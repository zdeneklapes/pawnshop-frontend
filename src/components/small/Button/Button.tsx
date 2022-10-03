import clsx from 'clsx'
import { FC } from 'react'

interface ButtonProps {
  onClick?: () => void
  type?: 'submit' | 'button'
  className?: string
  disabled?: boolean
  text: string
  submit?: boolean
  cancel?: boolean
}

const Button: FC<ButtonProps> = ({
  className,
  onClick,
  type = 'button',
  disabled = false,
  text,
  cancel = false,
  submit = false
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={clsx(
        className,
        'border border-gray-400 rounded p-2  hover:bg-gray-50 hover:font-medium placeholder-green-700 focus:bg-gray-50 outline-none focus:bg-transparent',
        { 'hover:border-gray-400': disabled },
        { 'hover:text-green-800 hover:border-green-800': submit },
        { 'hover:text-red-800 hover:border-red-800': cancel },
        { 'hover:border-black': !cancel && !submit }
      )}
    >
      {text}
    </button>
  )
}

export default Button
