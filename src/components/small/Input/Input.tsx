import clsx from 'clsx'
import { FC, ChangeEvent, MouseEvent } from 'react'

interface InputProps {
  placeholder?: string
  onClick?: (e: MouseEvent<HTMLInputElement>) => void
  type?: 'number' | 'text'
  value?: string
  disabled?: boolean
  id?: string
  label?: string
  name: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  handleBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  handleFocus?: (e: ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
  required?: boolean
  className?: string
}

const Input: FC<InputProps> = ({
  className,
  id,
  label,
  handleFocus,
  handleBlur,
  name,
  onChange,
  onClick,
  readOnly,
  required,
  type = 'text',
  value,
  placeholder = 'Please insert'
}) => {
  return (
    <>
      <div>{label}</div>
      <input
        className={clsx(className, 'bg-amber-200')}
        id={id}
        name={name}
        onBlur={handleBlur}
        onChange={onChange}
        onClick={onClick}
        onFocus={handleFocus}
        readOnly={readOnly}
        required={required}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </>
  )
}

export default Input
