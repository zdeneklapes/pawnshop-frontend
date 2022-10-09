import clsx from 'clsx'
import { FC, ChangeEvent, MouseEvent } from 'react'

interface InputNumberProps {
  placeholder?: string
  onClick?: (e: MouseEvent<HTMLInputElement>) => void
  type?: 'number' | 'text'
  value?: string
  id?: string
  label?: string
  name?: string
  onChange?: (value: string | undefined) => void
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
  classNameInput?: string
  disabled?: boolean
  errored?: boolean
  isDecimal?: boolean
}

const InputNumber: FC<InputNumberProps> = ({
  className,
  classNameInput,
  id,
  label,
  onBlur,
  name = '',
  onChange,
  onClick,
  type = 'text',
  value,
  placeholder = '',
  disabled = false,
  errored = false,
  isDecimal = false
}) => {
  const getRegex = () => {
    return isDecimal ? /^(\d*|\d+)$/ : /^(\d*|\d+\.?\d{0,2})$/
  }
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
        onChange={(e) => (onChange ? onChange(e.target.value.match(getRegex()) ? e.target.value : value) : null)}
        onClick={onClick}
        placeholder={placeholder}
        type={type}
        value={Number(value) === 0 ? '' : value}
        disabled={disabled}
        autoComplete="off"
      />
    </div>
  )
}

export default InputNumber
