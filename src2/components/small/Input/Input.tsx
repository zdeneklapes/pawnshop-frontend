import clsx from 'clsx'
import { FC, ChangeEvent, MouseEvent } from 'react'

interface InputProps {
  placeholder?: string
  onClick?: (e: MouseEvent<HTMLInputElement>) => void
  type?: 'number' | 'text' | 'password'
  value?: string
  id?: string
  label?: string
  name?: string
  onChange?: (value: string | undefined) => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
  classNameInput?: string
  disabled?: boolean
  errored?: boolean
  autocomplete?: string
}

const Input: FC<InputProps> = ({
  className,
  classNameInput,
  id,
  label,
  onBlur,
  onFocus,
  name = '',
  onChange,
  onClick,
  type = 'text',
  value,
  placeholder = '',
  autocomplete = 'off',
  disabled = false,
  errored = false
}) => {
  return (
    <div className={clsx(className, 'group')}>
      <div className="text-md pl-1 group-hover:text-black font-semibold text-gray-800">{label}</div>
      <input
        className={clsx(
          classNameInput,
          'border border-gray-400 rounded p-2 group-hover:border-black group-hover:bg-gray-50 placeholder-gray-300 focus:bg-gray-50 outline-black',
          { 'group-hover:border-gray-400 bg-gray-100 group-hover:bg-gray-100': disabled },
          { 'border-red-700 border-2': errored },
          { 'bg-white': !errored && !disabled }
        )}
        id={id}
        name={name}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={(e) => (onChange ? onChange(e.target.value) : null)}
        onClick={onClick}
        placeholder={placeholder}
        type={type}
        value={value}
        disabled={disabled}
        autoComplete={autocomplete}
      />
    </div>
  )
}

export default Input
