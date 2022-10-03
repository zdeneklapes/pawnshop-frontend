import { FC, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

interface RadioProps {
  options: { value: string | boolean; label: string }[]
  onChange: (value: string | boolean) => void
  label?: string
  className?: string
  value: string | boolean
}

const Radio: FC<RadioProps> = ({ options, onChange, label = '', className = '', value }) => {
  useEffect(() => {
    onChange(options[0].value)
  }, [])
  return (
    <div className={clsx('group')}>
      <div className="text-md pl-1 group-hover:text-black font-semibold text-gray-800">{label}</div>
      <RadioGroup
        value={options.some((el) => el.value === value) ? value : options[0].value}
        onChange={onChange}
        className="flex flex-row space-x-4"
      >
        {options.map((option) => (
          <RadioGroup.Option key={option.label} value={option.value}>
            {({ checked }) => (
              <div className="flex items-center">
                <div
                  className={clsx(
                    className,
                    'flex justify-center border border-gray-400 rounded-2xl shadow px-10 py-2 shadow hover:cursor-pointer hover:border-black hover:bg-gray-50 ',
                    { 'border-2 border-black shadow-lg font-medium': checked }
                  )}
                >
                  {option.label}
                </div>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </div>
  )
}

export default Radio
