const options = ['Obsluha', 'Statistiky', 'Tisk', 'Odhlasit']

const SidebarProps = () => {
  return (
    <div className="flex mt-2 w-64 border-gray-300 border-r ">
      <div className="mx-2 divide-y divide-gray-400 w-full">
        {options.map((option) => (
          <div key={option} className="flex flex-col w-full py-4 text-2xl  items-center font-semibold">
            {option}
          </div>
        ))}
      </div>
    </div>
  )
}

export default SidebarProps
