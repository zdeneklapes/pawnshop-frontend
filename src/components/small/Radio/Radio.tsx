import { useState, FC } from 'react'
import { RadioGroup } from '@headlessui/react'
import clsx from 'clsx'

interface RadioProps {
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  label?: string
}

const Radio: FC<RadioProps> = ({ options, onChange, label = '' }) => {
  const [plan, setPlan] = useState(options[0].value)

  const handleChange = (value: string) => {
    onChange(value)
    setPlan(value)
  }

  return (
    <div className={clsx('group')}>
      <div className="text-md pl-1 group-hover:text-black font-semibold text-gray-800">{label}</div>
      <RadioGroup value={plan} onChange={handleChange} className="flex flex-row space-x-4">
        {options.map((option) => (
          <RadioGroup.Option key={option.value} value={option.value}>
            {({ checked }) => (
              <div className="flex items-center">
                <div
                  className={`border border-gray-400 rounded-2xl shadow px-10 py-2 shadow hover:cursor-pointer hover:border-black hover:bg-gray-50 ${
                    checked ? 'border-2 border-black shadow-lg font-medium' : 'bg-white'
                  }`}
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
