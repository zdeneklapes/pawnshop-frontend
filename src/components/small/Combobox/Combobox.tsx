import { useState, useMemo, FC, ChangeEvent } from 'react'
import { Combobox } from '@headlessui/react'
import clsx from 'clsx'

interface ComboboxProps {
  options: string[]
  onChange: (value: string) => void
  label?: string
  className?: string
}

const createOptions = (options: string[]) => {
  return options.map((option, index) => {
    return {
      id: index,
      name: option,
      label: ''
    }
  })
}

const CustomCombobox: FC<ComboboxProps> = ({ options, onChange, label, className = '' }) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [query, setQuery] = useState('')

  const comboboxOptions = useMemo(() => createOptions(options), [options])

  const handeChange = (value: string) => {
    setQuery(value)
    onChange(value)
  }

  const filteredOptions =
    query === ''
      ? comboboxOptions
      : comboboxOptions.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="group">
      <div className="text-md pl-1 group-hover:text-black font-semibold text-gray-800">{label}</div>
      <Combobox value={selectedOption} onChange={setSelectedOption} nullable>
        <div className="relative">
          <Combobox.Input
            className={clsx(
              className,
              'border border-gray-400 rounded p-2 group-hover:border-black group-hover:bg-gray-50 focus:bg-gray-50 outline-black'
            )}
            onChange={(event: ChangeEvent<HTMLInputElement>) => handeChange(event.target.value)}
            displayValue={(option: { id: number; name: string }) => option?.name}
          />
          <Combobox.Options className="absolute mt-1 divide-y max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg focus:outline-none">
            {query.length > 0 && (
              <Combobox.Option
                value={{ id: null, name: query }}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-50' : 'text-gray-900'}`
                }
              >
                {query}
              </Combobox.Option>
            )}
            {filteredOptions.map((option) => (
              <Combobox.Option
                key={option.id}
                value={option}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-50' : 'text-gray-900'}`
                }
              >
                {({ selected }) => (
                  <>
                    <span className={`${selected ? 'font-bold' : 'font-normal'}`}>{option.name}</span>
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
