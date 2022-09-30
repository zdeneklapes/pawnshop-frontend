import clsx from 'clsx'
import { FC, ChangeEvent, MouseEvent } from 'react'

interface InputProps {
  placeholder?: string
  onClick?: (e: MouseEvent<HTMLInputElement>) => void
  type?: 'number' | 'text'
  value?: string
  id?: string
  label?: string
  name: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
  classNameInput?: string
  disabled?: boolean
}

const Input: FC<InputProps> = ({
  className,
  classNameInput,
  id,
  label,
  onBlur,
  name,
  onChange,
  onClick,
  type = 'text',
  value,
  placeholder = '',
  disabled = false
}) => {
  return (
    <div className={clsx(className, 'group')}>
      <div className="text-md pl-1 group-hover:text-black font-semibold text-gray-800">{label}</div>
      <input
        className={clsx(
          classNameInput,
          'border border-gray-400 rounded p-2 group-hover:border-black group-hover:bg-gray-50 placeholder-green-700 focus:bg-gray-50 outline-black',
          { 'group-hover:border-gray-400': disabled }
        )}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        type={type}
        value={value}
        disabled={disabled}
      />
    </div>
  )
}

export default Input
