import { useState, FC, ChangeEvent } from 'react'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'

interface ComboboxProps {
  options: string[]
  onChange: (value: string) => void
  label?: string
  className?: string
  value: string
  errored?: boolean
}

const CustomCombobox: FC<ComboboxProps> = ({ options, onChange, label, className = '', value, errored = false }) => {
  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="group">
      <div className="text-md pl-1 group-hover:text-black font-semibold text-gray-800">{label}</div>
      <Combobox value={value} onChange={onChange} nullable>
        <div className="relative">
          <Combobox.Input
            className={clsx(
              className,
              'border border-gray-400 rounded p-2 group-hover:border-black group-hover:bg-gray-50 focus:bg-gray-50 outline-black',
              { 'border-red-700 border-2': errored }
            )}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
            displayValue={(option: string) => option}
          />
          <Combobox.Options className="absolute mt-1 divide-y max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg focus:outline-none">
            {query.length > 0 && (
              <Combobox.Option
                value={query}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-50' : 'text-gray-900'}`
                }
              >
                {query}
              </Combobox.Option>
            )}
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option}
                value={option}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-50' : 'text-gray-900'}`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`${selected ? 'font-bold' : 'font-normal'}`}>{option}</span>
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
}

export default CustomCombobox
